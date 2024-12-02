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
    distance = distance.split(/\s+/).map(num => parseInt(num)).filter(num => !isNaN(num));
    time = time.split(/\s+/).map(num => parseInt(num)).filter(num => !isNaN(num));
    let beatRecord = 0;
    let arrForRecord = [];
    for (let j = 0; j < time.length; j++) {
        for (let i = 0; i < time[j]+1; i++) {
            let distTrav = (time[j] - i) * i;
            if (distance[j] < distTrav){
                beatRecord++;
            }
        }
        arrForRecord.push(beatRecord);
        beatRecord = 0;
    }
    let result = 1;
    for(let i = 0; i < arrForRecord.length; i++){
        result = result*arrForRecord[i];
    }
    console.log(result)
}

daySix();
