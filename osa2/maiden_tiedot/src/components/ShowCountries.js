import React from 'react';
import ShowCountry from './ShowCountry'
const ShowCountries = ({countriesToShow, selectCountry, selectedCountry}) => {
    const country = countriesToShow[0]
    if (countriesToShow.length>1){
        return (
            <div>
                {countriesToShow.map(country => 
                    <div key={country.name}>
                        {country.name}  
                        <button onClick={()=>selectCountry(country.name)}>show</button>
                    </div>
                )}
            </div>
        )
    } else if (selectedCountry!==''){
        return (
            <div>
                <ShowCountry countryToShow={selectedCountry}/>
            </div>
        )
    } else if (countriesToShow.length==1) {
        return (
            <div>
                <ShowCountry countryToShow={countriesToShow[0]}/>
            </div>
        )
    }
    return <div></div>
}

export default ShowCountries