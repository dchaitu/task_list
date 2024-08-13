import './App.css';
import Task from "./components/Task/task";
import {Component} from "react";
import Header from "./components/Header/header";


class App extends Component {

  state = {
    isIssueSelected:''
  }
  taskStatus = {"YET_TO_START": "Yet To Start",}
  tableStyle = "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
  tasks = [
      {
        "id":"1",
        "name": "Task 1",
        "title": "Task One",
        "status": "In Progress",
        "priority": "Medium",
      },
      {
        "id":"2",
        "name": "Task 2",
        "title": "Task Two",
        "status": "Yet To Start",
        "priority": "High",
      },
    ]

  rowStyle = { textDecoration: 'line-through' };

  getSelectedTask = () => {
    console.log("Clicked")
    this.setState((prevState) => ({
      isIssueSelected: !prevState.isIssueSelected,
    }));
  };

  // selectedTask = (id) => {
  //     for( task in this.tasks)
  //     {
  //       if( id === task["id"])
  //         return
  //       (<tr className={this.rowStyle}>
  //           <Task taskName={task["name"]} taskTitle={task["title"]} taskStatus={task["status"]}
  //                 taskPriority={task["priority"]}/>
  //         </tr>
  //       )
  //     }
  // }



  getTasks = () => this.tasks.map(task => (
    <Task taskId={task["id"]} taskName={task["name"]} taskTitle={task["title"]} taskStatus={task["status"]}
          taskPriority={task["priority"]} selectTask={this.getSelectedTask}/>
  ))


  render() {
    return (
      <div>
        <Header/>
        <div className="container mx-auto px-4 sm:px-8">
          <div className="min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
              <tr>
                <TableRow><input type="checkbox" className="form-checkbox"/></TableRow>
                <TableRow>Task</TableRow>
                <TableRow>Title</TableRow>
                <TableRow>Status</TableRow>
                <TableRow>Priority</TableRow>
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

const TableRow = (props) => (
    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{props.children}</th>
)
