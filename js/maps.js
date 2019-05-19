let mymap = L.map('map').setView([53.07125, 20.85012], 13);
let markerFlag = true;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);


for (let i = 0; i < mySlides.length; i++) {

		let markers = [];
        markers[i] = L.marker([mySlides[i].lat, mySlides[i].lng]);
        markers[i].addTo(mymap)
            .bindPopup(mySlides[i].description)
            .openPopup().addEventListener('click', function () {
                markerFlag = false;
                flkty.selectCell(i);
                markerFlag = true;

            });

    
}
