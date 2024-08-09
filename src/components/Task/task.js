import React, { Component } from 'react';

class Task extends Component {
  state = {
    isIssueSelected: false,
  };

  getSelectedTask = () => {
    this.setState((prevState) => ({
      isIssueSelected: !prevState.isIssueSelected,
    }));
  };

  render() {
    const { taskName, taskTitle, taskStatus, taskPriority } = this.props;
    const { isIssueSelected } = this.state;

    // Apply a line-through style if the task is selected
    const rowStyle = isIssueSelected ? { textDecoration: 'line-through' } : {};

    return (
      <tr style={rowStyle}>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <input
            type="checkbox"
            className="form-checkbox"
            onClick={this.getSelectedTask}
          />
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{taskName}</td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{taskTitle}</td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{taskStatus}</td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{taskPriority}</td>
      </tr>
    );
  }
}

export default Task;
