import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import Filter from './components/Filter'
import ShowCountries from './components/ShowCountries'
import './App.css';
import dataFetcher from './services/dataFetcher'
import ShowCountry from './components/ShowCountry'

function App() {
  const [ countries, setCountries] = useState([])
  const [ newFilter, setNewFilter ] = useState('')
  const [ country, setCountry ] = useState('')

  useEffect(() => {
    console.log('effect')
    dataFetcher
      .getAll()
      .then(countries => {
        console.log('promise fulfilled')
        setCountries(countries)
      })
  }, [])
  
  const selectCountry = (name) => {
    setCountry(countries.find(country => country.name === name ))
    setNewFilter('')
  }

  const countriesToShow = (countries) => {
    let result = countries.filter(country => (country.name.toLowerCase()).includes(newFilter.toLowerCase()))
    if (result.length <=10){
      return result  
    }
    return []
  }
  const handleFilterChange = (event) =>{
    setNewFilter(event.target.value)
    setCountry('')
  }
  const handleButtonClick = (event) =>{
    setCountry(event.target.value)
  }

  return (
    <div>
      <Filter text={'find countries'} value = {newFilter} onChange={handleFilterChange}/> 
      <ShowCountries countriesToShow = {countriesToShow(countries)}  
         selectCountry={(name)=>selectCountry(name)} selectedCountry={country}/>
    </div>
  );
}

export default App;
