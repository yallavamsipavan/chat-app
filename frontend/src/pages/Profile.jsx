import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div>
            <label>Name : {user.username}</label>
            <label>ID   : {user.userid}</label>
            <button onClick={() => navigate('/edit-profile', { state: {id: user.id, prevUserid: user.userid, prevUsername: user.username} })}>Edit</button>
            <button onClick={() => navigate('/change-password', { state: { userid: user.userid, prevPassword: user.password } })}>Change password</button>
        </div>
    );
};

export default Profile;