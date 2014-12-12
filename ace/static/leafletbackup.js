var center = [37.756631, -122.442222];

var map = L.map('map', {zoomControl: false}).setView(center, 12);

L.mapbox.accessToken = 'pk.eyJ1IjoiYWpvbmVzNjIwIiwiYSI6IlJ1eEdISkUifQ.whSWoswC0sLHG_kS9q-JRQ';

//getLocation();

L.tileLayer('https://{s}.tiles.mapbox.com/v3/ajones620.k4bkhnfi/{z}/{x}/{y}.png', {
    attribution: '© <a href="http://www.mapbox.com/about/maps/" target="_blank"> Mapbox Terms &amp; Feedback</a>'
}).addTo(map);

// move the attribution control out of the way
map.attributionControl.setPosition('bottomright');



// create the initial directions object, from which the layer
// and inputs will pull data.


var directions = new L.mapbox.directions();

var directionsLayer = new L.mapbox.directions.layer(directions)
    .addTo(map);

var directionsInputControl = new L.mapbox.directions.inputControl('inputs', directions)
    .addTo(map);

var directionsErrorsControl = new L.mapbox.directions.errorsControl('errors', directions)
    .addTo(map);

var directionsRoutesControl = new L.mapbox.directions.routesControl('routes', directions)
    .addTo(map);

var directionsInstructionsControl = new L.mapbox.directions.instructionsControl('instructions', directions)
    .addTo(map);

var origLng = '';

var origLat = '';

var destLng = '';

var destLat = '';

var origin = String(origLng)+","+String(origLat);

var dest = String(destLng)+","+String(destLat);

function setDirs(origin, dest) {



    var origin = origin;

    var dest = dest;

    $('#mapbox-directions-origin-input').val(origin);

    $('#mapbox-directions-destination-input').val(dest);

    console.log($('#mapbox-directions-origin-input').val());

    console.log($('#mapbox-directions-destination-input').val());

    directions.setOrigin(origin);

    directions.setDestination(dest);

    console.log(directions.getOrigin());

    console.log(directions.getDestination());

    console.log(directions);

    directions.query();



    //console.log($('.mapbox-directions-route-active').children().eq(2).html());

    //console.log(directions.directions);

    //console.log(directions['directions']['routes'][0]['duration']);

     

    /*for (var i = 0; i < directions.waypointMarkers.length; i++) {
            directions.removeLayer(directions.waypointMarkers[i]);
    };*/

    //directions.removeWaypoint(0);
    //directions.removeWaypoint(0);


};

//setDirs(origin, dest);



//var center = [37.756631, -122.442222];


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
};


function showPosition(position) {

	//UNCOMMENT THE NEXT LINE IN ORDER TO ACTIVATE GEOLOCATED-CENTERING
	trackingCenter = [position.coords.latitude, position.coords.longitude];

	console.log(trackingCenter);

	//map.setView(center, 12);

    //alert("Latitude: " + position.coords.latitude + 
    //"Longitude: " + position.coords.longitude);	
};


function pingLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPing);
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
};

function showPing(position) {

	//UNCOMMENT THE NEXT LINE IN ORDER TO ACTIVATE GEOLOCATED-CENTERING
	pingCenter = [position.coords.latitude, position.coords.longitude];

	var testPing = [selectedMarker[0]._latlng.lat+.0001, selectedMarker[0]._latlng.lng-.0001];

	console.log("pingCenter is", pingCenter);

	console.log("destination lat lng is ", selectedMarker[0]._latlng.lat, selectedMarker[0]._latlng.lng);

	if (checkRad(testPing,[selectedMarker[0]._latlng.lat, selectedMarker[0]._latlng.lng])) {

		console.log('current ping within 100 meters of destination!');

		window.clearInterval(timer);

		getLocation();

		end_lat = trackingCenter[0];

		end_long = trackingCenter[1];

		end_datetime = new Date();

		writeRideData();

		start_datetime = new Date();

		setTimeout(function() {

			start_lat = trackingCenter[0];

			console.log(start_lat);

			start_long = trackingCenter[1];

			driveType = driveTypes[1];

		}, 1500);

	} else if (checkRad(pingCenter,[selectedMarker[0]._latlng.lat, selectedMarker[0]._latlng.lng]) === false) {

		console.log('current ping outside of 100 meter radius of destination!');

	}

	if (checkRad(testPing,[selectedMarker[0]._latlng.lat, selectedMarker[0]._latlng.lng])) {

		console.log('test ping within 100 meters of destination!');

	} else if (checkRad(testPing,[selectedMarker[0]._latlng.lat, selectedMarker[0]._latlng.lng]) === false) {

		console.log('test ping outside of 100 meter radius of destination!');

	}

	//map.setView(center, 12);

    //alert("Latitude: " + position.coords.latitude + 
    //"Longitude: " + position.coords.longitude);	
};



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

