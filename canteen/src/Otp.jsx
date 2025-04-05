import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import otpimage from './images/Otpbg.jpg'

const OTPVerification = () => {
    const [otp, setOtp] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Correctly defined here

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage(''); // Clear any previous error messages
        //navigate('/'); // Navigate to quiz page
    
        // Check if OTP is empty
        if (!otp) {
            setErrorMessage('Please fill in all fields.');
            return;
        }
        const token = sessionStorage.getItem('token');

        if (!token) {
            setErrorMessage('Token is missing. Please login again.');
            return;
        }
    
        try {
            const response = await fetch('https://gehu-canteen-n6r8-sagars-projects-0f20619e.vercel.app/otp', {
                method: 'POST',
                credentials: "include", // Include cookies
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the token
                },
                body: JSON.stringify({ otp }),
            });
    
            const data = await response.json();
            console.log('Response data:', data);
            
    
            if (response.ok) {
                if (data.redirect) {
                    navigate(data.redirect); // Navigate to OTP page
                }
                console.log('OTP verified:', data.message);
                // Handle success (e.g., redirect or show success message)
            } else {
                console.error('Error:', response.status, response.statusText);
                setErrorMessage(data.message || 'Verification failed.');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div style={styles.body}>
        <div style={styles.container}>
            <h1>OTP Verification</h1>
            <form onSubmit={handleSubmit} id="otpform">
                <div style={styles.formGroup}>
                    <label htmlFor="otp">OTP</label>
                    <input
                        type="text"
                        id="otp"
                        name="otp"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Verify OTP</button>
            </form>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </div>
        </div>
    );
};

const styles = {

    body: {

        fontFamily: "'Arial', sans-serif",
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // backgroundImage: `url(${otpimage})`, // Using imported image
        position: "relative",
        overflow: "hidden",
        color: "white",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"

    },
    container: {
        background: 'white',
        borderRadius: '15px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        padding: '30px',
        width: '300px',
        textAlign: 'center',
        margin: 'auto',
        marginTop: '20vh',
    },
    formGroup: {
        marginBottom: '15px',
        textAlign: 'left',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        transition: 'border-color 0.3s',
    },
    button: {
        background: '#ff7e5f',
        color: 'white',
        border: 'none',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s',
    },
};

// Add hover effect via CSS-in-JS
const buttonHoverStyle = {
    background: '#feb47b',
};

export default OTPVerification;
