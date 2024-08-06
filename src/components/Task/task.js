import './task.css'
const Task = props => {
  const {taskName, taskTitle, taskStatus, taskPriority} = props
  return (

      <tr>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <input type="checkbox" className="form-checkbox"/>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{taskName}</td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{taskTitle}</td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{taskStatus}</td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{taskPriority}</td>
      </tr>


  )
}

export default Task
