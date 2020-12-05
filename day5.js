const fs = require('fs');

//let data = fs.readFileSync('testInput5.txt', 'utf-8');
let data = fs.readFileSync('puzzleinput5.txt', 'utf-8');

let dataArr = data.split(/\r?\n/);
//console.log(dataArr.length);
//result [ 'FBFBBFFRLR' ]

//binary search
//normally you have a target to search for, now we don't but we know the direction to search in
//F = Front, in the tree this means to the left
//B = Back, in the tree this means to the right
//L = left, in the tree this means to the left
//R = right, in the tree this means to the right
//we have found the target when we have reduced the array down to 1 element

function binarySearch(arr, instructionSet){
    // we need to make a left pointer and right pointer
    let leftPoint = 0;
    let rightPoint = arr.length-1;

    //we search for as long as the array has more than 1 element

    //we need to loop through the instruction set
    for(let i=0; i < instructionSet.length; i++){
        let instruction = instructionSet[i];

        
        // we need to find the middle point
        let mid = Math.floor((leftPoint + rightPoint)/2);
        //console.log(mid);

        //now we start searching
        if(leftPoint === rightPoint){
            //console.log("result " +leftPoint);
            return leftPoint;
        }
        
        if(instruction === "F" || instruction === "L" ){//we search left of the mid so the rightpoint is now changed to the mid
            rightPoint = mid;
        }

        else if(instruction === "B" || instruction === "R" ){//we search right of the mid so the leftpoint is now changed to the mid
            leftPoint = mid +1;
        }

    }

    return leftPoint;
}

//we need to have a sorted array from 0 to 127
//we need to have a sorted array from 0 to 7

function range(n){
    return  [...Array(n).keys()]
}
let rows = range(128);
let seats = range(8);
let findRow;
let findSeat;
let seatId;
let seatIdArr = [];

function calcSeatId(arr){

    //loop through the dataArr and find the instructions for rows and seats
    for(let i=0; i<arr.length; i++){

    //split the element into 2 parts, one for the rows and one for the seats
    let instructionSetRows = arr[i].slice(0,7);
    let instructionSetSeats = arr[i].slice(7);

    // first call the binary search for the rows
    findRow = binarySearch(rows, instructionSetRows);
    //console.log("row is " +findRow);

    //then call the binary search for the seats
    findSeat = binarySearch(seats, instructionSetSeats);
    //console.log("seat is " +findSeat);

    //then find the seat ID, multiply the row by 8, then add the column
    seatId = (findRow * 8) + findSeat;
    //console.log("seat Id is " + seatId);
    seatIdArr.push(seatId);
    //console.log(seatIdArr);

    }
return seatIdArr;
}


result = calcSeatId(dataArr);
console.log(result);
console.log(result.length);

//find max element 
let highestSeatId = Math.max(...result);
console.log("highest seatId is " +highestSeatId);
//find min element
let lowestSeatId = Math.min(...result);
console.log("lowest seatId is " +lowestSeatId);


//now we need to find the missing number
//the "complete array" should be from 59 to 904

function rangeWithStart (start, end) { return [...Array(1+end-start).keys()].map(el => start+el) }
let completeArray = rangeWithStart(59, 904);

//try to find every number in the complete array in the seatId array. if we don't find the number that should be the seatId
let missingEl = completeArray.filter(el => !result.includes(el));
console.log("missing el: " +missingEl);












