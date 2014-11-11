//var center = [37.756631, -122.442222];
var center = [37.756631, -122.442222];

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
};


function showPosition(position) {

	//UNCOMMENT THE NEXT LINE IN ORDER TO ACTIVATE GEOLOCATED-CENTERING
	//center = [position.coords.latitude, position.coords.longitude];

	map.setView(center, 12);

    //alert("Latitude: " + position.coords.latitude + 
    //"Longitude: " + position.coords.longitude);	
};

//$(document).ready(getLocation);



var map = L.map('map').setView(center, 12);

//getLocation();

L.tileLayer('https://{s}.tiles.mapbox.com/v3/ajones620.k4bkhnfi/{z}/{x}/{y}.png', {
    attribution: '© <a href="http://www.mapbox.com/about/maps/" target="_blank"> Mapbox Terms &amp; Feedback</a>'
}).addTo(map);



var selectedTime;

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
			'Thursday', 'Friday', 'Saturday'];

var eventCoords = [];

var markersPages = [];

var markersIndex = 0;

var today = new Date();

var selectedDate = today;

var dateTime = [];

var dayCounter = 0;

var grid = new L.featureGroup();

var heatCoords = [];

var heat = L.heatLayer(heatCoords, {radius: 13, blur: 15, max: 1, gradient:{.1: 'blue', .2: 'lime', .3: 'yellow', .5: 'orange', .8: 'red'}}).addTo(map);

var eventMarkers = new L.featureGroup();

var markerSwitch = false;

var gridCoords = [[37.81, -122.5155], [37.81, -122.369145],
				[37.703206, -122.5155], [37.703206, -122.369145]];


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

	var x = new Date();
	
	var formattedDate = new Date();

	var dateString = (formattedDate.getDate().toString());

	var monthString = ((formattedDate.getMonth()+1).toString());

	var dateMonthString = (monthString + '/' + dateString);

	var n = formattedDate.getDay();

	var minutesLow = '';

	var minutesHigh = '';

	var ampmLow = '';

	var ampmHigh = '';

	var hoursLow = '';

	var hoursHigh = '';

	eventCoords = [];	

	dateTime = getDayNow();

	getDayNow();

	getTimeNow();

	//console.log(x.getHours());

	document.getElementById("selectedTime").value = x.getHours();

	//console.log(selectedTime);

	document.getElementById('dayofweek').innerHTML = (days[n]+'\t'+dateMonthString);


	if (x.getMinutes() < 10) {

		minutes = '0' + String(x.getMinutes());

	} else {

		minutes = String(x.getMinutes());
	}

	if (selectedTime < 12) {

		ampm = 'am';

	} else {

		ampm = 'pm';
	}

	if (x.getHours() % 12 == 0) {

		hours = '12';

	} else {

		hours = String(Math.floor(selectedTime) % 12);

	}

	var prettyTime = hours + ":" + minutes + " " + ampm;

	//console.log(prettyTime);

	document.getElementById('timenavtime').innerHTML = (prettyTime);

	//console.log(dateTime);

	getData();

};

function changeTime() {

	//console.log(dateTime);

	//console.log($("#selectedTime").val());
	selectedTime = $("#selectedTime").val();

	//console.log(selectedTime);

	map.fitBounds(gridCoords);

	eventCoords = [];

	var x = selectedTime * 2;

	var min = '';

	//console.log(x);

	//console.log((x) % 2);

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

	if (x == 0 || x == 1 ||
		x == 24 ||x == 25 ||
		x == 48) {

		hours = '12';

	} else {

		hours = String(Math.floor(selectedTime) % 12)

	}

	//console.log(hours);

	var prettyTime = hours + ":" + min + " " + ampm;

	//console.log(prettyTime);

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

	//console.log(dateTime);

	var dateString = (formattedDate.getDate().toString());

	var monthString = ((formattedDate.getMonth()+1).toString());

	var dateMonthString = (monthString + '/' + dateString);

	//console.log(formattedDate);

	var n = formattedDate.getDay();

	document.getElementById('dayofweek').innerHTML = (days[n]+'<br>'+dateMonthString);

	//console.log(dateTime);

	//console.log(selectedTime);

	getData();

};


