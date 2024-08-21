"use client";

import * as React from "react";
import {Button} from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {CaretSortIcon} from "@radix-ui/react-icons"

export function DropdownMenuColumn(props) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">{props.text} <CaretSortIcon/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">

        <DropdownMenuCheckboxItem
          onCheckedChange={props.setItemOneStatusFunc}
        >
          {props.itemOne}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          onCheckedChange={props.setItemTwoStatusFunc}
        >
          {props.itemTwo}
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator/>

        <DropdownMenuCheckboxItem
          onCheckedChange={props.setItemThreeStatusFunc}
        >
          {props.itemThree}
        </DropdownMenuCheckboxItem>


      </DropdownMenuContent>
    </DropdownMenu>
  );
}

