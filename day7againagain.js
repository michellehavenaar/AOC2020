const fs = require('fs');

let data = fs.readFileSync('testInput7.txt', 'utf-8');
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

function checkColor(bags, targetColor, temp){
    for (color in bags){
        //console.log("found color: " + color);
        if(color === targetColor){//this means we've found the target color in the innerbags directly and we can count it
            //console.log("found")
            return true;
        }

        else{//now we need to search further
            if(!temp.hasOwnProperty(color) && bags.hasOwnProperty(color)){
                temp[color] = true; //temporary object to store the color in so that you dont check it double
                let check = checkColor(allTheBags[color], targetColor, temp);//now retrieve the main rule for the "sub"color from the main object and check those innerbags
                if(check){
                    return true;
                }
            }

        }
        //console.log(matched)
    }
}

let count = 0;
//loop through all the colors in the object
for (innerbag in allTheBags){
    //console.log(allTheBags[innerbag]);
    const foundTarget = checkColor(allTheBags[innerbag], "shiny gold", {});
    if(foundTarget){
        count++;
    }
}
console.log(count);