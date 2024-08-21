import './task.css'
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  DotsHorizontalIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import {Button} from "../ui/button";
import CheckboxComponent from "../CheckboxComponent/checkboxComponent";
import {TableCell, TableRow} from "../ui/table";


const iconSize = 20
// Status to icon mapping
const statusIconMap = {
  "Completed": <CheckCircledIcon className="inline-block " size={iconSize}/>,
  "In Progress": <StopwatchIcon className="inline-block" size={iconSize}/>,
  "Backlog": <QuestionMarkCircledIcon className="inline-block" size={iconSize}/>,
  "Todo": <CircleIcon className="inline-block" size={iconSize}/>,
  "Cancelled": <CrossCircledIcon className="inline-block" size={iconSize}/>
};

// Priority to icon mapping
const priorityIconMap = {
  "High": <ArrowUpIcon className="inline-block" size={iconSize}/>,
  "Medium": <ArrowRightIcon className="inline-block" size={iconSize}/>,
  "Low": <ArrowDownIcon className="inline-block" size={iconSize}/>,
};


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
    showPriorityCol
  } = props

  return (
    <TableRow key={taskId}>
      <TableCell>
        <CheckboxComponent onCheckedChange={selectTask} checked={isCheckboxSelected} text={taskName}/>
      </TableCell>
      {showTitleCol &&
        <TableCell> <span className="text-xs font-semibold rounded-md border px-2.5 py-0.5">{taskTag}</span> {taskTitle}
        </TableCell>}
      {showStatusCol && <TableCell>{statusIconMap[taskStatus]} {taskStatus}</TableCell>}
      {showPriorityCol && <TableCell>{priorityIconMap[taskPriority]} {taskPriority}</TableCell>}
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="border-0"><DotsHorizontalIcon/></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Make a Copy</DropdownMenuItem>
            <DropdownMenuItem>Favourite</DropdownMenuItem>
            <DropdownMenuItem>Labels
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline"><ArrowRightIcon className="inline-block"/></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuRadioGroup>
                    <DropdownMenuRadioItem>Bug</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem>Feature</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem>Documentation</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>

      </TableCell>
    </TableRow>


  )
}

export default Task


