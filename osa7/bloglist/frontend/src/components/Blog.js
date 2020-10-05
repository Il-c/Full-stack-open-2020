import React from 'react'
import PropTypes from 'prop-types'
import '../index.css'
import { Link } from 'react-router-dom'


const Blog = ({ blog, user }) => {

  return (
    <tr className='blogItem'>
      <td><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></td>
    </tr>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}
export default Blog
