import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './mainPage.css';  // Import the CSS file


const MainPage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');  // Redirect to login page on button click
    };

    const handleSignUpClick = () => {
        navigate('/register');
    }



    return (
        <div className="landing-container">
            <header className="landing-header">
                <h1>Task Manager</h1>
                <button className="login-button" onClick={handleSignUpClick}>
                    Sign Up
                </button>

                <button className="login-button" onClick={handleLoginClick}>
                    Login
                </button>
            </header>
            <main className="landing-content">
                <h2>Welcome to Task Manager</h2>
                <p>
                    Task Manager is your personal productivity tool that helps you keep track of all your tasks.
                    Whether you are managing a personal to-do list, team projects, or deadlines, this app has you
                    covered.
                </p>
                <p>
                    You can easily create, edit, and delete tasks, and categorize them based on their priority or
                    deadlines.
                    Stay on top of your workload and never miss an important task again!
                </p>
                <button className="get-started-button" onClick={handleLoginClick}>
                    Get Started
                </button>
            </main>
        </div>
    );
};

export default MainPage;
