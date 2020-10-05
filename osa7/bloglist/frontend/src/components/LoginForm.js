import React from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'

const LoginForm = () => {
 
  const dispatch = useDispatch()
  const handleLogin = (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value

    dispatch(loginUser(username, password))
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" id="username" name='username'/>
      </div>
      <div>
        password
        <input type="password" id="password" name='password'/>
      </div>
      <button id='login-button'type="submit">login</button>
    </form>
  )
}
export default LoginForm