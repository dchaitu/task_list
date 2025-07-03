import {Component} from "react";
import {sortTasksByField} from "../../constants/constantFunctions";
import Paginate from "../Paginate/paginate";
import Header from "../Header/header";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "../ui/table"
import Task from "../Task/task";
import {labels} from "../../constants/constants";
import {DropdownMenuColumn} from "../DropdownMenuColumn/dropdownMenuColumn";
import CheckboxComponent from "../CheckboxComponent/checkboxComponent";
import Loader from "../Loader/loader";
import {useNavigate} from "react-router-dom";


function withNavigate(Component) {
    return (props) => {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    };
}


class Tasks extends Component {



    state = {
        searchInput: '',
        allTasks: [],
        currentTasks: [],
        showTitleCol: true,
        showStatusCol: true,
        showPriorityCol: true,
        currentPage: 1,
        recordsPerPage: 10,
        currentPriorities: [],
        currentStatuses: [],
        selectedTasksPerPage: {},
        isLoaded: false,
        userDetails: {},
    }

    // get tasks data from localhost

    async fetchAllTasks() {
        try {

            const access = localStorage.getItem("access_token");

            const resp = await fetch(
                "http://127.0.0.1:8000/tasks/",
                {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                        "Authorization": `Bearer ${access}`,
                    }
                },

            );

            if (!resp.ok) {
                console.log("Response Status:", resp.status);  // Log the status
            }

            const data = await resp.json();
            console.log("Fetched tasks: ", data);
            return data;
        } catch (error) {
            console.error("Fetch error: ", error.message);
            throw error;
        }
    }

    async componentDidMount() {
        const token = localStorage.getItem('access_token');
        console.log(token);
        if(!token) {
            this.props.navigate('/login');
        }
        if (token) {
            if (!localStorage.getItem("access_token")) {
                // Redirect to login if no token
                this.context.navigate('/login');
            } else {
                // Fetch tasks if the token exists
                const data = await this.fetchAllTasks();
                this.setState({
                    allTasks: data.tasks,
                    currentTasks: data.tasks,
                    isLoaded: true,
                    userDetails: data.user
                });
            }
        }
    }






    getFilteredTasks = (titleName) => {
        console.log("getFilteredTasks:- ", this.state.allTasks);
        this.setState(
            {currentTasks: this.state.allTasks.filter((task) => task["title"].toLowerCase().includes(titleName.toLowerCase())),})
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
        this.setState({currentPriorities: [], currentStatuses: [], currentTasks: this.state.allTasks, searchInput: ''})
    }
    clearPriorityFilter = () => {
        this.setState({currentPriorities: []})
    }
    clearStatusFilter = () => {
        const {currentPriorities} = this.state
        this.setState({currentStatuses: [], currentTasks:currentPriorities})
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
        console.log("getCurrentPageTasks currentTasks ", currentTasks)
        console.log("currentTasks slice"+ currentTasks.slice(indexOfFirstTask, indexOfLastTask))
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
                    <Task key={task["task_id"]}
                          taskId={task["task_id"]}
                          taskName={task["task_id"]}
                          taskTag={task["label"]}
                          taskTitle={task["title"]}
                          taskStatus={task["status"]}
                          taskPriority={task["priority"]}
                          selectTask={() => this.getSelectedTask(task["task_id"])}
                          showTitleCol={showTitleCol}
                          showStatusCol={showStatusCol}
                          showPriorityCol={showPriorityCol}
                          isCheckboxSelected={selectedTasksPerPage[currentPage]?.includes(task['task_id'])}
                          labels={labels}
                    />

                )
            )
        }
    }

    onChangeSearchInput = event => {
        this.setState({
            searchInput: event.target.value,
        }, () => {
            this.getFilteredTasks(this.state.searchInput)
            this.startingPage()

        })
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
        const currentTasksOnPage = this.getCurrentPageTasks().map(task => task.task_id);

        // Check if all tasks on the current page are selected
        const allSelectedOnPage = currentTasksOnPage.length>0&& currentTasksOnPage.every(
            taskId => selectedTasksPerPage[currentPage]?.includes(taskId)
        );

        const newSelectedTasksForPage = allSelectedOnPage
            ? (selectedTasksPerPage[currentPage] || []).filter(taskId => !currentTasksOnPage.includes(taskId)) // Unselect all tasks
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
        const currentTasksOnPage = this.getCurrentPageTasks().map(task => task.task_id);

        // Return true if all tasks on the current page are selected
        return currentTasksOnPage.length>0 && currentTasksOnPage.every(taskId => selectedTasksPerPage[currentPage]?.includes(taskId));
    };


    showItemPriorityFunc = (priorityLevel) => {
        const {currentPriorities, currentTasks} = this.state;
        const isPriorityIncluded = currentPriorities.includes(priorityLevel);
        const newPriorities = isPriorityIncluded
            ? currentPriorities.filter(priority => priority !== priorityLevel)
            : [...currentPriorities, priorityLevel];

        const priorityTasks = newPriorities.length
            ? currentTasks.filter(task => newPriorities.includes(task.priority))
            : currentTasks;

        this.setState({currentTasks: priorityTasks, currentPriorities: newPriorities});
    };

    showItemStatusFunc = (changeStatus) => {
        const {currentStatuses, currentTasks} = this.state;

        const isStatusIncluded = currentStatuses.includes(changeStatus);
        const newStatuses = isStatusIncluded
            ? currentStatuses.filter(priority => priority !== changeStatus)
            : [...currentStatuses, changeStatus];

        const priorityTasks = newStatuses.length
            ? currentTasks.filter(task => newStatuses.includes(task.status))
            : currentTasks;

        this.setState({currentTasks: priorityTasks, currentStatuses: newStatuses});
    };


    countPriorities = (priority) => (
        this.state.allTasks.filter(task => task.priority === priority).length
    )

    countStatus = (status) => (
        this.state.allTasks.filter(task => task.status === status).length
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
    addTask = () => (
        this.props.navigate('/add')
    )


    render() {
        const {
            showTitleCol,
            showStatusCol,
            showPriorityCol,
            currentTasks,
            currentPriorities,
            currentStatuses,
            searchInput,
            isLoaded,
            userDetails
        } = this.state

        if (!isLoaded) {
            return (<Loader/>)
        }
        else {
            return (
                <div className="overflow-hidden border shadow rounded-lg m-2 bg-background">
                    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
                        <Header user={userDetails}
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
                            addTask={() =>this.addTask()}
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
}

export default withNavigate(Tasks);
