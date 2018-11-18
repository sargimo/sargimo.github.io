let sweetsEl = $('#sweets'),
    eventNameEl = $('#eventName'),
    eventDescEl = $('#eventDesc'),
    noOfAttendeesEl = $('#noOfAttendees'),
    submitFormBtn = $('#submitForm');
    event = {};
    screens = $('.screen');
    wizardScreen = $('#wizard')
    quoteScreen = $('#quote');
    confirmedScreen = $('#confirmed');
    eventTitleEl = $('.eventTitle');
    confirmEventDescEl = $('.event-description')
    confirmSweetImageEl = $('.confirm-sweet-image');
    confirmOrderMessageEl = $('.confirm-order-message');
    confirmTotalPriceEl = $('.confirm-total-price')
    confirmOrderBtn = $('#confirmOrderBtn');
    cancelOrderBtn = $('#cancelOrderBtn')


let sweetsList,
    categoryList

function init() {
    //get categories
    $.getJSON('json/categories.json', function (categories) {
        categoryList = categories;
        displayCategories(categoryList.categories);
    });
    //get sweet items
    $.getJSON('json/sweets.json', function (sweets) {
        sweetsList = sweets;
    });
    //add click listeners for buttons
    submitFormBtn.on('click', function(){
        getQuote();
        loadQuoteScreen();
        changeScreen(quoteScreen);
    });
    cancelOrderBtn.on('click', function(){
        changeScreen(wizardScreen);
    });
    confirmOrderBtn.on('click', function(){
        changeScreen(confirmedScreen);
    });

}

/**
 * Get the HTML string for one category list item.
 * @param {Object} sweet
 */
function getSweetItemHTML(i, sweet) {
    return `<div data-id="${sweet.id}" class="sweet-item">
                <img data-categoryid="${sweet.id}" src="img/${sweet.image}.jpg"> 
                <h3 class="wizard-item-title" data-id="${sweet.id}">${sweet.title}</h3>
            </div>`
}


/**
 * Display a list of sweets
 * @param {Array} sweets
 */
function displaySweets(sweets) {
    let htmlString = '';
    $.each(sweets, function (i, sweet) {
        htmlString = htmlString + getSweetItemHTML(i, sweet);
    });
    //displays sweets and adds back to categories button
    sweetsEl.html(htmlString + '<input id="backToCategories" type="button" value="Back to Categories">');
    let backToCategories = $("#backToCategories");
    backToCategories.on('click', function(){
        displayCategories(categoryList.categories);
    });
    //adds click listeners to the sweets to make final sweet selection
    let sweetItems = $(".sweet-item");
    sweetItems.on('click', function () {
        if (sweetItems.hasClass("active-sweet")) {
            sweetItems.removeClass("active-sweet");
        }
        $(this).addClass("active-sweet");
    })
}

/**
 * Display the video categories
 * @param {Object} categories 
 */
function displayCategories(categories) {
    //display catagory list items
    let htmlString = '';
    $.each(categories, function (i, category) {
        htmlString = htmlString + getCategoryItemHTML(category);
    });
    sweetsEl.html(htmlString);
    //add a click listener to each category item
    let categoryItems = $('.category-item');
    categoryItems.on('click', function () {
        let categoryid = $(this).data('categoryid');
        let filteredSweets = filterByCategory(sweetsList.sweets, categoryid);
        displaySweets(filteredSweets);
    });
}

/**
 * Filter the videos by category ID.
 * @param {Array} sweets
 * @param {number} categoryId
 */
function filterByCategory(sweets, categoryId) {
    return sweets.filter(function (sweet) {
        return sweet.categoryId == categoryId;
    });
}

/**
 * Get the HTML string for one category list item.
 * @param {Object} category 
 */
function getCategoryItemHTML(category) {
    return `<div data-categoryid="${category.id}" class="category-item">
                <img data-categoryid="${category.id}" src="img/${category.image}.jpg"> 
                <h3 class="wizard-item-title" data-id="${category.id}">${category.title}</h3>
            </div>`;
}

/**
 * Gets data from inputs to store for loading quote page 
 */
function getQuote(){
    let chosenSweetId = $('.active-sweet').data('id');
    let chosenSweet = sweetsList.sweets[chosenSweetId];
    let noOfAttendees = (parseInt(noOfAttendeesEl.val()));
    let totalPrice = (noOfAttendees * chosenSweet.price);
    event.title = eventNameEl.val();
    event.totalPrice = totalPrice.toFixed(2);
    event.chosenSweet = chosenSweet.title;
    event.desc = eventDescEl.val();
    event.chosenSweetPrice = chosenSweet.price.toFixed(2);
    event.attendees = noOfAttendees;
    event.chosenSweetImage = chosenSweet.image;
}

/**
 * Loads event data into the completion form
 */
function loadQuoteScreen(){
    eventTitleEl.html(event.title);
    confirmEventDescEl.html(event.desc);
    confirmSweetImageEl.html(`<img src="img/${event.chosenSweetImage}.jpg">`);
    confirmOrderMessageEl.html(`${event.chosenSweet}'s provided for ${event.attendees} attendees at $${event.chosenSweetPrice} each.`)
    confirmTotalPriceEl.html(`Total: $${event.totalPrice}`);
}


/**
 * Swaps active screen from wizard to completion form
 */
function changeScreen(screen){
    screens.removeClass('active');
    screen.addClass('active');
}

init();