const fs = require('fs');
const readline = require('readline');

//12 red cubes, 13 green cubes, and 14 blue cubes.


async function dayTwo() {
    const allNumbers = [];
    const fileStream = fs.createReadStream('input.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        const redNumbers = [];
        const greenNumbers = [];
        const blueNumbers = [];
        const regexRed = /\b(\d+)\s*red\b/g;
        const regexGreen = /\b(\d+)\s*green\b/g;
        const regexBlue = /\b(\d+)\s*blue\b/g;
        let regexPatternGame = /Game (\d+)/;
        let gameResult = regexPatternGame.exec(line);
        let match;
        while ((match = regexRed.exec(line)) !== null) {
            redNumbers.push(parseInt(match[1], 10));
        }
        while ((match = regexGreen.exec(line)) !== null) {
            greenNumbers.push(parseInt(match[1], 10));
        }
        while ((match = regexBlue.exec(line)) !== null) {
            blueNumbers.push(parseInt(match[1], 10));
        }


        for (let i = 0; i < redNumbers.length; i++) {
            if (redNumbers[i] > 12) {
                allNumbers.push(parseInt(gameResult[1], 10));
            }
        }
        for (let i = 0; i < greenNumbers.length; i++) {
            if (greenNumbers[i] > 13) {
                allNumbers.push(parseInt(gameResult[1], 10));
            }
        }
        for (let i = 0; i < blueNumbers.length; i++) {
            if (blueNumbers[i] > 14) {
                allNumbers.push(parseInt(gameResult[1], 10));
            }
        }
    }
    const arraySum = sumArray(removeDuplicates(allNumbers));
    console.log("Captured Number:", 5050 - arraySum);
}

function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}

function sumArray(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

dayTwo();
