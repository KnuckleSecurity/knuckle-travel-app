
// GOOGLE MAPS OVERALL VIEW.
function myMap() {
var mapProp= {
  center:new google.maps.LatLng(51.508742,-0.120850),
  zoom:5,
};
var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

// PIN POINT TO A LOCATION BY USING THE GEOLOCATION LAT LONG DATA.
function seeLocation(lat, long){
    var mapProp= {
        center:new google.maps.LatLng(lat, long),
        zoom:12,
      };
      var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}
