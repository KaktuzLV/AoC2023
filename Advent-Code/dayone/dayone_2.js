const fs = require('fs');
const readline = require('readline');
const wordMap = {
    one: "on1niggae",
    two: "tw2niggao",
    three: "thr3niggaee",
    four: "fo4niggaur",
    five: "fi5niggave",
    six: "s6niggax",
    seven: "sev7niggan",
    eight: "eig8niggat",
    nine: "n9niggane",
};


async function processLineByLine() {
    const fileStream = fs.createReadStream('input.txt');
    var sumOfNumber = 0;
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        var newLine = line;
        for (let i = 0; i < newLine.length; i++) {
            for (const key in wordMap) {
                let keyword = key;
                let value = wordMap[key];
                newLine = newLine.replace(keyword, value);
            }
        }
        let matches = newLine.replace(/[^0-9]/g, "");
        let number = matches[0] + matches[matches.length - 1];
        sumOfNumber = parseInt(sumOfNumber) + parseInt(number);
    }
    console.log(`Sum: ${sumOfNumber}`);
}

processLineByLine();
