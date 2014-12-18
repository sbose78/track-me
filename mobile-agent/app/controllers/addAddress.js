var geo = require('geo');
var location = require('location');

$.button.addEventListener('click', function(e) {
	
	// get location
	location.generateLocation(handle_coordinates_data);
	 
	
	/*
	$.textField.blur();
	geo.forwardGeocode($.textField.value, function(geodata) {
		$.trigger('addAnnotation', {geodata: geodata});
	});
	*/
});

var handle_coordinates_data = function(e){
	$.trigger('addAnnotation', {geodata: e});	
};
