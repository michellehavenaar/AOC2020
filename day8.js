const fs = require('fs');

//let data = fs.readFileSync('testInput8.txt', 'utf-8');
let data = fs.readFileSync('puzzleinput8.txt', 'utf-8');

let dataArr = data.split(/\r?\n/);

/*
accumulater starts at 0
acc: add value to accumulator and move to next line
jmp: jump forward or backward with value number of steps
nop: move to next line
*/

let instructionArr = [];
function elementSlice(line){
    let instruction = line.slice(0,3);
    let plusMin = line.slice(4,5);
    let number = line.slice(5);
    let separator = " ";
    return newLine = instruction + separator + plusMin + separator + number;
}

instructionArr = dataArr.map(elementSlice);

let instructions = [];
instructions = instructionArr.map(el => el.split(" "));

let add;


function instructionReader(arr){
    let completed = true;
    let accumulator = 0;
    let visited = [];
    for (let i = 0; i < arr.length; i++){
        //where am i?
        //console.log("i am at: " + i);
        //before we continue check if we havent been here yet
        if(visited.includes(i)){
            console.log("we have been here before")
            console.log("accumulator is now at: " + accumulator);
            completed = false;
            break;
        }
        let inst = arr[i];
        let num = Number(inst[2]);
        let index = 0;
        //determine add or subt
        let addOrsubt = inst[1];
            if(addOrsubt === "+"){
                add = true;
            }
            else{
                add = false;
            }
    
        if(inst[0] === "nop"){
            //console.log("nothing to see here, move along");
            //save the visited "i" so we can check if we've been here before
            visited.push(i);
        }
        else if(inst[0] === "acc"){
            //console.log("adding value to accumulater, move along");
            //save the visited "i" so we can check if we've been here before
            visited.push(i);
            if(add){
                //console.log("adding");
                accumulator = accumulator + num;
            }
            else{
                //console.log("subbing");
                accumulator = accumulator - num;
            }
        }
        else if (inst[0] === "jmp"){
            //console.log("jumping to index");
            //save the visited "i" so we can check if we've been here before
            visited.push(i);
            if(add){
                //console.log("jumping ahead by:  " + num);
                //current index is
                index = i;
                //new index is, but we subtract one because this is a loop that at the end does ++ so it will get one step to far
                index = i + num -1;
                i = index;
            }
            else{
                //console.log("jumping back by: " + num);
                //current index is
                index = i;
                //new index is, but we subtract one because this is a loop that at the end does ++ so it will get one step to far
                index = i - num -1;
                i = index;
            }
    
        }
        
    }
    console.log("we are at the end");
    console.log("accumulator is now at: " + accumulator);
    console.log("completed: " + completed);
    return completed;
}

//part 2
//we loop through the instruction array. when we find a nop we change it to jmp
//or when we find a jmp we change it into nop. then run the instruction reader on the changed array
//if it returns complete true we have fixed the right instruction
//if it returns complete false we move to the next instruction
let result;

function instructionFixer(arr){
    for (let j=0; j < arr.length; j++){
        if(arr[j][0] === "nop"){
            arr[j][0] = "jmp";
            result = instructionReader(instructions);
            if(result){
                console.log("reader returned true, stop looking");
                break;
            }
            else{
                console.log("reader returned false, change instruction back");
                arr[j][0] = "nop";
                console.log(arr[j]);
            }

        }
        else if (arr[j][0] === "jmp"){
            arr[j][0] = "nop";
            result = instructionReader(instructions);
            if(result){
                console.log("reader returned true, stop looking");
                break;
            }
            else{
                console.log("reader returned false, change instruction back");
                arr[j][0] = "jmp";
                console.log(arr[j]);
            }
        }

    }
    return result;
}


//part one
 let bar = instructionReader(instructions);
 console.log(bar);

//part two
let foo = instructionFixer(instructions);
console.log(foo);


