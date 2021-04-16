'use strict'
const express = require('express');
const cors = require('cors');
const http = require('http');
const app=express();
const server=http.createServer(app);
const io = require('socket.io')(http);
const fs =require("fs")
// const path = require('path');
const PORT=3000;
let currentRoom;
io.listen(server);
app.use(cors());
let client=0;
 let trigger=true;
io.on('connection', (socket) => {
   // console.log(client,"dddd")
let room="a"   
   client++
   console.log(client)
    socket.join(room)

   if(client==1){
      console.log("in")
      // console.log(socket.id)
      socket.emit("waiting")
   }else if(client==2){
      trigger= false
client=0
   socket.nsp.to(room).emit("start",room)
   
   }else{
   }
   socket.on('disconnect', () => {
   if(client>0){
   client--;
   }
    });
    socket.on("click",(value)=>{
       
       socket.to(room).emit("touched",value)
    })   

    socket.on("lose",()=>{
     socket.to(room).emit("loser")

    })
    socket.on("draw",()=>{
       socket.to(room).emit("playerDraw")
    })
});
server.listen(PORT, () => console.log('Listening on PORT ' + PORT));