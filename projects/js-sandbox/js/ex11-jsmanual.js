let string = "string";


/**
 * Make a loop that outputs an asterisk * for every character in a string. 
 * do some research on getting the length of a string value.
 */

for (var i = 0; i < (string.length); i++) {
    console.log('*');
}
/**
 * Make a loop that outputs every number from 1 to 100.
 */

for (var i = 0; i < 101; i++) {
    console.log(i);
}

/**
 * Make a loop that outputs every even number, starting at 100, going to 0 
 * (aka descending order).
 */

for (var i = 100; i > 0; i--) {
    if (i % 2 == 0) {
        console.log(i);
    }
}

/**
 * Fizz-Buzz: Output every number between 1 and 100, except when the number 
 * divides evenly by 3 or 5: instead of the number, output "fizz" or "buzz" 
 * respectively, and output "fizzbuzz" when it's evenly divisible by both.
 */

for (var i = 0; i < 101; i++) {
    if (i % 3 == 0) {
        if (i % 5 == 0) {
            console.log("fizzbuzz");
        }
        else {
            console.log("fizz");
        }
    }
    else if (i % 5 == 0) {
        console.log("buzz");
    }
    else {
        console.log(i);
    }
}

/**
 * 99 Bottles…: Write a program to output the lyrics to the song 
 * "99 bottles of beer" -- there are answers on that site, but none of them are 
 * actually simple, nor get the lyrics exactly right.
 */

 //experimented with if i == 1 bottles = bottle, but couldnt get the right lyrics for the rest. 
let bottles = " bottles";

for (var i = 99; i > -1; i--) {
    if (i == 1) {
        console.log("1 bottle of beer on the wall, 1 bottle of beer. Take one down and pass it around, no more bottles of beer on the wall.")
    }
    else if (i == 0){
        console.log("No more bottles of beer on the wall, no more bottles of beer. Go to the store and buy some more, 99 bottles of beer on the wall.")
    } else {
        console.log(i + bottles + " beer on the wall, " + i + bottles + " of beer. Take one down and pass it around, " + (i -1) + bottles + " of beer on the wall.")
    }
}

/**
 * Make a Christmas tree out of asterisks.
 */
//wasnt sure how to make it appear on the page and center align it. 
let tree ="*";
let stump ="[]";

for (i = 0; i < 10; i++){
    console.log(tree);
    tree = tree + "*";
}
console.log(stump);
