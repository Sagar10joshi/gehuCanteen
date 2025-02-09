import React, { useState } from "react";
import Lottie from "react-lottie";
import loginAnima from "./images/Animation1.json";
import { useNavigate } from 'react-router-dom';
import "./Register.css";
import "./Phonelog.css"

const Login = () => {
    const [name, setname] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // Correctly defined here

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loginAnima,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!name || !password) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                credentials: "include", // Include cookies
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            });

            const data = await response.json();
            console.log('Response Data:', data); // Log the response for debugging

            if (response.ok) {
                setSuccessMessage('Logged in successful!');
                // Store the token in sessionStorage (or localStorage for persistence)
                sessionStorage.setItem('token', data.token);
                if (data.redirect) {
                    navigate(data.redirect); // Navigate to the correct page after successful login
                }
                setSuccessMessage(data.message);
            } else {
                setErrorMessage(data.message || 'Login failed.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="register-container">
            <div className="register-left">
                <div id="lotti2"><Lottie options={defaultOptions} /></div>
            </div>
            <div className="register-right">
                <h2>Log In</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        required 
                    />

                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />

                    <button type="submit">Sign in</button>
                </form>

                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
                <p>
                    Don't have an account? <a href="/register">Sign up Here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;

