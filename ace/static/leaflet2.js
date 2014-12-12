var center = [37.756631, -122.442222];

var map = L.map('map', {zoomControl: false}).setView(center, 12);


//mapbox access token
L.mapbox.accessToken = 'pk.eyJ1IjoiYWpvbmVzNjIwIiwiYSI6IlJ1eEdISkUifQ.whSWoswC0sLHG_kS9q-JRQ';


//draw map using mapbox tiles
L.tileLayer('https://{s}.tiles.mapbox.com/v3/ajones620.k4bkhnfi/{z}/{x}/{y}.png', {

    attribution: '© <a href="http://www.mapbox.com/about/maps/" target="_blank"> Mapbox Terms &amp; Feedback</a>'

}).addTo(map);

//set attribution to bottom-right corner
map.attributionControl.setPosition('bottomright');

//geofence events to map size
map.on('load', fenceEvents);

//draw markers
map.on('load', drawMarkers);

//once driver's geolocation is discovered, draw marker
map.on('locationfound', drawGeolocation);

//error handler for driver geolocation
map.on('locationerror', function() {

    alert('Position could not be found - please check geolocation settings');

});

//set initial map state

$(document).ready(function() {

	setDefault();

	getLocation();

});

//geofence events when zoomed in or out
map.on('zoomend', fenceEvents);

//geofence events when map is dragged
map.on('dragend', fenceEvents);


//VARIABLE INITS
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

var zoomedEvents = [];

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

var markerZIndex = 200;

var selectedMarker = [];

var markerNames = [];

var link = '';

var trackingCenter = [];

var timer;

var fareText = 12;

var myLayer = L.mapbox.featureLayer().addTo(map);


//setDirs takes an origin latlng (current geolocation) and
//a destination point (selected marker) and returns a
//mapbox directions object using those args
function setDirs(origin, dest) {

    var origin = origin;

    var dest = dest;

    $('#mapbox-directions-origin-input').val(origin);

    $('#mapbox-directions-destination-input').val(dest);

    directions.setOrigin(origin);

    directions.setDestination(dest);

    directions.query();

};


//getLocation gets driver's current geolocation
function getLocation() {

    if (navigator.geolocation) {

    	map.locate();

        navigator.geolocation.getCurrentPosition(setTrackingCenter);

    } else { 

        alert("Geolocation is not supported by this browser.");

    }
};


//setTrackingCenter sets trackingCenter var to
//driver's current geolocation
function setTrackingCenter(position) {

	trackingCenter = [position.coords.latitude, position.coords.longitude];

};


//pingLocation & showPing ping the driver's location for
//the purposes of detecting if they're within a certain
//radius of the navigation destination (the event location)
function pingLocation() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(showPing);

    } else { 

        alert("Geolocation is not supported by this browser.");

    }
};


//pingLocation & showPing ping the driver's location for
//the purposes of detecting if they're within a certain
//radius of the navigation destination (the event location)
function showPing(position) {

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
};


//getDayNow gets current datetime
function getDayNow () {

	var x = [];

	var y = new Date();

	x.push(y);

	selectedDate = y;

	return x;

};


//getTimeNow returns current time as a float
function getTimeNow () {

	var x = new Date();

	var h = x.getHours();

	var m = x.getMinutes()/60;

	selectedTime = h + m;

	return (h + m);

};


//setDefault sets map state to current date & time
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

	document.getElementById("selectedTime").value = x.getHours();

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

	document.getElementById('timenavtime').innerHTML = (prettyTime);

	getData();

};


//changeTime takes the currently selected time from the time slider
//and queries the database with the updated date & time
function changeTime() {

	selectedTime = $("#selectedTime").val();

	//map.setView(center, 12)

	selectedMarker = [];

	eventCoords = [];

	var x = selectedTime * 2;

	var min = '';

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

	var prettyTime = "Events ending&nbsp;" + hours + ":" + min + " " + ampm;

	document.getElementById('timenavtime').innerHTML = prettyTime;

	getData();

};


//changeDay takes the currently selected date from the date selector
//and queries the database with the updated date & time
function changeDay() {

	selectedMarker = [];

	dateTime = [];

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

	var dateString = (formattedDate.getDate().toString());

	var monthString = ((formattedDate.getMonth()+1).toString());

	var dateMonthString = (monthString + '/' + dateString);

	var n = formattedDate.getDay();

	document.getElementById('dayofweek').innerHTML = (days[n]+'&nbsp;'+dateMonthString);

	getData();

};


