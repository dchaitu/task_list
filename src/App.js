import './App.css';
import Task from "./components/Task/task";
import {Component} from "react";
import Header from "./components/Header/header";
import Dropdown from "./components/Dropdown/dropdown";
import { RiExpandUpDownLine } from "react-icons/ri";
import {FaArrowUp} from "react-icons/fa6";
import tasks from './components/constants/constants'
import ProfileButton from "./components/Profile/profileButton";
import {GrNext, GrPrevious} from "react-icons/gr";
import {DropdownDetails} from "./components/DropDownDetails/dropDownDetails";
import {DropdownMenuCheckboxes} from "./components/DropDownCheckBox/dropDownCheckBox";
import {IoFilterOutline} from "react-icons/io5";

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


  getSelectedTask = (taskId) => {
    const {selectedTasks} = this.state
    const isSelected = selectedTasks.includes(taskId)
    const newSelectedTasks = isSelected? selectedTasks.filter(id => id !== taskId):[...selectedTasks, taskId];
    console.log(newSelectedTasks)

    this.setState({
      selectedTasks: newSelectedTasks,
      isAllSelected: newSelectedTasks.length === tasks.length,
    });
  };




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



  showDropDownMenu = () =>{
    this.setState((prevState) => ({isViewOpen : !prevState.isViewOpen}))
    console.log("isViewOpen:-", this.state.isViewOpen);
  }

  showTitleColFunc = () =>{
    this.setState((prevState) => ({showTitleCol : !prevState.showTitleCol}))
    console.log("showTitleCol:-", this.state.showTitleCol);

  }

  showStatusColFunc = () =>{
    this.setState((prevState) => ({showStatusCol : !prevState.showStatusCol}))
    console.log("showStatusCol:-", this.state.showStatusCol);

  }

  showPriorityColFunc = () =>{
    this.setState((prevState) => ({showPriorityCol : !prevState.showPriorityCol}))
    console.log("showPriorityCol:-", this.state.showPriorityCol);

  }


  getTasks = () => {
    const {showTitleCol, showStatusCol,showPriorityCol, currentPage, recordsPerPage, isAllSelected} = this.state
    const indexOfLastTask = currentPage * recordsPerPage;
    const indexOfFirstTask = indexOfLastTask - recordsPerPage;
    const currentTasks = this.state.currentTasks.slice(indexOfFirstTask, indexOfLastTask);

  return currentTasks.map(task => {

    const isIssueSelected = this.state.isIssueSelected === task["id"];
    return (
        <Task taskId={task["id"]} taskName={task["name"]}
              taskTag={task["tag"]} taskTitle={task["title"]}
              taskStatus={task["status"]} selectValue={isAllSelected}
              taskPriority={task["priority"]} selectTask={() => this.getSelectedTask(task["id"])}
              showTitleCol={showTitleCol} showStatusCol={showStatusCol} showPriorityCol={showPriorityCol}
              isIssueSelected={isIssueSelected}
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

  getProfileDetails = () => {
    const {isProfileClicked} = this.state;
    this.setState({isProfileClicked:!isProfileClicked})


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

  selectAllTasksInCurrentPage = () => {
    const {isAllSelected, currentTasks} = this.state
    if (isAllSelected) {
    this.setState({isAllSelected: false,selectedTasks:[]})
    }
    else{
      const allTaskIds = currentTasks.map(task => task.id);
      this.setState({isAllSelected: true,
      selectedTasks:allTaskIds})
      console.log(allTaskIds)
    }


  }


  renderPagination() {
    const { currentPage, recordsPerPage, currentTasks, selectedTasks } = this.state;
    const totalPages = Math.ceil(currentTasks.length / recordsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
        <>
          <div className="flex justify-evenly">
            <div>{selectedTasks.length} of {tasks.length} selected.</div>
            <div>Rows per page {recordsPerPage}</div>
            <div className='flex'>
              <button className="button-shadow" onClick={this.prevPage}><GrPrevious/></button>
              <ul className="pagination flex">
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item m-2 ${currentPage === number ? 'active' : ''}`}>
                      <button onClick={() => this.paginate(number)}>
                        {number}
                      </button>
                    </li>
                ))}
              </ul>
              <button className="button-shadow" onClick={this.nextPage}><GrNext/></button>
            </div>
          </div>
        </>

    );
  }


  render() {
    const {showTitleCol, showStatusCol, showPriorityCol, currentTasks, isViewOpen, isProfileClicked,isAllSelected} = this.state
    return (
        <div>
          <div className="float-center pr-10">



          </div>
          <Header searchText={this.onChangeSearchInput} viewFilter={this.showDropDownMenu}>
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
                  <input type="checkbox" checked={isAllSelected} onChange={this.selectAllTasksInCurrentPage}/>
                </TableRow>
                <TableRow>Task</TableRow>
                {showTitleCol&& <TableRow>
                  <button>Title <RiExpandUpDownLine className="inline-block"/></button>
                </TableRow>}
                {showStatusCol&&<TableRow><button onClick={() =>this.sortTasksByField(currentTasks,"status")}>Status <FaArrowUp className="inline-block"/></button>
                  </TableRow>}
                    {showPriorityCol&&<TableRow><button onClick={() =>this.sortTasksByField(currentTasks,"priority")}>Priority <RiExpandUpDownLine className="inline-block"/></button>
                      </TableRow>}
              </thead>
              <tbody>
              {this.getTasks()}
              </tbody>
            </table>
            {this.renderPagination()}
          </div>
        </div>
          <button onClick={this.selectAllTasksInCurrentPage}>Check All</button>
      </div>
    );
  }
}

export default App;

const TableRow = (props) => (
    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{props.children}</th>
)
