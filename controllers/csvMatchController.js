const fs = require('fs');
const gutil = require('gulp-util');
const matchController = require('./matchControllers.js')
var Logger = require('../model/fileLogger')


/*
Run the good match program for every entry in the first set against every entry in
the second set and print the results in a textfile called "output.txt" 
*/
const processMatchFromCSV = (fileName) => {

    // Use fs.readFile() method to read the file
    fs.readFile(`./model/${fileName}`, 'utf8', function(err, data){

        if(err) {
             console.log(gutil.colors.red(`\nError: WRONG FILE: no such file or directory, open ./model/${fileName} \n`));
             Logger.logFile(` Error: WRONG FILE: no such file or directory, open ./model/${fileName}.`);

             process.exit()
        }
        
        // Display the file content 
        if(/[^a-zA-Z,\s]/.test(data) ) {
            console.log(gutil.colors.blue("\nInvalid data format..\n"));
            Logger.logFile("Invalid data format..");

            return
        }
        let line = data.split("\n")
        for(let i = 0; i < line.length; i++) {

            //Validate gender 
            let gender = data.split("\n")[i].split(",")[1].trim().toUpperCase()
            if(/[^fmFM]/.test(gender) ) {
                console.log(gutil.colors.red("\nOOPs.. An invalid gender format found. Check your CSV file.\n"));
                Logger.logFile(" OOPs.. An invalid gender format found. Check your CSV file.");
                process.exit()
            }
        }
        let newDataSet = groupByGender(data)
        let index = 0;
        const result = []
        while(index < newDataSet[0].length) {
            if(newDataSet[0][index] != undefined && newDataSet[1][index] != undefined) {
                let resultTobeSort = matchController.calculateMatch(newDataSet[0][index], newDataSet[1][index]).toString();
                result.push(resultTobeSort) 
            }
          index++
        }

        sortList(result);
        createMatchFile(result)
        return groupByGender(data)
    });
}


/*
 Method to group names by the gender indicator
*/
function groupByGender(data) {
    var males = [];
    var females = []
    const dataSet = new Array();

    //get each line in the csv file and iterate through all
    let line = data.split("\n")

    for(let i = 0; i < line.length; i++) {
        let gender = data.split("\n")[i].split(",")[1].trim().toUpperCase()
        if(!/[^fmFM]/.test(gender) ) {

            //Store gender to their respective set
            if(gender == 'M') {
                               
                //Add all male gender in a group
                males.push(data.split("\n")[i].split(",")[0].trim().toUpperCase())

                //Sort duplicate names in male data set
                let sortDuplicate = new Set(males)
                males = [...sortDuplicate]
                dataSet[0] = males
            }else if(gender == 'F') {

                //Add all female gender in a group
                females.push(data.split("\n")[i].split(",")[0].trim().toUpperCase())
                
                //Sort duplicate names in female data set
                let sortDuplicate = new Set(females);
                females = [...sortDuplicate];
                dataSet[1] = females
            }
        }
    }
    return dataSet
}

function sortList(result) {
    //sort by alphabetical order
    result.sort()

    //sort by percentage
    result.sort(function (a, b) {
        function getValue(s) { return s.match(/\d+/) || 0; }
        return   getValue(b) - getValue(a);
    })
    return result;
}

function createMatchFile(result) {

    if (fs.existsSync('output.txt')) {
        fs.unlinkSync('output.txt')
    }
    var logger = fs.createWriteStream('output.txt', {
        flags: 'a' // 'a' means appending (old data will be preserved)
    })
    for(let i = 0; i < result.length; i++) {
        logger.write(result.toString().split(",")[i]);
        logger.write("\n");
    }
    console.log(gutil.colors.green("\nMatch result succesfully send to output.txt"))
    Logger.logFile(" Match result succesfully send to output.txt");

}
exports.processMatchFromCSV = processMatchFromCSV