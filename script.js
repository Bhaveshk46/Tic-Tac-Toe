const gameboard = [];

//creation of slots for ggame
for (let i = 0; i < 3; i++) {
    gameboard[i] = [];
    for (let j = 0; j < 3; j++) {
        gameboard[i].push(" ");
    }
}

console.log(gameboard);

//Inputs
function playGame(row, column, input) {
    function process() {
        gameboard[row][column] = input;
    }
    process();
}

//Logic for results
function result() {
    if ((gameboard[0][0] === gameboard[1][1] && gameboard[1][1] === gameboard[2][2]) || (gameboard[0][2] === gameboard[1][1] && gameboard[1][1] === gameboard[2][0]) || (gameboard[1][0] === gameboard[1][1] && gameboard[1][1] === gameboard[1][2]) || (gameboard[0][1] === gameboard[1][1] && gameboard[1][1] === gameboard[2][1])) {

        console.log("You won");
    }

    else {
        console.log("tie");
    }
}
playGame(0, 0, "X");
playGame(1, 1, "X");
playGame(2, 2, "X");
console.log(gameboard);
result();

//Creation of basic structure using DOM
const body = document.querySelector("body");
const container = document.createElement("div")
body.appendChild(container)

const button1 = document.createElement("button");
button1.dataset.id = 1
button1.setAttribute("id", "button1")

const button2 = document.createElement("button");
button2.dataset.id = 2
button2.setAttribute("id", "button2")

const button3 = document.createElement("button");
button3.dataset.id = 3
button3.setAttribute("id", "button3")

const button4 = document.createElement("button");
button4.dataset.id = 4
button4.setAttribute("id", "button4")

const button5 = document.createElement("button");
button5.dataset.id = 5
button5.setAttribute("id", "button5")

const button6 = document.createElement("button");
button6.dataset.id = 6
button6.setAttribute("id", "button6")

const button7 = document.createElement("button");
button7.dataset.id = 7
button7.setAttribute("id", "button7")

const button8 = document.createElement("button");
button8.dataset.id = 8
button8.setAttribute("id", "button8")

const button9 = document.createElement("button");
button9.dataset.id = 9
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
            sign: "X",
        },
        {
            name: "player2",
            sign: "O"
        }
    ]

    let activePlayer = player[0];
    activePlayer = activePlayer === player[0] ? player[1] : player[0];
    console.log(activePlayer)
    return activePlayer


}
gameController()