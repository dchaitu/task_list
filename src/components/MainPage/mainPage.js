import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
                <h1>To do List</h1>
                
                {/* navlink to login */}
                <Link to="/register" className="login-button"
                    onClick={handleSignUpClick}>
                    Sign Up
                </Link>

                <Link to="/login" className="login-button"
                    onClick={handleLoginClick}>
                    Login
                </Link>

            </header>
            <main className="landing-content">
                <h2>To do List</h2>
                <p>
                    To do List is your personal productivity tool that helps you keep track of all your tasks.
                    Whether you are managing a personal to-do list, team projects, or deadlines, this app has you
                    covered.
                </p>
                <p>
                    You can easily create, edit, and delete tasks, and categorize them based on their priority or
                    deadlines.
                    Stay on top of your workload and never miss an important task again!
                </p>
            </main>
        </div>
    );
};

export default MainPage;
