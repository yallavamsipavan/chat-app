import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditProfile = () => {
    const location = useLocation();
    const { id, prevUserid, prevUsername } = location.state;
    const [userid, setUserid] = useState(prevUserid);
    const [username, setUsername] = useState(prevUsername);
    const navigate = useNavigate();

    const updateUserDetails = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/users/update-profile', { id, username, userid });
            localStorage.setItem('user', JSON.stringify(res.data));
            localStorage.setItem('userUserid', userid);
            localStorage.setItem('userUsername', username);
            navigate('/profile');
        } catch (err) {
            console.error(err);
            alert('Update failed');
        }
    };

    return (
        <div>
            <label>Name : <input type="text" value={username} onChange={e => setUsername(e.target.value)} /></label>
            <label>ID   : <input type="text" value={userid} onChange={e => setUserid(e.target.value)} /></label>
            <button onClick={updateUserDetails}>Update</button>
        </div>
    );
};

export default EditProfile;