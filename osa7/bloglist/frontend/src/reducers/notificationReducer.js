const initialState = {
  message:'',
  category:'info',
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type){
  case 'SET':
    return {
      message: action.message,
      category:action.category,
    }
  case 'REMOVE':
    return {
      message:action.message,
      category:action.category,
    }
  default: return state
  }
}

export const setNotification = (content, category, time) => {
  let timeoutID
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch({
      type: 'SET',
      category,
      message: content
    })
    timeoutID=setTimeout(() => {
      dispatch({
        type: 'REMOVE',
        category,
        message:''
      })
    }, time*1000)
  }
}
export default notificationReducer