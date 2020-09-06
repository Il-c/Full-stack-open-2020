import React, { useState } from 'react'
import Filter from './components/Filter'
import AddPersonForm from './components/AddPersonForm'
import ShowPersons from './components/ShowPersons'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '34566773' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    
    if(persons.map(person => person.name).includes(newName)){
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = persons.filter(person => (person.name.toLowerCase()).includes(newFilter.toLowerCase()))


  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) =>{
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={'filter shown with:'} value = {newFilter} onChange={handleFilterChange}/> 
      <h2>Add a new</h2>
      <AddPersonForm onSubmit = {addPerson} 
        valueName = {newName} onChangeName={handleNameChange}
        valueNumber = {newNumber} onChangeNumber = {handleNumberChange}
      />
      <h2>Numbers</h2>
      <ShowPersons personsToShow = {personsToShow}/>
    </div>
  )

}

export default App