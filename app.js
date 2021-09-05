var express = require('express')
var bodyParser = require('body-parser');
const gutil = require('gulp-util');
const matchController = require('./controllers/matchControllers');
const csvMatchController = require('./controllers/csvMatchController')
const processMatchLogic = require('./model/processMatchLogic')
const Logger = require('./model/fileLogger')
var app = express();
var data = [];

var urlEncodedParser = bodyParser.urlencoded({extended: false});

//Set up template engine
app.set('view engine', 'ejs');

//Static files
app.use(express.static('./public'));

app.get('/', function(req, res) {
    res.render('index', {result: data});
})

app.post('/', urlEncodedParser, function(req, res) {
    // console.log(JSON.stringify(req.body, null, 2));
    if(!req.body.male || !req.body.female) {
      res.json("\nNo input found!!")
    }else {
       //Remove previous result from the web page and push current result
       data.shift();
       data.push(matchController.calculateMatch(req.body.male, req.body.female));
       res.json(data);
    }
})

//Run app on port 4000
app.listen(4000, () => {
    var start = process.uptime()
    console.log(gutil.colors.yellow(`App listening to http://localhost:4000`))
   

    //All validated input process
    if(processMatchLogic.validateInputArgs() == true) {
        if(process.argv[2].split(".")[1] == 'csv' ) {
            
                csvMatchController.processMatchFromCSV(process.argv[2]);
            
        }
    }
    if(process.argv.length > 4) {
        console.log(gutil.colors.red("\n>>>>> Oops! too many arguments <<<<<\n"));
        Logger.logFile("Oops! too many arguments ");

        process.exit();
    }
    if(process.argv[3] != undefined) {
        
         console.log(gutil.colors.green("\n" +matchController.calculateMatch(process.argv[2], process.argv[3]).toString()))
    }
    var end = process.uptime()
    Logger.logFile(" Execution takes " + (end - start) + " milliseconds. " )
   
});



