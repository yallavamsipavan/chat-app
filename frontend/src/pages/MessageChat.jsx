import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './MessageChat.css';
import { FaArrowLeft } from "react-icons/fa";

const socket = io("http://localhost:5000");

const MessageChat = () => {
    const location = useLocation();
    const { fromid, toid, toname } = location.state;
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/chats/history', { fromid, toid });
                setMessages(response.data);
            } catch (err) {
                console.error(`Message fetching error: ${err}`);
            }
        };
        fetchMessages();

        socket.on("receive_message", (data) => {
            const isRelevant = 
                (data.fromid === fromid && data.toid === toid) || 
                (data.fromid === toid && data.toid === fromid);
            if (isRelevant) {
                setMessages(prev => [...prev, data]);
            }
        });

        return () => {
            socket.off("receive_message");
        };
    }, [fromid, toid]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = () => {
        if (message.trim() === '') return alert('Empty message');
        socket.emit("send_message", { fromid, toid, message });
        setMessage('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') sendMessage();
    };

    return (
        <div className="messagechat-complete">
            <div className="messagechat-main">
                <div className="messagechat-top">
                    <button onClick={() => navigate(-1)}
                            style={{
                                background: 'none',
                                border: 'none'
                            }}>
                        <FaArrowLeft size={24} color="#333" />
                    </button>
                    <h1>{toname}</h1>
                </div>
                <div className="messages">
                    {messages.length === 0 ? (
                        <div className="placeholder">No messages yet</div>
                    ) : (
                        messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message ${msg.fromid === fromid ? 'sent' : 'recieved'}`}>
                                {msg.message}
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="messagechat-down">
                    <input 
                        className="messagechat-input"
                        placeholder="Message..." 
                        type="text" 
                        value={message} 
                        onChange={e => setMessage(e.target.value)} 
                        onKeyDown={handleKeyDown}
                    />
                    <button className="messagechat-button" onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default MessageChat;