$(document).ready(function() {

  // Provide your access token
  L.mapbox.accessToken = 'pk.eyJ1IjoiZW52aW50YWdlIiwiYSI6Inh6U0p2bkEifQ.p6VrrwOc_w0Ij-iTj7Zz8A';
  // Create a map in the div #map
  var map = L.mapbox.map('map', 'envintage.i9eofp14');
  var position;

  //get user geolocation
  navigator.geolocation.getCurrentPosition(function(pos){
    position = pos.coords;
    map.setView([position.latitude, position.longitude], 13)
  });

  var featureGroup = L.featureGroup().addTo(map);
  // map.addLayer(featureGroup);

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
    // edit: {
    //   featureGroup: featureGroup
    // }
  }).addTo(map);

  map.dragging.disable();

  map.on('draw:drawstart', function(e) {
    $('#radius-display').removeClass('panel-success').addClass('panel-default');
    $('#radius-meters').html('');
    featureGroup.clearLayers();
  });

  map.on('draw:created', function(e) {
    console.log(e.layer._mRadius);
    $('#radius-display').removeClass('panel-default').addClass('panel-success');
    $('#radius-meters').html(Math.round(e.layer._mRadius) + " meters");
    featureGroup.addLayer(e.layer);
  });
})
