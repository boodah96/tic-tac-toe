// const { emit } = require("node:process");

const options = {
    transports: ['websocket'],
  };
  const socket = io('localhost:3030/', options); // emmit connection event to server
let trigger=false;
let room;
$("#game").hide()
$("#div").text("Waiting")
  const player={name:"player1"}
  socket.on("connect",()=>{
  socket.on("waiting",value=>{
    trigger=true
  console.log("waiting")
})
//----------Start
socket.on("start",(value)=>{
  $("#game").show()

  console.log("Start")
room=value
$("#div").text("Start")
if(trigger){

  $("#button").attr('disabled', false);

}else{
  $("#button").attr('disabled', true);
}
//--------When Clicked
  })
  socket.on("touched",()=>{
    $("#button").attr("disabled",false)
  })
  
  $("#button").on("click",()=>{
    $("#button").attr('disabled', true);
    socket.emit("click")
})
    
// $("#form1").on("submit",(e)=>{
//   e.preventDefault()
//   let msg = e.target.player1.value
//   // console.log(e.target.player1.value)
//   socket.emit("msg1",msg)
// })
})







  