// DOM Variables
const btnRef = document.querySelectorAll(".button-option");
const popupRef = document.querySelector(".popup");
const newgameBtn = document.getElementById("new-game");
const restartBtn = document.getElementById("restart");
const msgRef = document.getElementById("message");
const playerTurn = document.querySelector(".player-turn");

// Winning Pattern Array
const winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

// Player 'X' plays first
let xTurn = true;
let count = 0;

// Disable All Buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    // Enable popup
    popupRef.classList.remove("hide");
};

// Enable all buttons (For New Game and Restart)
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    // Disable popup
    popupRef.classList.add("hide");
};

// Win victory
const winFunction = (letter) => {
    disableButtons();
    if (letter === "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
    } else {
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
    }
};

// Function for draw
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

// New Game
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
    playerTurn.innerText = "X's Turn.";
    xTurn = true;
});

restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
    playerTurn.innerText = "X's Turn.";
    xTurn = true;
});

// Win Logic
const winChecker = () => {
    // Loop through all win patterns
    for (const i of winningPattern) {
        const [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        // Check if elements are filled
        // If 3 empty elements are the same and would give win as would
        if (element1 !== "" && element2 !== "" && element3 !== "") {
            if (element1 === element2 && element2 === element3) {
                // If all 3 buttons have the same values then pass the value to winFunction
                winFunction(element1);
            }
        }
    }
};

// AI Move
const makeAIMove = () => {
    const emptyButtons = Array.from(btnRef).filter((btn) => btn.innerText === "");
    if (emptyButtons.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyButtons.length);
        emptyButtons[randomIndex].innerText = "O";
        emptyButtons[randomIndex].disabled = true;
        count += 1;
        winChecker();
        xTurn = !xTurn;
        playerTurn.innerText = "X's Turn.";
    } else {
        drawFunction();
    }
};

// Display X/O on click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (element.innerText === "" && xTurn) {
            element.innerText = "X";
            element.disabled = true;
            count += 1;
            winChecker();
            xTurn = !xTurn;
            playerTurn.innerText = "O's Turn.";
            // Make AI move
            if (count < 9) {
                setTimeout(() => {
                    makeAIMove();
                }, 500);
            }
        }
    });
});

// Enable Buttons and disable popup on page load
window.onload = enableButtons;
