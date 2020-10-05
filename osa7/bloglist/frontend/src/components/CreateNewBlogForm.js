import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogReducer'


const CreateNewBlogForm = (props) => {

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    dispatch(createNewBlog(blogObject))
    
    props.blogFormRef.current.toggleVisibility()
 
  }

  
  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <div>
        Title:
          <input type="text"  id="Title" name='title'
          />
        </div>
        <div>
        Author:
          <input type="text"  id="Author" name='author'
          />
        </div>
        <div>
        url:
          <input type="text"  id="Url" name='url'
          />
        </div>
        <button id='createBlogButton' type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateNewBlogForm