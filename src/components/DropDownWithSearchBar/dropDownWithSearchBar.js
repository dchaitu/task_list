import * as React from "react"

import {Button} from "../ui/button"
import {Checkbox} from "../ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"


const DropDownWithSearchBar = (props) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          size="sm"
          className="flex flex-row justify-between mr-2 mt-1"
        >
          <span className="mr-2">{props.icon}</span>
          <span>{props.propertyName}</span> <span>{props.option}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px]">
        <Command>
          <CommandInput placeholder={props.placeholder} className="h-9"/>
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {props.allOptions.map((framework) => (
                <div>
                  <CommandItem className="flex flex-row justify-between"
                               key={framework.value}
                               value={framework.value}
                               onSelect={() => props.selectedOption(framework.value)}
                  >
                    <div className="flex flex-row justify-around">
                      <Checkbox
                        className="mr-1 h-4 w-4 opacity-100"
                        checked={props.currentPriorities.includes(framework.value)}/>
                      <span className="mt-0.5 mr-1">{framework.icon}</span>
                      <span>{framework.label}</span>
                    </div>

                    <div>
                      <span className="flex flex-row self-end">{props.countFunc(framework.value)}</span>
                    </div>
                  </CommandItem>
                </div>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}


export default DropDownWithSearchBar
