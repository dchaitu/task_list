const addTask = async (taskData) => {
    const access = localStorage.getItem('access');  // Assuming token is stored in localStorage

    if (!access) {
        console.log('User is not authenticated');
        return;
    }

    try {
        console.log("taskData:- ", taskData);
        const response = await fetch(
            'http://127.0.0.1:8000/add/',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${access}`,  // Pass the token in the Authorization header
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
                // The task data (e.g., title, label, status, priority)

            }
        );

        console.log('Task added successfully:', response);
        // navigate('/tasks');

    } catch (error) {
        console.error('Error adding task:', error);
    }
};

export default addTask;
