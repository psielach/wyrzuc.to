//= require jquery
//= require jquery-ui
//= require jquery_ujs
//= require bootstrap/modal
//= require bootstrap-sprockets
//= require fancybox
//= require application/scroll
//= require application/home

var defaultLocation = new google.maps.LatLng(54.349783, 18.645224);

var mapOptions = {
  center: defaultLocation,
  mapTypeControl: false,
  panControl: false,
  zoomControl: true,
  zoomControlOptions: { position: google.maps.ControlPosition.LEFT_BOTTOM },
  zoom: 11,
};
var clusterStyles = [
  {
    textColor: 'white',
    url: '/markers/cluster.png',
    height: 57,
    width: 69
  },
];

var clustererOptions = {
  gridSize: 50,
  maxZoom: 15,
  styles: clusterStyles,
};

var map = new google.maps.Map(document.getElementById('map'), mapOptions);

var markerClusterer = new MarkerClusterer(map, [], clustererOptions);

var centerTo = function(location, zoom) {
  map.panTo(location);
  map.setZoom(zoom);
}

var wastes_urls = [
  'pharmacies',
  // 'wet_and_dry_wastes',
  'hazardous_wastes',
  // 'bulky_wastes',
  'packaging_wastes',
  'battery_points',
]

var markersCache = {};

var clickedPlaceCache = null;

var infowindow = new google.maps.InfoWindow();

var fractionsPlaces = function(wastes_url) {
  $('.x-left-button').css('width', '45px');
  $('.x-left-button').data("click", true);
  $.each(wastes_urls, function(i, url) {
    markerClusterer.removeMarkers(markersCache[url], false);
  });

  $('.x-left-button#' + wastes_url).click();
}

$(document).on('ready', function() {
  $('.fancybox').fancybox({
    parent: 'body',
  });
})
