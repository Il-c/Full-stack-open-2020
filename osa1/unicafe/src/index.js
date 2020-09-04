import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)
const Header = ({text}) => <h1>{text}</h1>

const Statistics = ({good,bad,neutral}) => {
  if ((good+bad+neutral)===0){
    return (
      <tbody>
        <tr>
          <td>No feedback given</td>
        </tr>
      </tbody>)
  }
  return(
    <tbody>
      <StatisticLine text="good" value={good}/> 
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={good+bad+neutral}  /> 
      <StatisticLine text="average" value={((good*1+bad*(-1))/(good+bad+neutral)).toFixed(1)}/> 
      <StatisticLine text="positive" value= {((good/(good+bad+neutral))*100).toFixed(1)} unit="%" /> 
    </tbody>
  )
}

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
    <td>{props.unit}</td>
  </tr>  
)

const App = () => {
  // tallentaa napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }
  
  return (
    <div>
      <Header text='give feedback'/>
      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>
      <Header text='statistics'/>
      <table>
        <Statistics good={good} bad={bad} neutral={neutral}/>
      </table>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
