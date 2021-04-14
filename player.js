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
$("#div").text("Waiting")
const player = { name: "player1" }
socket.on("connect", () => {
  socket.on("waiting", value => {
    playerSymbol = "X"

    trigger = true

  })
  //----------Start
  socket.on("start", (value) => {
    $("#game").show()

    room = value
    $("#div").text("Start")
    if (trigger) {

      $(".button").attr('disabled', false);

    } else {
      $(".button").attr('disabled', true);
    }
    //--------When Clicked
  })
  socket.on("touched", (value) => {
    press = value.press
    if (press == 9) {
      $("#game").hide()
      $("#draw").show()
      socket.emit("draw")
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
      $("#game").hide()
      $("#wine").show()
      socket.emit("lose")
    }
    socket.emit("click", { arr: arr, press: press })
  })
  socket.on("loser", () => {
    $("#game").hide()
    $("#lose").show()

  })
  socket.on("playerDraw", () => {
    $("#game").hide()
    $("#draw").show()
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