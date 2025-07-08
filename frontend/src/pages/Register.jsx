import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Register.css'

const Register = () => {
    const[username, setUsername] = useState('');
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword) return alert('Passwords mismatch');
        try {
            await axios.post(`http://localhost:5000/api/auths/register`, { username, userid, password });
            navigate('/');
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <div className="register-complete">
            <div className="complete">
            <form onSubmit={handleRegister}>
                <input placeholder="Username" onChange={e => setUsername(e.target.value)} required />
                <input placeholder="User ID" onChange={e => setUserid(e.target.value)} required />
                <input placeholder="Password" onChange={e => setPassword(e.target.value)} required />
                <input placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)} required />
                <button type="submit">Register</button>
                <p onClick={() => navigate('/')}>Already have an account? Login</p>
            </form>
            </div>
        </div>
    )
};
export default Register;