var heat = L.heatLayer(heatCoords, {opacity: 0.2, radius: 13, blur: 15, max: 1, gradient:{.1: 'yellow', .2: 'orange', .3: '#e22500', .5: '#e21a1a', .8: 'red'}}).addTo(map);

var eventMarkers = new L.featureGroup();

map.addLayer(eventMarkers);

var markerSwitch = true;

var gridCoords = [[37.81, -122.5155], [37.81, -122.369145],
				[37.703206, -122.5155], [37.703206, -122.369145]];

var pingCenter= [];
var driverid = 'driver@example.com';
var start_datetime = '';
var end_datetime = '';
var start_lat = 0;
var start_long = 0;
var end_lat = 0;
var end_long = 0;
var driveTypes = ['onWayToEvent', 'waitingForFare',
					'activeFare', 'betweenEvents']
var driveType = driveTypes[3];
var service = 'NA';
var collected_fare = 0;



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

	$("#nav").css({"display": "none"});

	selectedMarker = [];

	map.setView(center, 10);

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

	document.getElementById('dayofweek').innerHTML = (days[n]+'&nbsp;'+dateMonthString);


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

	var prettyTime = "Events ending&nbsp;" + hours + ":" + minutes + " " + ampm;

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

	//map.setView(center, 12)

	selectedMarker = [];

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

	var prettyTime = "Events ending&nbsp;" + hours + ":" + min + " " + ampm;

	//console.log(prettyTime);

	document.getElementById('timenavtime').innerHTML = prettyTime;

	getData();

};


function changeDay() {

	selectedMarker = [];

	dateTime = [];

	//map.setZoom(12);

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

	document.getElementById('dayofweek').innerHTML = (days[n]+'&nbsp;'+dateMonthString);

	//console.log(dateTime);

	//console.log(selectedTime);

	getData();

};


function createHeatCoords() {

	heatCoords = [];

	for (var i=0; i < eventCoords.length; i++) {

		var cap = eventCoords[i][3];

		var lat = eventCoords[i][0];

		var lng = eventCoords[i][1];
		
		for (var i2=0; i2 < cap/6; i2++) {

		heatCoords.push([Number(lat), Number(lng)]);
		//console.log('heatcoords i ', [lat, lng]);
		
		}
	};

	//console.log(heatCoords);

	//console.log(eventCoords);

	heat.setLatLngs(heatCoords);

	console.log('new heat loaded!');

};

var zoomedEvents = [];


map.on('load', fenceEvents);

map.on('zoomend', fenceEvents);

map.on('dragend', fenceEvents);



var iconScale = 1.3;

var markerIconBlue = L.icon({

	iconUrl: '/static/markerblue1.png',

	iconAnchor: [11, 38],

	iconSize: [17 * iconScale, 29.5 * iconScale]

});

var markerIconRed = L.icon({

	iconUrl: '/static/markerred.png',

	iconAnchor: [11, 38],

	iconSize: [17 * iconScale, 29.5 * iconScale]

});


