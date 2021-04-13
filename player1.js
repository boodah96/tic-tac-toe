// const { emit } = require("node:process");

const options = {
    transports: ['websocket'],
  };
  const socket = io('localhost:3030/', options); // emmit connection event to server

  const player={name:"player1"}
  socket.on("connect",()=>{
    //   console.log("client listener")
socket.on("hello",()=>{
    console.log("eeee")
})


socket.emit("room",(player))



$("#form1").on("submit",(e)=>{
    e.preventDefault()
    let msg = e.target.player1.value
    // console.log(e.target.player1.value)
    socket.emit("msg1",msg)
})

  })