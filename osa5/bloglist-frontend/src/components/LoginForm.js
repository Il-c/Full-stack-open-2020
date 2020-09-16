import React from 'react'

const LoginForm = ({handleLogin, handlePasswordInput, handleUsernameInput, username, password}) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        type="text"
        value={username}
        id="username"
        onChange={handleUsernameInput}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        id="password"
        onChange={handlePasswordInput}
      />
    </div>
    <button id='login-button'type="submit">login</button>
  </form>
)
export default LoginForm