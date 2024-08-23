import './task.css'
import {
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub, DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";
import {Button} from "../ui/button";
import CheckboxComponent from "../CheckboxComponent/checkboxComponent";
import {TableCell, TableRow} from "../ui/table";
import {Badge} from "../ui/badge";
import {allPriorities, allStatuses, labels} from "../../constants/constants";


const getStatusValue = (statusVal) => allStatuses.find(status => status.value === statusVal)



const getPriorityValue = (priorityVal) => allPriorities.find(priority=> priority.value ===priorityVal)


const getTagValue = (tagName) => {
    const tag = labels.find((label) => label.value === tagName)
    if (tag === undefined)
        return ""
    return tag.label
}

const Task = props => {
    const {
        taskId,
        taskTag,
        taskName,
        taskTitle,
        taskStatus,
        taskPriority,
        selectTask,
        isCheckboxSelected,
        showTitleCol,
        showStatusCol,
        showPriorityCol,
        labels
    } = props;

    return (
        <TableRow key={taskId} >
            <TableCell className="p-2 w-[150px]">
                <CheckboxComponent
                    onCheckedChange={selectTask}
                    checked={isCheckboxSelected}
                    text={taskName}
                />
            </TableCell>
            {showTitleCol && (
                <TableCell className="p-2 font-bold max-w-[400px] truncate ">
                    <Badge className="rounded-md" variant="outline">{getTagValue(taskTag)}</Badge>
                    <span className="ml-1 font-medium">{taskTitle}</span>
                </TableCell>
            )}
            {showStatusCol && <TableCell className="p-2 px-4">{getStatusValue(taskStatus)?.icon} {getStatusValue(taskStatus)?.label}</TableCell>}
            {showPriorityCol && <TableCell className="p-2 px-4">{getPriorityValue(taskPriority)?.icon} {getPriorityValue(taskPriority)?.label}</TableCell>}
            <TableCell className="p-2">
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
                                <DropdownMenuRadioGroup value={getTagValue(taskTag)}>
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
        </TableRow>
    );
};


export default Task


