import './task.css'
import CheckboxComponent from "../CheckboxComponent/checkboxComponent";
import {TableCell, TableRow} from "../ui/table";
import {Badge} from "../ui/badge";
import {getPriorityValue, getStatusValue, getTagValue} from "../../constants/constantFunctions";
import TaskOptions from "../TaskOptions/taskOptions";




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
    } = props;

    return (
        <TableRow key={taskId} >
            <TableCell className="p-2 min-w-[100px]" colSpan={1}>
                <CheckboxComponent
                    onCheckedChange={selectTask}
                    checked={isCheckboxSelected}
                    text={taskName}
                />
            </TableCell>
            {showTitleCol && (
                <TableCell className="p-2 font-bold max-w-[500px] truncate ">
                    <Badge className="rounded-md" variant="outline">{getTagValue(taskTag).label}</Badge>
                    <span className="ml-1 font-medium">{taskTitle}</span>
                </TableCell>
            )}
            {showStatusCol && <TableCell className="p-2 px-4 min-w-[150px]">{getStatusValue(taskStatus)?.icon} {getStatusValue(taskStatus)?.label}</TableCell>}
            {showPriorityCol && <TableCell className="p-2 px-4 w-[150px]">{getPriorityValue(taskPriority)?.icon} {getPriorityValue(taskPriority)?.label}</TableCell>}
            <TaskOptions taskTag={taskTag}/>
        </TableRow>
    );
};


export default Task