function fenceEvents() {

	markersIndex = 0;

	zoomedEvents = [];

	console.log(eventCoords);

	var bounds = map.getBounds();

	var lats = [bounds['_northEast'].lat, bounds['_southWest'].lat];
	var lngs = [bounds['_northEast'].lng, bounds['_southWest'].lng];


	for (var i=0; i < 10; i++) {

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

	
	if (markerSwitch == true) {

		drawMarkers();

	}

	//createMarkersPages(zoomedEvents);

	//console.log('before zoomed bounds: '+[bounds['_northEast'].lat, bounds['_northEast'].lng], [bounds['_southWest'].lat, bounds['_southWest'].lng]);

};


var markerZIndex = 200;

var selectedMarker = [];

function redMarker(marker) {

	var newSelection = marker;

	if (selectedMarker.length > 0) {

		selectedMarker[0].setIcon(markerIconBlue);

		selectedMarker[0].setZIndexOffset(0);

		//selectedMarker[0].style.zIndex= "100";

		selectedMarker = [];

		selectedMarker.push(newSelection);

		console.log(selectedMarker[0]);

		selectedMarker[0].setIcon(markerIconRed);

		selectedMarker[0].setZIndexOffset(markerZIndex);

		console.log(selectedMarker[0]);

		markerZIndex++;

	} else {

		selectedMarker.push(newSelection);

		console.log(selectedMarker[0]);

		selectedMarker[0].setIcon(markerIconRed);

		selectedMarker[0].setZIndexOffset(markerZIndex);

		console.log(selectedMarker[0]);

		markerZIndex++;

	}

	

};

function getData() {

	//markerSwitch = true;

	setDirs(origin, '');

	eventCoords = [];

	markersIndex = 0;

	$('#eventInfoList').html("");

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


		//CHANGE MODULO DIVISOR TO HOWEVER MANY EVENTS YOU WANT PER PAGE
		if (count % 1 == 0) {

			markersPages.push([]);

		}

		markersPages[markersPages.length - 1].push(events[count]);

		count += 1;

	};

	console.log(markersPages);

	drawMarkerList();

};


function drawMarkerList() {

		var markerList = "<br>No Events Found!<br><br>Try selecting a different date or time.";

		var mi = markersIndex;
		
		if (zoomedEvents.length > 0) {

			markerList = "";

			for (var i=0; i < zoomedEvents.length; i++) {

				var num = (markersIndex * 5) + (i + 1);

				markerList += (

	            '<li class="place">&nbsp;&nbsp;&nbsp;&nbsp;'+num+'. '+zoomedEvents[i][2].slice(0, 20)+'  | Cap '+zoomedEvents[i][3]+' | <a href=http://maps.google.com/?daddr='+zoomedEvents[i][0]+','+zoomedEvents[i][1]+'target=_blank>Nav</a></li>');
			
			};
		}
};


/*function directions() {

	var start = "37.788869,-122.402059";
	var finish = "37.777436,-122.453513";
	var apikey = "sk.eyJ1IjoiYWpvbmVzNjIwIiwiYSI6Ii10Ym9PVGsifQ.WiIr55f28UxPAk-cxQtRiQ";

	var req = "http://api.tiles.mapbox.com/v4/directions/mapbox.driving/"+start+";"+finish+".json?access_token="+apikey;


	console.log('alert!');

}

directions();*/



function drawInfo(marker) {

	//$('#eventInfoList').html('');

	var i = marker._leaflet_id;

	console.log(zoomedEvents);
	console.log(markersIndex);
	console.log(zoomedEvents.length);
	console.log(i);
	console.log(zoomedEvents[i]);

	//$('#eventInfoList').html("<li>Event: "+zoomedEvents[i][2]+"</li><li>Location: "+zoomedEvents[i][4]+"</li><li>Capacity: "+zoomedEvents[i][3]+"</li><li><a href=http://maps.google.com/?daddr="+zoomedEvents[i][0]+","+zoomedEvents[i][1]+" target=_blank>Navigate</a></li>");

	$('#eventInfoList').html("<li>"+zoomedEvents[i][2]+"</li><li>Location: "+zoomedEvents[i][4].slice(0,36)+"</li><li>Capacity: "+zoomedEvents[i][3]+" | ETA: "+eta+"</li>");

};

