import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import ChatList from "./pages/ChatList";
import MessageChat from "./pages/MessageChat";
import EditProfile from "./pages/EditProfile";
import FriendProfile from "./pages/FriendProfile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatlist" element={<ChatList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/message-chat" element={<MessageChat />} />
        <Route path="/friend-profile" element={<FriendProfile />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;