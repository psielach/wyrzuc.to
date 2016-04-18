//= require jquery
//= require jquery_ujs
//= require jquery.ui.sortable
//= require bootstrap/dropdown
//= require zut/sortable
//= require_self

$(document).on('ready', function() {

  if ($('#container-map').size()) {
    var map = $('#container-map');
    map.height(400);
    map.css('marginBottom', '20px');

    $('#wastes_packaging_waste_latitude').parents('.form-group').hide();
    $('#wastes_packaging_waste_longitude').parents('.form-group').hide();
  }

  $('[confirm]').on('click', function() {
    return confirm($(this).attr('confirm'));
  })
})

function initializeMap() {
  var cityLoc = { lat: 54.3520500 , lng: 18.6463700 };
  var marker = null;

  if ($('#container-map').length) {
    var map = new google.maps.Map(document.getElementById('container-map'), {
      zoom: 15,
      center: cityLoc
    });

    var addMarker = function(location, map) {
      if (marker) {
        marker.setMap(null);
        marker = null;
      }
      // Add the marker at the clicked location, and add the next-available label
      // from the array of alphabetical characters.
      marker = new google.maps.Marker({
        position: location,
        map: map
      });
      $('#wastes_packaging_waste_latitude').val(marker.position.lat());
      $('#wastes_packaging_waste_longitude').val(marker.position.lng());
    }

    google.maps.event.addListener(map, 'click', function(event) {
      addMarker(event.latLng, map);
    });

    if ($('#wastes_packaging_waste_latitude').size() && $('#wastes_packaging_waste_longitude').size()) {
      var markerPos = {lat: parseFloat($('#wastes_packaging_waste_latitude').val(), 10), lng: parseFloat($('#wastes_packaging_waste_longitude').val(), 10)};
      if (!isNaN(markerPos['lat']) && !isNaN(markerPos['lng'])) {
        addMarker(markerPos, map);
        map.setCenter(markerPos);
      }
    }
  }
}

// google.maps.event.addDomListener(window, 'load', initializeMap);
