import React from 'react';
import { GoogleLogin as GoogleLoginButton, useGoogleLogin } from '@react-oauth/google';
import {FcGoogle} from "react-icons/fc";
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
    return (
        <div className="w-full max-w-xs">
            <div className="relative flex items-center justify-center my-4">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                <span className="px-3 text-gray-600 dark:text-gray-300 text-sm bg-white dark:bg-gray-800">OR</span>
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            
            <button 
                onClick={() => login()}
                className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors"
            >
                <div className="relative w-5 h-5 mr-2">
                <FcGoogle size={20}/>
                </div>
                Continue with Google
            </button>
        </div>
    );
};

export default GoogleLogin;
