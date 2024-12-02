const fs = require('fs');
const readline = require('readline');

async function dayTwo() {
    let allNumberSum = 0;
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
        let maxRed = Math.max(...redNumbers);
        let maxGreen = Math.max(...greenNumbers);
        let maxBlue = Math.max(...blueNumbers);
        let multRound = maxRed * maxGreen * maxBlue;
        allNumberSum += multRound;
    }
    console.log(allNumberSum); 
}

dayTwo();
