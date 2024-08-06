import './App.css';
import Task from "./components/Task/task";


const App = () => {
  const tasks = [
    {
    "name":"Task 1",
      "title":"Task One",
      "status": "In Progress",
      "priority": "Medium",
  },
    {
    "name":"Task 2",
      "title":"Task Two",
      "status": "Yet to Start",
      "priority": "High",
  },
  ]

  const getTasks = () => tasks.map(task => (
          <Task taskName={task["name"]} taskTitle={task["title"]} taskStatus={task["status"]} taskPriority={task["priority"]}/>
        ))

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-8">
      <div className="min-w-full shadow rounded-lg overflow-hidden">
      <table className="min-w-full leading-normal">
        <thead>
        <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <input type="checkbox" className="form-checkbox"/>
            </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Task</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority</th>
        </tr>
        </thead>
          <tbody>
          {getTasks()}
          </tbody>
      </table>
      </div>
      </div>
    </div>
);
}

export default App;
