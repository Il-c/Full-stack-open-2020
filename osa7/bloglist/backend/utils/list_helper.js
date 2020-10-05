const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes).reduce(( a, b) => a + b,0)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const result = blogs[likes.indexOf(Math.max(...likes))]
  delete result._id
  delete result.url
  delete result.__v
  return result
}

const mostBlogs = (blogs) => {
  const counts = (_.countBy(blogs,'author'))
  const hasMostBlogs = _.max(_.keys(counts), a => counts[a])
  const blogsCount = counts[hasMostBlogs]
  return { author:hasMostBlogs,blogs:blogsCount }
}
const mostLikes = (blogs) => {

  const authors =_.groupBy(blogs, 'author')
  const totalLikes = _.map(authors, author => _.sum(author.map(author => author.likes)))
  const favoriteAuthor = _.keys(authors)[_.indexOf(totalLikes,_.max(totalLikes))]
  const authorTotalLikes =  _.max(totalLikes)
  return { author:favoriteAuthor, likes:authorTotalLikes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}