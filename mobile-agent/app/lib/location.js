var init = function() {
	Ti.Geolocation.purpose = 'Koch Pipeline Public Awareness App';
 
	checkGeoPermission();
 
	if (OS_ANDROID) {
		Titanium.Geolocation.Android.LocationProvider = Ti.Geolocation.PROVIDER_GPS;
	}
 
	/*
	 * Set accuracy - The following values are supported
	 *
	 * Ti.Geolocation.ACCURACY_BEST
	 * Ti.Geolocation.ACCURACY_NEAREST_TEN_METERS
	 * Ti.Geolocation.ACCURACY_HUNDRED_METERS
	 * Ti.Geolocation.ACCURACY_KILOMETER
	 * Ti.Geolocation.ACCURACY_THREE_KILOMETERS
	 */

	Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
 
	/*
	 * Set distance filter. This dictates how often an event fires
	 * based on the distance the device moves (in meters).
	 */
 
	Ti.Geolocation.distanceFilter = 5;
	Ti.App.fireEvent('getCurrentPosition');
 
	return;
};
 
/* ===================
 Check permission settings
 =====================*/
 
var checkGeoPermission = function() {
	if (Ti.Geolocation.locationServicesEnabled === false) {
		console.log(  "Ti.Geolocation.locationServicesEnabled === false"  );
	} else {
		
		if (OS_IOS) {
			var authorization = Ti.Geolocation.getLocationServicesAuthorization();
		
		
			if (authorization == Ti.Geolocation.AUTHORIZATION_DENIED) {
				console.log("Variable scope issues -- authorization ==  Ti.Geolocation.AUTHORIZATION_DENIED which means You have disallowed App from running geolocation services." );
			} 
			else if (authorization == Ti.Geolocation.AUTHORIZATION_RESTRICTED) {
				console.log( " authorization == Ti.Geolocation.AUTHORIZATION_RESTRICTED " );
			}
		}
				
	}
	return;
};
 
/* ===================
 Get current position
 =====================*/

 
var updateGeolocation= function (e) {
	
	console.log("[ SBOSE ] Location found , latitude : "  +  e.coords.latitude  + " longitude "  + e.coords.longitude);
	
	
};
 
Ti.App.addEventListener('getCurrentPosition', function() {
	Ti.Geolocation.getCurrentPosition(updateGeolocation);
});
 
//Public API
exports.init = init;
exports.generateLocation = function(callback){
	Ti.Geolocation.getCurrentPosition(callback);
};