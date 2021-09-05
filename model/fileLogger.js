const fs = require('fs');


const logFile = (result) => {
    fs.appendFileSync('logFile.txt', `LOG:::[${new Date().toLocaleTimeString()}]:`+result+"\n");
}
exports.logFile = logFile;