function createHeatCoords() {

	heatCoords = [];

	for (var i=0; i < eventCoords.length; i++) {

		cap = eventCoords[i][3];

		lat = eventCoords[i][0];

		lng = eventCoords[i][1];
		
		for (var i2=0; i2 < cap/6; i2++) {

		heatCoords.push([Number(lat), Number(lng)]);
		//console.log('heatcoords i ', [lat, lng]);
		
		}
	};

	//console.log(heatCoords);

	console.log(eventCoords);

	heat.setLatLngs(heatCoords);

	console.log('new heat loaded!');

};

var zoomedEvents = [];


map.on('load', fenceEvents);
map.on('zoomend', fenceEvents);
map.on('dragend', fenceEvents);

var markerIcon = L.icon({

	iconUrl: '/static/marker-master1.png',

	iconSize: [30, 40],

	iconAnchor: [15, 36]

});


function fenceEvents() {

	markersIndex = 0;

	zoomedEvents = [];

	var bounds = map.getBounds();

	var lats = [bounds['_northEast'].lat, bounds['_southWest'].lat];
	var lngs = [bounds['_northEast'].lng, bounds['_southWest'].lng];


	for (var i=0; i < eventCoords.length; i++) {

		//console.log('event lat =', eventCoords[i][0]);
		//console.log('event lng =', eventCoords[i][1]);
		//console.log('lat bounds =', lats);
		//console.log('lng bounds =', lngs);

		if (eventCoords[i][0] <= lats[0] && eventCoords[i][0] >= lats[1] && eventCoords[i][1] <= lngs[0] && eventCoords[i][1] >= lngs[1]) {

			console.log("Event "+String(i + 1)+" is in the bounding box!");

			zoomedEvents.push(eventCoords[i]);

		};

	}

	console.log(zoomedEvents);

	createMarkersPages(zoomedEvents);

	//console.log('before zoomed bounds: '+[bounds['_northEast'].lat, bounds['_northEast'].lng], [bounds['_southWest'].lat, bounds['_southWest'].lng]);

};

$('.leaflet-control-zoom-in').click(function() {

	

});

function getData() {

	markerSwitch = true;

	markersIndex = 0;

	//clickMarkerButton();

	$.getJSON('/_getEbData', {
		params: JSON.stringify(dateTime),
		time: selectedTime

	}, function(data) {

		//console.log(data[0]);

		//console.log(data[0][0].length);

		for (var i2=0; i2 < data[0][0].length; i2++) {

			if (data[0][0].length > 0) {
				
				eventCoords.push([

					data[0][0][i2].lat,
					data[0][0][i2].lng,
					data[0][0][i2].name,
					data[0][0][i2].capacity,
					data[0][0][i2].venue,
					data[0][0][i2].endTime,
					data[0][0][i2].date,
					i2

					]);
			}
		};	

		//console.log(eventCoords[eventCoords.length-1]);
		//console.log(eventCoords);

		fenceEvents();
    	

    	createHeatCoords();

	});
};



function createMarkersPages(boundedEvents) {

	var events = boundedEvents;

	console.log(events);

	var count = 0;

	markersPages = [];

	for (var i2=0; i2 < events.length; i2++) {

		if (count % 5 == 0) {

			markersPages.push([]);

		}

		markersPages[markersPages.length - 1].push(events[count]);

		count += 1;

	};

	console.log(markersPages);

	if (markerSwitch == true) {

		drawMarkerList();

	}
};

function drawMarkerList() {

		var markerList = "<br>No Events Found!<br><br>Try selecting a different date or time.";

		var mi = markersIndex;
		
		if (markersPages.length > 0) {

			markerList = "";

			for (var i=0; i < markersPages[mi].length; i++) {

				var num = (markersIndex * 5) + (i + 1);

				markerList += (

	            '<li class="place">&nbsp;&nbsp;&nbsp;&nbsp;'+num+'. '+markersPages[mi][i][2].slice(0, 20)+'  | Cap '+markersPages[mi][i][3]+' | <a href=http://maps.google.com/?daddr='+markersPages[mi][i][0]+','+markersPages[mi][i][1]+'target=_blank>Nav</a></li>');
			
			};
		}

		//$('#eventInfoList').html(markerList);

		if (markerSwitch == true) {

			drawMarkers();
		}

}


