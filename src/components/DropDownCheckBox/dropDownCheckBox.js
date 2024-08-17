"use client";

import * as React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function DropdownMenuCheckboxes(props) {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{props.children} {props.text}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/*<DropdownMenuLabel>Appearance</DropdownMenuLabel>*/}
        <DropdownMenuSeparator />
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
  );
}

