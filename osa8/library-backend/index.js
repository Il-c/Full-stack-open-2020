const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const pubsub = new PubSub()
const MONGODB_URI = process.env.MONGODB_URI

const JWT_SECRET = 'edrfrj5uy5u'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`

  type Token {
    value: String!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Book {
    title: String!
    published: Int
    author: Author!
    id: ID!
    genres: [String]
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
    books: [Book!]!
  }

  type Query {
    bookCount: Int!
    allBooks(author: String, genre: String):[Book!]!
    findBook(title: String!): Book
    authorCount: Int!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {

    addBook(
      title: String!
      author: String
      published: Int
      genres: [String]
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

  }
  type Subscription {
    bookAdded: Book!
  }
  
`

const resolvers = {
  Query: {
    me: (root, args, context) => context.currentUser,
    bookCount: async () => {
      return (await Book.find({})).length
    },
    authorCount: async () => {
      return (await Author.find({})).length
    },
    findBook: async (root, args) => {
      return await Book.findOne({ title: args.title })
    },
    allBooks: async (root, args) => {
      let author = ''
      if (args.author){
        author = await Author.findOne({ name: args.author })
      }
      const booksit = await Book.find({}).populate('author')
      const booksToShow = args.genre?booksit.filter(book=>book.genres.includes(args.genre)):booksit
      return (args.author?booksToShow.filter(book => String(book.author) === String(author.id)):booksToShow)
    },
    allAuthors:  async (root) => {
      console.log('author haku');
      return await Author.find({}).populate('books')
    }
  },
  Author: {
    bookCount: async (root) => {
     // const booksit = await Book.find({author:root.id})
      return root.books.length//booksit.length
    }
  },
  /*Book: {
    author: async (root) => {
      const thisAuthor = await Author.findById(root.author)
      return thisAuthor
    }
  },*/
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({username: args.username, favoriteGenre: args.favoriteGenre})
      try{
        return await user.save()
      } catch (error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if ( !user || args.password !== 'salasana'){
        throw new UserInputError('Wrong credentials')
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },

    addBook: async (root, args, context) => {
      let newBook
      let newAuthor
      const currentUser = context.currentUser
      if(!currentUser){
          throw new AuthenticationError("not authenticated")
      }
      const existingAuthor = await Author.findOne({ name: args.author })
      if (existingAuthor){
        newAuthor = existingAuthor
      } else {
        newAuthor = new Author({ name:args.author })
        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      newBook = {
        title:args.title,
        published:args.published,
        author: newAuthor,//new Author({ name:author }),
        genres: args.genres
      }
      const book = new Book( newBook )
      let result = null
      try{
        result = await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      newAuthor.books.push(result)
      const author = await Author.findOneAndUpdate({name:newAuthor.name}, {books:newAuthor.books},{new:true})
      console.log(author)
      pubsub.publish('BOOK_ADDED', { bookAdded: result})
      return result
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser){
          throw new AuthenticationError("not authenticated")
      }
      const author = await Author.findOneAndUpdate({ name: args.name }, {born:args.setBornTo},{new:true})
      if (author){
        return author
      } else {
        return null
      }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    //console.log('kysely:',request);
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)//.populate('friends')
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
