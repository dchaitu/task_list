import React from 'react';
import { GoogleLogin as GoogleLoginButton, useGoogleLogin } from '@react-oauth/google';
import { FaGoogle } from "react-icons/fa";
import {useNavigate} from "react-router-dom";

export const GoogleLogin = (props) => {
    const {onError} = props;
    const navigate = useNavigate();
    const handleGoogleLogin = async (codeResponse) => {
        console.log(codeResponse);
        const authorizationCode = codeResponse.code;
        try {
            const response = await fetch('http://127.0.0.1:8000/rest-auth/google/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: authorizationCode,
                }),
            })
            const data = await response.json();
            console.log("handle googleLogIn ",data);
            console.log("Response status:", response.status);
            console.log("Response data:", data);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('username', data.username);
            
            // Check if username is present in the response
            if (!data.username || data.username.trim() === '') {
                // If no username, redirect to set username page
                navigate('/set-username');
            } else {
                // If username exists, proceed to tasks
                navigate('/tasks');
            }
        } catch (error) {
            console.error('Google login error:', error);
        }

    }

    const login = useGoogleLogin({
        onSuccess:handleGoogleLogin,
        flow:"auth-code"
    })
    // TODO: Need to remove a button in these two
    return (
        <div>

            <button onClick={() => login()}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full max-w-xs">
                <div>
                    <FaGoogle color="red" size={20}/>
                    Login with Google
                </div>
            </button>

            <GoogleLoginButton
                onSuccess={handleGoogleLogin}
                onError={() => onError?.('Google login failed')}
            />
        </div>
    );
};

export default GoogleLogin;
