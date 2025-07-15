import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import './FriendProfile.css';

const FriendProfile = () => {
    const location = useLocation();
    const { myid, friendid, frienduserid, friendname, friendbio } = location.state;
    const navigate = useNavigate();
    return (
        <div className="friendprofile-complete">
            <div className="friendprofile-main">
                <button onClick={() => navigate(-1)} style={{
                    background: 'none',
                    border: 'none',
                    alignSelf: 'self-start'
                }}><FaArrowLeft size={24} color="#333" /></button>
                <img className="friendprofile-image" src={require('../assets/defaultImage.jpg')} alt="" />
                <label className="friendprofile-label">{ "Name  : " + friendname }</label>
                <label className="friendprofile-label">{ "ID  : " + frienduserid }</label>
                <label className="friendprofile-label">{ "Bio  : " + friendbio }</label>
                <button className="friendprofile-button" onClick={() => navigate('/message-chat', {
                    state: {
                        fromid: myid,
                        toid: friendid,
                        touserid: frienduserid,
                        toname: friendname,
                        tobio: friendbio
                    }
                })}>Message</button>
            </div>
        </div>
    );
};

export default FriendProfile;