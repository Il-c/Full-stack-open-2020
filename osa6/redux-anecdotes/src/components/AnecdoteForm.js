import React from 'react'
import { createNewA } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'



const AnecdoteForm = (props) => {

  const createNew = (event) => {
    event.preventDefault()
    const content = event.target.newA.value
    event.target.newA.value = ''
    console.log('Add new', content )
    props.createNewA(content)
    props.setNotification(`you created anecdote: '${content}'`, 4)
  }
  return(
    <>
    <h2>create new</h2>
      <form onSubmit={createNew}>
        <div><input name="newA" /></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}
const mapDispatchToProps = {
  createNewA,
  setNotification
}
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
