import React, {useState} from "react";
import addTask from "./addTask";
import {allPriorities, allStatuses} from "../../constants/constants";
import {useNavigate} from "react-router-dom";

const AddTaskUser = () => {

    const [title, setTitle] = useState('');
    const [label, setLabel] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const taskData = {
            title,
            label,
            status,
            priority,
        };

        await addTask(taskData);
        navigate('/tasks');


    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="title"
                               className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" name="title" id="title" required
                               value={title}
                               onChange={(e) => setTitle(e.target.value)}
                               className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                    <div>
                        <label htmlFor="label"
                               className="block text-sm font-medium text-gray-700">Label</label>
                        <input type="text" name="label" id="label" required
                               value={label}
                               onChange={(e) => setLabel(e.target.value)}
                               className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                    <div>
                        <label htmlFor="status"
                               className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                            onChange={(e) => setStatus(e.target.value)}>
                            <option value="" disabled selected>Select your option</option>

                            {allStatuses.map(status =>
                                (<option key={status.value} value={status.value}>{status.label}</option>)
                            )}

                        </select>
                    </div>
                    <div>
                    <label htmlFor="priority"
                               className="block text-sm font-medium text-gray-700">Priority</label>
                        <select selected={priority} onChange={(e) => setPriority(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                        >
                            <option value="" disabled selected>Select your option</option>

                            {allPriorities.map(priority =>
                                (<option key={priority.value} value={priority.value}>{priority.label}</option>)
                            )}
                        </select>

                    </div>
                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        type="submit">
                        Add Task
                    </button>


                </form>
            </div>
        </div>


    )


}

export default AddTaskUser;