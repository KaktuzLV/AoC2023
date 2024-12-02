const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('input.txt');
    let sumOfNumber = 0;
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        let matches = line.replace(/[^0-9]/g, "");
        let number = matches[0] + matches[matches.length - 1];
        sumOfNumber = parseInt(sumOfNumber) + parseInt(number);
    }
    console.log(`Sum: ${sumOfNumber}`);
}

processLineByLine();
