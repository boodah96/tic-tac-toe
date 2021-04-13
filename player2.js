// const { emit } = require("node:process");

const options = {
    transports: ['websocket'],
  };
  const socket = io('localhost:3030/', options); // emmit connection event to server

  const player={name:"player1"}
  socket.on("connect",()=>{

    socket.emit("changeColor")
socket.on("hello",()=>{
    // console.log("eeee")

})

socket.emit("room",(player))

socket.on("displayMsg",value=>{
    console.log("yyyy")
    $("#div").text(value)
})

  })