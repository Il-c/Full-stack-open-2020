import React from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, commentBlog, deleteBlog } from '../reducers/blogReducer'

const BlogInfo = ({blog, user}) => {

  const dispatch = useDispatch()
  const updateBlog = () => {
    dispatch(likeBlog(blog))
  }
  
  if (!blog){
    return null
  }
  if (!blog.comments){
    blog.comments = ['']
  }
  //console.log(blog,'ja',user)
  const hideIfNotOwner = { display: ((blog.user.username!==user.username)&&(blog.user!==user.id)) ? 'none' : '' }
  const removeBlog=() => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      dispatch(deleteBlog(blog))
    }
  }
  const addComment = (event) => {
    event.preventDefault()

    const comment = {
      comment:event.target.comment.value
    }
    dispatch(commentBlog(blog, comment))
  }
  
  //
  return(
    <>
      <h2>{blog.title}</h2>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>{blog.likes} likes 
        <button id='likeButton' onClick={updateBlog}>like</button>
      </div>
      <div>added by {blog.user.name}</div>

      <button  style={hideIfNotOwner} onClick={removeBlog}>remove</button>

      <h3>comments</h3>  
      <form onSubmit={addComment}>
        <input type="text"  id="comment" name='comment'/>
        <button id='createCommentButton' type="submit">add comment</button>
      </form>
      {blog.comments.map(comment =>
            <ul key={blog.comments.indexOf(comment)}>
            <li>{comment}</li>
            </ul>
          )} 
    </>
  )
}
export default BlogInfo