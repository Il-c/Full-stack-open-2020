import React from 'react';

const Filter = (props) =>(
    <div> 
        {props.text} <input value ={props.value} onChange={props.onChange}/>
    </div>
)
export default Filter