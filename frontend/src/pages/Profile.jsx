import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        const id = localStorage.getItem('userId');
        fetch(`http://localhost:5000/api/users/${id}`)
            .then(res => res.json())
            .then(data => setUser(data));
    }, []);

    return (
        <div className="profile-complete">
            <div className="profile-main">
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', alignSelf: "flex-start" }}>
                    <FaArrowLeft size={24} color="#333" />
                </button>
                <img className="profile-image" src={require('../assets/defaultImage.jpg')} alt="" />
                <label className="profile-label">Name : {user.username}</label>
                <label className="profile-label">ID   : {user.userid}</label>
                <label className="profile-label">{user.bio}</label>
                <button onClick={() => navigate('/edit-profile', { state: {id: user.id, prevUserid: user.userid, prevUsername: user.username, prevBio: user.bio} })}>Edit</button>
                <button onClick={() => navigate('/change-password', { state: { userid: user.userid, prevPassword: user.password } })}>Change password</button>
            </div>
        </div>
    );
};

export default Profile;