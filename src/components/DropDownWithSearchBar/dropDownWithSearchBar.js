import * as React from "react"

import {Button} from "../ui/button"
import {Checkbox} from "../ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList, CommandSeparator,
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
          className="flex flex-row justify-between h-8 mr-2 border-dashed"
        >{props.icon}
          <span>{props.propertyName}</span> {props.option}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={props.placeholder} className="h-9"/>
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {props.allOptions.map((option) => (
                <div key={option.value}>
                  <CommandItem className="flex flex-row justify-between"
                               key={option.value}
                               value={option.value}
                               onSelect={() => props.selectedOption(option.value)}
                  >
                    <div className="flex flex-row justify-around">
                      <Checkbox
                        className="mr-1 h-4 w-4 opacity-100"
                        checked={props.currentProperties.includes(option.value)}/>
                      <span className="mb-1 mr-1">{option.icon}</span>
                      <span>{option.label}</span>
                    </div>

                    <div>
                      <span className="flex flex-row self-end">{props.countFunc(option.value)}</span>
                    </div>
                  </CommandItem>
                </div>
              ))}
              {props.currentProperties.length>0 && (
                  <>
                <CommandSeparator/>
                <CommandItem className="flex flex-row justify-center"
                onSelect={props.clearFilter}>
              Clear Filters
            </CommandItem>
              </>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}


export default DropDownWithSearchBar
