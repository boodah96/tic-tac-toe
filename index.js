const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(http);
const PORT =  3030;
// const { v4: uuidv4 } = require('uuid');
// const mongoose = require('mongoose');
// require('dotenv').config();
let currentRoom;
io.listen(server);
app.use(cors());


io.on('connection', (socket) => {
    console.log("client connected");
    socket.emit("hello")
    // socket.on("changeColor",()=>{
currentRoom="game1"
        
    // })
    socket.on("room",(value)=>{
        socket.join(currentRoom)
    })
    socket.on("changingText",()=>{

        socket.in(currentRoom).emit("changeValue")

    })

    socket.on("msg1",value=>{
        console.log(value)
socket.in(currentRoom).emit("displayMsg",value)

    })
});
server.listen(PORT, () => console.log('Listening on PORT ' + PORT));