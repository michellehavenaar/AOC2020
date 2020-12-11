const fs = require('fs');

//let data = fs.readFileSync('testInput6.txt', 'utf-8');
let data = fs.readFileSync('puzzleinput6.txt', 'utf-8');
//let data = fs.readFileSync('testInput6a.txt', 'utf-8');

//let string = data.toString();
//console.log(string);
//let dataArr = data.split(/\r?\n/);
let dataArr = data.split(/\r?\n\r?\n/);
//let dataArr = string.split(/\n\n/);
console.log(dataArr);

/*
arrCleanUp = function(arr){
    let cleanArr = [];
    for(var i = 0; i < arr.length; i++){
        cleanArr[i] = arr[i].replace(/\r\n/g , "");
        //console.log(cleanArr);
        
    }
    return cleanArr;
}

let responses = arrCleanUp(dataArr);
console.log(responses);
let sum = 0;

checkResponseSize = function(arr){
    for (let i = 0; i < arr.length; i++){
        let el = arr[i];
        let splitEl = el.split("");
        //console.log(splitEl);
        let check = new Set(splitEl);
        checkSize = check.size;
        sum += checkSize;
        //console.log(sum);
    }
    return sum;
}

let result = checkResponseSize(responses);
console.log(result);
*/


let arr = [];
for (var i = 0; i < dataArr.length; i++) {
    arr[i] = dataArr[i].split(/\s/);
};

console.log(arr)

let elFiltered = [];
let splitArr = [];
let count = 0;

countDuplicates = function(arr){
    let counts = {};

    for(let i = 0; i < arr.length; i++){
        if(counts[arr[i]]){
            counts[arr[i]] += 1
        }
        else{
            counts[arr[i]] = 1
        }
    }
    for (var key in counts){
        if (counts[key] < 2){
            delete counts[key];
        }
    }
    //sum all the elements in the array
    //let sum = (accumulator, currentValue) => accumulator + currentValue;
    let countValues = Object.values(counts);
    //console.log(countValues);
    let numberOfDuplicates = countValues.length;
    return numberOfDuplicates;
}

/*
let testArray = [ 'a', 'b', 'a', 'c' , 'c'];
let foo = countDuplicates(testArray);

console.log(foo);
*/


splitArray = function (arr){
    for( let i = 0; i < arr.length; i++){
        let el = arr[i];
        elFiltered = el.filter(Boolean); 
        console.log(elFiltered);

        if (elFiltered.length === 1){
            count += elFiltered[0].length;
            console.log(count);
            console.log("if");
            console.log(elFiltered);
        }
        else {
            splitArr = elFiltered.map(function(el) {
                return el.split("");
            })
            console.log(splitArr);
            let flatArr = splitArr.flat();
            console.log(flatArr);
            let dups = countDuplicates(flatArr);
            console.log(dups);
            count += dups;
        }
    }
    return count;
}

let testArr = splitArray(arr);
console.log(testArr);

/*
let testArr = [ 'ab', 'ac' ];
let splitArr = testArr.map(function(el) {
    return el.split("");
})
console.log(splitArr);
*/

/*
let testArr = ['a', 'b', 'a', 'c'];

let check = new Set(testArr);
console.log(check);
*/