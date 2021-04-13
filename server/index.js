const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3030;
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
require('dotenv').config();
let currentRoom;
io.listen(server);
app.use(cors());

app.get('/api', (req, res) => {
    res.json({ data: 'tic tac toe' });
});
io.on('connection', (socket) => {

    console.log('a user Connected', socket.id);


});

server.listen(PORT, () => console.log('Listening on PORT ' + PORT));