const fs = require('fs');

//let data = fs.readFileSync('testInput6.txt', 'utf-8');
let data = fs.readFileSync('puzzleinput6.txt', 'utf-8');

let dataArr = data.split(/\r?\n\r?\n/);


/*
//-----part 1------
arrCleanUpPart1 = function(arr){
    let cleanArr = [];
    for(var i = 0; i < arr.length; i++){
        cleanArr[i] = arr[i].replace(/\r\n/g , "");
    }
    return cleanArr;
}

let responses = arrCleanUpPart1(dataArr);
console.log(responses);
let sum = 0;

checkResponseSize = function(arr){
    for (let i = 0; i < arr.length; i++){
        let el = arr[i];
        let splitEl = el.split("");
        let check = new Set(splitEl);
        checkSize = check.size;
        sum += checkSize;
    }
    return sum;
}

let resultPart1 = checkResponseSize(responses);
console.log(resultPart1);

//-----end part 1------
*/

//----part 2----
arrCleanUpPart2 = function(arr){
    let cleanArr = [];
    for(var i = 0; i < arr.length; i++){
        cleanArr[i] = arr[i].replace(/\r\n/g , " "); 
    }
    return cleanArr;
}

let responses = arrCleanUpPart2(dataArr);
//result is one array where each element is a group and the answers per person are separated by a space
//[ 'abc', 'a b c', 'ab ac', 'a a a a', 'b' ]

let responsesPerGroup = [];
for (let i = 0; i < responses.length; i++) {
    responsesPerGroup[i] = responses[i].split(/\s/);
};

//result is a two dimensional array where each subarray is a group and the answers per person are the elements
//[
//    [ 'abc' ],
//    [ 'a', 'b', 'c' ],
//    [ 'ab', 'ac' ],
//    [ 'a', 'a', 'a', 'a' ],
//    [ 'b' ]
//  ]

//this is the thinking:
//if a subarray only has one element, the group consists of one person. All the answers are yesses, so we should count them all
//else a subarray has more than one element, the group consists of multiple persons. 
//we need to find the yesses which are present in EVERY element
//we can add another dimension to the array where the answers of one person in the group are in its own array
//and check if an answer appears in every sub array

function intersection(arr) {
    var result = [];
    
  
  for(var i = 0; i < arr.length; i++) {//loop through the main array and for every subarray...
      var currentSubArr = arr[i];
      //console.log(currentSubArr);
  	for(var y = 0; y < currentSubArr.length; y++) {//loop through the sub array
        var currentAnswer = currentSubArr[y];
        //console.log(currentAnswer);
      if(result.indexOf(currentAnswer) === -1) {//if we can't find the current answer in the result array (which is empty at the start)
        var existsInAll = true;
        for(var x = 0; x < arr.length; x++) {//loop through the main array again and for every subarray...
          if(arr[x].indexOf(currentAnswer) === -1) {//if we can't find the current answer in any of the elements of the subarray
            existsInAll = false;//we can say that it doesn't exist in all of the subarrays
            break;
          }
        }
        if(existsInAll) {//if we are here then we know that the current answer is present in all subarrays so we want to store it
          result.push(currentAnswer);
        }
      }//if we are here then it means that the current answer is allready in the result array and we don't mind anymore
    }
  }
  return result;//the result is an array which has the answers that every person in the group answered yes to 
}

let count = 0;
let splitArr = [];
function countYesses(arr){
    //we loop through the array
    //for every sub array
    for (let i = 0; i < arr.length; i++){
        let subArr = arr[i];
        
        if (subArr.length === 1){//this is when a group consists of one single person
            count += subArr[0].length; //up the count with the length of the subarray element (all the answers of the single person)
        }
        else{
            splitArr = subArr.map(function(el) {
                return el.split("");
            })
            //console.log(splitArr);
            //now we have the group as an array, the answers per person as a subarray, and the answers are the element
            //[ [ 'a' ], [ 'b' ], [ 'c' ] ] 3 persons, each with a different yes
            //or [ [ 'a', 'b' ], [ 'a', 'c' ] ] 2 persons, a is the only yes thats in all the subarrays
            let yesForEveryone = intersection(splitArr);
            count += yesForEveryone.length;
        }  
    }
    return count;
}
let resultPart2 = countYesses(responsesPerGroup);
console.log(resultPart2);