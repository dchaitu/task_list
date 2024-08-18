import './App.css';
import Task from "./components/Task/task";
import {Component} from "react";
import Header from "./components/Header/header";
import { RiExpandUpDownLine } from "react-icons/ri";
import {FaArrowUp} from "react-icons/fa6";
import tasks, {TableRow} from './components/constants/constants'
import {DropdownMenuCheckboxes} from "./components/DropDownCheckBox/dropDownCheckBox";
import {IoFilterOutline} from "react-icons/io5";
import {Button} from "./components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "./components/ui/dropdown-menu";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight
} from "react-icons/md";

class App extends Component {

  state = {
    isIssueSelected:null,
    searchInput: '',
    currentTasks: tasks,
    isViewOpen:false,
    showTitleCol:true,
    showStatusCol:true,
    showPriorityCol:true,
    isProfileClicked:false,
    currentPage: 1,
    recordsPerPage: 5,
    selectedTasks: [],
    isAllSelected: false,
  }


  getFilteredTasks = (titleName) =>  {
    this.setState(
      {currentTasks: tasks.filter((task)=> task["title"].includes(titleName))})
      console.log("currentTasks:-",this.state.currentTasks);

    }

  sortTasksByField = (tasks,field) => {
      console.log(tasks, field);
      tasks.sort((a, b) =>
      {
        if (a[field] < b[field]) {
          return -1;
        }
        if (a[field] > b[field]) {
          return 1;
        }
        return 0;
      });
      console.log(tasks);
      this.setState({currentTasks:tasks})

    }

  showTitleColFunc = () =>{
    this.setState((prevState) => ({showTitleCol : !prevState.showTitleCol}))

  }

  showStatusColFunc = () =>{
    this.setState((prevState) => ({showStatusCol : !prevState.showStatusCol}))

  }

  showPriorityColFunc = () =>{
    this.setState((prevState) => ({showPriorityCol : !prevState.showPriorityCol}))

  }

  paginate = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  }

  nextPage = () => {
    console.log(this.state.currentPage);
    this.setState((prevState) => ({currentPage: prevState.currentPage + 1}))
  }

  prevPage = () => {
    if (this.state.currentPage !== 1) {
      this.setState((prevState) => ({currentPage: prevState.currentPage - 1}))
    }
  }


  updateNoOfRows = (value) => {
  this.setState({recordsPerPage: value}, this.getTasks); // Ensure tasks are updated after change
}




  renderPagination() {
    const { currentPage, recordsPerPage, currentTasks, selectedTasks } = this.state;
    const totalPages = Math.ceil(currentTasks.length / recordsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
          <div className="flex flex-row justify-between mr-1 ml-1">
            <div className="ml-2 p-2">{selectedTasks.length} of {tasks.length} selected.</div>

            <div className="flex flex-row justify-around p-2">
              <div className="ml-2">Rows per page
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{recordsPerPage}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                  <DropdownMenuItem onClick={() => this.updateNoOfRows(5)} value="5">5</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => this.updateNoOfRows(10)} value="10">10</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => this.updateNoOfRows(15)} value="15">15</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

              </div>
              <div className="flex flex-row mr-2 ml-3">
                <Button variant="secondary" onClick={this.nextPage}><MdKeyboardDoubleArrowLeft/></Button>

              <Button variant="secondary" onClick={this.prevPage}><MdKeyboardArrowLeft/></Button>
              <ul className="pagination flex justify-self-center">
                {pageNumbers.map(number => (
                  <li key={number} className={`page-item m-2 ${currentPage === number ? 'active' : ''}`}>
                    <button onClick={() => this.paginate(number)}>
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
              <Button variant="secondary" onClick={this.nextPage}><MdKeyboardArrowRight/></Button>
                <Button variant="secondary" onClick={this.nextPage}><MdKeyboardDoubleArrowRight/></Button>
            </div>
              </div>
          </div>
    );
  }


  getTasks = () => {
    const {showTitleCol, showStatusCol,showPriorityCol, currentPage, recordsPerPage, selectedTasks} = this.state
    const indexOfLastTask = currentPage * recordsPerPage;
    const indexOfFirstTask = indexOfLastTask - recordsPerPage;
    const currentTasks = this.state.currentTasks.slice(indexOfFirstTask, indexOfLastTask);
    // const selectedTasksIds = this.state.selectedTasks.map(task => task["id"]);
    const selectedTasksIds = new Set(selectedTasks);

  return currentTasks.map(task => {

    return (
        <Task key={task["id"]}
              taskId={task["id"]}
              taskName={task["name"]}
              taskTag={task["tag"]}
              taskTitle={task["title"]}
              taskStatus={task["status"]}
              taskPriority={task["priority"]}
              selectTask={() => this.getSelectedTask(task["id"])}
              showTitleCol={showTitleCol}
              showStatusCol={showStatusCol}
              showPriorityCol={showPriorityCol}
              isCheckboxSelected={selectedTasksIds.has(task['id'])}
        />
    )
  });
  }
  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
    this.getFilteredTasks(this.state.searchInput);
  }

  getSelectedTask = (taskId) => {
    const {selectedTasks} = this.state
    const isSelected = selectedTasks.includes(taskId)
    const newSelectedTasks = isSelected? selectedTasks.filter(id => id !== taskId):[...selectedTasks, taskId];
    console.log("newSelectedTasks", newSelectedTasks)

    this.setState({
      selectedTasks: newSelectedTasks,
      isAllSelected: newSelectedTasks.length === tasks.length,
    });
  };


  selectAllTasksInCurrentPage = () => {
  const { isAllSelected, currentTasks, selectedTasks } = this.state;

  const currentTaskIds = currentTasks.map(task => task.id);

  if (isAllSelected) {
    const newSelectedTasks = selectedTasks.filter(taskId => !currentTaskIds.includes(taskId));
    this.setState({ isAllSelected: false, selectedTasks: newSelectedTasks });
  } else {
    const newSelectedTasks = [...new Set([...selectedTasks, ...currentTaskIds])];
    this.setState({ isAllSelected: true, selectedTasks: newSelectedTasks });
  }
};



