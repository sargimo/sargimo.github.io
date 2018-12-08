let calOptions = {},
  calendars = bulmaCalendar.attach('[type="date"]', calOptions),
  startDateCal = calendars[0],
  endDateCal = calendars[1],

  groupSize,
  startDate,
  endDate,
  tripNoOfDays,
  startLocation,
  endLocation,

  routeTotalDistance,
  currentDetourId,

  vehicleList,
  seatFilteredVehicleList,
  categoryList,
  chosenVehicle = [],
  currentScreen = "formScreen",

  //screen 1
  formGroupSizeInput = $('#groupSize'),
  formStartLocInput = $('#startLocation'),
  formEndLocInput = $('#endLocation'),
  formStartDateInput = $('#startDate'),
  formEndDateInput = $('#endDate'),
  formSubmitBtn = $('#submitBtn'),
  formScreen = $('#formScreen'),
  carSelectScreen = $('#carSelectScreen'),
  mapScreen = $('#mapScreen'),
  screens = $('.screen'),

  //screen 2
  allVehiclesBtn = $('#allVehicles'),
  compactVehiclesBtn = $('#compactVehicles'),
  sedanVehiclesBtn = $('#sedanVehicles'),
  suvVehiclesBtn = $('#suvVehicles'),
  luxuryVehiclesBtn = $('#luxuryVehicles'),
  vehicleItemsEl = $('#vehicleItems'),
  selectCarBtn,

  //screen 3
  routeOptionsBtn = $('#routeOptionsBtn'),
  carInfoBtn = $('#carInfoBtn'),

  routeOptionsEl = $('.route-display'),
  roTotalDistanceEl = $('#roTotalDistance'),
  roTotalCostEl = $('#roTotalCost'),
  roStartLocationEl = $('#roStartLoc'),
  roEndLocationEl = $('#roEndLoc'),
  addDetourBtn = $('.add-detour-container'),
  addDetourInputEl = $('#addDetourInput'),
  routeListEl = $('#routeList'),
  roStartDateEl = $('#roStartDate'),
  roEndDateEl = $('#roEndDate'),
  removeRouteBtn,

  carInfoEl = $('.car-info'),

  detourLocSearchBox = $('#detourLocation'),
  routeWaypoints = []

const fuelPrice = 2.25;

//leaflet maps
let map = L.map('mapid').setView([-43.491053, 172.57902], 6)
//Start/Finish inputs geocoding
let startLocationEl = BootstrapGeocoder.search({
  inputTag: 'startLocation',
  placeholder: 'Starting Location'
}).addTo(map),
  endLocationEl = BootstrapGeocoder.search({
    inputTag: 'endLocation',
    placeholder: 'Finishing Location'
  }).addTo(map),
  detourLocationEl = BootstrapGeocoder.search({
    inputTag: 'detourLocation',
    placeholder: 'Travel via...'
  }).addTo(map);
routingControl = L.Routing.control({
  waypoints: routeWaypoints,
  autoRoute: true
}).addTo(map);