//createHeatCoords updates the heat plot with the current
//eventCoords list
function createHeatCoords() {

	heatCoords = [];

	for (var i=0; i < eventCoords.length; i++) {

		var cap = eventCoords[i][3];

		var lat = eventCoords[i][0];

		var lng = eventCoords[i][1];
		
		for (var i2=0; i2 < cap/6; i2++) {

		heatCoords.push([Number(lat), Number(lng)]);
		
		}
	};

	heat.setLatLngs(heatCoords);

};


//fenceEvents takes current map bounds and redraws event 
//markers based on events within those bounds
function fenceEvents() {

	markersIndex = 0;

	zoomedEvents = [];

	var bounds = map.getBounds();

	var lats = [bounds['_northEast'].lat, bounds['_southWest'].lat];

	var lngs = [bounds['_northEast'].lng, bounds['_southWest'].lng];

	if (eventCoords.length > 0) {

		for (var i=0; i < eventCoords.length; i++) {

			if (eventCoords[i][0] <= lats[0] && eventCoords[i][0] >= lats[1] && eventCoords[i][1] <= lngs[0] && eventCoords[i][1] >= lngs[1]) {

				//console.log("Event "+String(i + 1)+" is in the bounding box!");

				zoomedEvents.push(eventCoords[i]);

			};
		}

	} else if (eventCoords.length === 0) {

		$('#eventInfoList').html("<br><li>No events at this time!</li>");

	}

	//console.log(zoomedEvents);

	if (markerSwitch == true) {

		drawMarkers();

	}
};


//redMarker sets the selected marker icon to red instead of blue
function redMarker(marker) {

	var newSelection = marker;

	if (selectedMarker.length > 0) {

		selectedMarker[0].setIcon(markerIconBlue);

		selectedMarker[0].setZIndexOffset(0);

		selectedMarker = [];

		selectedMarker.push(newSelection);

		selectedMarker[0].setIcon(markerIconRed);

		selectedMarker[0].setZIndexOffset(markerZIndex);

		markerZIndex++;

	} else {

		selectedMarker.push(newSelection);

		selectedMarker[0].setIcon(markerIconRed);

		selectedMarker[0].setZIndexOffset(markerZIndex);

		markerZIndex++;

	}
};


//getData is the main connection between the client and server
//that queries the database with the clientside-selected date & time
function getData() {

	setDirs(origin, '');

	eventCoords = [];

	markersIndex = 0;

	$('#eventInfoList').html("");

	$("#nav").css({"display": "none"});

	$.getJSON('/_getEbData', {

		params: JSON.stringify(dateTime),
		time: selectedTime

	}, function(data) {

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

		fenceEvents();

    	createHeatCoords();

	});
};


//drawMarkerList is a deprecated function that was originally
//used to draw a paginated event list on the ui
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


//drawMarkers plots the top 5 (by capacity) event markers on the map
function drawMarkers() {

	markerNames = [];

	eventMarkers.clearLayers();

	var tempName = '';

	for (var i=0; i < zoomedEvents.length; i++) {

		tempName = "marker" + i;

		markerNames.push(tempName);

	};

	if (zoomedEvents.length > 0) {

		for (var i=0; i < Math.min(5, zoomedEvents.length); i++) {

			markerNames[i] = new L.marker([zoomedEvents[i][0], zoomedEvents[i][1]], {riseOnHover: true, icon: markerIconBlue});

			markerNames[i]._leaflet_id = i + 1;

			if ((selectedMarker.length > 0) &&
				(selectedMarker[0]._latlng.lat == markerNames[i]._latlng.lat) &&
				(selectedMarker[0]._latlng.lng == markerNames[i]._latlng.lng)) {

				redMarker(markerNames[i]);

			}

			markerNames[i].on("click", function() {

				console.log(markerNames[i]);

				var i = this._leaflet_id - 1;

				var lat = zoomedEvents[i][0];

				var lng = zoomedEvents[i][1];

				link = ("http://waze.to/?ll="+lat+","+lng+"&navigate=yes");
				//var link = ("http://maps.google.com/?daddr='+zoomedEvents[i][0]+','+zoomedEvents[i][1]+'target=_blank");

				redMarker(this);

				$('#navInner').attr("href", link);

				$('#nav').css({"display": "block"});

				destLat = this._latlng.lat;

				destLng = this._latlng.lng;

				dest = String(destLng)+","+String(destLat);

				setDirs(origin, dest);
			
				setTimeout(function() {

				var routeDeets = $('.mapbox-directions-route-active').children().eq(2).html();

    			var eta = routeDeets.split(",")[1];

    			var infoList = "<li>"+zoomedEvents[i][2]+"</li><li>Location: "+zoomedEvents[i][4].slice(0,28)+"</li><li>Capacity: "+zoomedEvents[i][3]+" | ETA: "+eta+"</li>";

    			$('#eventInfoList').html(infoList);

				}, 400);

			});

			eventMarkers.addLayer(markerNames[i]);

		};
	}
};

