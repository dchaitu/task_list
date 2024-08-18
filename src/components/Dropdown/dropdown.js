import React from 'react';
import './dropdown.css';
import DropdownItem from "../DropDownItem/dropdownItem";
import {PiCheckBold} from "react-icons/pi";


const Dropdown = (props) => {
  return (
    <div className="flex flex-col dropdown">
      <ul className='flex flex-col gap-4'>
        <li>{props.showFieldOne &&<PiCheckBold className="inline-block"/>}
          <DropdownItem text={props.fieldOne} showCol={props.fieldOneFunc}/></li>
        <li>{props.showFieldTwo && <PiCheckBold className="inline-block"/>}
          <DropdownItem text={props.fieldTwo} showCol={props.fieldTwoFunc}/></li>
        <li>{props.showFieldThree && <PiCheckBold className="inline-block"/>}
          <DropdownItem text={props.fieldThree} showCol={props.fieldThreeFunc}/></li>
      </ul>
    </div>
  )
}

export default Dropdown;
