/**
 * 
 * Write a function that reverses a string. "Banana" becomes "ananaB". 
 */

function reverseString(string){
    let reversed="";
    for (var i = string.length - 1; i >= 0; i--){
        reversed += string[i];
    } 
    return reversed;
}

/**
 * Write a function that detects palindromes. It should return true for "bob", 
 * "Tacocat", "A Toyota's a Toyota", "Go hang a salami, I'm a lasagna hog!", 
 * and false for "Banana" and "Nyan Cat". You will have to create a string that 
 * contains only the letters, reverse that string and check if it is the same.
 */

function checkPalindrome(string){
    if (string == (reverseString(string))) {
        return true;
    } else {
        return false;
    }
}

/**
 * Write a function that only returns true if its first parameter is a string 
 * longer than ten characters.
 */

function stringOverTen(string){
    if (string.length > 10) {
        return true;
    } else {
        return false;
    }
}

/**
 * Write a function that checks if the string contains the characters 'pip'. 
 * Extra for experts: Write it without indexOf or lastIndexOf.
 */

function checkContainsPip(string) {
    if (string.search("pip") >= 0){
        return true;
    } else {
        return false;
    }
}

/**
 * Write a function that returns a count of the number of vowels in a string.
 */

 function checkHowManyVowels(string) {
     let vowels = 0;
     for (var i = 0; i < string.length; i++){
         if (string.charAt(i) == "a"|| string.charAt(i) == "e" || string.charAt(i) == "i" || string.charAt(i) == "o" || string.charAt(i) == "u"){
             vowels = vowels += 1; 
         }
     }
     return vowels;
 }

 console.log(checkHowManyVowels("aeiou"));

