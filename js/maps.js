'use strict';
(function(){

    let locationArray = mySlides;
	
	// Definujemy funkcję initMap w zakresie globalnym (czyli jako właściwość obiektu window).
  	window.initMap = function() {

        let markers = [];
		
		// Zapisujemy w zmiennej obiekt zawierający współrzędne geograficzne.
        let initPos = latLngFromArr(locationArray,0);
		
		// W zmiennej map zapisujemy nową instancję obiektu Map. 
		let map = new google.maps.Map(document.getElementById('map'), {
			// Podajemy opcje mapy, np. zoom i punkt wycentrowania mapy.
			zoom: 4,
			center: initPos
        });
        
        for (let i = 0; i < locationArray.length; i++) {
            markers[i] = new google.maps.Marker({
                position: latLngFromArr(mySlides,i),
                map: map
            }); 
        }
		
		// Definiujemy marker jako nową instancję obiektu Marker.

    }	
    
    function latLngFromArr (array,i) {
        let latitude = parseFloat(array[i].lat);
        let longitude = parseFloat(array[i].lng);
        return {lat: latitude, lng: longitude}; 
    }
	 
})(); 