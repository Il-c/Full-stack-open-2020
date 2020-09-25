import aService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
 // 'Adding manpower to a late software project makes it later!',
 // 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
 // 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
 // 'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = (anecdotesAtStart.map(asObject)).sort((a,b) => (a.votes<b.votes)?1:(b.votes<a.likes)? -1:0)

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type){
    case 'VOTE':
      const id = action.data.id
      const result = state.map(a => 
        a.id !== id ? a : action.data
      )
      return result.sort((a,b) => (a.votes<b.votes)? 1:-1)
    case 'NEW':
      return state.concat(action.data)
    case 'INITIALIZE':
      return action.data.sort((a,b) => (a.votes<b.votes)? 1:-1)
    default: return state
  }
}
export const voteAnecdote = (object) => {
  return async dispatch => {
    object.votes += 1
    const newA = await aService.update(object)
    dispatch({
      type: 'VOTE',
      data: newA.data
    })
  }
}
export const createNewA = (content) => {
  return async dispatch => {
    const newA = await aService.post(content)
    dispatch({
      type: 'NEW',
      data: newA.data
    })
  }
}
export const initializeAs = () => {
  return async dispatch => {
    const as = await aService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: as
    })
  }
}



export default anecdoteReducer