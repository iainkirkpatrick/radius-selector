$(document).ready(function() {

  // Provide your access token
  L.mapbox.accessToken = 'pk.eyJ1IjoiZW52aW50YWdlIiwiYSI6Inh6U0p2bkEifQ.p6VrrwOc_w0Ij-iTj7Zz8A';
  // Create a map in the div #map
  var map = L.mapbox.map('map', 'envintage.i9eofp14');

  //currently a hack to allow leaflet.draw to see the geolocation - store as global
  //else would do this:
  // var position;

  //get user geolocation
  navigator.geolocation.getCurrentPosition(function(pos){
    // position = pos.coords;
    geolocation = pos.coords
    map.setView([geolocation.latitude, geolocation.longitude], 13);
    L.marker([geolocation.latitude, geolocation.longitude]).addTo(map);
  });

  var featureGroup = L.featureGroup().addTo(map);

  //set the helper text when drawing circle begins
  L.drawLocal.draw.handlers.circle.tooltip.start = 'Pinch and drag to set your search radius';
  L.drawLocal.draw.handlers.simpleshape.tooltip.end = 'Release to finish drawing'

  var drawControl = new L.Control.Draw({
    position: "topleft",
    draw: {
      polyline: false,
      polygon: false,
      rectangle: false,
      marker: false
    }
  }).addTo(map);

  map.dragging.disable();

  map.on('draw:drawstart', function(e) {
    // console.log(e);
    $('#radius-display').removeClass('panel-success').addClass('panel-default');
    $('#radius-meters').html('');
    featureGroup.clearLayers();
  });

  map.on('draw:created', function(e) {

    e.layer._latlng.lat = geolocation.latitude;
    e.layer._latlng.lng = geolocation.longitude;

    $('#radius-display').removeClass('panel-default').addClass('panel-success');
    $('#radius-meters').html(Math.round(e.layer._mRadius) + " meters");
    featureGroup.addLayer(e.layer);
  });
})
