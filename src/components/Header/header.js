import './header.css';

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
import DropDownWithSearchBar from "../DropDownWithSearchBar/dropDownWithSearchBar";
import {Cross2Icon, PlusCircledIcon} from "@radix-ui/react-icons";
import {allPriorities, allStatuses} from "../../constants/constants";
import {Separator} from "../ui/separator";
import {Input} from "../ui/input";
import {Badge} from "../ui/badge";




const Header = (props) => {


  const {searchText} = props;

  const showPriorities = () => {
      console.log("showPriorities ", props.currentPriorities);
      return (
          props.currentPriorities.map((item) => <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal lg:hidden"
              >{item}</Badge>
          ))
  }

  const showStatuses = () => {
      console.log("showStatuses in func ", props.currentStatuses);
      return (
          props.currentStatuses.map((item) => <span className="bg-gray-100 m-2 p-1 rounded">{item}</span>))
  }
  return (
    <div className="container heading mx-auto px-4 sm:px-8 ">

      <div className="flex justify-between mb-5">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">Here's a list of your tasks for this month!</p>
        </div>
        <div className="flex justify-end">
          <DropdownDetails text="Profile"/>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex justify-self-center">
          <Input className="text-box h-8 m-2 w-[150px] lg:w-[250px]" onChange={searchText} type="text"
                 placeholder="Filter Tasks..."/>
          <div className="flex flex-row m-1">
              <DropDownWithSearchBar
                  key="status"
                  selectedOption={props.selectedStatusOption}
                  allOptions={allStatuses}
                  propertyName="Status"
                  placeholder="Status"
                  countFunc={props.countStatusFunc}
                  currentProperties={props.currentStatuses}
                  option={props.currentStatuses?.length > 0 && (
                      <>
                          <Separator orientation="vertical" className="mx-2 h-4"/>
                          {showStatuses()}
                      </>
                  )}
                  icon={<PlusCircledIcon className="h-4 w-4" />}
                  clearFilter={props.clearStatusFilter}
              />

              <DropDownWithSearchBar
                  key="priority"
                  selectedOption={props.selectedOption}
                  allOptions={allPriorities}
                  propertyName="Priority"
                  placeholder="Priority"
                  countFunc={props.countPriorityFunc}
                  currentProperties={props.currentPriorities}
                  option={props.currentPriorities?.length > 0 && (
                      <>
                          <Separator orientation="vertical" className="mx-2 h-4" />
                          {showPriorities()}
                      </>
                  )}
                  icon={<PlusCircledIcon className="h-4 w-4" />}
                  clearFilter={props.clearPriorityFilter}
              />

          </div>
          <div>

            {(props.currentPriorities.length > 0 || props.currentStatuses.length > 0) &&
              <Button variant="ghost" onClick={props.reset}>
                Reset<Cross2Icon className="ml-2 h-4 w-4"/>
              </Button>}

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
