const prompt = require("prompt-sync")();

// declaro las variables 

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8
};
/* SYMBOLS_COUNT [A] -> 2*/

const SYMBOL_VALUES = {
    A : 5,
    B : 4,
    C : 3,
    D : 2
};


// 1. Usuario deposita dinero
function deposit(){ 
    while (true){
        const depositAmount = prompt("Ingrese dinero a depositar: ");
        const numberDepositAmount = parseFloat(depositAmount);
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log("Ingreso incorrecto, intente denuevo. ");
        } else{
            return numberDepositAmount;
        }
    }
};  


// 2. usuario determina a cuantas lineas apostar
function getNumberOfLines(){
    while (true){
        const lines = prompt("Ingrese cantidad de lineas a apostar (1-3): ");
        const numberOfLines = parseFloat(lines);
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines >3){
            console.log("Ingreso incorrecto de lineas, intente denuevo. ");
        } else{
            return numberOfLines;
        }
    }
};
// 3. Usuario apuesta cantidad de dinero
function getBet (balance, lines){
    while (true){
        const bet = prompt("Ingrese su apuesta por linea: ");
        const numberBet = parseFloat(bet);
        if (isNaN(numberBet) || numberBet <= 0 || numberBet >= balance / lines){
            console.log("Ingreso incorrecto de apuesta, intente denuevo. ");
        } else{
            return numberBet;
        }
    }
};
// 4. gira la maquina de slots
function spin (){
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for (let i = 0; i < count ; i++){
            symbols.push(symbol);
        }
    }
    const reels = [[],[],[]];
    for (let i = 0; i < COLS;i++){
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};
// 5. Verificar resultado de giro de maquina
function transpose(reels){
    const rows = [];
    for (let i = 0;i < ROWS;i++){
        rows.push([]);
        for (let j = 0; j < COLS;j++){
            rows[i].push(reels[j][i])
        }
    }

    return rows
};
function printRows(rows){
    for (const row of rows){
        let rowString = "";
        for (const [i,symbol] of row.entries()){
            rowString += symbol;
            if (i != row.length -1){
                rowString += " | ";
            }
        }
        console.log(rowString)
    }
};

// 6. Dar dinero ganado o no entregar si usuario no gano
function getWinnings(rows,bet,lines){
    let winnings = 0;
    for (let row = 0; row< lines;row++){
        const symbols = rows[row];
        let allSame = true;
        for (const symbol of symbols){
            if (symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
        if (allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings;
};
// 7. Jugar devuelta
// funcion con outputs
function game(){
    let balance = deposit(); //llamar a funcion
    while (true){
        console.log("Tu balance es de $"+balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance,numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows,bet,numberOfLines);
        balance += winnings;
        console.log("Ganaste $"+winnings.toString());
        if (balance <= 0){
            console.log("Tu balance es 0! :(");
            break;
        }
        const playAgain = prompt("Quieres volver a jugar? (s/n)");
        if (playAgain != "s"){
            console.log("Hasta luego! ");
            break;
        }
    }
};
game();