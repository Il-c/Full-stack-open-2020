import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import AddPersonForm from './components/AddPersonForm'
import ShowPersons from './components/ShowPersons'
import Notification from './components/Notification'
import personService from './services/persons'
require('express-async-errors')
import './index.css'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage] = useState({content:null,type:null})


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    
    if(persons.map(person => person.name).includes(newName)){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(person=>person.name===newName)
        const changedPerson = {...person, number: newNumber}
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person=>person.name!==newName?person:returnedPerson))
            showMessage(`${newName}'s phonenumber updated!`, 'info' )
        })
      }
      return
    }
    personService
      .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          showMessage(`${newName} added!`, 'info')
        })
      .catch(error => {
        console.log(error.response.data)
        showMessage(JSON.stringify(error.response.data), 'error')
      })
    
  }

  const personsToShow = persons.filter(person => (person.name.toLowerCase()).includes(newFilter.toLowerCase()))

  const removePerson = (id) => {
    const name = persons.find(person=>person.id===id).name
    if (window.confirm(`Delete ${name} ?`)){
      console.log(`${id} is being removed`)
      personService
        .remove(id)
          .then(returnedPerson=>{
            setPersons(persons.filter(person => person.id !== id ))
            showMessage(`${name} deleted!`, 'info')
          })
        .catch(error => {
          setPersons(persons.filter(person => person.id !== id ))
          showMessage(`Information of ${name} has already been removed from server`, 'error')
        })  
    }
  }

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) =>{
    setNewFilter(event.target.value)
  }

  
  const showMessage = (content, type) =>{
    setMessage({content, type})
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter text={'filter shown with:'} value = {newFilter} onChange={handleFilterChange}/> 
      <h2>Add a new</h2>
      <AddPersonForm onSubmit = {addPerson} 
        valueName = {newName} onChangeName = {handleNameChange}
        valueNumber = {newNumber} onChangeNumber = {handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
      <ShowPersons personsToShow = {personsToShow} removePerson={(id)=>removePerson(id)}/>
    </div>
     
    </div>
  )
}
export default App
