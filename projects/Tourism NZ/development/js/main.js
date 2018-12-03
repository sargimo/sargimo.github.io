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

  routeTotalDistance,

  vehicleList,
  seatFilteredVehicleList,
  categoryList,

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
    routeTotalDistance = routes[0].summary.totalDistance;
    if (currentScreen == "carSelectScreen") {
      updateFuelCost(seatFilteredVehicleList);
      displayVehicles(seatFilteredVehicleList);
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
    drawRoute();
    // Potential reset function
    // let startPoint = L.latLng(parseFloat(startLocation.latlng.lat), parseFloat(startLocation.latlng.lng));
    // let detourPoint1 = L.latLng(parseFloat(detourLocation.latlng.lat), parseFloat(detourLocation.latlng.lng));
    // let endPoint = L.latLng(parseFloat(endLocation.latlng.lat), parseFloat(endLocation.latlng.lng));
    // detourLocSearchBox.val(detourLocation.text);
    // routeWaypoints = [];
    // routeWaypoints.push(startPoint, detourPoint1, endPoint)
    // drawRoute();
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
              <div class="column is-half is-offset-one-quarter vehicle-item-button">
                <button class="btn-green selectCarBtn">SELECT</button>
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
 * Display a list of vehicles
 * @param {Array} vehicles
 */
function displayVehicles(vehicles) {
  let htmlString = '';
  $.each(vehicles, function (i, vehicle) {

    htmlString = htmlString + getVehicleItemHTML(i, vehicle);
  });
  vehicleItemsEl.html(htmlString);
  selectCarBtn = $('.selectCarBtn');
  selectCarBtn.on('click', function () {
    changeScreen(mapScreen);
    map.invalidateSize();
    map.setView([-43.491053, 172.57902], 6)
  })
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

/**
 * Calculates the fuel cost for a vehicle based on the route distance
 * @param {Object} vehicle
 * @param {number} groupsize
 */
function getFuelCost(vehicle, distance) {
  let distanceKMs = (distance / 1000);
  let litresUsed = (vehicle.fuelEfficiency * (distanceKMs / 100));
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

// function updateDistanceCalcs(){

// }
init();