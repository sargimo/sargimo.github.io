
//leaflet maps
let map = L.map('mapid').setView([-43.491053, 172.57902], 13),
marker = L.marker([51.5, -0.09]).addTo(map),
search = BootstrapGeocoder.search({
    inputTag: 'address',
    placeholder: 'Event address'
  }).addTo(map);