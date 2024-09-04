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


const Header = (props) => {


    const {searchText} = props;
    const filterIcon = <MixerHorizontalIcon className="inline-block mr-2 h-4 w-4"/>

    const dropDownSearchBarIcon = <PlusCircledIcon className="mr-2 h-4 w-4"/>

    const showPriorities = () => (
        props.currentPriorities.length > 0 && (
            <>
                <Separator orientation="vertical" className="mx-2 h-4"/>
                <Badge variant="secondary"
                       className="rounded-sm px-1 font-normal lg:hidden">
                    {props.currentPriorities.length}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                    {props.currentPriorities.length > 2 ? (
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal"
                            >
                                {props.currentPriorities.length} selected
                            </Badge>)
                        :
                        (
                            props.currentPriorities.map((item) => <Badge
                                    variant="secondary"
                                    className="rounded-sm px-1  font-normal"
                                    key={getPriorityValue(item).value}
                                >{getPriorityValue(item).label}</Badge>
                            )
                        )
                    }
                </div>
            </>
        )
    )

    const showStatuses = () => (
        props.currentStatuses.length > 0 && (
            <>
                <Separator orientation="vertical" className="mx-2 h-4"/>
                <Badge variant="secondary"
                       className="rounded-sm px-1 font-normal lg:hidden">
                    {props.currentStatuses.length}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                    {props.currentStatuses.length > 2 ? (
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal"
                            >
                                {props.currentStatuses.length} selected
                            </Badge>)
                        :
                        (
                            props.currentStatuses.map((item) => <Badge
                                    variant="secondary"
                                    className="rounded-sm px-1 space-x-1 lg:flex"
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
                    <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                    <p className="text-muted-foreground">Here's a list of your tasks for this month!</p>
                </div>
                <div className="flex items-center space-x-2">
                    <DropdownDetails text="Profile"/>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex flex-1 items-center space-x-2">
                    <Input className="h-8 w-[150px] lg:w-[250px]" onChange={searchText} type="text"
                           placeholder="Filter Tasks..."/>
                    <div className="flex flex-row">
                        <DropDownWithSearchBar
                            key="status"
                            selectedOption={props.selectedStatusOption}
                            allOptions={allStatuses}
                            propertyName="Status"
                            placeholder="Status"
                            countFunc={props.countStatusFunc}
                            currentProperties={props.currentStatuses}
                            option={showStatuses()}
                            icon={dropDownSearchBarIcon}
                            clearFilter={props.clearStatusFilter}
                        />

                        <DropDownWithSearchBar
                            key="priority"
                            selectedOption={props.selectedOption}
                            allOptions={allPriorities}
                            propertyName="Priority"
                            placeholder="Priority"
                            countFunc={props.countPriorityFunc}
                            currentProperties={props.currentPriorities}
                            option={showPriorities()}
                            icon={dropDownSearchBarIcon}
                            clearFilter={props.clearPriorityFilter}
                        />

                        {(props.currentPriorities.length > 0 || props.currentStatuses.length > 0) &&
                            <Button variant="ghost" onClick={props.reset}>
                                Reset<Cross2Icon className="ml-2 h-4 w-4"/>
                            </Button>}

                    </div>

                </div>
                <div className="flex justify-self-center items-center">
                    <ViewDetails
                        iconFilter={filterIcon}
                        text="View" itemOne="Title" itemTwo="Status" itemThree="Priority"
                        showItemOneStatus={props.showItemOneStatus}
                        setItemOneStatusFunc={props.setItemOneStatusFunc}
                        showItemTwoStatus={props.showItemTwoStatus}
                        setItemTwoStatusFunc={props.setItemTwoStatusFunc}
                        showItemThreeStatus={props.showItemThreeStatus}
                        setItemThreeStatusFunc={props.setItemThreeStatusFunc}
                    />
                </div>
            </div>

        </>
    )
}

export default Header
