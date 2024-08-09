import './App.css';
import Task from "./components/Task/task";
import {Component} from "react";


class App extends Component {

  state = {
    isIssueSelected:''
  }
  taskStatus = {"YET_TO_START": "Yet To Start",}
  tableStyle = "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
  tasks = [
      {
        "name": "Task 1",
        "title": "Task One",
        "status": "In Progress",
        "priority": "Medium",
      },
      {
        "name": "Task 2",
        "title": "Task Two",
        "status": "Yet To Start",
        "priority": "High",
      },
    ]



    getTasks = () => this.tasks.map(task => (
      <Task taskName={task["name"]} taskTitle={task["title"]} taskStatus={task["status"]}
            taskPriority={task["priority"]}/>
    ))

  render() {


    return (
      <div>
        <div className="container mx-auto px-4 sm:px-8">
          <div className="min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
              <tr>
                <th
                  className={this.tableStyle}>
                  <input type="checkbox" className="form-checkbox" onClick= {this.getSelectedTask}/>
                </th>
                <th
                  className={this.tableStyle}>Task
                </th>
                <th
                  className={this.tableStyle}>Title
                </th>
                <th
                  className={this.tableStyle}>Status
                </th>
                <th
                  className={this.tableStyle}>Priority
                </th>
              </tr>
              </thead>
              <tbody>
              {this.getTasks()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
