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
    currentPriorities: [],
    currentStatuses: [],
    selectedTasksPerPage: {}
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
    const {currentPage, recordsPerPage, currentTasks, selectedTasksPerPage} = this.state
    console.log("selectedTasksPerPage ", selectedTasksPerPage)
    const allSelectedTasks = Object.values(selectedTasksPerPage).flat();
    console.log(allSelectedTasks)

    return (
      <Paginate
        currentPage={currentPage}
        recordsPerPage={recordsPerPage}
        currentTasks={currentTasks}
        selectedTasks={allSelectedTasks}
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
    const {showTitleCol, showStatusCol, showPriorityCol, selectedTasksPerPage, currentPage} = this.state
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
                  isCheckboxSelected={selectedTasksPerPage[currentPage]?.includes(task['id'])}
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
    const { currentPage, selectedTasksPerPage } = this.state;
    const isSelected = selectedTasksPerPage[currentPage]?.includes(taskId);
    const newSelectedTasksForPage = isSelected
        ? selectedTasksPerPage[currentPage]?.filter(id => id !== taskId)
        : [...(selectedTasksPerPage[currentPage] || []), taskId];

    const updatedSelectedTasksPerPage = {
        ...selectedTasksPerPage,
        [currentPage]: newSelectedTasksForPage,
    }
    this.setState({selectedTasksPerPage:updatedSelectedTasksPerPage});
  };


  selectAllTasksInCurrentPage = () => {
    const { currentPage, selectedTasksPerPage } = this.state;

    // Get tasks displayed on the current page
    const currentTasksOnPage = this.getCurrentPageTasks().map(task => task.id);

    // Check if all tasks on the current page are selected
    const allSelectedOnPage = currentTasksOnPage.every(
        taskId => selectedTasksPerPage[currentPage]?.includes(taskId)
    );

    const newSelectedTasksForPage = allSelectedOnPage
        ? selectedTasksPerPage[currentPage].filter(taskId => !currentTasksOnPage.includes(taskId)) // Unselect all tasks
        : [...new Set([...(selectedTasksPerPage[currentPage] || []), ...currentTasksOnPage])]; // Select all tasks


    // Update the selectedTasksPerPage state for the current page
    this.setState({
      selectedTasksPerPage: {
        ...selectedTasksPerPage,
        [currentPage]: newSelectedTasksForPage,
      },
    });

  };


  allSelectedForCurrentPage = () => {
    const { currentPage, selectedTasksPerPage } = this.state;
    const currentTasksOnPage = this.getCurrentPageTasks().map(task => task.id);

    // Return true if all tasks on the current page are selected
    return currentTasksOnPage.every(taskId => selectedTasksPerPage[currentPage]?.includes(taskId));
  };


  showItemPriorityFunc = (priorityLevel) => {
    const {currentPriorities, currentStatuses} = this.state;
    const isPriorityIncluded = currentPriorities.includes(priorityLevel);
    const newPriorities = isPriorityIncluded
      ? currentPriorities.filter(priority => priority !== priorityLevel)
      : [...currentPriorities, priorityLevel];

    const filteredTasks = tasks.filter(task =>
    (newPriorities.length === 0 || newPriorities.includes(task.priority)) && // Priority filter
    (currentStatuses.length === 0 || currentStatuses.includes(task.status))   // Status filter
  );

    this.setState({currentTasks: filteredTasks, currentPriorities: newPriorities});
  };

  showItemStatusFunc = (changeStatus) => {
    const {currentStatuses, currentPriorities} = this.state;

    const isStatusIncluded = currentStatuses.includes(changeStatus);
    const newStatuses = isStatusIncluded
      ? currentStatuses.filter(priority => priority !== changeStatus)
      : [...currentStatuses, changeStatus];

    const filteredTasks = tasks.filter(task =>
    (newStatuses.length === 0 || newStatuses.includes(task.status)) &&     // Status filter
    (currentPriorities.length === 0 || currentPriorities.includes(task.priority)) // Priority filter
  );
    this.setState({currentTasks: filteredTasks, currentStatuses: newStatuses});
  };


  countPriorities = (priority) => {
    const {currentStatuses} = this.state;

    return (
      tasks.filter(task => (task.priority === priority && (currentStatuses.length === 0 ||currentStatuses.includes(task.status)))).length
    )
  }

  countStatus = (status) => {
        const { currentPriorities} = this.state;

    return (
    tasks.filter(task => task.status === status && (currentPriorities.length===0 || currentPriorities.includes(task.priority))).length
  )
  }

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
      currentPriorities,
      currentStatuses,
      searchInput
    } = this.state

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

                    <CheckboxComponent id="task" checked={this.allSelectedForCurrentPage()}
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