function init() {
  //get vehicles
  $.getJSON('json/vehicles.json', function (vehicles) {
    vehicleList = vehicles;
  });
  
  //init submit button to collect input data and calculate map routes
  formSubmitBtn.on('click', function () {
    groupSize = formGroupSizeInput.val();
    startDate = formStartDateInput.val();
    endDate = formEndDateInput.val();
    // if (validateFormScreen()) {
    calcTripNoOfDays();
    currentScreen = "carSelectScreen";
    seatFilteredVehicleList = filterByGroupSize(vehicleList.vehicles, groupSize);
    drawRoute();
    changeScreen(carSelectScreen);
    // };
    // if (groupSize && startDate && endDate && startLocation && endLocation) {
  });

  //Adds click out functionality to bulma calendar
  $('body').on('click', function () {
    $.each(calendars, function (i, calendar) {
      calendar.hide();
    });
  });

  //routing events to delay loading until routes have been returned for calculations
  routingControl.on('routesfound', function (e) {
    let routes = e.routes;
    //converts from M to KM
    routeTotalDistance = ((routes[0].summary.totalDistance) / 1000);
    if (currentScreen == "carSelectScreen") {
      updateFuelCost(seatFilteredVehicleList);
      displayVehicles(seatFilteredVehicleList);
    } else if (currentScreen = "mapScreen") {
      updateFuelCost(seatFilteredVehicleList);
      updateMapScreenData();
    }
  });

  //click listeners for categories
  allVehiclesBtn.on('click', function () {
    displayVehicles(seatFilteredVehicleList);
  });
  compactVehiclesBtn.on('click', function () {
    let categoryid = $(this).data('categoryid');
    let filteredVehicles = filterByCategory(seatFilteredVehicleList, categoryid)
    displayVehicles(filteredVehicles);
  });
  sedanVehiclesBtn.on('click', function () {
    let categoryid = $(this).data('categoryid');
    let filteredVehicles = filterByCategory(seatFilteredVehicleList, categoryid)
    displayVehicles(filteredVehicles);
  });
  suvVehiclesBtn.on('click', function () {
    let categoryid = $(this).data('categoryid');
    let filteredVehicles = filterByCategory(seatFilteredVehicleList, categoryid)
    displayVehicles(filteredVehicles);
  });
  luxuryVehiclesBtn.on('click', function () {
    let categoryid = $(this).data('categoryid');
    let filteredVehicles = filterByCategory(seatFilteredVehicleList, categoryid)
    displayVehicles(filteredVehicles);
  });

  //leaflet map init
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic2FyZ2ltbyIsImEiOiJjanA3c2ppYmExc285M3BwNzM1ZTN3cHRmIn0.kFrH0CWunKl-1DIvPN_vZQ',
  }).addTo(map);

  //leaflet geosearch listeners
  startLocationEl.on('results', function (e) {
    startLocation = (e);
    formStartLocInput.val(startLocation.text)
    routeWaypoints.push(L.latLng(parseFloat(startLocation.latlng.lat), parseFloat(startLocation.latlng.lng)))
  });
  endLocationEl.on('results', function (e) {
    endLocation = (e);
    formEndLocInput.val(endLocation.text);
    routeWaypoints.push(L.latLng(parseFloat(endLocation.latlng.lat), parseFloat(endLocation.latlng.lng)))
  });
  detourLocationEl.on('results', function (e) {
    detourLocation = (e);
    routeWaypoints.splice((routeWaypoints.length - 1), 0, detourLocation.latlng);
    currentDetourId = (routeWaypoints.length - 2);
    drawRoute();
    addDetourToRouteList();
    // Potential reset function
    // let startPoint = L.latLng(parseFloat(startLocation.latlng.lat), parseFloat(startLocation.latlng.lng));
    // let detourPoint1 = L.latLng(parseFloat(detourLocation.latlng.lat), parseFloat(detourLocation.latlng.lng));
    // let endPoint = L.latLng(parseFloat(endLocation.latlng.lat), parseFloat(endLocation.latlng.lng));
    // detourLocSearchBox.val(detourLocation.text);
    // routeWaypoints = [];
    // routeWaypoints.push(startPoint, detourPoint1, endPoint)
    // drawRoute();
  });

  //toggle active state for options panel screen 3
  routeOptionsBtn.on('click', function () {
    routeOptionsEl.toggleClass('active');
    routeOptionsBtn.toggleClass('active');
  });
  carInfoBtn.on('click', function () {
    carInfoEl.toggleClass('active');
    carInfoBtn.toggleClass('active');
  });

  //toggle active state for detour input
  addDetourBtn.on('click', function () {
    addDetourInputEl.toggleClass('active');
    $('#detourLocation').focus();
  });
}
//Add location button shows input. Input splices routeWaypoints by routeWaypoint.length -1 to add 2nd to last. Add button on Input pushes name to the list, with data-id of routeWaypoints.length (before adding). Clicking X button on list item uses data ID as a way to remove the array at that index, and removes list item. 

//calculates days between start and end for use in future calculations
function getNoOfDays(startTime, endTime) {
  let difference = endTime - startTime;
  return Math.floor(difference / 1000 / 60 / 60 / 24);
}

function calcTripNoOfDays() {
  let startTime = new Date(startDateCal.value()).getTime();
  let endTime = new Date(endDateCal.value()).getTime();
  tripNoOfDays = getNoOfDays(startTime, endTime);
}

function validateFormScreen() {
  if (formStartDateInput.val() == "") {
    formStartDateInput.addClass('required');
    return false;
  } else if (formEndDateInput.val() == "") {
    formEndDateInput.addClass('required');
    return false;
  } else if (!startLocation) {
    formStartLocInput.addClass('required');
    return false;
  } else if (!endLocation) {
    formEndLocInput.addClass('required');
    return false;
  }
  return true;
}
/**
 * @param {object} vehicle
 * @param {number} delay
 * Get the HTML string for one vehicle item. Give delay for animation css cascading delay effect. 
 * 
 */
