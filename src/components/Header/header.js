import './header.css';

import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoFilterOutline } from "react-icons/io5";
import {Button} from "../ui/button";
import {DropdownDetails} from "../DropDownDetails/dropDownDetails";
import {DropdownMenuCheckboxes} from "../DropDownCheckBox/dropDownCheckBox";



const Header = (props) => {

  const {searchText, viewFilter} = props;

  return(
    <div className="container heading mx-auto px-4 sm:px-8">

      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="header">Welcome back!</h1>
          <p>Here's a list of your tasks for this month!</p>
        </div>
        <div className="flex justify-end">
          <DropdownDetails text="Profile"/>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex justify-normal">
          <input className="text-box" onChange={searchText} type="text"/>
          <div>
            <Button variant="secondary" className="button"><AiOutlinePlusCircle
              className="inline-block"/>Status</Button>
            {props.children}
          </div>
          <div>
            <Button variant="secondary" className="button"><AiOutlinePlusCircle
              className="inline-block"/>Priority</Button>

          </div>

        </div>
        <div className="justify-end">
          <Button variant="secondary" onClick={viewFilter}><IoFilterOutline className="inline-block"/>View
          </Button>
          {props.children}
        </div>
      </div>

    </div>
  )
}

export default Header
