import React, { useEffect, useRef } from 'react'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { setUser, logoutUser } from './reducers/loginReducer'
import Blog from './components/Blog'
import CreateNewBlogForm from './components/CreateNewBlogForm'
import LoginForm from './components/LoginForm'
import User from './components/User'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './index.css'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'
import { useDispatch, useSelector } from 'react-redux'
import { Route, useRouteMatch,Link, Switch } from 'react-router-dom'
import { Table } from 'react-bootstrap'


const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    } 
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)
  const users = useSelector (state => state.users)

  const match = useRouteMatch('/users/:id')
  const usertolook = match 
    ? users.find(a => a.id === match.params.id)
    :null

  const blogmatch = useRouteMatch('/blogs/:id')
  //console.log(blogmatch)
  const blogtolook = blogmatch 
    ? blogs.find(a => a.id === blogmatch.params.id)
    :null

  const logOut = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    dispatch(logoutUser())
    dispatch(setNotification(`Logged out`, 'info', 5))
    
  }

  if (!user||user.username===''){
    return (
      <div className="container">
        <h2>Log in to application</h2>
        <Notification/>
        <LoginForm />
      </div>
    )
  } else {
    return (
      <div className="container">
        <p style={{background:'lightgray', padding:5}}>
        <Link to='/'>blogs </Link>
        <Link to='/users'>users </Link>
        
        {user.name} logged in
        <button onClick={logOut}>logout</button>
        </p>
        <Notification/>
        <Switch>
          <Route path='/blogs/:id'>
            <BlogInfo blog={blogtolook} user={user}/>
          </Route>
          <Route path='/users/:id'>
            <UserInfo user={usertolook}/>
          </Route>
          <Route path='/users'>
            <User/>
          </Route>
          <Route path='/'>
          <h2>blogs</h2>
            <Togglable  buttonLabel ='Add blog' button2Label='cancel' ref={blogFormRef}>
              <CreateNewBlogForm blogFormRef={blogFormRef} user={user} />
            </Togglable>
            <Table striped>
              <tbody>
              {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} user={user}/>
              )}
              </tbody>
            </Table>
          </Route>
        </Switch>
      </div>
    )
  }
}
//
export default App