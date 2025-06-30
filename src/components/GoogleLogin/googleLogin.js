import React from 'react';
import { GoogleLogin as GoogleLoginButton, useGoogleLogin } from '@react-oauth/google';
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
            navigate('/tasks');
            window.location.reload();
        } catch (error) {
            console.error('Google login error:', error);
        }

    }

    const login = useGoogleLogin({
        onSuccess:handleGoogleLogin,
        flow:"auth-code"
    })

    return (
        <GoogleLoginButton
            onSuccess={login}
            onError={() => onError?.('Google login failed')}
        />
    );
};

export default GoogleLogin;
