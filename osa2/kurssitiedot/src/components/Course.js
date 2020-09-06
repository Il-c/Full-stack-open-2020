import React from 'react'

const Header = ({ course }) => {
    return (
        <h2>{course.name}</h2>
    )
}

const Total = ({ course }) => {
    const exNumbers = course.parts.map(part=> part.exercises)
    const sum = exNumbers.reduce((a,c)=>a+c)
    return(
        <h3>Total of  {sum} exercises </h3>
    ) 
}
  
const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>    
    )
}
  
const Content = (props) => {
    return (
        <div>
            {props.course.parts.map(part =>
            <Part key={part.id} part={part} />
            )}
        </div>
    )
}
  
const Course = (props) => {
    return (
        <div>
            <Header course={props.course}/>
            <Content course={props.course}/>
            <Total course={props.course}/>
        </div>
    )
  
}
export default Course
