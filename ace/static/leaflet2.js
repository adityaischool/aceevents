var map = L.map('map').setView([37.756631, -122.442222], 12);

L.tileLayer('https://{s}.tiles.mapbox.com/v3/ajones620.k4bkhnfi/{z}/{x}/{y}.png', {
    attribution: '© <a href="http://www.mapbox.com/about/maps/" target="_blank"> Mapbox Terms &amp; Feedback</a>'
}).addTo(map);

var gridDensities = [];

Object.size = function(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};

var selectedTime = 20;

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

var eventCoords = [];

var today = new Date();

var selectedDate = today;

var dateTime = [];

dateTime.push(today);

var dayCounter = 0;

var grid = new L.featureGroup();
var rects = new L.featureGroup();
var circles = new L.featureGroup();
var heatCoords = [];
var heatPlot = new L.featureGroup();

map.addLayer(heatPlot);
map.addLayer(circles);

var trans = 0;

var gridCoords = [[37.81, -122.5155], [37.81, -122.369145], [37.703206, -122.5155], [37.703206, -122.369145]];

function getDayNow () {

	var x = [];
	var y = new Date();

	x.push(y);

	selectedDate = y;

	return x;

};

function getTimeNow () {

	var x = new Date();

	var h = x.getHours();
	var m = x.getMinutes()/60;

	selectedTime = h + m;

	return (h + m);
};



function setDefault() {

	eventCoords = [];

	var x = new Date();

	dateTime = getDayNow();

	getDayNow();
	getTimeNow();

	console.log(x.getHours());

	document.getElementById("selectedTime").value = x.getHours();

	console.log(selectedTime);

	var formattedDate = new Date();

	var dateString = (formattedDate.getDate().toString());

	var monthString = ((formattedDate.getMonth()+1).toString());

	var dateMonthString = (monthString + '/' + dateString);

	var n = formattedDate.getDay();

	document.getElementById('dayofweek').innerHTML = (days[n]+'<br>'+dateMonthString);

	var minutes = '';

	if (x.getMinutes() < 10) {
		minutes = '0' + String(x.getMinutes());
	} else if (x.getMinutes() >= 10) {
		minutes = String(x.getMinutes());
	}

	var ampm = '';

	if (selectedTime < 12) {
		ampm = 'am';
	} else if (selectedTime >= 12) {
		ampm = 'pm';
	}

	var hours = '';

	if (x.getHours() % 12 == 0) {
		hours = '12';
	} else {
		hours = String(Math.floor(selectedTime) % 12)
	}



	var prettyTime = hours + ":" + minutes + " " + ampm;

	console.log(prettyTime);

	document.getElementById('timenavtime').innerHTML = (prettyTime);

	console.log(dateTime);

	getData();

};



function changeTime() {

	console.log(dateTime);

	//console.log($("#selectedTime").val());
	selectedTime = $("#selectedTime").val();

	console.log(selectedTime);

	map.fitBounds(gridCoords);

	eventCoords = [];

	var x = selectedTime * 2;

	var min = '';



	console.log(x);
	console.log((x)%2);

	if (x % 2 == 1) {

		min = '30';

	} else if (x % 2 == 0) {

		min = '00';

	}

	var ampm = '';

	if (x < 24) {
		ampm = 'am';
	} else if (x >= 24) {
		ampm = 'pm';
	};

	var hours = '';


	if (x == 0 || 
		x == 1 ||
		x == 24 ||
		x == 25 ||
		x == 48) {
		hours = '12';

	} else {
		hours = String(Math.floor(selectedTime) % 12)
	}

	console.log(hours);

	var prettyTime = hours + ":" + min + " " + ampm;

	console.log(prettyTime);

	document.getElementById('timenavtime').innerHTML = prettyTime;

	getData();

};


function changeDay() {

	dateTime = [];

	map.fitBounds(gridCoords);

	eventCoords = [];
	
	var plusMinus = 0;

	if (this.children[0].id == 'rightArrow') {
		plusMinus = 1;
		dayCounter += 1;
	} else if (this.children[0].id == 'leftArrow' && dayCounter > 0) {
		plusMinus = (-1);
		dayCounter -= 1;
	}

	var x = selectedDate.setDate(selectedDate.getDate() + plusMinus);

	var formattedDate = new Date(x);

	dateTime.push(formattedDate);

	console.log(dateTime);

	var dateString = (formattedDate.getDate().toString());

	var monthString = ((formattedDate.getMonth()+1).toString());

	var dateMonthString = (monthString + '/' + dateString);

	console.log(formattedDate);

	var n = formattedDate.getDay();

	document.getElementById('dayofweek').innerHTML = (days[n]+'<br>'+dateMonthString);


	console.log(dateTime);
	console.log(selectedTime);

	getData();

};


var heat = L.heatLayer(heatCoords, {radius: 13, blur: 15, max: 1, gradient:{.1: 'blue', .3: 'lime', .5: 'yellow', .7: 'orange', 1: 'red'}}).addTo(map);

function createHeatCoords() {

	console.log("heatPlot  =", heatPlot.getLayers());

	heatCoords = [];
	heatPlot.clearLayers();


	for (var i=0; i < eventCoords.length; i++) {
		cap = eventCoords[i][3];
		lat = eventCoords[i][0];
		lng = eventCoords[i][1];

		
		for (var i2=0; i2 < cap/6; i2++) {

		heatCoords.push([Number(lat), Number(lng)]);
		//console.log('heatcoords i ', [lat, lng]);
		
		}
	};

	console.log(heatCoords);

	heat.setLatLngs(heatCoords);

	console.log('new heat loaded!');

};



