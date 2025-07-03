import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';


const SelectUserName = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate()
    const [error, setError] = useState('');
    const email = localStorage.getItem('email');
    const submitUsername = async(e) => {
        e.preventDefault();
        setUsername(username);
        const accessToken = localStorage.getItem('access_token');
        try{
            const response = await fetch('http://127.0.0.1:8000/set-username/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    username: username,
                })
            }
            )
            const data = await response.json();
            if (response.status !== 200) {
                throw new Error(data.error || 'Failed to set username');
            }

            localStorage.setItem('username', data.username);
            navigate('/tasks');
        }
        catch(err){
            setError(err.message);
            console.error('Set username error:', err);
        }
    }

    return (
        <form onSubmit={submitUsername}>
        <div className="p-2">
            <h1 className="font-bold heading text-2xl content-center">Set Username for {email}</h1>
            <label className="p-1">Username</label>
            <input className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                   type="text"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   required
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex justify-center my-4">
                <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full max-w-xs"
                        type="submit">
                    Set Username
                </button>
            </div>
        </div>
        </form>
    );

}

export default SelectUserName