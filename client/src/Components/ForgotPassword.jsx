import React, { useState } from 'react';
import axios from 'axios';

const ForgotResetPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [mode, setMode] = useState('forgot'); // 'forgot' or 'reset'

    const handleForgotPassword = async () => {
        try {
            const response = await axios.post('http://localhost:3000/forgot-password', { email });
            setMessage(response.data.message);
            setMode('reset');
        } catch (error) {
            console.error('Error: ', error.response.data.message);
            setMessage(error.response.data.message);
        }
    };

    const handleResetPassword = async () => {
        try {
            const response = await axios.post('http://localhost:3000/reset-password', { email, otp, newPassword });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error: ', error.response.data.message);
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className='container ForgotPasswordSection'>
            <div className='forgotpassCss'>
            <h2>{mode === 'forgot' ? 'Forgot Password' : 'Reset Password'}</h2>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {mode === 'forgot' ? (
                <button onClick={handleForgotPassword}>Send OTP</button>
            ) : (
                <>
                    <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <button onClick={handleResetPassword}>Reset Password</button>
                </>
            )}
            {message && <p>{message}</p>}
        </div>
        </div>
    );
};

export default ForgotResetPassword;
