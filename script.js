const gameboard = [];

for (let i = 0; i < 3; i++) {
    gameboard[i] = [];
    for (let j = 0; j < 3; j++) {
        gameboard[i].push(" ");
    }
}

console.log(gameboard);

function playGame(row, column, input) {
    function process() {
        gameboard[row][column] = input;
    }
    process();
}

function result() {
    if ((gameboard[0][0] === gameboard[1][1] && gameboard[1][1] ===  gameboard[2][2]) || (gameboard[0][2] === gameboard[1][1] && gameboard[1][1]=== gameboard[2][0]) || (gameboard[1][0] === gameboard[1][1] && gameboard[1][1] === gameboard[1][2]) || (gameboard[0][1] === gameboard[1][1] && gameboard[1][1] === gameboard[2][1])) {

        console.log("You won");
    }

    else{
        console.log("tie");
    }
}
playGame(0,0,"X");
playGame(1,1,"X");
playGame(2,2,"X");
console.log(gameboard);
result();