var markerNames = [];

var link = '';

function drawMarkers() {

	console.log(markerNames);

	console.log(eventMarkers);

	console.log(eventMarkers.getLayers());

	markerNames = [];

	eventMarkers.clearLayers();

	console.log(zoomedEvents);

	console.log(zoomedEvents.length);

	console.log(markerNames);

	var tempName = '';

	for (var i=0; i< zoomedEvents.length; i++) {
		tempName = "marker" + i;
		markerNames.push(tempName);
	};

	if (zoomedEvents.length > 0) {

		//for (var i=0; i < zoomedEvents.length; i++) {

		for (var i=0; i < Math.min(20, zoomedEvents.length); i++) {

			console.log(markerNames);
			console.log(markerNames[i]);
			console.log(zoomedEvents.length);

			markerNames[i] = new L.marker([zoomedEvents[i][0], zoomedEvents[i][1]], {riseOnHover: true, icon: markerIconBlue});
			//bindPopup("Event: "+zoomedEvents[i][2]+"<br>Location: "+zoomedEvents[i][4]+"<br>Capacity: "+zoomedEvents[i][3]+"<br><a href=http://maps.google.com/?daddr="+zoomedEvents[i][0]+","+zoomedEvents[i][1]+" target=_blank>Navigate</a>");

			markerNames[i]._leaflet_id = i + 1;

			console.log(markerNames[i]);
			console.log(selectedMarker[0]);

			if ((selectedMarker.length > 0) &&
				(selectedMarker[0]._latlng.lat == markerNames[i]._latlng.lat) &&
				(selectedMarker[0]._latlng.lng == markerNames[i]._latlng.lng)) {

				console.log('MARKERS MATCH!');

				redMarker(markerNames[i]);

			}


			markerNames[i].on("click", function() {



				var i = this._leaflet_id - 1;

				console.log(zoomedEvents);
				console.log(markersIndex);
				console.log(zoomedEvents.length);
				console.log(i);
				console.log(zoomedEvents[i]);

				var lat = zoomedEvents[i][0];
				var lng = zoomedEvents[i][1];

				

				link = ("http://waze.to/?ll="+lat+","+lng+"&navigate=yes");
				//var link = ("http://maps.google.com/?daddr='+zoomedEvents[i][0]+','+zoomedEvents[i][1]+'target=_blank");

				console.log(link);

				//markerNames[i].bringToFront();

				redMarker(this);

				

				//$('#navInner').attr("href", "#");

				$('#navInner').attr("href", link);

				$('#nav').css({"display": "block"});

				destLat = this._latlng.lat;

				console.log(this._latlng.lat);

				console.log(destLat);

				destLng = this._latlng.lng;

				dest = String(destLng)+","+String(destLat);


				setDirs(origin, dest);

				//setTimeout(setDirs(origin, dest), 500);

				
				setTimeout(function() {

				var routeDeets = $('.mapbox-directions-route-active').children().eq(2).html();

    			console.log(routeDeets);

    			var eta = routeDeets.split(",")[1];

    			console.log(eta);

    			var infoList = "<li>"+zoomedEvents[i][2]+"</li><li>Location: "+zoomedEvents[i][4].slice(0,36)+"</li><li>Capacity: "+zoomedEvents[i][3]+" | ETA: "+eta+"</li>";

    			$('#eventInfoList').html(infoList);

    			console.log(infoList);

				}, 400);
				


			});

			eventMarkers.addLayer(markerNames[i]);

		};
	}
};


//var clusterMarkers = new L.MarkerClusterGroup();

//map.addLayer(clusterMarkers);

function drawCluster() {

	for (var i=0; i < eventCoords.length; i++) {

		var marker = new L.marker([eventCoords[i][0], eventCoords[i][1]]);

		clusterMarkers.addLayer(marker);

	}

};

