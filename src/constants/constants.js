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

export const priorities = ["Low","Medium","High"]

export const status = ["Backlog","Todo", "In Progress", "Completed", "Cancelled"]

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


export const allStatuses = [
  {
    value: status[0],
    label: status[0],
    icon: <QuestionMarkCircledIcon />
  },
  {
    value: status[1],
    label: status[1],
    icon: <CircleIcon />
  },
  {
    value: status[2],
    label: status[2],
    icon: <StopwatchIcon />
  },
  {
    value: status[3],
    label: status[3],
    icon: <CheckCircledIcon />
  },
  {
    value: status[4],
    label: status[4],
    icon: <CrossCircledIcon />
  },
]

export const allPriorities = [
  {
    value: priorities[0],
    label: priorities[0],
    icon: <ArrowUpIcon />
  },
  {
    value: priorities[1],
    label: priorities[1],
    icon: <ArrowRightIcon/>

  },
  {
    value: priorities[2],
    label: priorities[2],
    icon: <ArrowDownIcon/>

  },

]
