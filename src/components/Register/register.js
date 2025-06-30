import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';
import {sitekey} from "../../constants/constants";

const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [recaptchaValue, setRecaptchaValue] = useState(null);


    const handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                password2: password2,
                recaptcha_token: recaptchaValue
            }),
        });

        const data = await response.json();
        console.log("Response Status:", data);
        console.log("username:", data.username);
        console.log("email:", data.email);
        if (response.status === 201) {
            // Redirect to tasks page if login is successful
            console.log("New User created");
            navigate('/login');
        } else {
            setError(data.error || 'Login failed');
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>

                <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="username"
                               className="block text-sm font-medium text-gray-700">Username</label>
                        <input type="text" name="username" id="username" required
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}

                               className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" name="email" id="email" required
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}

                               className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>

                    <div>
                        <label htmlFor="password"
                               className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" name="password" id="password" required
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}

                               className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>

                    <div>
                        <label htmlFor="password2" className="block text-sm font-medium text-gray-700">Confirm
                            Password</label>
                        <input type="password" name="password2" id="password2" required
                               value={password2}
                               onChange={(e) => setPassword2(e.target.value)}
                               className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>


                    <div>
                        <ReCAPTCHA
                            sitekey={sitekey}
                            onChange={(value) => setRecaptchaValue(value)}
                        />

                        <button disabled={!recaptchaValue}
                                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                            Register
                        </button>
                    </div>
                </form>


                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?
                    <a href="/login/" className="text-indigo-600 hover:text-indigo-500 font-semibold">Login</a>
                </p>
            </div>
        </div>
    );

}


export default Register;