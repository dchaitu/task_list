import './App.css';
import Task from "./components/Task/task";
import {Component} from "react";
import Header from "./components/Header/header";
import {RiExpandUpDownLine} from "react-icons/ri";
import {FaArrowUp} from "react-icons/fa6";
import tasks, {priorities, status, TableRow} from './components/constants/constants'
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
    isIssueSelected: null,
    searchInput: '',
    searchStatusInput: '',
    prioritySearchInput: '',
    currentTasks: tasks,
    isViewOpen: false,
    showTitleCol: true,
    showStatusCol: true,
    showPriorityCol: true,
    isProfileClicked: false,
    currentPage: 1,
    recordsPerPage: 5,
    selectedTasks: [],
    isAllSelected: false,
    currentPriorities: [],
    currentStatuses: [],
    showLowPriority: false,
    showMediumPriority: false,
    showHighPriority: false,
  }


  getFilteredTasks = (titleName) => {
    this.setState(
      {currentTasks: tasks.filter((task) => task["title"].includes(titleName))})
  }

  getFilteredPriorityTasks = (priorityName) => {
    this.setState(
      {currentTasks: tasks.filter((task) => task["priority"].includes(priorityName))})

  }

  getFilteredStatusTasks = (statusName) => {
    this.setState(
      {currentTasks: tasks.filter((task) => task["status"].includes(statusName))})

  }

  onChangePrioritySearchInput = event => {
    this.setState({
      prioritySearchInput: event.target.value,
    })
    this.getFilteredPriorityTasks(this.state.searchInput);
  }

  onChangeStatusSearchInput = event => {
    this.setState({
      searchStatusInput: event.target.value,
    })
    this.getFilteredStatusTasks(this.state.searchStatusInput);
  }


  sortTasksByField = (tasks, field) => {
    console.log(tasks, field);
    tasks.sort((a, b) => {
      if (a[field] < b[field]) {
        return -1;
      }
      if (a[field] > b[field]) {
        return 1;
      }
      return 0;
    });
    console.log(tasks);
    this.setState({currentTasks: tasks})

  }

  showTitleColFunc = () => {
    this.setState((prevState) => ({showTitleCol: !prevState.showTitleCol}))

  }

  showStatusColFunc = () => {
    this.setState((prevState) => ({showStatusCol: !prevState.showStatusCol}))

  }

  showPriorityColFunc = () => {
    this.setState((prevState) => ({showPriorityCol: !prevState.showPriorityCol}))

  }


  nextPage = () => {
    this.setState((prevState) => ({currentPage: prevState.currentPage + 1}))
  }

  lastPage = () => {
    const {currentTasks, recordsPerPage} = this.state
    const totalPages = Math.ceil(currentTasks.length / recordsPerPage);
    this.setState({currentPage: totalPages})
  }

  prevPage = () => {
    if (this.state.currentPage !== 1) {
      this.setState((prevState) => ({currentPage: prevState.currentPage - 1}))
    }
  }

  startingPage = () => {
    this.setState({currentPage: 1})
  }

  updateNoOfRows = (value) => {
    this.setState({recordsPerPage: value}, this.getTasks); // Ensure tasks are updated after change
  }

  resetAllData = () => {
    this.setState({currentPriorities: [], currentStatuses: [], currentTasks: tasks})
  }


  renderPagination() {
    const {currentPage, recordsPerPage, currentTasks, selectedTasks} = this.state;
    const totalPages = Math.ceil(currentTasks.length / recordsPerPage);

    return (
      <div className="flex flex-row justify-between mr-1 ml-1">
        <div
          className="flex-1 ml-2 p-2 self-center text-sm text-muted-foreground">{selectedTasks.length} of {currentTasks.length} row(s)
          selected.
        </div>

        <div className="flex flex-row justify-around p-2">
          <div className="flex items-center space-x-2"><p className="text-sm font-medium">Rows per page</p>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="ml-2 pr-2 pl-2" variant="outline"><span
                    className="pr-3">{recordsPerPage}</span><RiExpandUpDownLine
                    className="inline-block"/> </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="pr-2 w-56">
                  <DropdownMenuItem onClick={() => this.updateNoOfRows(5)} value="5">5</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => this.updateNoOfRows(10)} value="10">10</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => this.updateNoOfRows(15)} value="15">15</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex flex-row items-center mr-2 ml-3">
            <Button variant="outline" className="p-2 mr-2" onClick={this.startingPage}
                    disabled={currentPage === 1}>
              <MdKeyboardDoubleArrowLeft size={20} className="h-4 w-4"/></Button>
            <Button variant="outline" className="p-2 mr-2" onClick={this.prevPage}
                    disabled={currentPage === 1}>
              <MdKeyboardArrowLeft size={20} className="h-4 w-4"/></Button>
            <Button variant="outline" className="p-2 mr-2" onClick={this.nextPage}
                    disabled={currentPage === totalPages}>
              <MdKeyboardArrowRight size={20} className="h-4 w-4"/></Button>
            <Button variant="outline" className="p-2 mr-2" onClick={this.lastPage}
                    disabled={currentPage === totalPages}>
              <MdKeyboardDoubleArrowRight size={20} className="h-4 w-4"/></Button>
          </div>
        </div>
      </div>
    );
  }


  getTasks = () => {
    const {showTitleCol, showStatusCol, showPriorityCol, currentPage, recordsPerPage, selectedTasks} = this.state
    const indexOfLastTask = currentPage * recordsPerPage;
    const indexOfFirstTask = indexOfLastTask - recordsPerPage;
    const currentTasks = this.state.currentTasks.slice(indexOfFirstTask, indexOfLastTask);
    console.log(selectedTasks)
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
              isCheckboxSelected={selectedTasks.includes(task['id'])}
        />
      )
    });
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    }, () => this.getFilteredTasks(this.state.searchInput))
  }

  getSelectedTask = (taskId) => {
    const {selectedTasks} = this.state
    const isSelected = selectedTasks.includes(taskId)
    const newSelectedTasks = isSelected ? selectedTasks.filter(id => id !== taskId) : [...selectedTasks, taskId];
    console.log("newSelectedTasks", newSelectedTasks)

    this.setState({
      selectedTasks: newSelectedTasks,
      isAllSelected: newSelectedTasks.length === tasks.length,
    });
  };


  selectAllTasksInCurrentPage = () => {
    const {isAllSelected, currentTasks, selectedTasks} = this.state;
    const currentTaskIds = currentTasks.map(task => task.id);

    const newSelectedTasks = (isAllSelected) ? selectedTasks.filter(taskId => !currentTaskIds.includes(taskId)) :
      [...selectedTasks, ...currentTaskIds];

    this.setState({isAllSelected: !isAllSelected, selectedTasks: newSelectedTasks});
  };

  showItemPriorityFunc = (priorityLevel) => {
    const {currentPriorities} = this.state;
    const isPriorityIncluded = currentPriorities.includes(priorityLevel);
    const newPriorities = isPriorityIncluded
      ? currentPriorities.filter(priority => priority !== priorityLevel)
      : [...currentPriorities, priorityLevel];

    const priorityTasks = newPriorities.length
      ? tasks.filter(task => newPriorities.includes(task.priority))
      : tasks;

    this.setState({currentTasks: priorityTasks, currentPriorities: newPriorities});
  };

  showItemStatusFunc = (changeStatus) => {
    const {currentStatuses} = this.state;

    const isStatusIncluded = currentStatuses.includes(changeStatus);
    const newStatuses = isStatusIncluded
      ? currentStatuses.filter(priority => priority !== changeStatus)
      : [...currentStatuses, changeStatus];

    const priorityTasks = newStatuses.length
      ? tasks.filter(task => newStatuses.includes(task.status))
      : tasks;

    this.setState({currentTasks: priorityTasks, currentStatuses: newStatuses});
  };


  countPriorities = (priority) => (
    tasks.filter(task => task.priority === priority).length
  )

  countStatus = (status) => (
    tasks.filter(task => task.status === status).length
  )


  render() {
    const {
      showTitleCol,
      showStatusCol,
      showPriorityCol,
      currentTasks,
      selectedTasks,
      currentPriorities,
      currentStatuses
    } = this.state
    const currentTaskIds = currentTasks.map(task => task.id);
    const selectedTasksIds = currentTaskIds.every(id => selectedTasks.includes(id));
    const filterIcon = <IoFilterOutline className="inline-block"/>
    console.log(selectedTasksIds)
    console.log("currentPriorities", currentPriorities)
    return (
      <div className="border-2 p-4 pb-10 shadow rounded-lg m-2">
        <Header
          searchText={this.onChangeSearchInput}
          searchPriorityText={this.onChangePrioritySearchInput}
          searchStatusText={e => this.onChangeStatusSearchInput(e)}
          text="View" itemOne="Title" itemTwo="Status" itemThree="Priority"
          showItemOneStatus={showTitleCol} setItemOneStatusFunc={this.showTitleColFunc}
          showItemTwoStatus={showStatusCol} setItemTwoStatusFunc={this.showStatusColFunc}
          showItemThreeStatus={showPriorityCol} setItemThreeStatusFunc={this.showPriorityColFunc}
          iconFilter={filterIcon}

          showItemOneStatusFunc={() => this.showItemStatusFunc(status[0])}
          showItemTwoStatusFunc={() => this.showItemStatusFunc(status[1])}
          showItemThreeStatusFunc={() => this.showItemStatusFunc(status[2])}
          showItemFourStatusFunc={() => this.showItemStatusFunc(status[3])}
          showItemFiveStatusFunc={() => this.showItemStatusFunc(status[4])}

          itemOneStatusCount={this.countStatus(status[0])}
          itemTwoStatusCount={this.countStatus(status[1])}
          itemThreeStatusCount={this.countStatus(status[2])}
          itemFourStatusCount={this.countStatus(status[3])}
          itemFiveStatusCount={this.countStatus(status[4])}

          itemOnePriority={priorities[0]} itemTwoPriority={priorities[1]} itemThreePriority={priorities[2]}
          itemOneStatus={status[0]} itemTwoStatus={status[1]} itemThreeStatus={status[2]}
          itemFourStatus={status[3]} itemFiveStatus={status[4]}
          showItemOnePriority={priorities[0]}
          itemOnePriorityCount={this.countPriorities(priorities[0])}
          showItemOnePriorityFunc={() => this.showItemPriorityFunc(priorities[0])}
          showItemTwoPriority={priorities[1]}
          itemTwoPriorityCount={this.countPriorities(priorities[1])}
          showItemTwoPriorityFunc={() => this.showItemPriorityFunc(priorities[1])}
          showItemThreePriority={priorities[2]}
          showItemThreePriorityFunc={() => this.showItemPriorityFunc(priorities[2])}
          itemThreePriorityCount={this.countPriorities(priorities[2])}
          currentPriorities={currentPriorities}
          currentStatuses={currentStatuses}
          reset={this.resetAllData}

        />


        <div className="container mx-auto px-4 sm:px-8">
          <div className="min-w-full shadow rounded-lg overflow-hidden">
            <table className="w-full caption-bottom text-sm">
              <thead>
              <TableRow>
                <input type="checkbox" checked={selectedTasksIds} onChange={this.selectAllTasksInCurrentPage}/>
              </TableRow>
              <TableRow>Task</TableRow>
              {showTitleCol && <TableRow>
                <button>Title <RiExpandUpDownLine className="inline-block"/></button>
              </TableRow>}
              {showStatusCol && <TableRow>
                <button onClick={() => this.sortTasksByField(currentTasks, "status")}>Status <FaArrowUp
                  className="inline-block"/></button>
              </TableRow>}
              {showPriorityCol && <TableRow>
                <button onClick={() => this.sortTasksByField(currentTasks, "priority")}>Priority <RiExpandUpDownLine
                  className="inline-block"/></button>
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


