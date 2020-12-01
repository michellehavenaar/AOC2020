const fs = require('fs');

let data = fs.readFileSync('puzzleinput1.txt', 'utf-8')
//console.log(data);


//split on new lines and convert to integers
let dataArr = data.split(/\r?\n/).map(d => Number(d) || d);
//console.log(arr);



function multiply(arr){
    let x = 0;
    let y = 0;
    let z = 0; //for the second part of the puzzle
    let result = 0;

    for (let i = 0; i < arr.length; i++){
        for (let j = 0; j < arr.length; j++){
            for (let k = 0; k < arr.length; k++){
                let sum = arr[i] + arr[j] + arr[k];
                if(sum == 2020){
                    console.log("succes, found sum 2020: " + sum);
                    x = arr[i];
                    console.log("element: " + x);
                    y = arr[j];
                    console.log("element: " + y);
                    z = arr[k];
                    console.log("element: " + z);
                    result = x*y*z;
                    return result
            }
            /*let sum = arr[i] + arr[j];
            console.log("sum is " + sum);
            if(sum == 2020){
                console.log("succes, found sum 2020: " + sum);
                x = arr[i];
                console.log("element: " + x);
                y = arr[j];
                console.log("element: " + y);
                result = x*y;
                return result
                */
            }
        }
    }

}

let outcome = multiply(dataArr);
console.log(outcome); 

