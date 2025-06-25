import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import ReCAPTCHA from 'react-google-recaptcha';
import {sitekey} from "../../constants/constants";
import './login.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [recaptchaValue, setRecaptchaValue] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!recaptchaValue) {
            setError('Please complete the CAPTCHA');
            return;
        }
        try {
            const response = await fetch('http://127.0.0.1:8000/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    recaptcha_token: recaptchaValue
                }),
            });
            console.log("recaptcha token", recaptchaValue);

            const data = await response.json();
            console.log("Response:", data);
            
            if (response.ok) {
                localStorage.setItem('access', data.access);
                localStorage.setItem('refresh', data.refresh);
                console.log("Login successful, navigating to tasks");
                navigate('/tasks');
            } else {
                if (response.status === 401) {
                    setError('Invalid username or password');
                } else {
                    setError(data.detail || 'Login failed. Please try again.');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Failed to connect to the server');
        }
    };

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/social/login/google-oauth2/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${credentialResponse.access_token}`,
                },
                body: JSON.stringify({
                    access_token: credentialResponse.credential,
                    id_token: credentialResponse.credential
                }),
            });

            const data = await response.json();
            console.log("Response:", response);
            console.log("Response data:", data);
            
            if (response.ok) {
                localStorage.setItem('access', data.access);
                localStorage.setItem('refresh', data.refresh);
                navigate('/tasks');
            } else {
                setError(data.error || 'Google login failed');
            }
        } catch (error) {
            console.error('Google login error:', error);
            setError('Failed to connect to the server');
        }
    };

    const handleLogout = () => {
        googleLogout();
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/login');
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">

                <h1 className="font-bold heading text-2xl content-center">Login</h1>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="p-2">
                        <label className="p-1">Username</label>
                        <input className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        type="text"
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}
                               required
                        />
                    </div>
                    <div className="p-2">
                        <label className="p-1">Password</label>
                        <input className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        type="password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               required
                        />
                    </div>
                    <ReCAPTCHA
                            sitekey={sitekey}
                            onChange={(value) => {
                                setRecaptchaValue(value);
                                setError('');
                            }}
                        />
                    <button disabled={!recaptchaValue} 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        type="submit">
                        Login
                    </button>
                    <div className="mt-4">
                        <GoogleLogin 
                            onSuccess={handleGoogleLogin}
                            onError={() => setError('Google login failed')}
                            useOneTap
                            shape="circle"
                            // auto_select
                        />
    
                    </div>
                </form>
                <button onClick={handleLogout}>Logout</button>
            </div>
            </div>
            );
            };

export default Login;
