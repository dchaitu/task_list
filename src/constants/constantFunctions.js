import {allPriorities, allStatuses, labels} from "./constants";

export const getStatusValue = (statusVal) => allStatuses.find(status => status.value === statusVal)


export const getPriorityValue = (priorityVal) => allPriorities.find(priority => priority.value === priorityVal)


export const getTagValue = (tagName) => {
  const tag = labels.find((label) => label.value === tagName)
  if (tag === undefined)
    return ""
  return tag
}


export const sortTasksByField = (tasks, field, isAscending = true) => {
  return tasks.sort((a, b) => {
    if (a[field] < b[field]) {
      return isAscending ? -1 : 1;
    }
    if (a[field] > b[field]) {
      return isAscending ? 1 : -1;
    }
    return 0;
  });
};
