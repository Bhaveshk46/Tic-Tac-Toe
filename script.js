const gameBoard = (()=>{
    const board = [];

    //creation of slots for game
    for(let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
        board[i].push(" ");
    }
}
const getBoard = () =>{
    return board;
}

function playGame(row, column, mark) {
    function placeMark() {
        if (board[row][column] === " ") {
            board[row][column] = mark;
        }
        else {
            console.log("cant fill");
        }
    }


}

return {
    getBoard,
    playGame,
}
})();


//Creation of basic structure using DOM
const body = document.querySelector("body");
const container = document.createElement("div")
container.setAttribute("id", "container")
body.appendChild(container)

const button1 = document.createElement("button");
button1.dataset.row = 0
button1.dataset.column = 0
button1.setAttribute("id", "button1")

const button2 = document.createElement("button");
button2.dataset.row = 0
button2.dataset.column = 1
button2.setAttribute("id", "button2")

const button3 = document.createElement("button");
button3.dataset.row = 0
button3.dataset.column = 2
button3.setAttribute("id", "button3")

const button4 = document.createElement("button");
button4.dataset.row = 1
button4.dataset.column = 0
button4.setAttribute("id", "button4")

const button5 = document.createElement("button");
button5.dataset.row = 1
button5.dataset.column = 1
button5.setAttribute("id", "button5")

const button6 = document.createElement("button");
button6.dataset.row = 1
button6.dataset.column = 2
button6.setAttribute("id", "button6")

const button7 = document.createElement("button");
button7.dataset.row = 2
button7.dataset.column = 0
button7.setAttribute("id", "button7")

const button8 = document.createElement("button");
button8.dataset.row = 2
button8.dataset.column = 1
button8.setAttribute("id", "button8")

const button9 = document.createElement("button");
button9.dataset.row = 2
button9.dataset.column = 2
button9.setAttribute("id", "button9")

container.appendChild(button1)
container.appendChild(button2)
container.appendChild(button3)
container.appendChild(button4)
container.appendChild(button5)
container.appendChild(button6)
container.appendChild(button7)
container.appendChild(button8)
container.appendChild(button9)

//swapping of players
function gameController() {


    const player = [
        {
            name: "player1",
        },
        {
            name: "player2",
        }
    ]

    let activePlayer = player[0];
    function switchPlayer() {
        activePlayer = activePlayer === player[0] ? player[1] : player[0]
        return activePlayer
    }

    function active() {
        return activePlayer
    }

    function resetPlayer() {
        activePlayer = player[0];
    }
    return {
        switchPlayer,
        active,
        resetPlayer,
    };

}

function checkDraw() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameBoard.getBoard()[i][j] === " ") {
                return false; // At least one empty cell, so not a draw
            }
        }
    }

    return true; // No empty cells found
}

let gameOver = false;
let draw = false;
const game = gameController();
container.addEventListener("click", (e) => {
    if (gameOver) return;
    if (gameBoard.getBoard()[e.target.dataset.row][e.target.dataset.column] === " ") {
        game.switchPlayer()
    }
    if (game.active().name === "player1") {
        playGame(e.target.dataset.row, e.target.dataset.column, "O")
    }
    else {
        playGame(e.target.dataset.row, e.target.dataset.column, "X")
    }
    e.target.textContent = gameBoard.getBoard()[e.target.dataset.row][e.target.dataset.column]

    if (
        // Rows
        (gameBoard.getBoard()[0][0] !== " " &&
            gameBoard.getBoard()[0][0] === gameBoard.getBoard()[0][1] &&
            gameBoard.getBoard()[0][1] === gameBoard.getBoard()[0][2]) ||

        (gameBoard.getBoard()[1][0] !== " " &&
            gameBoard.getBoard()[1][0] === gameBoard.getBoard()[1][1] &&
            gameBoard.getBoard()[1][1] === gameBoard.getBoard()[1][2]) ||

        (gameBoard.getBoard()[2][0] !== " " &&
            gameBoard.getBoard()[2][0] === gameBoard.getBoard()[2][1] &&
            gameBoard.getBoard()[2][1] === gameBoard.getBoard()[2][2]) ||

        // Columns
        (gameBoard.getBoard()[0][0] !== " " &&
            gameBoard.getBoard()[0][0] === gameBoard.getBoard()[1][0] &&
            gameBoard.getBoard()[1][0] === gameBoard.getBoard()[2][0]) ||

        (gameBoard.getBoard()[0][1] !== " " &&
            gameBoard.getBoard()[0][1] === gameBoard.getBoard()[1][1] &&
            gameBoard.getBoard()[1][1] === gameBoard.getBoard()[2][1]) ||

        (gameBoard.getBoard()[0][2] !== " " &&
            gameBoard.getBoard()[0][2] === gameBoard.getBoard()[1][2] &&
            gameBoard.getBoard()[1][2] === gameBoard.getBoard()[2][2]) ||

        // Diagonals
        (gameBoard.getBoard()[0][0] !== " " &&
            gameBoard.getBoard()[0][0] === gameBoard.getBoard()[1][1] &&
            gameBoard.getBoard()[1][1] === gameBoard.getBoard()[2][2]) ||

        (gameBoard.getBoard()[0][2] !== " " &&
            gameBoard.getBoard()[0][2] === gameBoard.getBoard()[1][1] &&
            gameBoard.getBoard()[1][1] === gameBoard.getBoard()[2][0])
    ) {
        console.log("You won");
        gameOver = true;
    } else {
        console.log("No winner yet")

    }
    if (checkDraw()) {
        console.log("DRAW!")
        gameOver = true;
    }
});

const resetDiv = document.createElement("div");
const reset = document.createElement("button");
resetDiv.setAttribute("id", "reset");
body.appendChild(reset);
reset.textContent = "Reset";

reset.addEventListener("click", () => {
    gameBoard.getBoard() = [];

    //creation of slots for game
    for (let i = 0; i < 3; i++) {
        gameBoard.getBoard()[i] = [];
        for (let j = 0; j < 3; j++) {
            gameBoard.getBoard()[i].push(" ");
        }
    }
    gameOver = false;
    const buttons = container.querySelectorAll("button");
    buttons.forEach(button => {
        button.textContent = " ";
    })
    game.resetPlayer();
    console.log(gameBoard.getBoard())
})