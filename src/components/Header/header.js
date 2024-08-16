import './header.css';

import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoFilterOutline } from "react-icons/io5";



const Header = (props) => {

  const {searchText, viewFilter} = props;

  return(<div className="container mx-auto px-4 sm:px-8">
    <h1 className="header">Welcome back!</h1>
    <p>Here's a list of your tasks for this month!</p>
    <input className="text-box" onChange={searchText} type="text"/>
    <button className="button" type='button'><AiOutlinePlusCircle className="inline-block"/>Status</button>
    <button className="button" type='button'><AiOutlinePlusCircle className="inline-block"/>Priority</button>
    <div className="float-right">
    <button className="drop-button" type='button' onClick={viewFilter}><IoFilterOutline className="inline-block"/>View</button>
      {props.children}
    </div>

  </div>)
}

export default Header