function checkRad(currentLocation, destination) {

	var rad = .2;

	var ky = 40000 / 360;

	var kx = Math.cos(Math.PI * destination[0] / 180.0) * ky;

	var dx = Math.abs(destination[1] - currentLocation[1]) * kx;

	var dy = Math.abs(destination[0] - currentLocation[0]) * ky;

	return Math.sqrt(dx * dx + dy * dy) <= rad;

};

//drawCluster();


$('#reset').click(function() {

	setDefault();

	$('#nav').css({"display": "none"});

	setDirs(origin, '');

    //map.setView(center, 12)

});

$('#eventsArrowLeft').click(function() {

	if (markersIndex > 0) {

		console.log('left arrow clicked! markers index = ', markersIndex);

		markersIndex -= 1;

		drawMarkerList();

	}
});


$('#eventsArrowRight').click(function() {

	if (markersIndex < markersPages.length - 1) {

		console.log('right arrow clicked! markers index = ', markersIndex);

		markersIndex += 1;

		drawMarkerList();

	}
});

drawMarkers();

$('#markers').click(clickMarkerButton);

function clickMarkerButton() {

	markersIndex = 0;

	if (markerSwitch == false) {

		//getData();

		markerSwitch = true;

		fenceEvents();

		//map.addLayer(eventMarkers);

		console.log("Marker length = ", document.getElementsByClassName('.leaflet-marker-icon').length);

	} else if (markerSwitch == true) {

		console.log(eventMarkers);

		eventMarkers.clearLayers();

		var x = document.getElementsByClassName('.leaflet-marker-icon');

		console.log("Marker length = ", x.length);

		$('#nav').css({"display": "none"});

		$('#eventInfoList').html("");

		markerSwitch = false;

		setDirs(origin, '');

	}	
};

$("#selectedTime").change(changeTime);

$(".daynavcontainer").click(changeDay);




var trackingCenter = [];

var timer;

$("#nav").on('click', function() {

	window.open(link);

	timer = setInterval("pingLocation()", 3000);

	getLocation();
	
	end_lat = trackingCenter[0];

	console.log(trackingCenter[0]);

	console.log(end_lat);

	end_long = trackingCenter[1];

	end_datetime = new Date();

	writeRideData();

	start_datetime = new Date();

	setTimeout(function() {

		start_lat = trackingCenter[0];

		start_long = trackingCenter[1];

		driveType = driveTypes[0];

	}, 1500);

	$("#farePanel").css({"visibility": "visible"});

	$('#farePanel').animate({top:"0px"}, 1500, "swing");

	$('#startFareButton').animate({opacity: "1.0"}, 1000, "swing");

	$('#cancelFareButton').animate({opacity: "1.0"}, 1000, "swing");

	$("#startFareButton").css({"visibility": "visible"});

	$("#cancelFareButton").css({"visibility": "visible"});

});

//NEED GEOFENCING LOGIC TO AUTO-START THE 'WAITING FOR FARE' STAGE

$("#startFareButton").on('click', function() {

	//window.clearInterval(timer);

	getLocation();

	end_lat = trackingCenter[0];

	end_long = trackingCenter[1];

	end_datetime = new Date();

	writeRideData();

	start_datetime = new Date();

	setTimeout(function() {

		start_lat = trackingCenter[0];

		console.log(start_lat);

		start_long = trackingCenter[1];

		driveType = driveTypes[2];

		$("#startFareButton").css({"visibility": "hidden"});

	}, 1500);


	$("#cancelFareButton").css({"visibility": "hidden"});

	$("#stopFareButton").css({"visibility": "visible"});

	$('#startFareButton').animate({opacity: "0"}, 100, "swing");

	$('#stopFareButton').animate({opacity: "1.0"}, 1100, "swing");

	fareText = 12;

});


