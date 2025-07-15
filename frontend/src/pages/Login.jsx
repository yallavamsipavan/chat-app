import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auths/login', { userid, password });
            const user = res.data;
            if(!user || !user.id) throw new Error('Unexpected response format from server');
            localStorage.setItem('userId', user.id);
            localStorage.setItem('userUserid', user.userid);
            navigate('/chatlist');
        } catch (err) {
            alert(`Login failed: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div className="login-complete">
            <div className="complete">
            <form onSubmit={handleLogin}>
                <input className="login-input" placeholder="User ID" onChange={e => setUserid(e.target.value)} required />
                <input className="login-input" placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} required />
                <button className="login-button" type="submit">Sign In</button>
                <p className="login-p" onClick={() => navigate('/register')}>Don't have an account? Register</p>
            </form>
            </div>
        </div>
    );
};

export default Login;