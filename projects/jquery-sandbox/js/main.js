/**
 * In your Javascript file:
 * 1. Create the following variables:
 * A variable for your textarea HTML element
 * A variable for the "rem-chars" span
 * A variable for value of the the "maxlength" attribute of the textarea.
 * 2. Now:
 * put a keyup listener on the textarea
 * In the listener’s callback:
 * set the text of the "rem-chars" span to the value of the  "maxlength" 
 * attribute of the textarea minus the length of the value of the textarea.
 */

 let textArea = $('#textarea');
 let remChars = $('#rem-chars');
 let maxLength = textArea.attr('maxlength');

 textArea.keyup(function (){
     remChars.html((maxLength - textArea.val().length));
 });

/**
 * In your Javascript file:
 * 1. Create the following variables:
 * A variable for your fruitlist.
 * A variable for your add button.
 * 2. Now:
 * put a click listener on the add button
 * In the listener’s callback:
 *  append a new list item to the list
 */

let fruitList = $('#fruit-list');
let addBtn = $('#add-btn');

addBtn.on('click', function(){
    fruitList.append('<li>Possum\'s suck</li>');
});

/**
 * On the bottom of a page with a scrolling y-axis, put a link called “Go to top” or similar. 
 * In your Javascript file:
 * target the link 
 * put a click listener on it
 * In the listener’s callback:
 * target the document’s body
 * On this element (the body), call the animate method using these parameters:
 * { scrollTop: 0 }, "slow"
 */
let topOfPage = $('#topOfPage');

topOfPage.on('click', function(){
    $('html, body').animate({scrollTop: 0}, "slow");
});

/**
 * 1. Create variables for the fruit and selected-fruit HTML elements.
 * 2. Create a variable for an array of fruit names.
 * 3. Loop through the items and append items to the fruit list. See this link 
 * for best practices when appending: https://learn.jquery.com/performance/append-outside-loop/
 * 4. Now, add a click listener to the fruit list to listen to the click events 
 * on the list items (use .on('click', 'li',  function(){}).
 * 5. In the click listener
 * Clone the selected listitem and append it to the selected fruit list.
 * Hide the selected list item.
 * You could fade the items into the selected fruit list by adding: .hide().fadeIn(500)
 */

 let fruitEl = $('#fruit');
 let selectedFruitEl = $('#selected-fruit');
 let fruitArr = ["Bananas", "Apples", "Bananays", "Couple Avos","Few beers"];
 let listHtml = "";

 $.each(fruitArr, function(i, item){
      listHtml += "<li>" + item + "</li>";
 });

 fruitEl.html(listHtml); 

 fruitEl.on('click', 'li', function(){
     selectedFruitEl.append($(this).hide().fadeIn(500));
 });
// Alternative way for any other cases
//  fruitEl.on('click', 'li',  function(){
//     let selected = $(this).clone();
//     $(this).hide();
//     selectedFruitEl.append(selected).hide().fadeIn(500);
//  })

