

// DEFAULT GOOGLE MAPS LOCATION, OVERALL VIEW
function myMap() {
    var mapProp= {
      center:new google.maps.LatLng(51.508742,-0.120850),
      zoom:5,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    }
    
    // BY USING THE RETRIEVED LAT AND LONG VALUES FROM THE GEOLOCATION API,
    // PINPOINT THE LOCATION IN THE MAP
    function seeLocation(lat, long){
        var mapProp= {
            center:new google.maps.LatLng(lat, long),
            zoom:12,
          };
          var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    }
    
