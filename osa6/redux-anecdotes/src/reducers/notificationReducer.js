const initialState = {
  message:'Alkutila',
  show: false
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type){
    case 'SET':
      return {
        message: action.message,
        show: true
      }
    case 'REMOVE':
      return {
        message:action.message,
        show: false
      }
    default: return state
  }
}

export const setNotification = (content, time) =>{
  let timeoutID
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch({
      type: 'SET',
      message: content
    })
    timeoutID=setTimeout(() => {
      dispatch({
        type: 'REMOVE',
        message:''
      })
    }, time*1000)
  }
}
export default notificationReducer