$("#cancelFareButton").on('click', function() {

	driveType = driveTypes[3];

	getLocation();
	
	end_lat = trackingCenter[0];

	console.log(trackingCenter[0]);

	console.log(end_lat);

	end_long = trackingCenter[1];

	end_datetime = new Date();

	writeRideData();

	start_datetime = new Date();

	setTimeout(function() {

		start_lat = trackingCenter[0];

		start_long = trackingCenter[1];

		driveType = driveTypes[3];

	}, 1500);



	$('#farePanel').animate({top: "4000px"}, 7000, "linear");

	window.clearInterval(timer);

});


$("#stopFareButton").on('click', function() {

	$("#stopFareButton").css({"visibility": "hidden"});

	$("#completedFareText").css({"top": "13%"});

	$("#completedFareText").html("Fare Complete");

	$('#stopFareButton').animate({opacity: "0"}, 100, "swing");

	$("#serviceSelect").css({"visibility": "visible"});

	$("#serviceSkipButton").css({"visibility": "visible"});

	$('#serviceSelect').animate({opacity: "1.0"}, 1100, "swing");

	$('#serviceSkipButton').animate({opacity: "1.0"}, 1100, "swing");

	$("#investmentText").html("Track your data and make Swoop better");

	//$("#farePanel").css({"opacity": "1.0"});

});

var fareText = 12;

$("#serviceSelect").change(function() {

	service = $("#serviceSelect").val();

	advanceServiceSelect();

	$("#selectedService").html("Service: "+$("#serviceSelect").val());

});


$("#serviceSkipButton").on('click', function() {

	advanceServiceSelect();

	$("#selectedService").html("Service: None");

});

function advanceServiceSelect() {

	$('#serviceSelect').animate({opacity: "0"}, 100, "swing");

	$('#serviceSkip').animate({opacity: "0"}, 100, "swing");

	setTimeout(function() {

		$("#serviceSelect").css({"visibility": "hidden"});

		$("#serviceSkipButton").css({"visibility": "hidden"});

	}, 1500);

	$("#fareInput").css({"visibility": "visible"});

	$("#fareMinus").css({"visibility": "visible"});

	$("#fareText").css({"visibility": "visible"});

	$("#farePlus").css({"visibility": "visible"});

	$("#acceptFare").css({"visibility": "visible"});

	$("#fareSkip").css({"visibility": "visible"});

	$("#fareBack").css({"visibility": "visible"});

	$('#fareInput').animate({opacity: "1.0"}, 1100, "swing");

	$('#fareMinus').animate({opacity: "1.0"}, 1100, "swing");

	$('#fareText').animate({opacity: "1.0"}, 1100, "swing");

	$('#farePlus').animate({opacity: "1.0"}, 1100, "swing");

	$('#acceptFare').animate({opacity: "1.0"}, 1100, "swing");

	$('#fareSkip').animate({opacity: "1.0"}, 1100, "swing");

	$('#fareBack').animate({opacity: "1.0"}, 1100, "swing");

	$("#fareText").html("$"+String(fareText));

	$("#investmentText").html("Track your data and make Swoop better<br><br>Enter fare amount");

}



$("#fareMinus").on('click', function() {

	if (fareText > 0) {

		fareText -= 1;

		$("#fareText").html("$"+String(fareText));

	}

});

$("#farePlus").on('click', function() {

	fareText += 1;

	$("#fareText").html("$"+String(fareText));

});


function writeRideData() {

	console.log(service);

	$.getJSON('/_writeRideData', {

		driverid: JSON.stringify(driverid),

		start_datetime: JSON.stringify(start_datetime),

		end_datetime: JSON.stringify(end_datetime),

		start_lat: JSON.stringify(start_lat),
		start_long: JSON.stringify(start_long),

		end_lat: JSON.stringify(end_lat),
		end_long: JSON.stringify(end_long),

		//one of the four cycles
		driveType: JSON.stringify(driveType),

		//if during fare cycle
		service: JSON.stringify(service),

		//if during fare cycle
		collected_fare: JSON.stringify(collected_fare)


	}, function(data) {

		console.log(data);
	});

};

