import React, { useState } from 'react'
import PropTypes from 'prop-types'
import '../index.css'


const Blog = ({ blog, user, handleBlogUpdate, handleBlogRemove }) => {

  const [hideIfClicked, sethideIfClicked] = useState({ display: 'none' })
  const [showIfClicked, setshowIfClicked] = useState({ display:'' })

  const updateBlog = () => {
    const newLikes = blog.likes + 1
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: newLikes,
      id:blog.id,
      user:blog.user
    }
    blog = blogObject
    handleBlogUpdate(blogObject)
  }
  const removeBlog=() => {
    handleBlogRemove(blog)
  }
  const hideIfNotOwner = { display: (blog.user.username!==user.username) ? 'none' : '' }
  const viewClick = () => {
    const toggledHide = { display: (hideIfClicked.display==='none') ? '' : 'none' }
    const toggledShow = { display: (showIfClicked.display==='none') ? '' : 'none' }
    sethideIfClicked(toggledHide)
    setshowIfClicked(toggledShow)

  }

  return (
    <div className='blogItem'>
      {blog.title} {blog.author}
      <button id='viewButton' style={showIfClicked}onClick={viewClick}>view</button>
      <button style={hideIfClicked}onClick={viewClick}>hide</button>
      <div className='extraBlogInfo' style={hideIfClicked} >
        <div>{blog.url} </div>
        <div id='likesRow'><span id='likes'>{blog.likes}</span>
          <button id='likeButton' onClick={updateBlog}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button style={hideIfNotOwner} onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleBlogUpdate: PropTypes.func.isRequired,
  handleBlogRemove: PropTypes.func.isRequired
}
export default Blog
