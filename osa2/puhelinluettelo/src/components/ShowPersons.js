import React from 'react';
//{props.name} {props.number} 
const ShowPersons = ({personsToShow,removePerson}) => (
    <div>
        {personsToShow.map(person => 
            <div key={person.id}>
                {person.name} {person.number} 
                <button onClick={()=>removePerson(person.id)}>{"poista"}</button>
            </div>
            
    )}
    </div>
)


/*const ShowPersons = (props) => (
    <div>
        {props.person.name} {props.person.number}
        <button onClick={props.removePerson}>{"poista"}</button>
    </div>  
)*/
export default ShowPersons