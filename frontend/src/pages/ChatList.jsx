import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [myId, setMyId] = useState(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) {
            navigate('/');
        } else {
            setMyId(userId);
        }
    }, [userId, navigate]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/users/all-users");
                setUsers(res.data);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <div style={{ marginBottom: "10px" }}>
                <button onClick={() => navigate('/profile')}>Profile</button>
            </div>

            {users
                .filter(user => user.id !== myId)
                .map(user => (
                    <div key={user.id} style={{ marginBottom: "10px" }}>
                        <span>{user.username} ({user.userid})</span>
                        <button style={{ marginLeft: "10px" }}
                            onClick={() =>
                                navigate('/message-chat', {
                                    state: {
                                        fromid: Number(myId),
                                        toid: user.id,
                                        toname: user.username
                                    }
                                })
                            }>
                            msg
                        </button>
                    </div>
                ))
            }
        </div>
    );
};

export default ChatList;