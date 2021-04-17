const options = {
  transports: ['websocket'],
};
const socket = io('localhost:3030/', options); // emmit connection event to server
let trigger = false;
let room;
let arr = []
let arr2 = []
let symbol = ["O", "X"]
let playerSymbol = "O";
let press = 0;
let check = false;
$("#draw").hide()
let x = [
  ["", '', ''],
  ['', '', ''],
  ['', '', ''],
];
console.log(x)
$("#wine").hide()
$("#lose").hide()

$("#game").hide()

const player = { name: "player1" }
socket.on("connect", () => {
  socket.on("waiting", value => {
    playerSymbol = "X"
    $("#wait").show()


    console.log("waiting")
    trigger = true

  })
  //----------Start
  socket.on("start", (value) => {
    $("#game").show()
    $("#wait").hide()

console.log("ee")
    room = value
    $("#div").text("Start")
    if (trigger) {
$("#turn").text("Your Turn")
      $(".button").attr('disabled', false);

    } else {
      $("#turn").text("Opponent Turn")

      $(".button").attr('disabled', true);
    }
    //--------When Clicked
  })
  socket.on("touched", (value) => {
    $("#turn").text("Your Turn")

    press = value.press
    if (press == 9) {
      // $("#game").hide()
      $("#draw").show();
      socket.emit("draw",room)
    }
    $(".button").attr("disabled", false)
    if (!trigger) {
      value.arr.forEach(element => {
        $(`#button${element}`).attr("disabled", true)
        $(`#button${element}`).text(symbol[1])
      });
      arr2.forEach(element => {
        $(`#button${element}`).attr("disabled", true)
        $(`#button${element}`).text(symbol[0])
      });
    } else {
      value.arr.forEach(element => {
        $(`#button${element}`).attr("disabled", true)
        $(`#button${element}`).text(symbol[0])
      });
      arr2.forEach(element => {
        $(`#button${element}`).attr("disabled", true)
        $(`#button${element}`).text(symbol[1])
      });
    }


  })

  $(".button").on("click", function () {
    press++
    $("#turn").text("Opponent Turn")
    console.log(press)
    let valueOfButton = $(this).val()
    $(this).text(playerSymbol.toUpperCase())
    arr.push(valueOfButton)
    arr2.push(valueOfButton)
    $(".button").attr('disabled', true);
    if (valueOfButton >= 0 && valueOfButton <= 3) {
      x[0][valueOfButton - 1] = playerSymbol

    } else if (valueOfButton >= 4 && valueOfButton <= 6) {
      x[1][valueOfButton - 4] = playerSymbol
    }
    else if (valueOfButton >= 7 && valueOfButton <= 9) {
      x[2][valueOfButton - 7] = playerSymbol
    }
    let checking = detectTicTacToeWin(x)
    if (checking == playerSymbol) {
      // $("#game").hide()
      $("#wine").show()
      socket.emit("lose",room)
    }
    socket.emit("click", { arr: arr, press: press ,room:room})
  })
  socket.on("loser", () => {
    // $("#game").hide()
    $("#lose").show()

  })
  socket.on("playerDraw", () => {
    // $("#game").hide()
    $("#draw").show()
  })
  socket.on("playerDisc",function(){
    // $(this).load("playerDisc.html");

    
    window.location.href = "./playerDisc.html";
    // $("#wine").show();

    // console.log("disconnection")
  })
})
///-----function of game
const detectTicTacToeWin = (board) => {
  // Solution code here...
  let xoArr = board.flat();
  if ((xoArr[0] === xoArr[1] && xoArr[1] === xoArr[2]) && xoArr[0] !== "") {
    return xoArr[0]
    // return true;
  } else if ((xoArr[3] === xoArr[4] && xoArr[4] === xoArr[5]) && xoArr[3] !== "") {
    return xoArr[3]
    // return true;
  } else if ((xoArr[6] === xoArr[7] && xoArr[7] === xoArr[8]) && xoArr[6] !== "") {
    return xoArr[6]
    // return true;
  }
  // For columns
  if ((xoArr[0] === xoArr[3] && xoArr[3] === xoArr[6]) && xoArr[0] !== "") {
    return xoArr[3]
    // return true;
  } else if ((xoArr[1] === xoArr[4] && xoArr[4] === xoArr[7]) && xoArr[1] !== "") {
    return xoArr[4]
    // return true;
  } else if ((xoArr[2] === xoArr[5] && xoArr[5] === xoArr[8]) && xoArr[2] !== "") {
    return xoArr[5]
    // return true;
  }
  // For diagonals
  if ((xoArr[0] === xoArr[4] && xoArr[4] === xoArr[8]) && xoArr[0] !== "") {
    return xoArr[4]
    // return true;
  } else if ((xoArr[2] === xoArr[4] && xoArr[4] === xoArr[6]) && xoArr[2] !== "") {
    return xoArr[4]
    // return true;
  }
  return 'Draw';
};