function getVehicleItemHTML(i, vehicle, delay) {
  return `<div data-id="${vehicle.id}" class="column is-4-desktop is-6-tablet vehicle-item animated fadeInUp delay-${delay}">
            <div>
              <h1>${vehicle.name}</h1>
            </div>
            <div class="vehicle-image level">
              <img src="../images/cars/${vehicle.image}" alt="${vehicle.name}">
            </div>
            <div class="columns">
              <div data-id="${vehicle.id}" class="column is-half is-offset-one-quarter vehicle-item-button">
                <button data-id="${vehicle.id}" class="btn-green selectCarBtn">SELECT</button>
              </div>
            </div>
            <div class="info-panel">
              <div class="more-info-btn">
                <img src="../images/chevron.png" alt="tab">
              </div>
              <div class="more-info">
                  <img src="../images/chevron-container.png" alt="tab">
              </div>
              <ul class="info-list">
                <li><i class="gradient-icon fas fa-user"></i>${vehicle.seats}<div class="info-text">passengers</div></li>
                <li><i class="gradient-icon fas fa-car-battery"></i>${vehicle.engine}<div class="info-text">engine size</div></li>
                <li><i class="gradient-icon fas fa-dollar-sign"></i>${vehicle.price}<div class="info-text">price per day</div></li>
              </ul>
              <ul class="more-info-list">
                <li><i class="gradient-icon fas fa-gas-pump"></i>$${vehicle.totalFuelCost}<div class="info-text">route fuel cost</div></li>
                <li><i class="gradient-icon fas fa-suitcase"></i>${vehicle.lrgBags} lrg, ${vehicle.smlBags} sml<div class="info-text">boot bag space</div></li>
                <li><i class="gradient-icon fas fa-map-marked-alt"></i>${vehicle.gps}<div class="info-text">GPS</div></li>
            </div>
          </div>`
}

/**
 * Display a list of vehicles, adds select car buttons to each, and adds click function for select car button
 * @param {Array} vehicles
 */
function displayVehicles(vehicles) {
  let htmlString = '';
  delay = 0;
  $.each(vehicles, function (i, vehicle) {
    htmlString = htmlString + getVehicleItemHTML(i, vehicle, delay);
    delay += 1;
  });
  vehicleItemsEl.html(htmlString);
  //init the more info panels for each vehicle
  initMoreInfoPanels();
  //init select car button for each vehicle
  selectCarBtn = $('.selectCarBtn');
  selectCarBtn.on('click', function () {
    let id = $(this).data('id');
    chosenVehicle = vehicleList.vehicles[id];
    loadMapScreenData();
    updateMapScreenData();
  });
}

/**
 * Filter the vehicles by category ID.
 * @param {Array} vehicles
 * @param {number} categoryId
 */
function filterByCategory(vehicles, categoryid) {
  return vehicles.filter(function (vehicle) {
    return vehicle.categoryId == categoryid;
  });
}

/**
 * Filter the vehicles by category ID.
 * @param {Array} vehicles
 * @param {number} groupsize
 */
function filterByGroupSize(vehicles, groupsize) {
  return vehicles.filter(function (vehicle) {
    return vehicle.seats >= groupsize;
  });
}

//inits more info panels on car select screen after they have been generated
function initMoreInfoPanels() {
  let moreInfoBtn = $('.info-panel');
  moreInfoBtn.on('click', function () {
    $(this).toggleClass('active');
    let parent = $(this).parent();
    parent.find('.selectCarBtn').toggleClass('active');
    $(this).find('.more-info').toggleClass('active');
    $(this).find('.more-info-btn').toggleClass('active');
    $(this).find('.more-info-list').toggleClass('active');
  });
};

//TO DO: NAME THIS SHIT
function loadMapScreenData() {
  changeScreen(mapScreen);
  currentScreen = "mapScreen";
  //refreshes leaflet map to fix tile loading issues when in display: none
  map.invalidateSize();
  map.setView([-43.491053, 172.57902], 6);
};

//call to update infomation dynamically as routes change
function updateMapScreenData() {
  let totalCost = getTotalCost(chosenVehicle);
  chosenVehicle.totalCost = totalCost;
  let carInfo = getFullVehicleInfoHTML(chosenVehicle);
  roTotalDistanceEl.html(`${routeTotalDistance.toFixed(2)} KMs`);
  roTotalCostEl.html('$' + totalCost);
  roStartLocationEl.html(startLocation.text);
  roEndLocationEl.html(endLocation.text);
  roStartDateEl.html(startDate);
  roEndDateEl.html(endDate);
  carInfoEl.html(carInfo);
}

