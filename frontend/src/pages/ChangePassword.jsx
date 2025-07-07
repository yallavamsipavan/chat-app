import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const location = useLocation();
    const { userid, prevPassword } = location.state;
    const navigate = useNavigate();

    const ChangePassword = async () => {
        if(password !== confirm) return alert('Passwords mismatch');
        if(password === prevPassword) return alert('Same as previous password');
        await axios.post(`http://localhost:5000/api/users/change-password`, { userid, password });
        alert('Password updated');
        navigate('/profile');
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <input type="password" placeholder="New Password" onChange={e => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" onChange={e => setConfirm(e.target.value)} />
            <button onClick={ChangePassword}>Submit</button>
        </div>
    );
};
export default ChangePassword;