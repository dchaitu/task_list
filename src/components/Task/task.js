import './task.css'
const Task = props => {
  const {taskName, taskTitle, taskStatus, taskPriority} = props
  return (

        <tr>
          <td>{taskName}</td>
          <td>{taskTitle}</td>
          <td>{taskStatus}</td>
          <td>{taskPriority}</td>
        </tr>



  )
}

export default Task
