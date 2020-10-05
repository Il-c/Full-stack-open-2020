import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import userReducer from './reducers/userReducer'


const reducer = combineReducers ({
  blogs: blogReducer,
  users: userReducer,
  notification: notificationReducer,
  login: loginReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
export default store