function clickMarker(i) {


};


//checkRad checks to see if current driver location is within
//specified radius of destination
function checkRad(currentLocation, destination) {

	var rad = .2;

	var ky = 40000 / 360;

	var kx = Math.cos(Math.PI * destination[0] / 180.0) * ky;

	var dx = Math.abs(destination[1] - currentLocation[1]) * kx;

	var dy = Math.abs(destination[0] - currentLocation[0]) * ky;

	return Math.sqrt(dx * dx + dy * dy) <= rad;

};


//"now" button handler
$('#reset').click(function() {

	setDefault();

	$('#nav').css({"display": "none"});

	setDirs(origin, '');

});


//"markers" menu nav button handler
$('#markers').click(clickMarkerButton);


//clickMarkerButton turns markers on/off, default is on
function clickMarkerButton() {

	markersIndex = 0;

	if (markerSwitch == false) {

		markerSwitch = true;

		fenceEvents();

	} else if (markerSwitch == true) {

		eventMarkers.clearLayers();

		var x = document.getElementsByClassName('.leaflet-marker-icon');

		$('#nav').css({"display": "none"});

		$('#eventInfoList').html("");

		markerSwitch = false;

		setDirs(origin, '');

	}
};


//time slider handler
$("#selectedTime").change(changeTime);


//daynavcontainer left & right arrow handler
$(".daynavcontainer").click(changeDay);


//navigation button handler
$("#nav").on('click', function() {

	window.open(link);

	timer = setInterval("pingLocation()", 3000);

	getLocation();
	
	end_lat = trackingCenter[0];

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


//startFareButton handler
$("#startFareButton").on('click', function() {

	getLocation();

	end_lat = trackingCenter[0];

	end_long = trackingCenter[1];

	end_datetime = new Date();

	writeRideData();

	start_datetime = new Date();

	setTimeout(function() {

		start_lat = trackingCenter[0];

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



//cancelFareButton handler
$("#cancelFareButton").on('click', function() {

	driveType = driveTypes[3];

	getLocation();
	
	end_lat = trackingCenter[0];

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


//stopFareButton handler
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

});


//serviceSelect drop-down handler
$("#serviceSelect").change(function() {

	service = $("#serviceSelect").val();

	advanceServiceSelect();

	$("#selectedService").html("Service: "+$("#serviceSelect").val());

});


//serviceSkipButton handler
$("#serviceSkipButton").on('click', function() {

	advanceServiceSelect();

	$("#selectedService").html("Service: None");

});


//advanceServiceSelect moves from the service-selection screen to
//the fare input screen
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


//fareMinus handler
$("#fareMinus").on('click', function() {

	if (fareText > 0) {

		fareText -= 1;

		$("#fareText").html("$"+String(fareText));

	}
});


//farePlus handler
$("#farePlus").on('click', function() {

	fareText += 1;

	$("#fareText").html("$"+String(fareText));

});


//writeRideData sends fare data to flask, which writes to the database
function writeRideData() {

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


//endFare contains logic for when fare input screen is completed
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

	$("#completedFareText").html("Thank you!<br><br><img id='swoopLogo' src='/static/css/swoop-logo.png'></img>");

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


//acceptFare handler
$("#acceptFare").on('click', function() {

	endFare();

});


//fareSkip handler
$("#fareSkip").on('click', function() {

	fareText = 0;

	endFare();

});


//fareBack handler
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


//drawGeolocation draws driver's current location marker
function drawGeolocation(e) {

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

};