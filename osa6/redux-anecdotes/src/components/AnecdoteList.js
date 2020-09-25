import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {

  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes}) => {
    if (filter.show ===''){
      return anecdotes
    }
    return anecdotes.filter(a => (a.content.toLowerCase()).includes(filter.show.toLowerCase()))
  })
 
  const vote = (id) => {
    console.log('vote', id)
    const votedAnecdote = anecdotes.find(a => a.id === id)
    dispatch(voteAnecdote(votedAnecdote))
    dispatch(setNotification(`you voted '${votedAnecdote.content}'`, 4))
  }
  return(
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList
