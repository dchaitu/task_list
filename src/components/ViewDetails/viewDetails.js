import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import {Button} from "../ui/button";
import * as React from "react";


const ViewDetails = (props) => {
  return (
    <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto hidden h-8 lg:flex">{props.iconFilter} {props.text}</Button>
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
  )
}

export default ViewDetails;
