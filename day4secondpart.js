const fs = require('fs');

//let data = fs.readFileSync('testInput4.txt', 'utf-8');
let data = fs.readFileSync('puzzleinput4.txt', 'utf-8');
//let data = fs.readFileSync('invalidPassports.txt', 'utf-8');
//let data = fs.readFileSync('validPassports.txt', 'utf-8');

let dataArr = data.split(/\r?\n\r?\n/);

let arrOfPassports = [];
for (var i = 0; i < dataArr.length; i++) {
    arrOfPassports[i] = dataArr[i].split(/\s/);
};
//console.log(arrOfPassports);

/*===required data===
byr (Birth Year)
iyr (Issue Year)
eyr (Expiration Year)
hgt (Height)
hcl (Hair Color)
ecl (Eye Color)
pid (Passport ID)
===optional data===
cid (Country ID)

byr (Birth Year) - four digits; at least 1920 and at most 2002.
iyr (Issue Year) - four digits; at least 2010 and at most 2020.
eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
hgt (Height) - a number followed by either cm or in:
If cm, the number must be at least 150 and at most 193.
If in, the number must be at least 59 and at most 76.
hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
pid (Passport ID) - a nine-digit number, including leading zeroes.
cid (Country ID) - ignored, missing or not.

*/

function validateByr(value){
    let valid = false;
    if(value.length === 4){
        if(value >= 1920 && value <= 2002){
            valid = true;
        }
    }
    return valid;
}

function validateIyr(value){
    let valid = false;
    if(value.length === 4){
        if(value >= 2010 && value <= 2020){
            valid = true;
        }
    }
    return valid;
}

function validateEyr(value){
    let valid = false;
    if(value.length === 4){
        if(value >= 2020 && value <= 2030){
            valid = true;
        }
    }
    return valid;
}

function validateHgt(value){
    let valid = false;
    let re = /^\d/;
    if(re.test(value)){
        if(value.endsWith("cm")){
            let cm = Number(value.slice(0, value.length-2));
            //console.log(cm);
            if(cm >= 150 && cm <= 193){
                valid = true;
                //return valid;
            }
        }
        else if(value.endsWith("in")){
            let inch = Number(value.slice(0, value.length-2));
            if(inch >= 59 && inch <= 76){
                valid = true;
                //return valid;
            }
        }
    } 
    return valid;
}

function validateHcl(value){
    let valid = false;
    let re = /#[0-9a-f]{6}$/;
    if(re.test(value)){
        valid = true;
    }
return valid;
}

function validateEcl(value){
    let valid = false;
    let re = /(amb|blu|brn|gry|grn|hzl|oth)/;
    if(re.test(value)){
        valid = true;
    }
return valid;
}

function validatePid(value){
    let valid = false;
    let re = /^[0-9]{9}$/;
    if(re.test(value)){
        //console.log("jo");
        valid = true;
    }
return valid;
}



function countPassports(arr){
    let count = 0;
    let parts;
    for (let i = 0; i < arr.length; i++){
        let el = arr[i];
        //remove any empty elements from the array
        let elFiltered = el.filter(Boolean); 
        //check if array includes a specific key
        let pairByr = elFiltered.find(element => element.includes("byr"));
        let pairIyr = elFiltered.find(element => element.includes("iyr"));
        let pairEyr = elFiltered.find(element => element.includes("eyr"));
        let pairHgt = elFiltered.find(element => element.includes("hgt"));
        let pairHcl = elFiltered.find(element => element.includes("hcl"));
        let pairEcl = elFiltered.find(element => element.includes("ecl"));
        let pairPid = elFiltered.find(element => element.includes("pid"));

        if(pairByr){
            parts = pairByr.split(/\:/);
            let valueByr = parts[1];
            let validByr = validateByr(valueByr);
            //console.log(validByr);
            if(validByr){
                if(pairIyr){
                    parts = pairIyr.split(/\:/);
                    let valueIyr = parts[1];
                    let validIyr = validateIyr(valueIyr);
                    //console.log(validIyr);
                    if(validIyr){
                        if(pairEyr){
                            parts = pairEyr.split(/\:/);
                            let valueEyr = parts[1];
                            let validEyr = validateEyr(valueEyr);
                            //console.log(validEyr);
                            if(validEyr){
                                if(pairHgt){
                                    parts = pairHgt.split(/\:/);
                                    let valueHgt = parts[1];
                                    let validHgt = validateHgt(valueHgt);
                                    //console.log(validHgt);
                                    if(validHgt){
                                        if(pairHcl){
                                            parts = pairHcl.split(/\:/);
                                            let valueHcl = parts[1];
                                            let validHcl = validateHcl(valueHcl);
                                            //console.log(validHcl);
                                            if(validHcl){
                                                if(pairEcl){
                                                    parts = pairEcl.split(/\:/);
                                                    let valueEcl = parts[1];
                                                    let validEcl = validateEcl(valueEcl);
                                                    //console.log(validEcl);
                                                    if(validEcl){
                                                        if(pairPid){
                                                            parts = pairPid.split(/\:/);
                                                            let valuePid = parts[1];
                                                            let validPid = validatePid(valuePid);
                                                            //console.log(validPid);
                                                            if(validPid){
                                                                count++;
                                                                console.log("count is: "+ count);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }                           
                        }                       
                    }       
                }
            }
        }
    
    }
    console.log("count is: "+ count);
    return count; 
}


let testing = countPassports(arrOfPassports);
console.log(testing);



