const fs = require('fs');
const readline = require('readline');
const numberRegex = /\d+/g;

async function dayFour() {
    let sumOfcardWins = 0;
    let sumOfcardWinsArr = [];
    let arr = [];
    let mainArr = [];
    let tempArrLeft = [];
    let tempArrRight = [];
    let countCardWin = 0;
    let tempCardWins = [];
    let cardWins = [];
    let regex = /Card\s*(\d+):/;
    const fileStream = fs.createReadStream('input.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        arr = line.split("|");
        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].replace(regex, '');
        }
        mainArr.push(arr);
    }
    for (x = 0; x < mainArr.length; x++) {
        tempArrLeft.push(mainArr[x][0]);
        tempArrRight.push(mainArr[x][1]);
        let cardLeft = getNumLoc(tempArrLeft);
        let cardRight = getNumLoc(tempArrRight);
        for (let i = 0; i < cardLeft.length; i++) {
            for (let j = 0; j < cardRight.length; j++) {
                if (cardLeft[i] == cardRight[j]) {
                    countCardWin += 1;
                }
            }
        }
        tempCardWins.push(countCardWin);
        countCardWin = 0;
        tempArrLeft = [];
        tempArrRight = [];
    }

    for (let i = 0; i < tempCardWins.length; i++) {
        cardWins.push({row: i, number: tempCardWins[i]});
    }

    for (let j = 0; j < cardWins.length; j++)  {
        for (let i = 0; i < cardWins[j].number; i++) {
            let row = cardWins[j].row + i + 1;
            cardWins.push({ row: cardWins[row].row, number: cardWins[row].number});
        };
    }
    console.log(cardWins.length);
}


function getNumLoc(arr) {
    const numLoc = [];
    for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        var match = numberRegex.exec(str);
        while (match !== null) {
            numLoc.push(parseInt(match[0]));
            match = numberRegex.exec(str);
        }
    }
    return numLoc;
}
dayFour();