/**
 * Calculates the fuel cost for a vehicle based on the route distance
 * @param {Object} vehicle
 */
function getFuelCost(vehicle) {
  let litresUsed = (vehicle.fuelEfficiency * (routeTotalDistance / 100));
  let price = (fuelPrice * litresUsed).toFixed(2);
  return price;
}

/**
 * Calculates the rental cost for a vehicle based on the number of days
 * @param {Object} vehicle
 */
function getRentalCost(vehicle) {
  let price = (vehicle.price * tripNoOfDays);
  return price;
}

function getTotalCost(vehicle) {
  let fuelPrice = parseFloat(getFuelCost(vehicle));
  let rentalPrice = getRentalCost(vehicle);
  let price = (fuelPrice + rentalPrice).toFixed(2);
  return price;
}

/**
 * Updates property of vehicle object with current fuel cost for route
 * @param {Object} vehicle
 */
function updateFuelCost(vehicles) {
  $.each(vehicles, function (i, vehicle) {
    let price = getFuelCost(vehicle, routeTotalDistance);
    vehicle.totalFuelCost = parseFloat(price).toFixed(2);
  });
}

/**
 * @param {object} location
 * Get the HTML string for one destination item.
 */
function getDetourListHTML(i, location) {
  return `<li>
            <div class="columns is-mobile route-item">
              <div class="flag column is-2">
                <i class="fas fa-flag-checkered"></i>
              </div>
              <div class="column is-8">
                <h2>VIA</h2>
                <div class="location-text">
                ${detourLocation.text}
                </div>
              </div>
              <div class="column is-2 ro-date-container">
                <div data-id="${currentDetourId}" class="remove-route"><i class="fas fa-times-circle"></i></div>
                </div>
            </div>
          </li>`
}

//Generates html list elements for added routes, then inits the remove buttons
function addDetourToRouteList() {
  let htmlString = getDetourListHTML;
  routeListEl.append(htmlString);
  removeRouteBtn = $('.remove-route');
  initRemoveRouteBtns();
}

//inits the remove route button functionality after the list item has been generated
function initRemoveRouteBtns() {
  removeRouteBtn.on('click', function () {
    routeWaypoints.splice(($(this).data('id')), 1);
    $('#routeList li:last-child').remove();
    drawRoute();
  })
}

function getFullVehicleInfoHTML(vehicle) {
  return `<div data-id="${vehicle.id}" class="ci-car-info">
            <div>
              <h1>${vehicle.name}</h1>
            </div>
            <div class="vehicle-image level">
              <img src="../images/cars/${vehicle.image}" alt="${vehicle.name}">
            </div>
            <div class="car-description">
              ${vehicle.description}
            </div>
            <div class="box has-text-centered">
              <button id="chooseNewCar" class="btn-transparent">choose new car</button>
            </div>
            <div class="info-panel">
              <ul class="info-list">
                <li><i class="gradient-icon fas fa-user"></i>${vehicle.seats}<div class="info-text">passengers</div></li>
                <li><i class="gradient-icon fas fa-door-open"></i>${vehicle.doors}<div class="info-text">doors</div></li>
                <li><i class="gradient-icon fas fa-car-battery"></i>${vehicle.engine}<div class="info-text">engine size</div></li>
                <li><i class="gradient-icon fas fa-suitcase"></i>${vehicle.lrgBags}<div class="info-text">large bags</div></li>
                <li><i class="gradient-icon fas fa-suitcase"></i>${vehicle.smlBags}<div class="info-text">small bags</div></li>
                <li><i class="gradient-icon fas fa-dollar-sign"></i>${vehicle.price}<div class="info-text">price per day</div></li>
                <li><i class="gradient-icon fas fa-gas-pump"></i>${vehicle.fuelEfficiency}L/100k<div class="info-text">fuel efficiency</div></li>
                <li><i class="gradient-icon fas fa-map-marked-alt"></i>${vehicle.gps}<div class="info-text">GPS</div></li>
                <li><i class="gradient-icon fas fa-dollar-sign"></i>${vehicle.totalFuelCost}<div class="info-text">route fuel cost</div></li>
                <li><i class="gradient-icon fas fa-dollar-sign"></i>${vehicle.totalCost}<div class="info-text">total cost</div></li>
              </ul>
            </div>
          </div>`
}


//maps waypoints from array
function drawRoute() {
  routingControl.setWaypoints(
    routeWaypoints
  );
}

//Swaps active screen 
function changeScreen(screen) {
  screens.removeClass('active');
  screen.addClass('active');
}

init();