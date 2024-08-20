import './header.css';

import {AiOutlinePlusCircle} from "react-icons/ai";
import {Button} from "../ui/button";
import {DropdownDetails} from "../DropDownDetails/dropDownDetails";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import * as React from "react";
import {MdOutlineCancel} from "react-icons/md";


const Header = (props) => {


  const {searchText, searchPriorityText, searchStatusText} = props;

  const showPriorities = () => (
    props.currentPriorities.map((item) => <span className="bg-gray-100 m-2 p-1 rounded">{item}</span>
    ))

  const showStatuses = () => (
    props.currentStatuses.map((item) => <span className="bg-gray-100 m-2 p-1 rounded">{item}</span>))

  return (
    <div className="container heading mx-auto px-4 sm:px-8">

      <div className="flex justify-between mb-5">
        <div className="flex flex-col">
          <h1 className="header">Welcome back!</h1>
          <p className="text-muted-foreground">Here's a list of your tasks for this month!</p>
        </div>
        <div className="flex justify-end">
          <DropdownDetails text="Profile"/>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex justify-self-center">
          <input className="text-box h-10 m-1" onChange={searchText} type="text" placeholder="Filter Tasks..."/>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="button"><AiOutlinePlusCircle
                  className="inline-block"/>Status {props.currentStatuses.length > 0 && showStatuses()}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                  <input onChange={searchPriorityText} type="text" placeholder="Priority"/>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuCheckboxItem
                  onCheckedChange={props.showItemOneStatusFunc}
                >
                  {props.itemOneStatus} {props.itemOneStatusCount}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  onCheckedChange={props.showItemTwoStatusFunc}
                >
                  {props.itemTwoStatus} {props.itemTwoStatusCount}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  onCheckedChange={props.showItemThreeStatusFunc}
                >
                  {props.itemThreeStatus} {props.itemThreeStatusCount}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  onCheckedChange={props.showItemFourStatusFunc}
                >
                  {props.itemFourStatus} {props.itemFourStatusCount}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  onCheckedChange={props.showItemFiveStatusFunc}
                >
                  {props.itemFiveStatus} {props.itemFiveStatusCount}
                </DropdownMenuCheckboxItem>

              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="button"><AiOutlinePlusCircle
                  className="inline-block"/>Priority {props.currentPriorities.length > 0 && showPriorities()}</Button>

              </DropdownMenuTrigger>
              {(props.currentPriorities.length > 0 || props.currentStatuses.length > 0) &&
                <Button variant="Ghost" onClick={props.reset}>
                  Reset<MdOutlineCancel className="inline-block"/>
                </Button>}

              <DropdownMenuContent className="w-56">
                <input onChange={searchStatusText} type="text" placeholder="Priority"/>
                <DropdownMenuSeparator/>
                <DropdownMenuCheckboxItem
                  checked={props.showItemOnePriority}
                  onCheckedChange={props.showItemOnePriorityFunc}
                >
                  {props.itemOnePriority} {props.itemOnePriorityCount}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={props.showItemTwoPriority}
                  onCheckedChange={props.showItemTwoPriorityFunc}
                >
                  {props.itemTwoPriority} {props.itemTwoPriorityCount}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={props.showItemThreePriority}
                  onCheckedChange={props.showItemThreePriorityFunc}
                >
                  {props.itemThreePriority} {props.itemThreePriorityCount}
                </DropdownMenuCheckboxItem>

              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>
        <div className="justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{props.iconFilter} {props.text}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuCheckboxItem
                checked={props.showItemOneStatus}
                onCheckedChange={props.setItemOneStatusFunc}
              >
                {props.itemOne}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={props.showItemTwoStatus}
                onCheckedChange={props.setItemTwoStatusFunc}
              >
                {props.itemTwo}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={props.showItemThreeStatus}
                onCheckedChange={props.setItemThreeStatusFunc}
              >
                {props.itemThree}
              </DropdownMenuCheckboxItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

    </div>
  )
}

export default Header
