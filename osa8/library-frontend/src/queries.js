import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }

`
export const ME = gql`
  query {
    me {
      favoriteGenre
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`
export const BOOKS_IN_GENRE = gql`
  query allBooks($genre: String!){
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }

`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String, $publ: Int, $genres: [String]){
    addBook(
      title: $title,
      author: $author,
      published: $publ,
      genres: $genres
    ) {
      title
      author{
        name
      }
    }
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }

`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int){
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      name
      born
    }
  }
`