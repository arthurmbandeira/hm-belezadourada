// initialize google map
var ToMapInit = {
  'lat'     : $('#map').data('lat'),
  'lng'     : $('#map').data('lng'),
  'title'   : $('#map').data('title'),
  'subtitle': $('#map').data('subtitle'),
};

function initialize() {
  var e = [{"featureType":"all","stylers":[{"saturation":0},{"hue":"#e7ecf0"}]},{"featureType":"road","stylers":[{"saturation":-70}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType": "water","elementType": "all","stylers": [{"color": "#41b6ff"},{"visibility": "on"}]}],
      l = {
          zoom: 13, // Change map zoom
          center: brooklyn,
          scrollwheel: false,
          mapTypeControlOptions: {
              mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
          },
          mapTypeId: MY_MAPTYPE_ID
      };
    map = new google.maps.Map(document.getElementById("map"), l);
    var t = {
            name: "Custom Style"
        },
        o = new google.maps.StyledMapType(e, t);
    map.mapTypes.set(MY_MAPTYPE_ID, o);

    // Change map Marker
    var marker = new google.maps.Marker({
        map:map,
        // draggable:true,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(ToMapInit.lat, ToMapInit.lng),
        icon: 'img/point.png' // null = default icon
    });

    infowindow = new google.maps.InfoWindow({
       content: "<b>"+ ToMapInit.title +"</b><br/>"+ ToMapInit.subtitle +""
   });
   google.maps.event.addListener(marker, "click", function() {
      infowindow.open(map, marker);
   });
}

if($('#map').length) {
  var map, brooklyn = new google.maps.LatLng(ToMapInit.lat, ToMapInit.lng),
  MY_MAPTYPE_ID = "custom_style";
  google.maps.event.addDomListener(window, "load", initialize);
}