function drawMarkers() {

	eventMarkers.clearLayers();
	
	var mi = markersIndex;

	if (markersPages.length > 0) {

		for (var i=0; i < markersPages[mi].length; i++) {

			marker = new L.marker([markersPages[mi][i][0], markersPages[mi][i][1]], {icon: markerIcon, riseOnHover: true}).
			bindPopup("Event: "+markersPages[mi][i][2]+"<br>Location: "+markersPages[mi][i][4]+"<br>Capacity: "+markersPages[mi][i][3]+"<br><a href=http://maps.google.com/?daddr="+markersPages[mi][i][0]+","+markersPages[mi][i][1]+" target=_blank>Navigate</a>");

		/*setTimeout(function() {

			eventMarkers.addLayer(marker)}, 400);*/

			eventMarkers.addLayer(marker);

		};
	}

		map.addLayer(eventMarkers);

}


//var clusterMarkers = new L.MarkerClusterGroup();

//map.addLayer(clusterMarkers);

function drawCluster() {

	for (var i=0; i < eventCoords.length; i++) {

		var marker = new L.marker([eventCoords[i][0], eventCoords[i][1]]);

		clusterMarkers.addLayer(marker);

	}

};

//drawCluster();


$('#reset').click(function() {

	setDefault();

    map.fitBounds(gridCoords);

});

$('#eventsArrowLeft').click(function() {

	if (markersIndex > 0) {

		console.log('left arrow clicked! markers index = ', markersIndex);

		markersIndex -= 1;

		drawMarkerList();

		drawMarkers();

	}
});


$('#eventsArrowRight').click(function() {

	if (markersIndex < markersPages.length - 1) {

		console.log('right arrow clicked! markers index = ', markersIndex);

		markersIndex += 1;

		//drawMarkerList();

		drawMarkers();

	}
});


$('#markers').click(clickMarkerButton);

function clickMarkerButton() {

	markersIndex = 0;

	if (markerSwitch == false) {

		/*var tempLayers = markers.getLayers();

		var maxCap = 0;

		for (var i = 0; i < tempLayers.length; i++) {

			console.log(tempLayers[i]);

		}*/

		/*$('#markers').css({"color":"#ffffff", "background": "-webkit-linear-gradient(180deg, #FF820D, #FF310D)",
	  		"background": "-moz-linear-gradient(180deg, #FF820D, #FF310D)",
	  		"background": "linear-gradient(180deg, #FF820D, #FF310D)",
	  		"border": "none"});*/

		//drawMarkerList();

		drawMarkers();

		//$('.eventInfoShell').css({"display": "block"});

		//$('.eventInfoShell').animate({"height": "200px", "top": "48.5%"}, 400, 'swing');

		//$('#eventInfoList').css({"display": "block"});

		//$('#eventInfoList').html("TESTING 1, 2, 3");

		markerSwitch = true;

	} else if (markerSwitch == true) {
		
		//$('.eventInfoShell').animate({"height": "0px", "top": "80%"}, 300, 'swing', $('#eventInfoList').css({"display": "block"}));

		//$('#eventInfoList').html("");

		/*$('#markers').css({"color":"#FF310D", "background": "none",
	  		"background": "none",
	  		"background": "none",
	  		"border": "2px solid #FF310D"});*/

		//$('#eventInfoList').html("");

		map.removeLayer(eventMarkers);	

		markerSwitch = false;

	}	
};

$("#selectedTime").change(changeTime);

$(".daynavcontainer").click(changeDay);

setDefault();

//var markercluster = new L.MarkerClusterGroup();

//markercluster.addLayer(markers);

//map.addLayer(markercluster);