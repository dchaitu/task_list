import './task.css'
import {TableCell} from "../constants/constants";
import {
  MdOutlineTimer,
  MdHelpOutline,
  MdOutlineRadioButtonUnchecked,
  MdDone,
  MdArrowRightAlt,
  MdArrowDownward,
  MdArrowUpward, MdOutlineKeyboardArrowRight, MdOutlineCancel
} from 'react-icons/md';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import {Button} from "../ui/button";

const iconSize = 20
// Status to icon mapping
const statusIconMap = {
  "Completed": <MdDone className="inline-block" size={iconSize} />,
  "In Progress": <MdOutlineTimer className="inline-block" size={iconSize}/>,
  "Backlog": <MdHelpOutline className="inline-block" size={iconSize}/>,
  "Todo": <MdOutlineRadioButtonUnchecked className="inline-block" size={iconSize}/>,
  "Cancelled": <MdOutlineCancel className="inline-block" size={iconSize}/>
};

// Priority to icon mapping
const priorityIconMap = {
  "High": <MdArrowUpward className="inline-block" size={iconSize}/>,
  "Medium": <MdArrowRightAlt className="inline-block" size={iconSize}/>,
  "Low": <MdArrowDownward className="inline-block" size={iconSize}/>,
};



const Task = props => {
  const {taskTag, taskName, taskTitle, taskStatus, taskPriority,selectTask, isCheckboxSelected, showTitleCol, showStatusCol,showPriorityCol} = props

    return (
      <tr>
        <TableCell>
          <input type="checkbox" className="form-checkbox" onChange={selectTask} checked={isCheckboxSelected}/>
        </TableCell>
        <TableCell>{taskName}</TableCell>
        {showTitleCol && <TableCell> <span className="tag">{taskTag}</span> {taskTitle}</TableCell>}
        {showStatusCol && <TableCell>{statusIconMap[taskStatus]} {taskStatus}</TableCell>}
        {showPriorityCol && <TableCell>{priorityIconMap[taskPriority]} {taskPriority}</TableCell>}
        <TableCell>
        <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-0">...</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Make a Copy</DropdownMenuItem>
                  <DropdownMenuItem>Favourite</DropdownMenuItem>
                  <DropdownMenuItem>Labels
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline"><MdOutlineKeyboardArrowRight className="inline-block"/></Button>
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
      </tr>


    )
}

export default Task


