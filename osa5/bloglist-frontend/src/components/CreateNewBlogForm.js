import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateNewBlogForm = (props) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    props.handleNewBlog(blogObject)
  }

  const  handleTitleInput= (event) => {
    setTitle(event.target.value)
  }
  const  handleAuthorInput= (event) => {
    setAuthor(event.target.value)
  }
  const  handleUrlInput= (event) => {
    setUrl(event.target.value)
  }
  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <div>
        Title:
          <input type="text" value={title} id="Title"
            onChange={handleTitleInput}
          />
        </div>
        <div>
        Author:
          <input type="text" value={author} id="Author"
            onChange={handleAuthorInput}
          />
        </div>
        <div>
        url:
          <input type="text" value={url} id="Url"
            onChange={handleUrlInput}
          />
        </div>
        <button id='createBlogButton' type="submit">Create</button>
      </form>
    </div>
  )
}
CreateNewBlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
}
export default CreateNewBlogForm