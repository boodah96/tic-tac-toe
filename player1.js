
const options = {
    transports: ['websocket'],
  };
  const socket = io('localhost:3030/', options); // emmit connection event to server
let trigger=false;
let room;
let arr=[]
let arr2=[]
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

  $(".button").attr('disabled', false);

}else{
  $(".button").attr('disabled', true);
}
//--------When Clicked
  })
  socket.on("touched",(value)=>{
    console.log(value)
    $(".button").attr("disabled",false)
    value.forEach(element => {
      $(`#${element}`).attr("disabled",true)

    });
    arr2.forEach(element => {
      $(`#${element}`).attr("disabled",true)

    });
    

  })
  
  $(".button").on("click",function(){

console.log($(this).val())
    // console.log($(".button").attr("class"))
    let valueOfButton=$(this).val()
arr.push(valueOfButton)
arr2.push(valueOfButton)
    $(".button").attr('disabled', true);
    socket.emit("click",arr)
})
    

})







  