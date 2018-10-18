/**
 * Activity | Navigating the DOM Document
 * Go to https://en.wikipedia.org/wiki/JavaScript and create scripts that will produce the following output:
 */

 //"You came from: https://en.wikipedia.org/wiki/Main_Page"
document.referrer;

//"There are 82 p tags on the page."
document.querySelectorAll('p');

//"There are 130 elements with the class name of 'reference'."
var totalReferenceTags = document.querySelectorAll('.reference')

totalReferenceTags.length

//"The first element with a class name of 'infobox' has the following class list: infobox vevent"
"The first element with a class name of 'infobox' has the following class list: " + document.querySelector('.infobox').classList;

//"The first element with a class name of 'infobox' has 2 classes"
"The first element with a class name of 'infobox' has " + document.querySelector('.infobox').classList.length + " classes";

//"The html inside the element with an id of 'firstHeading' is: JavaScript"
"The html inside the element with an id of 'firstHeading' is: " + document.querySelector('#firstHeading').innerHTML;

//"The id of the element that is the first child of an element with the id of 'siteNotice' is: centralNotice"
"The id of the element that is the first child of an element with the id of 'siteNotice' is: " + document.querySelector('#siteNotice').firstChild.id;

//"The id of the element that is the first sibling of an element with the id of 'content' is: mw-navigation"
"The id of the element that is the first sibling of an element with the id of 'content' is: " + document.querySelector('#content').nextElementSibling.id;

//"The padding of the element with a class of 'navbox' is: 3px"
"The padding of the element with a class of 'navbox' is: " + document.querySelector('.navbox').style.padding;

//Set the first occurrence of an h1 element to have a font size of 3em.
document.querySelector('h1').style.fontSize = '3em';

//Give the first occurrence of an h1 element a class of "hatnote".
document.querySelector('h1').classList.add ('hatnote');

//Remove the styling of the element with an id of "catlinks" (it's the Categories box at the bottom of the page).
document.querySelector("#catlinks").style.clear;

//Programmatically hide the "Contents" menu using the "hide" hyperlink that has an id of "togglelink".
