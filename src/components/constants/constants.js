const tasks = [
  {
    "id": "1",
    "name": "Task 1",
    "title": "Task One",
    "status": "In Progress",
    "priority": "Low",
    "tag": "Documentation"
  },
  {
    "id": "2",
    "name": "Task 2",
    "title": "Task Two",
    "status": "Todo",
    "priority": "Medium",
    "tag": "Feature"
  },
  {
    "id": "3",
    "name": "Task 3",
    "title": "Task Three",
    "status": "Completed",
    "priority": "High",
    "tag": "Bug"
  },
  {
    "id": "4",
    "name": "Task 4",
    "title": "Task One",
    "status": "In Progress",
    "priority": "Low",
    "tag": "Documentation"
  },
  {
    "id": "5",
    "name": "Task 5",
    "title": "Task Two",
    "status": "Todo",
    "priority": "Medium",
    "tag": "Feature"
  },
  {
    "id": "6",
    "name": "Task 6",
    "title": "Task Three",
    "status": "Completed",
    "priority": "High",
    "tag": "Bug"
  },
  {
    "id": "7",
    "name": "Task 7",
    "title": "Task One",
    "status": "Backlog",
    "priority": "Low",
    "tag": "Documentation"
  },
  {
    "id": "8",
    "name": "Task 8",
    "title": "Task Two",
    "status": "Backlog",
    "priority": "Medium",
    "tag": "Feature"
  },
  {
    "id": "9",
    "name": "Task 9",
    "title": "Task Three",
    "status": "Todo",
    "priority": "High",
    "tag": "Bug"
  },
  {
    "id": "10",
    "name": "Task 10",
    "title": "Task One",
    "status": "Backlog",
    "priority": "Low",
    "tag": "Documentation"
  },
  {
    "id": "11",
    "name": "Task 11",
    "title": "Task Two",
    "status": "Backlog",
    "priority": "Medium",
    "tag": "Feature"
  },
  {
    "id": "12",
    "name": "Task 12",
    "title": "Task Three",
    "status": "Todo",
    "priority": "High",
    "tag": "Documentation"
  },
  {
    "id": "13",
    "name": "Task 13",
    "title": "Task Thirteen",
    "status": "Cancelled",
    "priority": "High",
    "tag": "Documentation"
  },
]

export default tasks


export const TableRow = (props) => (

  <th className="p-2 border-b-2 border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider pl-3">{props.children}</th>
)
export const TableCell = (props) => (
  <td className="p-1 border-b border-gray-200 bg-white text-sm pl-3">{props.children}</td>
)

export const priorities = ["Low","Medium","High"]

export const status = ["Backlog","Todo", "Medium", "In Progress", "Completed", "Cancelled"]
