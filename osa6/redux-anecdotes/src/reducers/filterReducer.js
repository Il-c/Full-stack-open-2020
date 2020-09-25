const initialState = {
  show:''
}
const filterReducer = (state = initialState, action) => {
  switch(action.type){
    case 'FILTER':
      return {
        show: action.show
      }
    default: return state
  }
}

export const setFilter = (filter) =>{
  return {
      type: 'FILTER',
      show: filter
  }
}

export default filterReducer