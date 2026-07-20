const gameboard = [];

for(let i = 0 ; i<3 ; i++){
    gameboard[i] = [];
    for(let j = 0 ;j<3 ;j++){
        gameboard[i].push(0);
    }
}

console.log(gameboard);

function players(){
    const player1 = "A";
    const player2 = "B";
}

function score(){
    let score = 0;
}

function inputs(){
    let input1 = "X";
    let input2 = "O";
}

function playGame(row,column,input){
    function process(){
        gameboard[row][column] = input;
    }
    process();
}
playGame(1,1,"X");
console.log(gameboard);
