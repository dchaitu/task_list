import './header.css';

import {Button} from "../ui/button";
import {DropdownDetails} from "../DropDownDetails/dropDownDetails";
import * as React from "react";
import DropDownWithSearchBar from "../DropDownWithSearchBar/dropDownWithSearchBar";
import {Cross2Icon, MixerHorizontalIcon, PlusCircledIcon} from "@radix-ui/react-icons";
import {allPriorities, allStatuses} from "../../constants/constants";
import {Separator} from "../ui/separator";
import {Input} from "../ui/input";
import {Badge} from "../ui/badge";
import ViewDetails from "../ViewDetails/viewDetails";
import {getPriorityValue, getStatusValue} from "../../constants/constantFunctions";


const Header = ({
  user,
  searchText,
  searchTextValue,
  currentPriorities = [],
  currentStatuses = [],
  reset,
  selectedOption,
  selectedStatusOption,
  countStatusFunc,
  countPriorityFunc,
  showItemOneStatus,
  setItemOneStatusFunc,
  showItemTwoStatus,
  setItemTwoStatusFunc,
  showItemThreeStatus,
  setItemThreeStatusFunc,
  addTask,
  clearStatusFilter,
  clearPriorityFilter
}) => {
    const filterIcon = <MixerHorizontalIcon className="inline-block mr-2 h-4 w-4"/>

    const dropDownSearchBarIcon = <PlusCircledIcon className="mr-2 h-4 w-4"/>

    const showPriorities = () => (
        currentPriorities.length > 0 && (
            <>
                <Separator orientation="vertical" className="mx-2 h-4"/>
                <Badge variant="secondary"
                       className="rounded-sm px-1 font-normal lg:hidden">
                    {currentPriorities.length}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                    {currentPriorities.length > 2 ? (
                            <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                                {currentPriorities.length} selected
                            </Badge>)
                        :
                        (currentPriorities.map((item) => (
                            <Badge variant="secondary" className="rounded-sm px-1  font-normal" key={getPriorityValue(item).value}
                                >{getPriorityValue(item).label}</Badge>)
                            )
                        )
                    }
                </div>
            </>
        )
    )

    const showStatuses = () => (
        currentStatuses.length > 0 && (
            <>
                <Separator orientation="vertical" className="mx-2 h-4"/>
                <Badge variant="secondary"
                       className="rounded-sm px-1 font-normal lg:hidden">
                    {currentStatuses.length}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                    {currentStatuses.length > 2 ? (
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal"
                            >
                                {currentStatuses.length} selected
                            </Badge>)
                        :
                        (
                            currentStatuses.map((item) => <Badge
                                    variant="secondary"
                                    className="rounded-sm px-1 font-normal space-x-1 lg:flex"
                                    key={getStatusValue(item).value}
                                >{getStatusValue(item).label}</Badge>
                            )
                        )
                    }
                </div>
            </>
        )
    )

    return (
        <>

            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Welcome back {user.username}!</h2>
                    <p className="text-muted-foreground">Here's a list of your tasks for this month!</p>
                </div>
                <div className="flex items-center space-x-2">
                    <DropdownDetails text="Profile" user={user}/>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex flex-row items-center space-x-2">
                    <Input className="h-8 w-[150px] lg:w-[250px] focus-visible:ring-1 py-1"
                           onChange={searchText} value={searchTextValue}
                           type="text"
                           placeholder="Filter Tasks..."/>
                        <DropDownWithSearchBar
                            key="status"
                            selectedOption={selectedStatusOption}
                            allOptions={allStatuses}
                            propertyName="Status"
                            placeholder="Status"
                            countFunc={countStatusFunc}
                            currentProperties={currentStatuses}
                            option={showStatuses()}
                            icon={dropDownSearchBarIcon}
                            clearFilter={clearStatusFilter}
                        />

                        <DropDownWithSearchBar
                            key="priority"
                            selectedOption={selectedOption}
                            allOptions={allPriorities}
                            propertyName="Priority"
                            placeholder="Priority"
                            countFunc={countPriorityFunc}
                            currentProperties={currentPriorities}
                            option={showPriorities()}
                            icon={dropDownSearchBarIcon}
                            clearFilter={clearPriorityFilter}
                        />

                        {(currentPriorities.length > 0 || currentStatuses.length > 0 || searchTextValue.length > 0) &&
                            <Button variant="ghost" onClick={reset} className="px-2 h-8">
                                Reset<Cross2Icon className="ml-2 h-4 w-3"/>
                            </Button>}





                </div>

                <ViewDetails
                    iconFilter={filterIcon}
                    text="View" itemOne="Title" itemTwo="Status" itemThree="Priority"
                    showItemOneStatus={showItemOneStatus}
                    setItemOneStatusFunc={setItemOneStatusFunc}
                    showItemTwoStatus={showItemTwoStatus}
                    setItemTwoStatusFunc={setItemTwoStatusFunc}
                    showItemThreeStatus={showItemThreeStatus}
                    setItemThreeStatusFunc={setItemThreeStatusFunc}
                />
                <div className="flex flex-wrap items-center gap-2 md:flex-row">
                <Button onClick={addTask} className="px-2 h-8 mx-2">
                    Add Task
                </Button>
                </div>
            </div>
        </>
    )
}

export default Header
