const fs = require('fs');
const readline = require('readline');

async function daySix() {
    tempArr = [];
    const fileStream = fs.createReadStream('input.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        tempArr.push(line);
    }
    let time = tempArr[0].replace(/Time:\s*/, '');
    let distance = tempArr[1].replace(/Distance:\s*/, '');
    distance = parseInt(distance.replace(/\s/g, ''));
    time = parseInt(time.replace(/\s/g, ''));
    let beatRecord = 0;
    for (let i = 0; i < time+1; i++) {
        let distTrav = (time - i) * i;
        if (distance < distTrav){
            beatRecord++;
        }
    }
    console.log(beatRecord);
}

daySix();
