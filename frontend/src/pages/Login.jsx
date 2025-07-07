import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:5000/api/auths/login`, { userid, password });
            const user = res.data;
            if(!user || !user.id) throw new Error('Unexpected response format from server');
            localStorage.setItem('userId', user.id);
            navigate('/chatlist');
        } catch (err) {
            alert(`Login failed: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input placeholder="User ID" onChange={e => setUserid(e.target.value)} required />
            <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} required />
            <button type="submit">Sign In</button>
            <p onClick={() => navigate('/register')}>Don't have an account? Register</p>
            <p onClick={() => navigate('/forgot-password')}>Forgot Password?</p>
        </form>
    );
};
export default Login;