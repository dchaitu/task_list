import './App.css';
import Task from "./components/Task/task";
import {Component} from "react";
import Header from "./components/Header/header";
import {RiExpandUpDownLine} from "react-icons/ri";
import {Button} from "./components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "./components/ui/dropdown-menu";
import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
} from "react-icons/md";
import CheckboxComponent from "./components/CheckboxComponent/checkboxComponent";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "./components/ui/table"
import {DropdownMenuColumn} from "./components/DropdownMenuColumn/dropdownMenuColumn";
import {DoubleArrowLeftIcon, DoubleArrowRightIcon, MixerHorizontalIcon} from "@radix-ui/react-icons";
import {labels} from "./constants/constants";

const tasks = require('./constants/tasks.json');

class App extends Component {

    state = {
        isIssueSelected: null,
        searchInput: '',
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

    sortTasksByFieldAsc = (tasks, field) => {
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
    sortTasksByFieldDescending = (tasks, field) => {
        console.log(tasks, field);
        tasks.sort((a, b) => {
            if (a[field] < b[field]) {
                return 1;
            }
            if (a[field] > b[field]) {
                return -1;
            }
            return 0;
        });
        console.log(tasks);
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

    startingPage = () => {
        this.setState({currentPage: 1})
    }

    updateNoOfRows = (value) => {
        this.setState({recordsPerPage: value}, this.getTasks); // Ensure tasks are updated after change
    }

    resetAllData = () => {
        this.setState({currentPriorities: [], currentStatuses: [], currentTasks: tasks})
    }
    clearPriorityFilter = () => {
        this.setState({currentPriorities: []})
    }
    clearStatusFilter = () => {
        this.setState({currentStatuses: []})
    }


    renderPagination() {
        const {currentPage, recordsPerPage, currentTasks, selectedTasks} = this.state;
        const totalPages = Math.ceil(currentTasks.length / recordsPerPage);

        return (
            <div className="flex justify-between items-center">
                <div
                    className="flex-1  p-2 self-center text-sm text-muted-foreground">{selectedTasks.length} of {currentTasks.length} row(s)
                    selected.
                </div>

                <div className="flex flex-row justify-around p-2">
                    <div className="flex items-center space-x-2"><p className="text-sm font-medium">Rows per page</p>
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="ml-2 pr-2 pl-2 h-8" variant="outline"><span
                                        className="pr-3">{recordsPerPage}</span><RiExpandUpDownLine
                                        className="inline-block text-muted-foreground"/> </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="pr-2 w-56">
                                    <DropdownMenuItem onClick={() => this.updateNoOfRows(5)}
                                                      value="5">5</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => this.updateNoOfRows(10)}
                                                      value="10">10</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => this.updateNoOfRows(15)}
                                                      value="15">15</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {currentPage} of {totalPages}
                    </div>

                    <div className="flex flex-row items-center mr-2 ml-3">
                        <Button variant="outline" className="hidden h-8 w-8 p-2 lg:flex" onClick={this.startingPage}
                                disabled={currentPage === 1}>
                            <DoubleArrowLeftIcon size={20} className="h-4 w-4"/></Button>
                        <Button variant="outline" className="p-2 h-8 w-8 mr-2 ml-2" onClick={this.prevPage}
                                disabled={currentPage === 1}>
                            <MdKeyboardArrowLeft size={20} className="h-4 w-4"/></Button>
                        <Button variant="outline" className="p-2 mr-2 h-8 w-8" onClick={this.nextPage}
                                disabled={currentPage === totalPages}>
                            <MdKeyboardArrowRight size={20} className="h-4 w-4"/></Button>
                        <Button variant="outline" onClick={this.lastPage}
                                className="hidden h-8 w-8 p-0 lg:flex"
                                disabled={currentPage === totalPages}>
                            <DoubleArrowRightIcon size={20} className="h-4 w-4"/></Button>
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
        console.log("newSelectedTasks ", newSelectedTasks)
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
            currentStatuses
        } = this.state
        const currentTaskIds = currentTasks.map(task => task.id);
        const selectedTasksIds = currentTaskIds.every(id => selectedTasks.includes(id));
        const filterIcon = <MixerHorizontalIcon className="inline-block mr-2 h-4 w-4"/>

        return (
            <div className="overflow-hidden border-2 p-4 pb-10 shadow rounded-lg m-2 bg-background">
                <Header
                    searchText={this.onChangeSearchInput}
                    text="View" itemOne="Title" itemTwo="Status" itemThree="Priority"
                    showItemOneStatus={showTitleCol} setItemOneStatusFunc={this.showTitleColFunc}
                    showItemTwoStatus={showStatusCol} setItemTwoStatusFunc={this.showStatusColFunc}
                    showItemThreeStatus={showPriorityCol} setItemThreeStatusFunc={this.showPriorityColFunc}
                    iconFilter={filterIcon}
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

                <div className="mx-auto px-4 py-2 sm:px-8">
                    <div className="min-w-full shadow rounded-md border overflow-auto">
                        <Table>
                            <TableHeader className="p-2">
                                <TableRow className="p-2">
                                    <TableHead className="p-2">
                                        <CheckboxComponent id="task" checked={selectedTasksIds}
                                                           onCheckedChange={this.selectAllTasksInCurrentPage}
                                                           text="Task"/>
                                    </TableHead>
                                    {showTitleCol && <TableHead>
                                        <DropdownMenuColumn
                                            setItemOneStatusFunc={() => this.sortTasksByFieldAsc(currentTasks, "title")}
                                            itemOne="Asc"
                                            setItemTwoStatusFunc={() => this.sortTasksByFieldDescending(currentTasks, "title")}
                                            itemTwo="Desc"
                                            itemThree="Hide"
                                            setItemThreeStatusFunc={() => this.hideTitleColFunc()}
                                            text="Title"/>
                                    </TableHead>}
                                    {showStatusCol && <TableHead>

                                        <DropdownMenuColumn
                                            setItemOneStatusFunc={() => this.sortTasksByFieldAsc(currentTasks, "status")}
                                            itemOne="Asc"
                                            setItemTwoStatusFunc={() => this.sortTasksByFieldDescending(currentTasks, "status")}
                                            itemTwo="Desc"
                                            itemThree="Hide"
                                            setItemThreeStatusFunc={() => this.hideStatusColFunc()}
                                            text="Status"/>
                                    </TableHead>}
                                    {showPriorityCol && <TableHead>
                                        <DropdownMenuColumn
                                            setItemOneStatusFunc={() => this.sortTasksByFieldAsc(currentTasks, "priority")}
                                            itemOne="Asc"
                                            setItemTwoStatusFunc={() => this.sortTasksByFieldDescending(currentTasks, "priority")}
                                            itemTwo="Desc"
                                            itemThree="Hide"
                                            setItemThreeStatusFunc={() => this.hidePriorityColFunc()}
                                            text="Priority"
                                        />
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


