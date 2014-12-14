var init = function() {
    Ti.Geolocation.purpose = "Koch Pipeline Public Awareness App";
    checkGeoPermission();
    Titanium.Geolocation.Android.LocationProvider = Ti.Geolocation.PROVIDER_GPS;
    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
    Ti.Geolocation.distanceFilter = 5;
    Ti.App.fireEvent("getCurrentPosition");
    return;
};

var checkGeoPermission = function() {
    if (false === Ti.Geolocation.locationServicesEnabled) console.log("Ti.Geolocation.locationServicesEnabled === false"); else ;
    return;
};

var updateGeolocation = function(e) {
    console.log("[ SBOSE ] Location found , latitude : " + e.coords.latitude + " longitude " + e.coords.longitude);
};

Ti.App.addEventListener("getCurrentPosition", function() {
    Ti.Geolocation.getCurrentPosition(updateGeolocation);
});

exports.init = init;