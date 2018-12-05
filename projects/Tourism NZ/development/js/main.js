let formGroupSizeInput = $('#groupSize'),
  formStartLocInput = $('#startLocation'),
  formEndLocInput = $('#endLocation'),
  formStartDateInput = $('#startDate'),
  formEndDateInput = $('#endDate'),
  formSubmitBtn = $('#submitBtn'),

  groupSize,
  startDate,
  endDate,
  startLocation,
  endLocation,
  currentDetourId,

  routeTotalDistance,

  vehicleList,
  seatFilteredVehicleList,
  categoryList,
  chosenVehicle = [],

  formScreen = $('#formScreen'),
  carSelectScreen = $('#carSelectScreen'),
  mapScreen = $('#mapScreen'),
  screens = $('.screen'),
  currentScreen = "formScreen",

  allVehiclesBtn = $('#allVehicles'),
  compactVehiclesBtn = $('#compactVehicles'),
  sedanVehiclesBtn = $('#sedanVehicles'),
  suvVehiclesBtn = $('#suvVehicles'),
  luxuryVehiclesBtn = $('#luxuryVehicles'),
  vehicleItemsEl = $('#vehicleItems'),
  selectCarBtn,

  routeOptionsBtn = $('#routeOptionsBtn'),
  routeOptionsEl = $('.route-display'),
  roTotalDistanceEl = $('#roTotalDistance'),
  roTotalCostEl = $('#roTotalCost'),
  roStartLocationEl = $('#roStartLoc'),
  roEndLocationEl = $('#roEndLoc'),
  addDetourBtn = $('.add-detour-container'),
  addDetourInputEl = $('#addDetourInput'),
  routeListEl = $('#routeList'),
  removeRouteBtn,

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
    currentScreen = "carSelectScreen";
    groupSize = formGroupSizeInput.val();
    seatFilteredVehicleList = filterByGroupSize(vehicleList.vehicles, groupSize);
    drawRoute();
    changeScreen(carSelectScreen);
  });
  routingControl.on('routesfound', function (e) {
    let routes = e.routes;
    //converts from M to KM
    routeTotalDistance = ((routes[0].summary.totalDistance) / 1000);
    if (currentScreen == "carSelectScreen") {
      updateFuelCost(seatFilteredVehicleList);
      displayVehicles(seatFilteredVehicleList);
    } else if (currentScreen= "mapScreen") {
      updateFuelCost(seatFilteredVehicleList);
      updateMapScreenData();
    }
  });
  //click functions for categories
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
  //toggle active state for route options
  routeOptionsBtn.on('click', function(){
    routeOptionsEl.toggleClass('active');
  });
  //toggle active state for detour input
  addDetourBtn.on('click', function () {
    addDetourInputEl.toggleClass('active');
  });
}
//Add location button shows input. Input splices routeWaypoints by routeWaypoint.length -1 to add 2nd to last. Add button on Input pushes name to the list, with data-id of routeWaypoints.length (before adding). Clicking X button on list item uses data ID as a way to remove the array at that index, and removes list item. 


/**
 * @param {object} vehicle
 * Get the HTML string for one vehicle item.
 */
function getVehicleItemHTML(i, vehicle) {
  return `<div data-id="${vehicle.id}" class="column is-4-desktop is-6-tablet vehicle-item">
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
              <div class="column is-one-quarter more-info">
                <i class="more-info-btn fas fa-chevron-circle-up"></i>
                <p>more info</p>
              </div>
            </div>
            <div class="info-panel">
              <ul>
                <li><i class="gradient-icon fas fa-user"></i>${vehicle.seats}<div class="info-text">passengers</div></li>
                <li><i class="gradient-icon fas fa-suitcase"></i>${vehicle.lrgBags}<div class="info-text">large bags</div></li>
                <li><i class="gradient-icon fas fa-dollar-sign"></i>${vehicle.totalFuelCost}<div class="info-text">trip fuel cost</div></li>
              </ul>
            </div>
          </div>`
}

/**
 * Display a list of vehicles, adds select car buttons to each, and adds click function for select car button
 * @param {Array} vehicles
 */
function displayVehicles(vehicles) {
  let htmlString = '';
  $.each(vehicles, function (i, vehicle) {
    htmlString = htmlString + getVehicleItemHTML(i, vehicle);
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
function initMoreInfoPanels(){
  let moreInfoBtn = $('.info-panel');
  moreInfoBtn.on('click', function(){
    $(this).toggleClass('active');
    let parent = $(this).parent();
    parent.find('.selectCarBtn').toggleClass('active');
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
  roTotalDistanceEl.html(`${routeTotalDistance.toFixed(2)} KMs`);
  roTotalCostEl.html(`$${chosenVehicle.totalFuelCost}`);
  roStartLocationEl.html(startLocation.text);
  roEndLocationEl.html(endLocation.text);
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
                  <div class="ro-date">11/12/18</div>
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
function initRemoveRouteBtns(){
  removeRouteBtn.on('click', function(){
    routeWaypoints.splice(($(this).data('id')), 1);
    $('#routeList li:last-child').remove();
    drawRoute();
  })
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