import * as React from "react";
import {Button} from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {ArrowDownIcon, ArrowUpIcon, CaretSortIcon, EyeNoneIcon} from "@radix-ui/react-icons"

export function DropdownMenuColumn(props) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">{props.text} <CaretSortIcon/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-46 " align="start">

        <DropdownMenuItem
          onClick={props.setItemOneStatusFunc}
        >
          <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"/>
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={props.setItemTwoStatusFunc}
        >
          <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"/>
          Desc
        </DropdownMenuItem>
        <DropdownMenuSeparator/>

        <DropdownMenuItem
          onClick={props.setItemThreeStatusFunc}
        >
          <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"/>
          Hide
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

