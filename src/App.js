import './App.css';
import Task from "./components/Task/task";
import { Card, Typography } from "@material-tailwind/react";

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
      // console.log(task)
        <tr>
          <Task taskName={task["name"]} taskTitle={task["title"]} taskStatus={task["status"]} taskPriority={task["priority"]}/>
        </tr>))

  return (
    <div>
      {/*<Task taskName="Task 1" taskTitle="Task One" taskStatus="In Progress" taskPriority="Very High"/>*/}
      {/*<Task taskName="Task 2" taskTitle="Task Two" taskStatus="Not Started" taskPriority="Low"/>*/}
      <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
        <tr>
          <th>Task</th>
          <th>Title</th>
          <th>Status</th>
          <th>Priority</th>
        </tr>
        </thead>
        <tbody>
        {getTasks()}
        </tbody>
      </table>
      </Card>


    </div>
);
}

export default App;
