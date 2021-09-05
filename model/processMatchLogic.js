/*
    A program that accepts two strings, calculates the match percentage and print to the console.
    The program can be run as below example.

    >> node app.j firstName SecondName

    This program can also accept a CSV file only as input
*/

const gutil = require('gulp-util');
const Logger = require('./fileLogger');



const validateInputArgs = () => {


    var arguments = process.argv;

    if(arguments.length == 3 && !isCsvFile(arguments[2]) == true) {
        Logger.logFile(" Oops! you have enter an incomplete argument, please add another name ");
        console.log(gutil.colors.red("\n>>>>> Oops! you have enter an incomplete argument, please add another name <<<<<\n"));
        console.log(gutil.colors.yellow('Usage: ENTER: node app.js firstName secondName' ));
        process.exit()
    }else if(arguments.length == 4) {
        const matchNames = arguments[2]+"matches"+arguments[3]
        if(/[^a-zA-Z]/.test(matchNames) || arguments[2] == "" || arguments[3] == "") {
            console.log(gutil.colors.red("\n>>>>> Oops! wrong input format, please check your input. <<<<<\r"));
            Logger.logFile(" Oops! wrong input format, please check your input. ");
            console.log(gutil.colors.yellow(">>>>> Make sure your input contains alphabets only. <<<<<\n"));
             console.log(gutil.colors.yellow('Usage: ENTER: node app.js firstName secondName' ));

            process.exit()
        }
    }else if (arguments.length == 2) {
        console.log(gutil.colors.red("\n>>>>> Oops! no input found <<<<<\n"));
        Logger.logFile(" Oops! no input found ");
        console.log(gutil.colors.yellow('Usage: ENTER: node app.js firstName secondName' ));
        process.exit();
    }
    return true
}

const isCsvFile = (arguments) =>{
    if(arguments.split(".")[1] == 'csv'.toLowerCase()) {
        return true
    }
    return false
}
exports.validateInputArgs = validateInputArgs;