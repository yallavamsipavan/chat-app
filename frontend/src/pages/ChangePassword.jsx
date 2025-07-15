import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import './ChangePassword.css';

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
        navigate(-1);
    };

    return (
        <div className="changepassword-complete">
            <div className="changepassword-main">
                <h2 style={{ display: 'flex', flexDirection: 'column' }}>
                    <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', alignSelf: 'start', padding: '0px' }}>
                        <FaArrowLeft size={24} color="#333" />
                    </button>
                    Reset Password
                </h2>
                <div className="changepassword-label-input">
                    <label className="changepassword-label">New Password</label>
                    <input className="changepassword-input" type="password" placeholder="New Password" onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="changepassword-label-input">
                    <label className="changepassword-label">Confirm Password</label>
                    <input className="changepassword-input" type="password" placeholder="Confirm Password" onChange={e => setConfirm(e.target.value)} />
                </div>
                <button className="changepassword-button" onClick={ChangePassword}>Submit</button>
            </div>
        </div>
    );
};
export default ChangePassword;