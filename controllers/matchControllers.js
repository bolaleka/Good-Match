const gutil = require('gulp-util');



/*
    Run the good match program for every entry in the first set against every entry in
    the second set and print the results in a textfile called "output.txt" 
*/
const calculateMatch = (name1, name2) => {

    const matchNames = name1+"matches"+name2
    let newstr = matchNames.split(" ").join("").toLowerCase().trim()
    let countArr = [];
    for(let i = 0; i < newstr.length; i++) {
        let sub = newstr.substring(0, i+1)
        let count = countChar(sub, newstr.charAt(i) )
        let dupCount = countChar(newstr, newstr.charAt(i))
        if(dupCount == 1 || dupCount > count ) {
            countArr.push(countChar(newstr, newstr.charAt(i)))
        }
    }
    let result = recursiveAdd(countArr).toString().split(",").join("");
    const resultList = []

    if(process.argv[2].split(".")[1] == 'csv' ) {
        if(result >= 80) {
            resultList.push(name1 +" matches " + name2 +" "+result+"%"+", " +"goog match");
        }else {
            resultList.push(name1 +" matches " + name2 +" "+result+"%");
        }
        return resultList
    }else {

        if(result >= 80) {
            resultList.push( name1 +" matches " + name2 +" "+result+"%"+", " +"goog match");
        }else {
            resultList.push(name1 +" matches " + name2 +" "+result+"%");
        }
        return resultList
    }
    
}


/*
- Add the left most and right most number that has not been added yet and put its sum at
   the end of the result.
- If there is only one number left add that number to the end of the result
- Repeat this process until there are only 2 digits left in the final string
*/
function recursiveAdd(countArr) {
    const arr = []

    //Loop to add the left most and right most number recursively
    while(countArr.length > 1 ) {
        //console.log(countArr)
        let first = countArr.shift()
        let last = countArr.pop()
        let res = first+last;
        
        //Checks if the digit (res) returned is greater tha 9, split the result to return each digit 
        //seperately, otherwise return a single digit
        if(res.toString().length > 1) {
            for(let i= 0; i < res.toString().length; i++ ) {
            arr.push( parseInt(res.toString()[i]))
            }
        }else {
            arr.push(res)
        }

        //Checks if there is only one number left add that number to the end of the result.
        if(countArr.length == 1) {
        arr.push(countArr[0])
        }
    }
    //Checks to repeat this process until there are only 2 digits left in the final string
    if(arr.length > 2) {
        countArr = arr
        return  recursiveAdd(countArr);
    }      
    return arr;   
}
 

/*
    Count method for duplicate duplicates character. 
*/
function countChar(str, c) {
    let count = 0;
    for(let i = 0; i < str.length; i++) {
        if(str.charAt(i).toLowerCase() == c) {
            count++;
        } 
    }
    return(count);
}

exports.calculateMatch = calculateMatch;
  
