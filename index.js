'use strict'
const express = require('express');
const cors = require('cors');
const http = require('http');
const app=express();
const server=http.createServer(app);
const io = require('socket.io')(http);
const fs =require("fs")
// const path = require('path');
const PORT=3030;
let currentRoom;
io.listen(server);
app.use(cors());
let client=0;
 let rooms=[]
 let index=0;
 let room

io.on('connection', (socket) => {
   // console.log(client,"dddd")
   client++

   console.log(client)
   console.log(index)

   // console.log(rooms[0])
   // console.log(socket.id)

   if(client%2!==0){
      index=client-index-1
      rooms.push(index) 
      
      console.log("rr")
      console.log(rooms[index])
      room=rooms[index]
      socket.Room=room
      socket.join(room)

      // console.log(socket.id)
      socket.emit("waiting")
   }else if(client%2==0){
      console.log("starting");
      console.log(rooms[index])
      socket.Room=room

      socket.join(room)

   index++
   socket.nsp.to(room).emit("start",room)
   
   }else{
   }
   socket.on('disconnect', (value) => {
      // console.log(socket.Room,"EEEEEEEEEEEEEEEEE")
   if(client>0){
   client--;
   }

   if(client%2==0&&index>0){
      index--
      rooms.pop()

   }
   // console.log(socket.Room,"eeeeeeeeeeeeee")
   socket.to(socket.Room).emit("playerDisc")
    });
    socket.on("click",(value)=>{
       
       socket.to(value.room).emit("touched",value)
    })   

    socket.on("lose",(value)=>{
     socket.to(value).emit("loser")

    })
    socket.on("draw",(value)=>{
       socket.to(value).emit("playerDraw")
    })
});
server.listen(PORT, () => console.log('Listening on PORT ' + PORT));