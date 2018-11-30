let startLocSearchBox = $('#startLocation'),
  endLocSearchBox = $('#endLocation'),
  detourLocSearchBox = $('#detourLocation')

  routeWaypoints = []

//leaflet maps
let map = L.map('mapid').setView([-43.491053, 172.57902], 6)
//Start/Finish inputs 
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

let startLocation,
  endLocation,
  detourLocation

function init() {
  //leaflet map init
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic2FyZ2ltbyIsImEiOiJjam9ucHUwdjQweHFqM3FsZTM5NzhjajlsIn0.l9URIGr2w1jZ3pUxuVM_tw',
  }).addTo(map);
  //leaflet geosearch listeners
  startLocationEl.on('results', function (e) {
    startLocation = (e);
    startLocSearchBox.val(startLocation.text)
    routeWaypoints.push(L.latLng(parseFloat(startLocation.latlng.lat), parseFloat(startLocation.latlng.lng)))
    // map.invalidateSize();
  });
  endLocationEl.on('results', function (e) {
    endLocation = (e);
    endLocSearchBox.val(endLocation.text);
    routeWaypoints.push(L.latLng(parseFloat(endLocation.latlng.lat), parseFloat(endLocation.latlng.lng)))
    drawRoute();
    // map.invalidateSize();
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

function drawRoute(){
  routingControl.setWaypoints(
    routeWaypoints
  );
}

init();