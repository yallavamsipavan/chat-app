import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import './EditProfile.css';

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
            // navigate('/profile');
            navigate(-1);
        } catch (err) {
            console.error(err);
            alert('Update failed');
        }
    };

    return (
        <div className="editprofile-complete">
            <div className="editprofile-main">
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', alignSelf: 'flex-start'}}>
                    <FaArrowLeft size={24} color="#333" />
                </button>
                <div className="editprofile-label-input">
                    <label className="editprofile-label">Username</label>
                    <input className="editprofile-input" placeholder="Username..." type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="editprofile-label-input">
                    <label className="editprofile-label">User ID</label>
                    <input className="editprofile-input" placeholder="Userid..." type="text" value={userid} onChange={e => setUserid(e.target.value)} />
                </div>
                <button className="editprofile-button" onClick={updateUserDetails}>Update</button>
            </div>
        </div>
    );
};

export default EditProfile;