import React from 'react';
import './dropdown.css';

const Dropdown = (props) => {
  return (
    <div className="flex flex-col dropdown">
      <ul className='flex flex-col gap-4'>
        <li>{props.fieldOne}</li>
        <li>{props.fieldTwo}</li>
        <li>{props.fieldThree}</li>
      </ul>
    </div>
  )
}

export default Dropdown;
