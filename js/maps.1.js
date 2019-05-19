'use strict';
(function () {
    // Definiujemy funkcję initMap tak samo jak wcześniej. 

    window.initMap = function () {

        var initialPos = {lat: mySlides[0].lat, lon: mySlides[0].lon}; 

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: initialPos
        });

        for (var i = 0; i < mySlides.length; i++) {
            var markers = [];
            
            for (var i = 0; i < data.length; i++) {

                markers[i] = new google.maps.Marker({
                    position: {lat: mySlides[i].lat, lon: mySlides[i].lon},
                    map: map,
                    description:  mySlides[i].description,
                    id: mySlides[i].number
                });

                var infowindow = new google.maps.InfoWindow({
                    content: data[i].name
                });

                infowindow.open(map, markers[i]);
                google.maps.event.addListener(markers[i], 'click', function () {
                    alert(markers[this.id].description)
                })
            }




        }



        // Następnie dodajemy akcję do guzika, dokładnie tak samo jak robiliśmy to w poprzednim module.

        document.getElementById('center-map').addEventListener('click', function (event) {
            event.preventDefault();
            // Najpierw wykorzystujemy metodę panTo w obiekcie map do przesunięcia współrzędnych mapy:
            map.panTo(sydney);

            // A następnie zmieniamy powiększenie mapy:
            map.setZoom(10);
        });

		/* Jak widzisz, guzik "Center map" nagle przeskakuje do docelowych pozycji i powiększenia. 
		
		Jako alternatywę przygotowaliśmy funkcję smoothPanAndZoom, która korzysta z funkcji smoothZoom i smoothPan. Jest to nasz własny kod, który jest przykładem tego w jaki sposób można wykorzystać JavaScript oraz podstawy matematyki do wykonania ciekawych manipulacji. 
		
		Aby zobaczyć ten efekt w akcji, kliknij najpierw guzik "Center map", a następnie "Center smoothly". 
		*/

        document.getElementById('center-smooth').addEventListener('click', function (event) {
            event.preventDefault();
            smoothPanAndZoom(map, 7, uluru);
        });
    }

	/* Efekt przejścia, który zaimplementowaliśmy za pomocą funkcji smoothPanAndZoom na pewno nie jest idealny, ponieważ staraliśmy się użyć dość prostego algorytmu. 
	
	ĆWICZENIE:
	Poświęć 15 minut na próbę zrozumienia algorytmu działania funkcji smoothPanAndZoom. Nie zatrzymuj się na jednej linii na dłużej niż 3 minuty - jeśli nie rozumiesz, idź dalej i spróbuj zrozumieć resztę kodu. 
	
	Nie bój się używać console.log lub document.write do sprawdzania wartości zmiennych!
	
	Algorytm tych funkcji trudny do zrozumienia, szczególnie w trzecim tygodniu nauki JavaScript. Nie przejmuj się, jeśli go nie zrozumiesz, Zawsze możesz wrócić do tego przykładu za kilka tygodni. ;)
	*/

    var smoothPanAndZoom = function (map, zoom, coords) {
        // Trochę obliczeń, aby wyliczyć odpowiedni zoom do którego ma oddalić się mapa na początku animacji.
        var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
        jumpZoom = Math.min(jumpZoom, zoom - 1);
        jumpZoom = Math.max(jumpZoom, 3);

        // Zaczynamy od oddalenia mapy do wyliczonego powiększenia. 
        smoothZoom(map, jumpZoom, function () {
            // Następnie przesuwamy mapę do żądanych współrzędnych.
            smoothPan(map, coords, function () {
                // Na końcu powiększamy mapę do żądanego powiększenia. 
                smoothZoom(map, zoom);
            });
        });
    };

    var smoothZoom = function (map, zoom, callback) {
        var startingZoom = map.getZoom();
        var steps = Math.abs(startingZoom - zoom);

        // Jeśli steps == 0, czyli startingZoom == zoom
        if (!steps) {
            // Jeśli podano trzeci argument
            if (callback) {
                // Wywołaj funkcję podaną jako trzeci argument.
                callback();
            }
            // Zakończ działanie funkcji
            return;
        }

        // Trochę matematyki, dzięki której otrzymamy -1 lub 1, w zależności od tego czy startingZoom jest mniejszy od zoom
        var stepChange = - (startingZoom - zoom) / steps;

        var i = 0;
        // Wywołujemy setInterval, który będzie wykonywał funkcję co X milisekund (X podany jako drugi argument, w naszym przypadku 80)
        var timer = window.setInterval(function () {
            // Jeśli wykonano odpowiednią liczbę kroków
            if (++i >= steps) {
                // Wyczyść timer, czyli przestań wykonywać funkcję podaną w powyższm setInterval
                window.clearInterval(timer);
                // Jeśli podano trzeci argument
                if (callback) {
                    // Wykonaj funkcję podaną jako trzeci argument
                    callback();
                }
            }
            // Skorzystaj z metody setZoom obiektu map, aby zmienić powiększenie na zaokrąglony wynik poniższego obliczenia
            map.setZoom(Math.round(startingZoom + stepChange * i));
        }, 80);
    };

    // Poniższa funkcja działa bardzo podobnie do smoothZoom. Spróbuj samodzielnie ją przeanalizować. 
    var smoothPan = function (map, coords, callback) {
        var mapCenter = map.getCenter();
        coords = new google.maps.LatLng(coords);

        var steps = 12;
        var panStep = { lat: (coords.lat() - mapCenter.lat()) / steps, lng: (coords.lng() - mapCenter.lng()) / steps };

        var i = 0;
        var timer = window.setInterval(function () {
            if (++i >= steps) {
                window.clearInterval(timer);
                if (callback) callback();
            }
            map.panTo({ lat: mapCenter.lat() + panStep.lat * i, lng: mapCenter.lng() + panStep.lng * i });
        }, 1000 / 30);
    };

})();

/*
UWAGA: Normalnie nie ma potrzeby wywołania funkcji initMap, tak jak robimy to poniżej. Musieliśmy jednak zmodyfikować sposób wczytywania skryptu Google Maps API ze względu na działanie CodePena. W Twoim kodzie nie powinno być tego wywołania. 
*/

initMap();