import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const initialState = [
  {
  title:'koe',
  author:'minä',
  url:'www.fi',
  user:'',
  id:1
  },
  {
    title:'koe1',
    author:'minä1',
    url:'www.fi1',
    user:'',
    id:2
  }
]

const blogReducer = (state = initialState, action) => {
  
  switch (action.type){
    case 'LIKE':
      const id = action.data.id
      const result = state.map(a => 
        a.id !== id ? a : action.data
      )
      return result.sort((a,b) => (a.likes<b.likes)? 1:-1)
    case 'NEW':
      return (state.concat(action.data)).sort((a,b) => (a.likes<b.likes)? 1:-1)
    case 'DELETE':
      const res = state.filter(blog => blog.id !== action.data.id)
      return res.sort((a,b) => (a.likes<b.likes)? 1:-1)
    case 'COMMENT':
      return state.map(a => a.id !== action.data.id ? a : action.data)
    case 'INITIALIZE':
      return action.data.sort((a,b) => (a.likes<b.likes)? 1:-1)
    default: return state
  }
}
export const likeBlog = (object) => {
  return async dispatch => {
    try{
      object.likes += 1
      const newBlog = await blogService.updateBlog(object)
      console.log(newBlog)
      dispatch(setNotification(`blog ${newBlog.title} by ${newBlog.author} liked`, 'info', 5))
      dispatch({
        type: 'LIKE',
        data: newBlog
      })
    }catch{
      console.log(`Virhe päivityksessä!`)
      dispatch(setNotification('Error liking blog','error', 5))
    }
  }
}
export const createNewBlog = (content) => {
  return async dispatch => {
    try{
      const newBlog = await blogService.postBlog(content)
      dispatch({
        type: 'NEW',
        data: newBlog
      })
      dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'info', 5))
    } catch {
      console.log(`Virhe tallennuksessa!`)
      dispatch(setNotification('Error submitting blog','error', 5))
    }
  }
}
export const commentBlog = (commentedBlog, comment) => {
  console.log(comment)
  return async dispatch => {
    try{
      const newBlog = await blogService.commentBlog(commentedBlog, comment)
      dispatch({
        type: 'COMMENT',
        data: newBlog
      })
      dispatch(setNotification(`blog ${newBlog.title} commented`, 'info', 5))
    } catch {
      console.log(`Virhe lähetyksessä!`)
      dispatch(setNotification('Error commenting blog','error', 5))
    }
  }
} 
export const deleteBlog = (blogObject) => {
  return async dispatch => {
    try{
      console.log('objekti',blogObject)
      const response = await blogService.deleteBlog(blogObject)
      console.log('vastaus',blogObject)
      dispatch({
        type: 'DELETE',
        data: blogObject
      })
      console.log(response)
      dispatch(setNotification('blog deleted','info',5))
    } catch {
      console.log(`Virhe päivityksessä!`)
      dispatch(setNotification('Error deleting blog','error',5))
    }  
  }
}
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: blogs
    })
  }
}


export default blogReducer