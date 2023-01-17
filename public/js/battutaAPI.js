
// BATUTA API SERVICE.
// PROVIDES DATA ABOUT LOCATIONS IN THE WORLD.

$(document).ready(function() {
//-------------------------------SELECT CASCADING-------------------------//
var selectedCountry = (selectedRegion = selectedCity = "");
// This is a demo API key that can only be used for a short period of time, and will be unavailable soon. You should rather request your API key (free)  from http://battuta.medunes.net/
var BATTUTA_KEY = "0ba8d2e35d2ac46c7bda2d69ba91a441";
// Populate country select box from battuta API
url =
"https://battuta.medunes.net/api/country/all/?key=" +
BATTUTA_KEY +
"&callback=?";
// EXTRACT JSON DATA.
$.getJSON(url, function(data) {
$.each(data, function(index, value) {
// APPEND OR INSERT DATA TO SELECT ELEMENT.
$("#country").append(
'<option value="' + value.code + '">' + value.name + "</option>"
);
});
});
// Country selected --> update region list .
$("#country").change(function() {
selectedCountry = this.options[this.selectedIndex].text;
countryCode = $("#country").val();
// Populate country select box from battuta API
url =
"https://battuta.medunes.net/api/region/" +
countryCode + 
"/all/?key=" +
BATTUTA_KEY +
"&callback=?";
$.getJSON(url, function(data) {
$("#region option").remove();
$.each(data, function(index, value) {
// APPEND OR INSERT DATA TO SELECT ELEMENT.
$("#region").append(
'<option value="' + value.region + '">' + value.region + "</option>"
);
});
});
});
// Region selected --> updated city list
$("#region").on("change", function() {
selectedRegion = this.options[this.selectedIndex].text;
// Populate country select box from battuta API
countryCode = $("#country").val();
region = $("#region").val();
url =
"https://battuta.medunes.net/api/city/" +
countryCode +
"/search/?region=" +
region +
"&key=" +
BATTUTA_KEY +
"&callback=?";
$.getJSON(url, function(data) {
console.log(data);
$("#city option").remove();
$.each(data, function(index, value) {
// APPEND OR INSERT DATA TO SELECT ELEMENT.
$("#city").append(
'<option value="' + value.city + '">' + value.city + "</option>"
);
});
});
});
$("#city").on("change", function() {
selectedCity = this.options[this.selectedIndex].text;
$("#location").html(
"Locatation: Country: " +
selectedCountry +
", Region: " +
selectedRegion +
", City: " +
selectedCity
);
});
});
