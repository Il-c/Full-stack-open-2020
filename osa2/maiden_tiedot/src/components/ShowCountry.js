import React from 'react';
const ShowCountry = (props) => {
            
            console.log('showcountry'+props)
            return(
            <div>
                <h1>{props.countryToShow.name}</h1>
                <p>
                    <div>capital {props.countryToShow.capital}</div>
                    <div>population {props.countryToShow.population}</div>
                </p>
                <h2>languages</h2>
                <ul>
                    {props.countryToShow.languages.map(language => 
                        <li key={language.name}>
                        {language.name}  
                        </li>
                    )}
                </ul>
                <img src ={props.countryToShow.flag} width={150} height={100}/>
            </div>)
}

//<p>{countriesToShow[0]}</p>

export default ShowCountry