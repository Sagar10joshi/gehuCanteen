import React, { useState } from "react";
import Lottie from "react-lottie";
import regiAnima from "./images/Regist.json";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./Register.css";
import "./Phonelog.css"

const Register = () => {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [role, setRole] = useState('user');  // Added state for 'role'
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Correctly defined here

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: regiAnima,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Clear any previous error messages
    setSuccessMessage(''); // Clear any previous success messages

    // Check if fields are empty
    if (!name || !email || !password || !confirmPassword || !role) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Both passwords should match!');
      return;
    }
    // Validate email domain
    if (!email.endsWith('@gehu.ac.in')) {
      setErrorMessage('Email must be a gehu.ac.in address.');
      return;
    }

    try {
      const response = await fetch('https://gehu-canteen-5ni8-sagars-projects-0f20619e.vercel.app/register', {
        method: 'POST',
        // credentials: "include", // Include cookies
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`,  // if you're sending a JWT
        },
        body: JSON.stringify({ name, email, password,confirmPassword, role }), // Send the role in request
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successfull");
        setSuccessMessage('Registration successful!');

        localStorage.setItem("role", JSON.stringify({role}));
        // console.log(role);
        
        // sessionStorage.setItem('token', data.token);
        if (data.redirect) {
          // Assuming navigate function exists or react-router is used
          navigate(data.redirect); 
        }
        setname('');
        setEmail('');
        setPassword('');
        setconfirmPassword('');
        setRole('user'); // Reset role to default value
      } else {
        setErrorMessage(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error occurred during registration:', error); // Log the error
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
      <div id="lotti2"><Lottie options={defaultOptions} /></div>
      </div>
      <div className="register-right">
        <h2>Create account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            required
          />

          <label htmlFor="role">Role:</label>
          <select id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="owner">Owner</option>
          </select>

          <div className="terms">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">I agree to terms & conditions</label>
          </div>

          <button type="submit">Sign up</button>
        </form>



        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        <p>
          Already have an account? <a href="/login">Sign in Here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
