/**
 * 
 * Write a JavaScript function to display the current day and time in the following format.  
Sample Output : Today is : Friday. 
Current time is : 11 : 50 : 22 PM
 */

 // add a zero in front of numbers<10
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

 function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function startTime() {
    let today = new Date();
    let day = today.getDay();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);
    console.log("The day is " + days[day] + ". Current time is: " + hours + ":" + minutes + ":" + seconds + ".");
}

/**
 * Create a simple chatbot that will allow the user to either get a list of famous music artists (you can change this 
 * if you want) or search for an artist by first name.
 * 
 * The method of input for this application will be through the browser window’s prompt dialog and the method of output 
 * will be through the browser’s console.
 * 
 * The application will firstly ask if the user wants to get a list of artists or a single artist.
 * 
 * If the input contains the word “list”, the application will output the full details of all artists. 
 * 
 * If the input contains the word “single”, the application will ask for the artist’s first name. With this input, the 
 * application will then search through all artists until it finds an artist with the corresponding first name. If it 
 * finds the artist, it will display the artist’s full details. If no artist is found, the application will display a 
 * message to the user.
 * 
 * Extending the application
 * What happens if the user inputs something unexpected? Does the application work as expected? For example, how about 
 * if a user enters an uppercase “L” for “list”. How can you ensure the application will still work?
 */

let geoffSargison = {
    firstName: 'Geoff',
    lastName: 'Sargison'
}

let geoffLargison = {
    firstName: "Geoff",
    lastName: 'Largison'
}

let geoffMargison = {
    firstName: "Geoff",
    lastName: "Margison"
}

let steffMargison = {
    firstName: "Steff",
    lastName: "Margison"
}

let artists = [geoffSargison, geoffLargison, geoffMargison, steffMargison];
let singleOrArtist = prompt('Would you like a list of artists or a single artist?');
let answer = singleOrArtist.toLowerCase();

 function checkAnswer(answer) {
    if (answer.search("list") >= 0){
        for (var i = 0; i < artists.length; i++) {
            console.log(artists[i].firstName + " " + artists[i].lastName)
        }
    } else if (answer.search("single") >= 0) {
        let searchResult = [];
        let searchFirstName = prompt("What is the artists first name?");
        for (var i = 0; i < artists.length; i++){
            if (artists[i].firstName.toLowerCase() == searchFirstName.toLowerCase()) {
                searchResult.push(artists[i]);
            }
        }
        for (var i = 0; i < searchResult.length; i++) {
        console.log(searchResult[i].firstName + " " + searchResult[i].lastName);
        }
    } else {
        alert("I don't understand your answer, try again");
        location.reload();
    }
}

checkAnswer(answer);


