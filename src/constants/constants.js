import {ArrowDownIcon, ArrowRightIcon, ArrowUpIcon} from "@radix-ui/react-icons";
import * as React from "react";
import {
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

export const TableRow = (props) => (

  <th className="p-2 border-b-2 border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider pl-3">{props.children}</th>
)
export const TableCell = (props) => (
  <td className="p-1 border-b border-gray-200 bg-white text-sm pl-3">{props.children}</td>
)
const iconSize = 20

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

const iconClass = "inline-block mx-2 h-4 w-4 text-muted-foreground"

export const allStatuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: <QuestionMarkCircledIcon  className={iconClass} size={iconSize}/>
  },
  {
    value: "todo",
    label: "Todo",
    icon: <CircleIcon  className={iconClass} size={iconSize}/>
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: <StopwatchIcon className={iconClass} size={iconSize}/>
  },
  {
    value: "done",
    label: "Done",
    icon: <CheckCircledIcon className={iconClass} size={iconSize} />
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: <CrossCircledIcon className={iconClass} size={iconSize}/>
  },
]

export const allPriorities = [
  {
    value: "low",
    label: "Low",
    icon: <ArrowDownIcon className={iconClass} size={iconSize}/>
  },
  {
    value: "medium",
    label: "Medium",
    icon: <ArrowRightIcon className={iconClass} size={iconSize}/>

  },
  {
    value: "high",
    label: "High",
    icon: < ArrowUpIcon className={iconClass} size={iconSize}/>

  },

]
