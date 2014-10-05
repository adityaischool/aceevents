$(document).ready(function(){
		this.map = L.map('map').setView([37.871293, -122.258556], 5);

	 	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			  	attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(this.map);
		L.marker([37.871293, -122.258556]).addTo(this.map).bindPopup('School of Information');
        
});

 