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
  routeControl = L.Routing.control({
    waypoints: routeWaypoints
  });

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
  marker = L.marker([51.5, -0.09]).addTo(map);
  //leaflet geosearch listeners
  startLocationEl.on('results', function (e) {
    startLocation = (e);
    startLocSearchBox.val(startLocation.text)
    routeWaypoints.push(L.latLng(parseFloat(startLocation.latlng.lat), parseFloat(startLocation.latlng.lng)))
    mapRoute();
    // map.invalidateSize();
  });
  endLocationEl.on('results', function (e) {
    endLocation = (e);
    endLocSearchBox.val(endLocation.text);
    routeWaypoints.push(L.latLng(parseFloat(endLocation.latlng.lat), parseFloat(endLocation.latlng.lng)))
    mapRoute();
    // map.invalidateSize();
  });
  detourLocationEl.on('results', function (e) {
    detourLocation = (e);
    detourLocSearchBox.val(detourLocation.text);
    routeWaypoints.splice(1, 0, (L.latLng(parseFloat(detourLocation.latlng.lat), parseFloat(detourLocation.latlng.lng))))
    clearRoute();
    mapRoute();
    // map.invalidateSize();
  });
}

function mapRoute(){
  L.Routing.control({
    waypoints:
    routeWaypoints
  }).addTo(map); 
}

function clearRoute(){
  routeControl.getPlan().setWaypoints([]);
}

init();