function endFare() {

	getLocation();

	end_lat = trackingCenter[0];

	end_long = trackingCenter[1];

	end_datetime = new Date();

	collected_fare = fareText;

	writeRideData();

	start_datetime = new Date();

	start_lat = trackingCenter[0];

	start_long = trackingCenter[1];

	driveType = driveTypes[3];

	collected_fare = 0;

	$("#completedFareText").html("Thank you!<br><br>Swoop");

	$("#completedFareText").css({"top": "40%"});

	$("#fareInput").css({"visibility": "hidden"});

	$("#fareMinus").css({"visibility": "hidden"});

	$("#fareText").css({"visibility": "hidden"});

	$("#farePlus").css({"visibility": "hidden"});

	$("#acceptFare").css({"visibility": "hidden"});

	$("#fareSkip").css({"visibility": "hidden"});

	$("#fareBack").css({"visibility": "hidden"});

	$("#selectedService").html("");

	$("#investmentText").html("");

	setTimeout(function() {

		$('#farePanel').animate({top: "9999px"}, 7000, "linear");

	}, 1500);

	setTimeout(function() {

		$("#completedFareText").html("");

		$("#farePanel").css({"opacity": ".9"});

		$("#serviceSelect").val("NA");

	}, 7000);

	setDefault();

};

$("#acceptFare").on('click', function() {

	endFare();

});

$("#fareSkip").on('click', function() {

	fareText = 0;

	endFare();

});

$("#fareBack").on('click', function() {

	$("#fareSkip").css({"visibility": "hidden"});

	$('#fareInput').animate({opacity: "0"}, 100, "swing");

	$('#fareMinus').animate({opacity: "0"}, 100, "swing");

	$('#fareText').animate({opacity: "0"}, 100, "swing");

	$('#farePlus').animate({opacity: "0"}, 100, "swing");

	$('#acceptFare').animate({opacity: "0"}, 100, "swing");

	$('#fareSkip').animate({opacity: "0"}, 100, "swing");

	$('#fareBack').animate({opacity: "0"}, 100, "swing");

	setTimeout(function() {

		$("#fareInput").css({"visibility": "hidden"});

		$("#fareMinus").css({"visibility": "hidden"});

		$("#fareText").css({"visibility": "hidden"});

		$("#farePlus").css({"visibility": "hidden"});

		$("#acceptFare").css({"visibility": "hidden"});

		$("#fareBack").css({"visibility": "hidden"});

	}, 150);

	$("#serviceSelect").css({"visibility": "visible"});

	$('#serviceSelect').animate({opacity: "1.0"}, 1100, "swing");

	$("#serviceSelect").val("NA");

	$("#selectedService").html("");

	$("#serviceSkipButton").css({"visibility": "visible"});

	$("#investmentText").html("Track your data and make Swoop better");

});


setDefault();


var myLayer = L.mapbox.featureLayer().addTo(map);

// This uses the HTML5 geolocation API, which is available on
// most mobile browsers and modern browsers, but not in Internet Explorer
//
// See this chart of compatibility for details:
// http://caniuse.com/#feat=geolocation

function getLoc() {

	if (!navigator.geolocation) {

	    geolocate.innerHTML = 'Geolocation is not available';

	} else {
	 
	        map.locate();

	        console.log(map.locate());
	}
};

//setTimeout(getLoc, 5000);

// Once we've got a position, zoom and center the map
// on it, and add a single marker.
map.on('locationfound', drawGeolocation);


function drawGeolocation(e) {
	
	//function(e) {
    //map.fitBounds(e.bounds);

    myLayer.setGeoJSON({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [e.latlng.lng, e.latlng.lat]
        },
        properties: {
        	
            'marker-color': '#5CD65C',
            
        }
    });

	origLng = e.latlng.lng;

	origLat = e.latlng.lat;

	origin = String(origLng)+","+String(origLat);

	center = [origLat, origLng];

	console.log(center);

	map.setView(center, 10);

	//setDirs(origin, dest);

};

// If the user chooses not to allow their location
// to be shared, display an error message.
map.on('locationerror', function() {
    alert('Position could not be found!');
});

getLoc();

//setInterval(getLoc, 3000);