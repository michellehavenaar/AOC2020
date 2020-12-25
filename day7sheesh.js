const fs = require('fs');

//let data = fs.readFileSync('testInput7.txt', 'utf-8');
let data = fs.readFileSync('testInput7b.txt', 'utf-8');
//let data = fs.readFileSync('puzzleinput7.txt', 'utf-8');

let dataArr = data.split(/\r?\n/);
//console.log(dataArr);

function createBagObject(data){
    let bags = {};
    data.forEach(line => {
        const parts = line.split("contain");
        let id = parts[0].replace(" bags ", "");
        bags[id] = {};
        //console.log(bags);

        const subBags = parts[1].split(",");
        //console.log(subBags);
        
        subBags.forEach(bag => {
            let cleanString = bag.trim();
            let firstIndex = cleanString.indexOf(" ");
            //console.log(firstIndex);
            let count = cleanString.slice(0,firstIndex);
            //console.log(count);
            if (count === "no"){//this is when it says no other bags
            count = 0;
            //console.log(count);
            }
            count = Number(count);
            //console.log(countA);
            let lastIndex = cleanString.lastIndexOf(" ");
            let color = cleanString.slice(firstIndex, lastIndex).trim();
            bags[id][color] = count;
        })
        
    })
return bags;
}

const allTheBags = createBagObject(dataArr);
console.log(allTheBags);

//===========part two=========

/*
function countBags(targetColor){
    let count = 0;

    for (innerbag in allTheBags[targetColor]){
        console.log(innerbag);
        if(innerbag !== "other"){
            console.log(allTheBags[targetColor][innerbag]);
            let amountOfBags = allTheBags[targetColor][innerbag]
            console.log("amountOfBags: " + amountOfBags);
            count += amountOfBags;
            console.log("count: " + count);
            let nestedCount = countBags(innerbag);
            console.log("nestedcount: " +nestedCount);
            if(nestedCount > 0){
                nestedCount = nestedCount * amountOfBags;
                console.log("nestedcount: " +nestedCount);
                count += nestedCount;
            }
        }
    }
    return count;
}

let result = countBags("shiny gold");
console.log(result); 

*/
//first find the shiny gold bag in the object
//console.log(allTheBags["shiny gold"]);

let ugglyCounterArr = [];
let summedBagsinBag = 0;

function countBags(targetColor){
          
    let count = 0;
        for(innerbag in allTheBags[targetColor]){
            if(innerbag !== "other"){
                console.log("looking at " + innerbag);
                //count the amount of bags for this color
                let colorCount = allTheBags[targetColor][innerbag];
                console.log(innerbag + " amount: " + colorCount);
                //and add this to the count, so you start with counting the first bag level
                count += colorCount;
                console.log(count);
                //now we go down the tree, until we hit other then we move to the next color in the same bag level
                let nestedCount = countBags(innerbag);
                console.log("nested count: " + nestedCount);
                console.log("color count: " + colorCount);
                if(nestedCount > 0){
                    //now we have accumulated all the colorCounts on the same bag level
                    //because when we have hit other, the count that returned into nestedCount was 0
                    nestedCount = nestedCount * colorCount;
                    count += nestedCount;

                }
                

            }
        }
    return count;
}
            


let result = countBags("shiny gold");
console.log(result);
console.log(ugglyCounterArr);
//const reducer = (accumulator, currentValue) => accumulator + currentValue;
//let totalResult = ugglyCounterArr.reduce(reducer);
//console.log(totalResult);
