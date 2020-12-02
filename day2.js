const fs = require('fs');

//let data = fs.readFileSync('testInput2.txt', 'utf-8')
let data = fs.readFileSync('puzzleinput2.txt', 'utf-8')
//console.log(data);

let dataArr = data.split(/\r?\n/);



//function that takes min value, max value, check value, password
//for puzzle part 1

let checkPass = function(minValue, maxValue, checkValue, password){
    let valid = false;
    let re = new RegExp(checkValue, 'g');
    let check = password.match(re);
    if (check === null){
        valid = false;
        return valid;
    }
    else {
        let occur = check.length;
        if (occur >= minValue){
            if(occur <= maxValue){
                valid = true;
                return valid;
            }
            else {
                valid = false;
                return valid;;
            }
        }
        else{
            valid = false;
            return valid;;
        }
    }
}

//function that takes position x, position y, check value, password
//for puzzle part 2

let checkPassNew = function(posX, posY, checkValue, password){
    let valid = false;
    let firstIndex = posX - 1;
    let secondIndex = posY -1;
    let re = new RegExp(checkValue, 'g');
    let check = password.match(re);
    if (check === null){
        valid = false;
        return valid;
    }
    
    let findPosX = password.charAt(firstIndex);
    let findPosY = password.charAt(secondIndex);
    
    if(findPosX == checkValue){//if position x matches checkvalue, continue
        if(findPosY != checkValue){//if position y does not match, valid
            valid = true;
            return valid;
        }
        else{//else (position y matches), not valid
            valid = false;
            return valid;
        }
    }
    else if(findPosX != checkValue){//else if position x does not match, continue
        if(findPosY == checkValue){//if position y does match, valid
            valid = true;
            return valid;
        }
        else{//else (position y does not match), not valid
            valid = false;
            return valid;
        }
    }        
}



let validPasswords = [];

//loop through the input
for( let i = 0; i < dataArr.length; i++){
    let elSplit = dataArr[i].split(" ");
    console.log(elSplit);
    let findMinMax = elSplit[0].split("-");
    let minValue = findMinMax[0];
    let maxValue = findMinMax[1];
    let checkValue = elSplit[1].replace(/:/g, "");
    let password = elSplit[2];

    //call the password checker
    //let findValidPass = checkPass(minValue, maxValue, checkValue, password);
    let findValidPass = checkPassNew(minValue, maxValue, checkValue, password);
    console.log(findValidPass);
    //if valid password is found push the element to new array
    if(findValidPass === true){
        validPasswords.push(dataArr[i]);
    } 
}

console.log(validPasswords);
let countValidPasswords = validPasswords.length;
console.log(countValidPasswords);

