import './task.css'
const Task = props => {
  const {taskName, taskTitle, taskStatus, taskPriority,selectTask, isIssueSelected} = props
    const styleName = isIssueSelected ? 'line-through' : '';

    return (

      <tr className={styleName}>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <input type="checkbox" className="form-checkbox" onClick={selectTask}/>
          </td>
          <TableCell>{taskName}</TableCell>
          <TableCell>{taskTitle}</TableCell>
          <TableCell>{taskStatus}</TableCell>
          <TableCell>{taskPriority}</TableCell>
      </tr>


  )
}

export default Task

const TableCell = (props) => (
    <th className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{props.children}</th>
)
