import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const DisplayAnecdote = (props) =>(
  <div>{props.anecdotes[props.selected]}</div>
)
const DisplayVotes = (props) => (
  <div>has {props.votes[props.selected]} votes</div>
)
const DisplayHeader = (props) => (
<h1>{props.text}</h1>
)

const GetRandomIndex = () => Math.floor((5)*Math.random())
  
const App = (props) => {
  
  const [selected, setSelected] = useState(GetRandomIndex)
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0))

  const handleNextClick = () => {
    setSelected(GetRandomIndex)
  }
  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  return (
    <div>
      <DisplayHeader text = {"Anecdote of the day"} />
      <DisplayAnecdote anecdotes = {props.anecdotes} selected={selected}/>
      <DisplayVotes votes = {votes} selected={selected}/>
      <Button onClick = {handleVoteClick} text="vote"/>
      <Button onClick = {handleNextClick} text="next anecdote"/>
      <DisplayHeader text = {"Anecdote with most votes"}/>
      <DisplayAnecdote anecdotes = {props.anecdotes} selected={votes.indexOf(Math.max(...votes))}/>
      <DisplayVotes votes = {votes} selected={votes.indexOf(Math.max(...votes))}/>
    </div>
  )
}
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)