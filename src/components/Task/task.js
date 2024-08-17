import './task.css'
const Task = props => {
  const {taskTag, taskName, taskTitle, taskStatus, taskPriority,selectTask, isIssueSelected, showTitleCol, showStatusCol,showPriorityCol, selectValue} = props
    const styleName = isIssueSelected ? 'line-through' : '';

    return (

      <tr className={styleName}>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <input type="checkbox" className="form-checkbox" value={selectValue} onClick={selectTask}/>
          </td>
          <TableCell>{taskName}</TableCell>
          {showTitleCol&&<TableCell> <span className="tag">{taskTag}</span> {taskTitle}</TableCell>}
          {showStatusCol&&<TableCell>{taskStatus}</TableCell>}
          {showPriorityCol&&<TableCell>{taskPriority}</TableCell>}
      </tr>


  )
}

export default Task

const TableCell = (props) => (
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{props.children}</td>
)
