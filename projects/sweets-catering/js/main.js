let sweetsEl = $('#sweets'),
    sweetItemsEl = $('#sweet-items'),
    beltEl = $('.belt'),
    eventNameEl = $('#eventName'),
    dateEl = $('#eventDate');
    noOfAttendeesEl = $('#noOfAttendees'),
    submitFormBtn = $('#submitForm');
    event = {};
    screens = $('.screen');
    wizardScreen = $('#wizard')
    quoteScreen = $('#quote');
    confirmedScreen = $('#confirmed');
    eventTitleEl = $('.eventTitle');
    confirmSweetImageEl = $('.confirm-sweet-image');
    confirmEventDateEl = $('.confirmEventDate')
    confirmOrderMessageEl = $('.confirm-order-message');
    confirmTotalPriceEl = $('.confirm-total-price')
    confirmOrderBtn = $('#confirmOrderBtn');
    cancelOrderBtn = $('#cancelOrderBtn')


let sweetsList,
    categoryList

//leaflet maps
let map = L.map('mapid').setView([-43.491053, 172.57902], 13),
jellyIcon = L.icon({
    iconUrl: '../img/jellybeanicon.png',
    shadowUrl: '../img/jellybeanicon-shadow.png',
    iconSize:     [58, 58], // size of the icon
    shadowSize:   [60, 60], // size of the shadow
    iconAnchor:   [38, 38], // point of the icon which will correspond to marker's location
    shadowAnchor: [38, 38],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
}),
personicon = L.icon({
    iconUrl: '../img/personicon.png',
    shadowUrl: '../img/personicon-shadow.png',
    iconSize:     [150, 150], // size of the icon
    shadowSize:   [152, 152], // size of the shadow
    iconAnchor:   [75, 100], // point of the icon which will correspond to marker's location
    shadowAnchor: [75, 100],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
})

marker = L.marker([-43.491053, 172.57902], {icon: jellyIcon}).addTo(map);

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
    //leaflet maps
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic2FyZ2ltbyIsImEiOiJjam9ucHUwdjQweHFqM3FsZTM5NzhjajlsIn0.l9URIGr2w1jZ3pUxuVM_tw'
    }).addTo(map);
    map.on('click', function(e) {
        let container = L.DomUtil.create('div'),
            startBtn = createButton('Start from this location', container),
            destBtn = createButton('Go to this location', container);
        L.popup()
            .setContent(container)
            .setLatLng(e.latlng)
            .openOn(map);
    }); 
    L.Routing.control({
        waypoints: [
            L.latLng(-41.491053, 170.57902),
            L.latLng(-43.491053, 172.57902)
        ],
        routeWhileDragging: true
    }).addTo(map);
    L.DomEvent.on(startBtn, 'click', function() {
        control.spliceWaypoints(0, 1, e.latlng);
        map1.closePopup();
    });
    L.DomEvent.on(destBtn, 'click', function() {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        map1.closePopup();
    });    
    // marker.bindPopup("<b>Sweet as Sweets Emporium</b>").openPopup();
    map.locate({setView: true, maxZoom: 16});
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

}

//leaflet functions
function onLocationFound(e) {
    let radius = e.accuracy / 2;

    L.marker(e.latlng, {icon: personicon}).addTo(mymap)
}

function onLocationError(e) {
    alert(e.message);
}

function createButton(label, container) {
    let btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
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
    sweetItemsEl.html(htmlString + '<input id="backToCategories" type="button" value="Back to Categories">');
    let backToCategoriesBtn = $("#backToCategories");
    backToCategoriesBtn.on('click', function(){
        beltEl.toggleClass('slide');
        sweetsEl.toggleClass('slide');
        sweetItemsEl.toggleClass('slide');
        backToCategoriesBtn.toggleClass('active');
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
        let backToCategoriesBtn = $("#backToCategories");
        beltEl.toggleClass('slide');
        sweetsEl.toggleClass('slide');
        sweetItemsEl.toggleClass('slide');
        backToCategoriesBtn.toggleClass('active');
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
    //date controls
    let dateOfEvent = new Date (dateEl.val());
    day = dateOfEvent.getDate();
    month = dateOfEvent.getMonth() + 1;
    year = dateOfEvent.getFullYear();
    event.title = eventNameEl.val();
    event.date = `${day}/${month}/${year}`;
    event.totalPrice = totalPrice.toFixed(2);
    event.chosenSweet = chosenSweet.title;
    event.chosenSweetPrice = chosenSweet.price.toFixed(2);
    event.attendees = noOfAttendees;
    event.chosenSweetImage = chosenSweet.image;
}

/**
 * Loads event data into the completion form
 */
function loadQuoteScreen(){
    eventTitleEl.html(event.title);
    confirmEventDateEl.html(event.date)
    confirmSweetImageEl.html(`<img src="img/${event.chosenSweetImage}.jpg">`);
    confirmOrderMessageEl.html(`<span class="pinkText">${event.chosenSweet}'s</span> provided for <span class="pinkText">${event.attendees}</span> attendees at <span class="pinkText">$${event.chosenSweetPrice}</span> each.`)
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