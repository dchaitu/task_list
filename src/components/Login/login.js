import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Redirect to tasks page if login is successful
            navigate('/tasks');
        } else {
            setError(data.error || 'Login failed');
        }
    };

    return (
        <div className="bg-pink-400 justify-center m-4 p-10 rounded-md content-center">
            <h1 className="font-bold heading">Login</h1>
            {error && <p className="error">{error}</p>}
            <form className="registration-form" onSubmit={handleSubmit}>
                <div className="p-2">
                    <label className="p-1">Username</label>
                    <input className="p-2"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="p-2">
                    <label className="p-1">Password</label>
                    <input className="p-2"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="submit">
                    Login</button>
            </form>
        </div>
    );
};

export default Login;
