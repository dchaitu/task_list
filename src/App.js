import './App.css';
import Task from "./components/Task/task";
import {Component} from "react";
import Header from "./components/Header/header";
import Dropdown from "./components/Dropdown/dropdown";

const tasks = [
      {
        "id":"1",
        "name": "Task 1",
        "title": "Task One",
        "status": "In Progress",
        "priority": "Medium",
        "tag": "Documentation"
      },
      {
        "id":"2",
        "name": "Task 2",
        "title": "Task Two",
        "status": "Yet To Start",
        "priority": "High",
        "tag": "Feature"
      },
      {
        "id":"3",
        "name": "Task 3",
        "title": "Task Three",
        "status": "Completed",
        "priority": "High",
        "tag": "Bug"
      },
    ]
class App extends Component {

  state = {
    isIssueSelected:null,
    searchInput: '',
    currentTasks: tasks,
    isViewOpen:false
  }



  getSelectedTask = (taskId) => {
    this.setState((prevState) => ({
      isIssueSelected: prevState.isIssueSelected === taskId ? null : taskId ,
    }));
  };


  getFilteredTasks = (titleName) =>  {
    this.setState(
      {currentTasks: tasks.filter((task)=> task["title"].includes(titleName))})
      console.log("currentTasks:-",this.state.currentTasks);

    }



  showDropDownMenu = () =>{
    this.setState((prevState) => ({isViewOpen : !prevState.isViewOpen}))
    console.log("isViewOpen:-", this.state.isViewOpen);
  }

  getTasks = () => this.state.currentTasks.map(task => {
    const isIssueSelected = this.state.isIssueSelected === task["id"];
    console.log(this.state.currentTasks);
    console.log("isIssueSelected ", isIssueSelected, task["id"]);
    return(
    <Task taskTag={task["tag"]} taskId={task["id"]} taskName={task["name"]} taskTitle={task["title"]} taskStatus={task["status"]}
          taskPriority={task["priority"]} selectTask={() => this.getSelectedTask(task["id"])}
          isIssueSelected={isIssueSelected}
    />
  )})
  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
    this.getFilteredTasks(this.state.searchInput);
    //   console.log(this.state.searchInput);
  }


  render() {
    return (
      <div>
        <Header searchText={this.onChangeSearchInput} viewFilter={this.showDropDownMenu}/>
        {this.state.isViewOpen && <Dropdown fieldOne="Title" fieldTwo="Status" fieldThree="Priority"/>}
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
