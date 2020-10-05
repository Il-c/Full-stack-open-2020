import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'

const initialState = 
  {
    name:'',
    username:''
  }

const loginReducer = (state = initialState, action) => {
 
  switch (action.type){
    case 'LOGIN':
      return action.data
    case 'SETUSER':
      return action.data
    case 'LOGOUT':
      return null
    default: return state
  }
}

export const loginUser = (username,password) => {
  return async dispatch => {
    try{ 
      const user = await loginService.login({username,password})
      console.log(user)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
      })
      dispatch(setNotification(`Logged in!`, 'info', 5))  
    } catch (exception) {
      console.log('Wrong credentials')
      dispatch(setNotification('Wrong credentials','error', 5))  
    }
  }
}
export const logoutUser = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT',
      data: null
    })
    dispatch(setNotification(`Logged out`, 'info', 5))
    
  }
}
export const setUser = (user) => {
  return dispatch => {
    dispatch({
      type: 'SETUSER',
      data: user
    })
  }
}

export default loginReducer