updateTasksStatus = (newStatus, taskIdsToUpdate) => {
  console.log("taskIdsToUpdate: ", taskIdsToUpdate)
    this.setState((prevState) => {
    const updatedTasks = prevState.currentTasks.map(task => {
      if (taskIdsToUpdate.includes(task.id)) {
        return { ...task, status: newStatus };
      }
      return task;
    });

    return { currentTasks: updatedTasks };
  });
};

  updateTasksPriority = (newPriority, taskIdsToUpdate) => {
  console.log("taskIdsToUpdate: ", taskIdsToUpdate)
    this.setState((prevState) => {
    const updatedTasks = prevState.currentTasks.map(task => {
      if (taskIdsToUpdate.includes(task.id)) {
        return { ...task, priority: newPriority };
      }
      return task;
    });

    return { currentTasks: updatedTasks };
  });
};




  render() {
    const {showTitleCol, showStatusCol, showPriorityCol, currentTasks, selectedTasks} = this.state
    const currentTaskIds = currentTasks.map(task => task.id);
    const selectedTasksIds = currentTaskIds.every(id => selectedTasks.includes(id));
    console.log(selectedTasksIds)
    return (
        <div>
          <Header searchText={this.onChangeSearchInput}
                  priorityFunc={() => this.updateTasksPriority("Low", selectedTasks)}
                  statusFunc={() => this.updateTasksStatus("A", selectedTasks)}>
            <DropdownMenuCheckboxes
              text="View" itemOne="Title" itemTwo="Status" itemThree="Priority"
              showItemOneStatus={showTitleCol} setItemOneStatusFunc={this.showTitleColFunc}
              showItemTwoStatus={showStatusCol} setItemTwoStatusFunc={this.showStatusColFunc}
              showItemThreeStatus={showPriorityCol} setItemThreeStatusFunc={this.showPriorityColFunc}
            >
              <IoFilterOutline className="inline-block"/>
            </DropdownMenuCheckboxes>

        </Header>
        <div className="container mx-auto px-4 sm:px-8">
          <div className="min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <TableRow>
                  <input type="checkbox" checked={selectedTasksIds} onChange={this.selectAllTasksInCurrentPage}/>
                </TableRow>
                <TableRow>Task</TableRow>
                {showTitleCol&& <TableRow>
                  <button>Title <RiExpandUpDownLine className="inline-block"/></button>
                </TableRow>}
                {showStatusCol&&<TableRow><button onClick={() =>this.sortTasksByField(currentTasks,"status")}>Status <FaArrowUp className="inline-block"/></button>
                  </TableRow>}
                    {showPriorityCol&&<TableRow><button onClick={() =>this.sortTasksByField(currentTasks,"priority")}>Priority <RiExpandUpDownLine className="inline-block"/></button>
                      </TableRow>}
              <TableRow/>
              </thead>
              <tbody>
              {this.getTasks()}
              </tbody>
            </table>
            {this.renderPagination()}
          </div>
        </div>
        </div>
    );
  }
}

export default App;


