import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem,
    DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";
import {Button} from "../ui/button";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";
import {TableCell} from "../ui/table";
import {labels} from "../../constants/constants";
import {getTagValue} from "../../constants/constantFunctions";


const TaskOptions = (props) => {
    return (
        <TableCell className="p-2 w-[50px]">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="border-0 h-8 w-8 p-0 ">
                        <DotsHorizontalIcon className="h-4 w-4"/>
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Make a Copy</DropdownMenuItem>
                    <DropdownMenuItem>Favorite</DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="w-[150px]">
                            <DropdownMenuRadioGroup value={getTagValue(props.taskTag).value}>
                                {labels.map(label => (
                                    <DropdownMenuRadioItem key={label.value} value={label.value}>
                                        {label.label}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>
                        Delete
                        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </TableCell>


    )
}

export default TaskOptions
