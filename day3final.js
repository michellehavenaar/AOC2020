const fs = require('fs');

//let data = fs.readFileSync('testInput3.txt', 'utf-8');
let data = fs.readFileSync('puzzleinput3.txt', 'utf-8');

let dataArr = data.split(/\r?\n/);
//console.log(dataArr);
//console.log(dataArr.length);


let check = "";

function countThemTrees(arr, right, down){
    let count = 0;
    let posX = 0;
    for(let i=0; i < arr.length - down;){ //loop until one row before last because in the loop we move one down
        i +=down;//move down one step 
        posX +=right;//move right 3 steps
        //console.log("Pos Y: " + i);
        let row = arr[i];
        let rowLength = row.length;

        let pointer = posX % rowLength;
        //console.log("pointer is at: " +pointer);
        check = row.charAt(pointer);
        if(check === "#"){
            count++;
        }

    }
    return count;
}

let result1 = countThemTrees(dataArr, 1, 1);
let result2 = countThemTrees(dataArr, 3, 1);
let result3 = countThemTrees(dataArr, 5, 1);
let result4 = countThemTrees(dataArr, 7, 1);
let result5 = countThemTrees(dataArr, 1, 2);
console.log("result1 is " + result1);
console.log("result2 is " + result2);
console.log("result3 is " + result3);
console.log("result4 is " + result4);
console.log("result5 is " + result5);
let multiply = result1 * result2 * result3 * result4 * result5;
console.log(multiply);