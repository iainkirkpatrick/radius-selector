$(document).ready(function() {
  // Provide your access token
  L.mapbox.accessToken = 'pk.eyJ1IjoiZW52aW50YWdlIiwiYSI6Inh6U0p2bkEifQ.p6VrrwOc_w0Ij-iTj7Zz8A';
  // Create a map in the div #map
  var map = L.mapbox.map('map', 'envintage.i9eofp14');

  var featureGroup = L.featureGroup().addTo(map);
  // map.addLayer(featureGroup);

  var drawControl = new L.Control.Draw({
    draw: {
      polyline: false,
      polygon: false,
      rectangle: false,
      marker: false
    },
    edit: {
      featureGroup: featureGroup
    }
  }).addTo(map);

  map.on('draw:created', function(e) {
      featureGroup.addLayer(e.layer);
  });
})
