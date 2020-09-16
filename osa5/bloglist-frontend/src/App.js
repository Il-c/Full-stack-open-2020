import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateNewBlogForm from './components/CreateNewBlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser]= useState(null)
  const [ message, setMessage] = useState({content:null,type:null})

  const blogFormRef = useRef()

  useEffect (() => {
    const getBlogs = async () => {
    const blogs =  await blogService.getAll()
    setBlogs( blogs.sort((a,b) => (a.likes<b.likes)?1:(b.likes<a.likes)? -1:0) )  
    }
    getBlogs()
    
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    } 
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{ 
      const user = await loginService.login({ username, password })
      
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showMessage(`Logged in!`, 'info')
      console.log(user)
      
    } catch (exception) {
      console.log('Wrong credentials')
      showMessage('Wrong credentials','error')
    }
  }
  const logOut = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUsername('')
    setPassword('')
    setUser(null)
    showMessage('Logged out','info')
  }
  const handleNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try{
      const response = await blogService.postBlog(blogObject)
      console.log(response)
      showMessage(`a new blog ${response.title} by ${response.author} added`, 'info')
    } catch {
      console.log(`Virhe tallennuksessa!`)
      showMessage('Error submitting blog','error')
    }
  }
  const handleBlogUpdate = async (blogObject) => {
    try{
      const response = await blogService.updateBlog(blogObject)
      let updatedBlogs=blogs.map(blog=>blog.id!==blogObject.id?blog:response)
      setBlogs(updatedBlogs.sort((a,b) => (a.likes<b.likes)?1:(b.likes<a.likes)? -1:0))
      console.log(response)
      showMessage(`blog ${response.title} by ${response.author} liked`, 'info')
    } catch {
      console.log(`Virhe päivityksessä!`)
      showMessage('Error liking blog','error')
    }  
  }
  const handleBlogRemove = async (blogObject) => {
    if(window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)){
      try{
        const response = await blogService.deleteBlog(blogObject)
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
        console.log(response)
        showMessage(`blog deleted`, 'info')
      } catch {
        console.log(`Virhe päivityksessä!`)
        showMessage('Error deleting blog','error')
      }  
    }
  }


  const showMessage = (content, type) =>{
    setMessage({content, type})
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }
  const  handlePasswordInput= (event) => {
    setPassword(event.target.value)
  }
  const  handleUsernameInput= (event) => {
    setUsername(event.target.value)
  }


  if (!user){
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message}/>
        <LoginForm handleLogin={handleLogin} 
          handleUsernameInput={handleUsernameInput}
          handlePasswordInput={handlePasswordInput}
          username = {username} password={password}/>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification message={message}/>
        <p>{user.name} logged in
        <button onClick={logOut}>logout</button>
        </p>
        <Togglable  buttonLabel ='Add blog' button2Label='cancel' ref={blogFormRef}>
          <CreateNewBlogForm handleNewBlog={handleNewBlog} />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user}
            handleBlogUpdate={handleBlogUpdate} handleBlogRemove={handleBlogRemove} />
        )}
      </div>
    )
  }
}
//
export default App