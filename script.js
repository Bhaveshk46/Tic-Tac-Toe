const container = document.createElement("div");
const body = document.querySelector("body");
container.id = "container";
body.appendChild(container);

const displayController = (() => {
    const renderBoard = () => {
        // Creation of basic structure using DOM
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const button = document.createElement("button");

                button.dataset.row = row;
                button.dataset.column = col;

                // Optional: Give each button a unique id
                button.id = `button${row * 3 + col + 1}`;

                container.appendChild(button);
            }
        }
    }

    const resetDisplay = () => {
        const buttons = container.querySelectorAll("button");
        buttons.forEach(button => {
            button.textContent = " ";
        })
    }


    const resetDiv = document.createElement("div");
    const reset = document.createElement("button");
    resetDiv.setAttribute("id", "reset");
    body.appendChild(reset);
    reset.textContent = "Reset";


    return {
        renderBoard,
        resetDisplay,
        reset,
    }
})();

const gameBoard = (() => {
    const board = [];

    //creation of slots for game
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(" ");
        }
    }
    const getBoard = () => {
        return board;
    }

    function placeMark(row, column, mark) {
        if (board[row][column] === " ") {
            board[row][column] = mark;
        }
        else {
            console.log("cant fill");
        }
    }

    function reset() {
        //creation of slots for game
        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                board[i].push(" ");
            }
        }

        displayController.resetDisplay();
    }

    return {
        getBoard,
        placeMark,
        reset,
    }
})();

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
        gameBoard.placeMark(e.target.dataset.row, e.target.dataset.column, "O")
    }
    else {
        gameBoard.placeMark(e.target.dataset.row, e.target.dataset.column, "X")
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

displayController.reset.addEventListener("click", () => {
    gameBoard.reset();
    game.resetPlayer();
    gameOver = false;
})



displayController.renderBoard();
