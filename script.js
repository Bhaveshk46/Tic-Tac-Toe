const container = document.createElement("div");
const body = document.querySelector("body");
container.id = "container";
body.appendChild(container);


let player1 = "";
let player2 = "";

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

    const label1 = document.createElement("label");
    label1.textContent = "Player1:";
    const input1 = document.createElement("input");
    input1.setAttribute("id", "input1");

    body.appendChild(label1);
    body.appendChild(input1);

    const label2 = document.createElement("label");
    label2.textContent = "Player2:";
    const input2 = document.createElement("input");
    input2.setAttribute("id", "input2");

    const form = document.createElement("form");
    form.appendChild(label1);
    form.appendChild(input1);
    form.appendChild(label2);
    form.appendChild(input2);
    const submit = document.createElement("button");
    submit.textContent = "Submit";
    submit.setAttribute("id", "submit")
    form.appendChild(submit)
    body.appendChild(form);

    const result = document.createElement("div");
    result.setAttribute("id", "result");
    document.body.appendChild(result)

    function playerInput() {
        const player1 = document.getElementById("input1").value;
        const player2 = document.getElementById("input2").value;
        return [player1, player2];
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
        playerInput,
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
    }

    return {
        getBoard,
        placeMark,
        reset,
    }
})();

//swapping of players
function gameController(player1, player2) {


    const player = [
        {
            name: player1,
        },
        {
            name: player2,
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
document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
    [player1, player2] = displayController.playerInput();
    game = gameController(player1, player2);
})


let gameOver = false;
let game;
container.addEventListener("click", (e) => {
    if (!game) return;
    if (gameOver) return;
    const row = e.target.dataset.row;
    const column = e.target.dataset.column;

    if (gameBoard.getBoard()[row][column] !== " ") {
        return;
    }
    if (game.active().name === player1) {
        gameBoard.placeMark(e.target.dataset.row, e.target.dataset.column, "X")
    }
    else {
        gameBoard.placeMark(e.target.dataset.row, e.target.dataset.column, "O")
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

        console.log(`${game.active().name} won`);

        document.getElementById("result").textContent = `Result: ${game.active().name} WON!`
        gameOver = true;
    } else {
        console.log("No winner yet")

    }
    if (checkDraw()) {
        document.getElementById("result").textContent = "Result: DRAW!"


        console.log("DRAW!")
        gameOver = true;
    }
    game.switchPlayer();

});

displayController.reset.addEventListener("click", () => {
    gameBoard.reset();
    game.resetPlayer();
    gameOver = false;
    displayController.resetDisplay();
})



displayController.renderBoard();




