import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  
  useEffect(()=>{
    const baseUrl = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
    const getCountry = async () => {
      try{
        const country = await axios.get(baseUrl)
        setCountry(country)
      }catch (err){
        console.log('Not found');
      }
    } 
    getCountry()
  },[name])
  return country
}

const Country = ({ country }) => {
  
  if (!country) {
    return null
  }
  console.log(country);
  /*if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }*/

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data[0].capital} </div>
      <div>population {country.data[0].population}</div> 
      <img src={country.data[0].flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App