function getData() {

	$('#markers').css({"color":"#ff310d", "background": "-webkit-linear-gradient(#FFFFFF, #FFFFFF)",/* For Safari 5.1 to 6.0 */
	  		"background": "-moz-linear-gradient(#FFFFFF, #FFFFFF)", /* For Firefox 3.6 to 15 */
	  		"background": "linear-gradient(#FFFFFF, #FFFFFF)"});

	map.removeLayer(eventMarkers);

	//circles.clearLayers();

	$.getJSON('/_getEbData', {
		params: JSON.stringify(dateTime),
		time: selectedTime

	}, function(data) {
		console.log(data[0]);
		console.log(data[0][0].length);

		circles.clearLayers();

		var size=Object.size(data);

		for (var i2=0; i2 < data[0][0].length; i2++) {
			if (data[0][0].length > 0) {
				
				eventCoords.push([
					data[0][0][i2].lat,
					data[0][0][i2].lng,
					data[0][0][i2].name,
					data[0][0][i2].capacity,
					data[0][0][i2].venue,
					data[0][0][i2].endTime,
					data[0][0][i2].date]);
			}

		};

		//map.addLayer(circles);

    	console.log(eventCoords);

    	createHeatCoords();

	});

};



function circleDiameter(cap) {

	//rad = 10 * Math.pow(cap, (1/2));

	//console.log('cap divisor is', (Math.pow(cap, (2/3)) + Math.pow(cap, (2/3))));
	//console.log('rad is', rad);

	rad = 500;
	return rad;
};


function gridColor(density) {
	var gridColors = ['#FFF700', '#FFDD00', '#FFBB00', 
					'#FF9D00', '#FF3333', '#FF6600', '#FF2A00']

		if (density >= 0 && density < 100) {
			return gridColors[0]
		}

		else if (density >= 100 && density < 300) {
			return gridColors[1]
		}

		else if (density >= 300 && density < 750) {
			return gridColors[2]
		}

		else if (density >= 750 && density < 1500) {
			return gridColors[3]
		}

		else if (density >= 1500 && density < 3000) {
			return gridColors[4]
		}

		else if (density >= 3000 && density < 7500) {
			return gridColors[5]
		}

		else if (density >= 7500) {
			return gridColors[6]
		}

};


var eventMarkers = new L.featureGroup();


function drawMarkers() {

	eventMarkers.clearLayers();
	
	for (var i=0; i < eventCoords.length; i++) {


			marker = new L.marker([eventCoords[i][0], eventCoords[i][1]]).
		bindPopup("Event: "+eventCoords[i][2]+"<br>Location: "+eventCoords[i][4]+"<br>Capacity: "+eventCoords[i][3]+"<br><a href=http://maps.google.com/?daddr="+eventCoords[i][0]+","+eventCoords[i][1]+" target=_blank>Navigate</a>");

			eventMarkers.addLayer(marker);

			circle = new L.circle([eventCoords[i][0], eventCoords[i][1]], 500, {
				    color: gridColor(eventCoords[i][3]),
				    fillColor: gridColor(eventCoords[i][3]),
				    fillOpacity: 0.4
					});

		

			/*circle = new L.circle([eventCoords[i][0], eventCoords[i][1]], circleDiameter(eventCoords[i][3]), {
				    color: gridColor(eventCoords[i][3]),
				    fillColor: gridColor(eventCoords[i][3]),
				    fillOpacity: 0.4,
				    stroke: 0
					}).bindPopup("Event: "+eventCoords[i][2]+
					"<br>Location: "+eventCoords[i][4]+
					"<br>Capacity: "+eventCoords[i][3]+
					"<br><a href=http://maps.google.com/?daddr="+eventCoords[i][0]+
					","+eventCoords[i][1]+" target=_blank>Navigate</a>");

			circles.addLayer(circle);*/
		};

		map.addLayer(eventMarkers);
}


$('#reset').click(function() {

	setDefault();
    map.fitBounds(gridCoords);

});

var markerSwitch = false;

$('#markers').click(function() {

	if (markerSwitch == false) {

		$('#markers').css({"color":"#ffffff", "background": "-webkit-linear-gradient(180deg, #FF820D, #FF310D)",/* For Safari 5.1 to 6.0 */
	  		"background": "-moz-linear-gradient(180deg, #FF820D, #FF310D)", /* For Firefox 3.6 to 15 */
	  		"background": "linear-gradient(180deg, #FF820D, #FF310D)"});
		drawMarkers();
		markerSwitch = true;

	} else if (markerSwitch == true) {
		$('#markers').css({"color":"#ff310d", "background": "-webkit-linear-gradient(#FFFFFF, #FFFFFF)",/* For Safari 5.1 to 6.0 */
	  		"background": "-moz-linear-gradient(#FFFFFF, #FFFFFF)", /* For Firefox 3.6 to 15 */
	  		"background": "linear-gradient(#FFFFFF, #FFFFFF)"});
		map.removeLayer(eventMarkers);
		markerSwitch = false;
	}
	
	
});

$("#selectedTime").change(changeTime);

$(".daynavcontainer").click(changeDay);

setDefault();