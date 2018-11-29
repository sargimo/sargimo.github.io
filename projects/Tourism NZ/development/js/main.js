let startLocation = $('#startLocation'),
endLocation = $('endLocation')


//leaflet maps
let map = L.map('mapid').setView([-43.491053, 172.57902], 6)


function init(){
  L.Routing.control({
    waypoints: [
]});
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1Ijoic2FyZ2ltbyIsImEiOiJjam9ucHUwdjQweHFqM3FsZTM5NzhjajlsIn0.l9URIGr2w1jZ3pUxuVM_tw',
  geocoder: L.Control.Geocoder.nominatim()  
}).addTo(map);
}

init();