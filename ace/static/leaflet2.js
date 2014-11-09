var map = L.map('map').setView([37.756631, -122.442222], 12);

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

var heat = L.heatLayer(heatCoords, {radius: 13, blur: 15, max: 1, gradient:{.1: 'blue', .3: 'lime', .5: 'yellow', .7: 'orange', 1: 'red'}}).addTo(map);

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

	var minutes = '';

	var ampm = '';

	var hours = '';

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

	document.getElementById('dayofweek').innerHTML = (days[n]+'\t\t'+dateMonthString);

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

	heat.setLatLngs(heatCoords);

	console.log('new heat loaded!');

};


function getData() {

	markerSwitch = true;

	markersIndex = 0;

	clickMarkerButton();

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

    	createMarkersPages();

    	createHeatCoords();

	});
};



function createMarkersPages() {

	markersPages = [];

	var count = 0;

	for (var i2=0; i2 < eventCoords.length; i2++) {

		if (count % 5 == 0) {

			markersPages.push([]);

		}

		markersPages[markersPages.length - 1].push(eventCoords[count]);

		count += 1;

	};

	console.log(markersPages);

};

function drawMarkerList() {

		var markerList = "<br>No Events!<br><br>Try selecting a different time or day";

		var mi = markersIndex;

		
		if (markersPages.length > 0) {

			markerList = "";

			for (var i=0; i < markersPages[mi].length; i++) {

				markerList += (

	            '<li class="place">'+markersPages[mi][i][2].slice(0, 20)+'  | Cap '+markersPages[mi][i][3]+' | <a href=http://maps.google.com/?daddr='+markersPages[mi][i][0]+','+markersPages[mi][i][1]+'target=_blank>Nav</a></li>');
			
			};
		}

		$('#eventInfoList').html(markerList);

		/*if (markersIndex = 0) {

			$('#eventsArrowLeft').css({"display": "none"});

		} else if (markersIndex > 0 && markersIndex < markersPages.length - 1) {

			$('#eventsArrowLeft').css({"display": "block"});

			$('#eventsArrowRight').css({"display": "block"});

		} else if (markersIndex == markersPages.length - 1) {

			$('#eventsArrowRight').css({"display": "none"});

		} */

}






function getLocation() {
    if (navigator.geolocation) {
        var center = navigator.geolocation.getCurrentPosition(showPosition);

        return center;

    } else {
        alert("Geolocation is not supported by this browser.");
    }

}

function showPosition(position) {
    var center = [position.coords.latitude, position.coords.longitude];

    console.log(center);

    return center;
}






function drawMarkers() {

	eventMarkers.clearLayers();
	
	var mi = markersIndex;

	if (markersPages.length > 0) {

		for (var i=0; i < markersPages[mi].length; i++) {

			marker = new L.marker([markersPages[mi][i][0], markersPages[mi][i][1]], {riseOnHover: true}).
			bindPopup("Event: "+markersPages[mi][i][2]+"<br>Location: "+markersPages[mi][i][4]+"<br>Capacity: "+markersPages[mi][i][3]+"<br><a href=http://maps.google.com/?daddr="+markersPages[mi][i][0]+","+markersPages[mi][i][1]+" target=_blank>Navigate</a>");

		/*setTimeout(function() {

			eventMarkers.addLayer(marker)}, 400);*/

			eventMarkers.addLayer(marker);

		};
	}

		map.addLayer(eventMarkers);

}


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

		drawMarkerList();

		drawMarkers();

	}
});


$('#markers').click(clickMarkerButton);

function clickMarkerButton() {

	markersIndex = 0;

	if (markerSwitch == false) {

		$('#markers').css({"color":"#ffffff", "background": "-webkit-linear-gradient(180deg, #FF820D, #FF310D)",/* For Safari 5.1 to 6.0 */
	  		"background": "-moz-linear-gradient(180deg, #FF820D, #FF310D)", /* For Firefox 3.6 to 15 */
	  		"background": "linear-gradient(180deg, #FF820D, #FF310D)",
	  		"border": "none"});

		drawMarkerList();

		drawMarkers();

		$('.eventInfoShell').css({"display": "block"});

		$('.eventInfoShell').animate({"height": "200px", "top": "48.5%"}, 400, 'swing');

		$('#eventInfoList').css({"display": "block"});

		//$('#eventInfoList').html("TESTING 1, 2, 3");

		markerSwitch = true;

	} else if (markerSwitch == true) {
		
		$('.eventInfoShell').animate({"height": "0px", "top": "80%"}, 300, 'swing', $('#eventInfoList').css({"display": "block"}));

		$('#eventInfoList').html("");

		$('#markers').css({"color":"#FF310D", "background": "none",/* For Safari 5.1 to 6.0 */
	  		"background": "none", /* For Firefox 3.6 to 15 */
	  		"background": "none",
	  		"border": "2px solid #FF310D"});

		$('#eventInfoList').html("");

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