// DOM Variables
const btnRef = document.querySelectorAll(".button-option");
const popupRef = document.querySelector(".popup");
const newgameBtn = document.getElementById("new-game");
const restartBtn = document.getElementById("restart");
const msgRef = document.getElementById("message");
const playerTurn = document.querySelector(".player-turn")

//Winning Pattern Array
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //Player 'X' plays first
  let xTurn = true;
  let count = 0;

  //Disable All Buttons
  const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    //enable popup
    popupRef.classList.remove("hide");
  };

  //Enable all buttons (For New Game and Restart)
  const enableButtons = () => {
    btnRef.forEach((element) => {
      element.innerText = "";
      element.disabled = false;
    });
    //disable popup
    popupRef.classList.add("hide");
  };

  