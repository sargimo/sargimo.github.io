// Bagels cost $4.35 each (before tax). Write a program to calculate how much 9 bagels cost and output the total. Your program should output the answer $39.15.
const bagelCost = 4.35;
const sconeCost = 0.6;

function getTotalBagelCost(quantity){
    return quantity * bagelCost;
}

console.log ('9 Bagels would cost $' + getTotalBagelCost(9))

// Scones cost $0.60 each. Write a program to calculate and output the total price of 27 scones. You should get $16.2.
// let sconeCost = 0.6;
// let sconeQuantity = 27;
// let totalSconeCost = sconeCost * sconeQuantity;
// console.log (totalSconeCost)

function getTotalSconeCost(quantity){
    return quantity * sconeCost;
}

console.log('27 Scones would cost $' + getTotalSconeCost(27))

// It costs me $3.80 to make 13 muffins. How much did each muffin cost to make? The answer is approximately $0.29 each, but write a program to calculate this.
// let sconeCost = 0.6;
// let sconeQuantity = 27;
// let totalSconeCost = sconeCost * sconeQuantity;
// console.log (totalSconeCost)

function getMuffinCost(muffinMoney, howManyMuffins){
    return muffinMoney / howManyMuffins;
}
let muffinMoney = 3.8;
let howManyMuffins = 13;

console.log('If I spent $' + (muffinMoney).toFixed(2) +  'to make ' + howManyMuffins + ' muffins, each muffin costs $' + (getMuffinCost(3.8, 13)).toFixed(2))

// let totalMuffinCost = 3.8;
// let totalMuffins = 13;
// let muffinCost = totalMuffinCost / totalMuffins;
// console.log (muffinCost)

// I have $100. How many bagels can I buy with that? The answer is 22, but write a program to do the calculation.
// The most sensible program uses a function that JavaScript provides to round a number down – go look it up. However, it is possible to program this using +,-,*, / and one of either parseInt or %.

function getHowManyBagels(money){
    return Math.floor(money / bagelCost);
}
let budget = 100;
console.log('$'+ budget + ' would buy me ' + getHowManyBagels(budget) + ' bagels.')

// How many scones can I buy with $100? 166, but write the program.

function getHowManyScones(money){
    return Math.floor(money / sconeCost);
}

console.log('$'+ budget + ' would buy me '+ getHowManyScones(100) + ' scones.')

// How much change is left over from buying $100 worth of bagels? With that change, how many scones can I buy? 22 bagels, 7 scones, but write one program to calculate all of this, bagels and scones. There should be $0.10 left over, too.


// function getChangeFromBagels 
// let moneyForBagels = 100;
// let howManyBagels = Math.floor(moneyForBagels / bagelCost);

// console.log (howManyBagels)

// let moneyForScones = 100;
// let howManyScones = moneyForScones / sconeCost;

// console.log (Math.floor(howManyScones))

// let bagelChange = moneyForBagels - (howManyBagels * bagelCost);
// let sconesAfterBagels = Math.floor(bagelChange / sconeCost);
// let changeAfterBoth = 

// console.log('$100 would get me ' + howManyBagels + 'bagels with $ ' + (bagelChange).toFixed(2) + ' left over.' + 'This will buy me ' + sconesAfterBagels + ' scones with change of' )


/**Ask a user for their year of birth. Work out their age in years.

If their age is less than 18, tell the user to go to the beach.
If their age is between (and including) 18 and 65 then tell the user to go to work.
If their age is 65 or greater, then tell them to go play bingo.**/

let age = prompt('How many years old are you?');

function whereToGo(age) {
    if (age < 18) {
        alert('Go to the beach');
    } else if (age >= 18 && age < 65){
        alert('Go to work');
    } else {
        alert('Go play bingo');
    }
}

whereToGo(age);