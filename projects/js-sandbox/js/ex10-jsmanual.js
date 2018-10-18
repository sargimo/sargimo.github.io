const COFFEE_PRICE = 3.5;
let muffinPrice = 2.35;

/**
* Coffees are $3.50 each, but if you order more than 10, you get a 15% discount.
* Write a program that asks for the quantity and correctly calculates the total after discount.
*/
function getTotalAfterDiscount(coffeePrice, quantity){
   let total = coffeePrice * quantity;
   if(quantity > 10){
       total = total * 0.85;
   }
   return total.toFixed(2);
}

//display coffees after discount
let coffeeQuantity = prompt('How many coffees would you like?')
console.log('Total after discount is $' + getTotalAfterDiscount(COFFEE_PRICE, coffeeQuantity));

/**
 * Muffins are $2.35 each, but buy 10 or more they're $2.10 each, but buy 25 or 
 * more and they're $1.90 each. Accept quantity as an input, output the unit 
 * price and the total.
 */
let smallDiscount = 0.25;
let bigDiscount = 0.45;

 function getMuffinTotalPrice(muffinPrice, quantity){
     let total = 0;
     if (quantity >= 1 && quantity < 10) {
         total = total + (muffinPrice * quantity);
     } else if (quantity >= 10 && quantity < 25) {
        total = total + ((muffinPrice - smallDiscount) * quantity);
     } else if (quantity >= 25) {
        total = total + ((muffinPrice - bigDiscount) * quantity);
     } 
     return total.toFixed(2);
 }

 let muffinQuantity = parseInt(prompt('How many muffins would you like?'));
 console.log('Total after discount is $' + getMuffinTotalPrice(muffinPrice, muffinQuantity));

 /**
  * Steak dinners are $25.60 each, but if you buy two, you get the third for free. 
  * Get the quantity as input, and output the total price, and the number of free steaks!
  *  Mushroom sauce is an extra $2, but the free steaks don't get free sauce. Get the number 
  * of mushroom sauce servings as another input, and adjust the total.
  */