import React from 'react';
import './dropdownItem.css'

const DropdownItem = (props) => {
    return (<button className="dropdown-item flex-col content-center" type='button' onClick={props.showCol}>{props.text}</button>)
}

export default DropdownItem;