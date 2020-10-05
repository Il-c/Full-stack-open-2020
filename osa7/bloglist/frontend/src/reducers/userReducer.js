import userService from '../services/users'
//import { setNotification } from '../reducers/notificationReducer'

const initialState = [
  {
  username:'fgh',
  blogs:[],
  id:1
  },
  {
    username:'rtju',
    blogs:[],
    id:2
  }
]

const userReducer = (state = initialState, action) => {
  switch (action.type){
    case 'NEW':
      return (state.concat(action.data)).sort((a,b) => (a.likes<b.likes)? 1:-1)
    case 'DELETE':
      const res = state.filter(blog => blog.id !== action.data.id)
      return res.sort((a,b) => (a.likes<b.likes)? 1:-1)
    case 'INITIALIZEUSERS':
      return action.data
    default: return state
  }
}


/*export const createNewBlog = (content) => {
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
}*/
/*export const deleteBlog = (blogObject) => {
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
}*/
export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getUsers()
    dispatch({
      type: 'INITIALIZEUSERS',
      data: users
    })
  }
}


export default userReducer