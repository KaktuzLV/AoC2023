const fs = require('fs');
const readline = require('readline');
const symbolRegex = /[*^]/g;
const numberRegex = /\d+/g;
const symbolLoc = [];
const numLoc = [];



async function dayThree() {
    let twoDArr = [];
    let sumOfArray = 0;
    const fileStream = fs.createReadStream('input.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        twoDArr.push([line]);
    }
    getSymbolLoc(twoDArr);
    getNumLoc(twoDArr);
    for (let i = 0; i < symbolLoc.length; i++) {
        for (let j = 0; j < numLoc.length; j++) {
            for (let a = 0; a < symbolLoc[i].allowedRow.length; a++) {
                if (symbolLoc[i].allowedRow[a] == numLoc[j].row) {
                    for (let x = 0; x < symbolLoc[i].allowedIndex.length; x++) {
                        for (let y = 0; y < numLoc[j].allIndex.length; y++) {
                            if (symbolLoc[i].allowedIndex[x] == numLoc[j].allIndex[y]) {
                                if (numLoc[j].bool !== true) {
                                    symbolLoc[i].numberCnt += 1;
                                    numLoc[j].bool = true;
                                    symbolLoc[i].numA.push(parseInt(numLoc[j].number))
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    for (let i = 0; i < symbolLoc.length; i++) {
        if (symbolLoc[i].numberCnt == 2) {
            let gears = parseInt(symbolLoc[i].numA[0]) * parseInt(symbolLoc[i].numA[1]);
            sumOfArray += gears;
        }
    }

    console.log(sumOfArray);
}

function getSymbolLoc(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            const matches = arr[i][j].match(symbolRegex);
            if (matches) {
                matches.forEach((symbol) => {
                    let index = -1;
                    while ((index = arr[i][j].indexOf(symbol, index + 1)) !== -1) {
                        symbolLoc.push({ row: i, index, symbol, allowedRow: [i - 1, i, i + 1], allowedIndex: [index - 1, index, index + 1], numA:[], numberCnt: 0, bool: false });
                    }
                });
            }
        }
    }
}



function getNumLoc(arr) {
    for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        numberRegex.lastIndex = 0;
        var match = numberRegex.exec(str);
        while (match !== null) {
            if (match[0].length == 1) numLoc.push({ row: i, allIndex: [match.index], number: match[0], bool: false, });
            if (match[0].length == 2) numLoc.push({ row: i, allIndex: [match.index, match.index + 1], number: match[0], bool: false, });
            if (match[0].length == 3) numLoc.push({ row: i, allIndex: [match.index, match.index + 1, match.index + 2], number: match[0], bool: false, });
            match = numberRegex.exec(str);
        }
    }
}
dayThree();
