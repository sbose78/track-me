var GOOGLE_BASE_URL = "http://maps.google.com/maps/api/geocode/json?address=";

var ERROR_MESSAGE = "There was an error geocoding. Please try again.";

var GeoData = function(title, latitude, longitude) {
    this.title = title;
    this.coords = {
        latitude: latitude,
        longitude: longitude
    };
};

exports.forwardGeocode = function(address, callback) {
    forwardGeocodeWeb(address, callback);
};

var forwardGeocodeNative = function(address, callback) {
    var xhr = Titanium.Network.createHTTPClient();
    var url = GOOGLE_BASE_URL + address.replace(" ", "+");
    url += "&sensor=" + (true == Titanium.Geolocation.locationServicesEnabled);
    xhr.open("GET", url);
    xhr.onload = function() {
        var json = JSON.parse(this.responseText);
        if ("OK" != json.status) {
            alert("Unable to geocode the address");
            return;
        }
        callback(new GeoData(address, json.results[0].geometry.location.lat, json.results[0].geometry.location.lng));
    };
    xhr.onerror = function(e) {
        Ti.API.error(e.error);
        alert(ERROR_MESSAGE);
    };
    xhr.send();
};

var forwardGeocodeWeb = function(address, callback) {
    var geocoder = new google.maps.Geocoder();
    geocoder ? geocoder.geocode({
        address: address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) callback(new GeoData(address, results[0].geometry.location.lat(), results[0].geometry.location.lng())); else {
            Ti.API.error(status);
            alert(ERROR_MESSAGE);
        }
    }) : alert("Google Maps Geocoder not supported");
};