const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());
const PORT = 5000;

io.on('connection', (socket) => {
    socket.on('send_message', (data) => {
        const { fromid, toid, message } = data;
        db.query('INSERT INTO chats (fromid, toid, message) VALUES (?, ?, ?)', [fromid, toid, message], (err) => {
            if (err) return console.error(`DB error: ${err}`);
            io.emit('receive_message', data);
        });
    });
    socket.on('disconnect', () => {
    });
});

app.post('/api/auths/register', async (req, res) => {
    const { username, userid, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    db.query('INSERT INTO users (username, userid, password) VALUES (?, ?, ?)', [username, userid, hash], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'User registered' });
    });
});

app.post('/api/auths/login', (req, res) => {
    const { userid, password } = req.body;
    db.query('SELECT * FROM users WHERE userid = ?', [userid], async (err, result) => {
        if (err) return res.status(500).send({ message: 'Server error' });
        if (result.length === 0) return res.status(401).send({ message: 'Invalid credentials' });
        const user = result[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).send({ message: 'Wrong password' });
        res.send(user);
    });
});

app.get('/api/users/all-users', (req, res) => {
    db.query('SELECT id, username, userid, bio FROM users', (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT id, userid, username, bio FROM users WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).send({ message: 'Server error' });
        if (result.length === 0) return res.status(404).send({ message: 'User not found' });
        res.send(result[0]);
    });
});

app.get('/api/users/search', (req, res) => {
    const { keyword } = req.query;
    db.query('SELECT id, username, userid FROM users WHERE username LIKE ? OR userid LIKE ?', [`%${keyword}%`, `%${keyword}%`], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

app.post('/api/users/update-profile', (req, res) => {
    const { id, username, userid, bio } = req.body;
    db.query('UPDATE users SET username = ?, userid = ?, bio = ? WHERE id = ?', [username, userid, bio, id], (err) => {
        if (err) return res.status(500).send({ message: 'Update failed' });
        db.query('SELECT id, userid, username, bio FROM users WHERE id = ?', [id], (err, result) => {
            if (err) return res.status(500).send({ message: 'Fetch failed' });
            if (result.length === 0) return res.status(404).send({ message: 'User not found' });
            res.send(result[0]);
        });
    });
});

app.post('/api/users/change-password', async (req, res) => {
    const { userid, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    db.query('UPDATE users SET password = ? WHERE userid = ?', [hash, userid], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Password updated' });
    });
});

app.post('/api/chats/history', (req, res) => {
    const { fromid, toid } = req.body;
    db.query('SELECT * FROM chats WHERE (fromid = ? AND toid = ?) OR (fromid = ? AND toid = ?) ORDER BY id', [fromid, toid, toid, fromid], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

app.post('/api/chats/send', (req, res) => {
    const { fromid, toid, message } = req.body;
    db.query('INSERT INTO chats (fromid, toid, message) VALUES (?, ?, ?)', [fromid, toid, message], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Message sent' });
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});