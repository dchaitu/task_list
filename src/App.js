import './App.css';
import Task from "./components/Task/task";
import {Component} from "react";
import Header from "./components/Header/header";
import CheckboxComponent from "./components/CheckboxComponent/checkboxComponent";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "./components/ui/table"
import {DropdownMenuColumn} from "./components/DropdownMenuColumn/dropdownMenuColumn";
import {labels} from "./constants/constants";
import Paginate from "./components/Paginate/paginate";
import {sortTasksByField} from "./constants/constantFunctions";

const tasks = require('./constants/tasks.json');

class App extends Component {

  state = {
    searchInput: '',
    currentTasks: tasks,
    showTitleCol: true,
    showStatusCol: true,
    showPriorityCol: true,
    currentPage: 1,
    recordsPerPage: 10,
    selectedTasks: [],
    isAllSelected: false,
    currentPriorities: [],
    currentStatuses: [],
    displayTasks: []
  }


  getFilteredTasks = (titleName) => {
    this.setState(
      {currentTasks: tasks.filter((task) => task["title"].toLowerCase().includes(titleName.toLowerCase())),})
  }

  sortTasksByFieldAsc = (tasks, field) => {
    tasks= sortTasksByField(tasks, field);
    this.setState({currentTasks: tasks})

  }
  sortTasksByFieldDescending = (tasks, field) => {
    tasks= sortTasksByField(tasks, field, false);
    this.setState({currentTasks: tasks});
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

  startingPage = () => this.setState({currentPage: 1})


  updateNoOfRows = (value) => {
    this.setState({recordsPerPage: value}, this.getTasks); // Ensure tasks are updated after change
  }

  resetAllData = () => {
    this.setState({currentPriorities: [], currentStatuses: [], currentTasks: tasks, searchInput: ''})
  }
  clearPriorityFilter = () => {
    this.setState({currentPriorities: []})
  }
  clearStatusFilter = () => {
    this.setState({currentStatuses: []})
  }


  renderPagination = () => {
    const {currentPage, recordsPerPage, currentTasks, selectedTasks} = this.state
    return (
      <Paginate
        currentPage={currentPage}
        recordsPerPage={recordsPerPage}
        currentTasks={currentTasks}
        selectedTasks={selectedTasks}
        updateNoofRows={(row) => this.updateNoOfRows(row)}
        startingPage={this.startingPage}
        prevPage={this.prevPage}
        nextPage={this.nextPage}
      />

    )
  }

  getCurrentPageTasks = () => {
    const {currentPage, recordsPerPage, currentTasks} = this.state
    const indexOfLastTask = currentPage * recordsPerPage;
    const indexOfFirstTask = indexOfLastTask - recordsPerPage;
    return currentTasks.slice(indexOfFirstTask, indexOfLastTask)
  }

  getTasks = () => {
    const {showTitleCol, showStatusCol, showPriorityCol,  selectedTasks} = this.state
    const displayTasks = this.getCurrentPageTasks()
    let colSpanSize = 3
    colSpanSize += showTitleCol ? 1 : 0;
    colSpanSize += showStatusCol ? 1 : 0;
    colSpanSize += showPriorityCol ? 1 : 0;



    if(displayTasks.length < 1) {
      return (<TableRow>
        <TableCell colSpan={colSpanSize} className="h-24 text-center">No results.</TableCell>
      </TableRow>);
    }
    else {
      return displayTasks.map(task => (
            <Task key={task["id"]}
                  taskId={task["id"]}
                  taskName={task["id"]}
                  taskTag={task["label"]}
                  taskTitle={task["title"]}
                  taskStatus={task["status"]}
                  taskPriority={task["priority"]}
                  selectTask={() => this.getSelectedTask(task["id"])}
                  showTitleCol={showTitleCol}
                  showStatusCol={showStatusCol}
                  showPriorityCol={showPriorityCol}
                  isCheckboxSelected={selectedTasks.includes(task['id'])}
                  labels={labels}
            />
        )
      )
    }
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

    this.setState({
      selectedTasks: newSelectedTasks,
      isAllSelected: newSelectedTasks.length === tasks.length,
    });
  };


  selectAllTasksInCurrentPage = () => {
    const {isAllSelected, currentTasks, selectedTasks} = this.state;
    const currentTaskIds = currentTasks.map(task => task.id);
    const newTaskIdsSet =  new Set([...selectedTasks, ...currentTaskIds])
    const newUniqueArray = Array.from(newTaskIdsSet)
    const newSelectedTasks = (isAllSelected) ? selectedTasks.filter(taskId => !currentTaskIds.includes(taskId)) :
        newUniqueArray;
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

  hidePriorityColFunc = () => {
    this.setState({showPriorityCol: false})

  }
  hideTitleColFunc = () => {
    this.setState({showTitleCol: false})

  }
  hideStatusColFunc = () => {
    this.setState({showStatusCol: false})

  }


  render() {
    const {
      showTitleCol,
      showStatusCol,
      showPriorityCol,
      currentTasks,
      selectedTasks,
      currentPriorities,
      currentStatuses,
      searchInput
    } = this.state


    const currentTaskIds = currentTasks.map(task => task.id);
    const selectedTasksIds = currentTaskIds.every(id => selectedTasks.includes(id));

    return (
      <div className="overflow-hidden border shadow rounded-lg m-2 bg-background">
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <Header
          searchText={this.onChangeSearchInput}
          searchTextValue={searchInput}
          showItemOneStatus={showTitleCol} setItemOneStatusFunc={this.showTitleColFunc}
          showItemTwoStatus={showStatusCol} setItemTwoStatusFunc={this.showStatusColFunc}
          showItemThreeStatus={showPriorityCol} setItemThreeStatusFunc={this.showPriorityColFunc}
          currentPriorities={currentPriorities}
          currentStatuses={currentStatuses}
          reset={this.resetAllData}
          selectedOption={this.showItemPriorityFunc}
          selectedStatusOption={this.showItemStatusFunc}
          countStatusFunc={this.countStatus}
          countPriorityFunc={this.countPriorities}
          options={currentStatuses}
          clearStatusFilter={this.clearStatusFilter}
          clearPriorityFilter={this.clearPriorityFilter}


        />


          <div className="rounded-md border">
            <Table className="w-full caption-bottom text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead className="p-2">

                    <CheckboxComponent id="task" checked={selectedTasksIds}
                                       onCheckedChange={this.selectAllTasksInCurrentPage}
                                       text="Task"/>
                  </TableHead>
                  {showTitleCol && <TableHead>
                    <div className="flex items-center space-x-2 w-1/2">
                    <DropdownMenuColumn
                        setItemOneStatusFunc={() => this.sortTasksByFieldAsc(currentTasks, "title")}
                        setItemTwoStatusFunc={() => this.sortTasksByFieldDescending(currentTasks, "title")}
                        setItemThreeStatusFunc={() => this.hideTitleColFunc()}
                        text="Title"/>
                    </div>
                  </TableHead>}
                  {showStatusCol && <TableHead>
                    <div className="flex items-center space-x-2 w-1/8">
                      <DropdownMenuColumn
                          setItemOneStatusFunc={() => this.sortTasksByFieldAsc(currentTasks, "status")}
                          setItemTwoStatusFunc={() => this.sortTasksByFieldDescending(currentTasks, "status")}
                          setItemThreeStatusFunc={() => this.hideStatusColFunc()}
                          text="Status"/>
                    </div>
                  </TableHead>}
                  {showPriorityCol && <TableHead>
                    <div className="flex items-center space-x-2 w-1/8">
                      <DropdownMenuColumn
                          setItemOneStatusFunc={() => this.sortTasksByFieldAsc(currentTasks, "priority")}
                          setItemTwoStatusFunc={() => this.sortTasksByFieldDescending(currentTasks, "priority")}
                          setItemThreeStatusFunc={() => this.hidePriorityColFunc()}
                          text="Priority"
                      />
                    </div>
                  </TableHead>
                  }
                  <TableHead/>
                </TableRow>
              </TableHeader>
              <TableBody>
                {this.getTasks()}
              </TableBody>
            </Table>
          </div>
          {this.renderPagination()}
      </div>
      </div>
    );
  }
}

export default App;


