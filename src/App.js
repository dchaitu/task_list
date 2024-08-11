import './App.css';
import Task from "./components/Task/task";
import {Component} from "react";


class App extends Component {
    state = {
        selectedTaskKey: null,

    };
    tasks = [
        {
            "id": 1,
            "name": "Task 1",
            "title": "Task One",
            "status": "In Progress",
            "priority": "Medium",
        },
        {
            "id": 2,
            "name": "Task 2",
            "title": "Task Two",
            "status": "Yet to Start",
            "priority": "High",
        },
    ]
    getSelectedTask = (taskId) => {
        // console.log(this.state.isIssueSelected);
        this.setState((prevState) => ({
            selectedTaskKey: prevState.selectedTaskKey===taskId ? null: taskId,
        }));
    };


    getTasks = () => this.tasks.map(task => {
        const rowStyle = this.state.isIssueSelected ? {textDecoration: 'line-through'} : {};

        return(
        <Task styleName={rowStyle}
              key={task.name}
              taskName={task["name"]}
              taskTitle={task["title"]}
              taskStatus={task["status"]}
              taskPriority={task["priority"]}
              selectTask={() =>this.getSelectedTask(task["id"])}
              isIssueSelected={this.state.isIssueSelected}
        />)
    })

    render() {

        return (
            <div>
            <div className="container mx-auto px-4 sm:px-8">
            <div className="min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
                <thead>
                <tr>
                    <TableRow>
                        <input type="checkbox" className="form-checkbox"/>
                    </TableRow>
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


const TableRow = (props) => (
    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{props.children}</th>
)


export default App;
