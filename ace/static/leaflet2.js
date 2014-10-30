var map = L.map('map').setView([37.756631, -122.442222], 12);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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

var dayCounter = 0;

function getDayNow () {

	var x = [];
	var y = new Date();

	x.push(y);

	return x;

};

function getTimeNow () {

	var x = new Date();

	var h = x.getHours();
	var m = x.getMinutes()/60;

	return (h + m);
};



function setDefault() {

	var x = new Date();

	var day = getDayNow()[0];
	var time = getTimeNow();

	console.log(x.getHours());

	document.getElementById("selectedTime").value = x.getHours();

	var dateString = (day.getDate().toString());
	var monthString = ((day.getMonth()+1).toString());

	var dateMonthString = (monthString + '/' + dateString);

	var n = day.getDay();

	document.getElementById('dayofweek').innerHTML = (days[n]+'<br>'+dateMonthString);

	prettyTime = String(x.getHours() % 12) + ":" + String(x.getMinutes());
	console.log(prettyTime);

	document.getElementById('timenavtime').innerHTML = (prettyTime);

	console.log(dateTime);

	$.getJSON('/_getEbData', {
		params: JSON.stringify(day),
		time: JSON.stringify(time)

}, function(data) {
		console.log(data[0]);
		console.log(data[0][0].length);

		eventMarkers.clearLayers();
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

		for (var i=0; i < eventCoords.length; i++) {
			/*marker = new L.marker([eventCoords[i][0], eventCoords[i][1]]).
		bindPopup("Event: "+eventCoords[i][2]+"<br>Location: "+eventCoords[i][4]+"<br>Capacity: "+eventCoords[i][3]+"<br><a href=http://maps.google.com/?daddr="+eventCoords[i][0]+","+eventCoords[i][1]+" target=_blank>Navigate</a>");

			eventMarkers.addLayer(marker);

			circle = new L.circle([eventCoords[i][0], eventCoords[i][1]], 500, {
				    color: gridColor(eventCoords[i][3]),
				    fillColor: gridColor(eventCoords[i][3]),
				    fillOpacity: 0.4
					});*/

			circle = new L.circle([eventCoords[i][0], eventCoords[i][1]], 500, {
				    color: gridColor(eventCoords[i][3]),
				    fillColor: gridColor(eventCoords[i][3]),
				    fillOpacity: 0.4
					}).bindPopup("Event: "+eventCoords[i][2]+"<br>Location: "+eventCoords[i][4]+"<br>Capacity: "+eventCoords[i][3]+"<br><a href=http://maps.google.com/?daddr="+eventCoords[i][0]+","+eventCoords[i][1]+" target=_blank>Navigate</a>");

			circles.addLayer(circle);
		};

		//map.addLayer(eventMarkers);
		map.addLayer(circles);

    	console.log(eventCoords);


	});

};


setDefault();


$("#selectedTime").change(function () {

	console.log(dateTime);

	//console.log($("#selectedTime").val());
	selectedTime = $("#selectedTime").val();

	console.log(selectedTime);

	map.fitBounds(gridCoords);

	var eventCoords = [];

	prettyTime = String(selectedTime % 12) + ":00"

	document.getElementById('timenavtime').innerHTML = (prettyTime);

	$.getJSON('/_getEbData', {
	params: JSON.stringify(dateTime),
	time: selectedTime

	}, function(data) {
		console.log(data[0]);
		console.log(data[0][0].length);

		eventMarkers.clearLayers();
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

		for (var i=0; i < eventCoords.length; i++) {
			/*marker = new L.marker([eventCoords[i][0], eventCoords[i][1]]).
		bindPopup("Event: "+eventCoords[i][2]+"<br>Location: "+eventCoords[i][4]+"<br>Capacity: "+eventCoords[i][3]+"<br><a href=http://maps.google.com/?daddr="+eventCoords[i][0]+","+eventCoords[i][1]+" target=_blank>Navigate</a>");

			eventMarkers.addLayer(marker);

			circle = new L.circle([eventCoords[i][0], eventCoords[i][1]], 500, {
				    color: gridColor(eventCoords[i][3]),
				    fillColor: gridColor(eventCoords[i][3]),
				    fillOpacity: 0.4
					});*/

			circle = new L.circle([eventCoords[i][0], eventCoords[i][1]], 500, {
				    color: gridColor(eventCoords[i][3]),
				    fillColor: gridColor(eventCoords[i][3]),
				    fillOpacity: 0.4
					}).bindPopup("Event: "+eventCoords[i][2]+"<br>Location: "+eventCoords[i][4]+"<br>Capacity: "+eventCoords[i][3]+"<br><a href=http://maps.google.com/?daddr="+eventCoords[i][0]+","+eventCoords[i][1]+" target=_blank>Navigate</a>");

			circles.addLayer(circle);
		};

		//map.addLayer(eventMarkers);
		map.addLayer(circles);

    	console.log(eventCoords);


	});

});

$(".daynavcontainer").click(function() {

	dateTime = [];

	map.fitBounds(gridCoords);

	var eventCoords = [];
	
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

	var dateString = (formattedDate.getDate().toString());

	var monthString = ((formattedDate.getMonth()+1).toString());

	var dateMonthString = (monthString + '/' + dateString);

	console.log(formattedDate);

	var n = formattedDate.getDay();

	document.getElementById('dayofweek').innerHTML = (days[n]+'<br>'+dateMonthString);

	dateTime.push(formattedDate);

	console.log(dateTime);
	console.log(selectedTime);


	$.getJSON('/_getEbData', {
		params: JSON.stringify(dateTime),
		time: selectedTime

	}, function(data) {
		console.log(data[0]);
		console.log(data[0][0].length);

		eventMarkers.clearLayers();
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

		for (var i=0; i < eventCoords.length; i++) {
			/*marker = new L.marker([eventCoords[i][0], eventCoords[i][1]]).
		bindPopup("Event: "+eventCoords[i][2]+"<br>Location: "+eventCoords[i][4]+"<br>Capacity: "+eventCoords[i][3]+"<br><a href=http://maps.google.com/?daddr="+eventCoords[i][0]+","+eventCoords[i][1]+" target=_blank>Navigate</a>");

			eventMarkers.addLayer(marker);

			circle = new L.circle([eventCoords[i][0], eventCoords[i][1]], 500, {
				    color: gridColor(eventCoords[i][3]),
				    fillColor: gridColor(eventCoords[i][3]),
				    fillOpacity: 0.4
					});*/

			circle = new L.circle([eventCoords[i][0], eventCoords[i][1]], 500, {
				    color: gridColor(eventCoords[i][3]),
				    fillColor: gridColor(eventCoords[i][3]),
				    fillOpacity: 0.4
					}).bindPopup("Event: "+eventCoords[i][2]+"<br>Location: "+eventCoords[i][4]+"<br>Capacity: "+eventCoords[i][3]+"<br><a href=http://maps.google.com/?daddr="+eventCoords[i][0]+","+eventCoords[i][1]+" target=_blank>Navigate</a>");

			circles.addLayer(circle);
		};

		//map.addLayer(eventMarkers);
		map.addLayer(circles);

    	console.log(eventCoords);


	});
});


var grid = new L.featureGroup();
var rects = new L.featureGroup();
var circles = new L.featureGroup();

var trans = 0;

var gridCoords = [[[37.81, -122.5155], [37.81, -122.47891125000001], [37.7833015, -122.5155], [37.7833015, -122.47891125000001]], [[37.81, -122.47891125000001], [37.81, -122.4423225], [37.7833015, -122.47891125000001], [37.7833015, -122.4423225]], [[37.81, -122.4423225], [37.81, -122.40573375], [37.7833015, -122.4423225], [37.7833015, -122.40573375]], [[37.81, -122.40573375], [37.81, -122.369145], [37.7833015, -122.40573375], [37.7833015, -122.369145]], [[37.7833015, -122.5155], [37.7833015, -122.47891125000001], [37.756603, -122.5155], [37.756603, -122.47891125000001]], [[37.7833015, -122.47891125000001], [37.7833015, -122.4423225], [37.756603, -122.47891125000001], [37.756603, -122.4423225]], [[37.7833015, -122.4423225], [37.7833015, -122.40573375], [37.756603, -122.4423225], [37.756603, -122.40573375]], [[37.7833015, -122.40573375], [37.7833015, -122.369145], [37.756603, -122.40573375], [37.756603, -122.369145]], [[37.756603, -122.5155], [37.756603, -122.47891125000001], [37.7299045, -122.5155], [37.7299045, -122.47891125000001]], [[37.756603, -122.47891125000001], [37.756603, -122.4423225], [37.7299045, -122.47891125000001], [37.7299045, -122.4423225]], [[37.756603, -122.4423225], [37.756603, -122.40573375], [37.7299045, -122.4423225], [37.7299045, -122.40573375]], [[37.756603, -122.40573375], [37.756603, -122.369145], [37.7299045, -122.40573375], [37.7299045, -122.369145]], [[37.7299045, -122.5155], [37.7299045, -122.47891125000001], [37.703206, -122.5155], [37.703206, -122.47891125000001]], [[37.7299045, -122.47891125000001], [37.7299045, -122.4423225], [37.703206, -122.47891125000001], [37.703206, -122.4423225]], [[37.7299045, -122.4423225], [37.7299045, -122.40573375], [37.703206, -122.4423225], [37.703206, -122.40573375]], [[37.7299045, -122.40573375], [37.7299045, -122.369145], [37.703206, -122.40573375], [37.703206, -122.369145]]];


function gridColor(density) {
	var gridColors = ['#ffff4d', '#ffff00', '#ff944d', 
					'#ff6600', '#FF3333', '#ff0000', '#ff44ff']

		if (density >= 0 && density < 100) {
			return gridColors[0]
		}

		else if (density >= 100 && density < 200) {
			return gridColors[1]
		}

		else if (density >= 200 && density < 300) {
			return gridColors[2]
		}

		else if (density >= 300 && density < 500) {
			return gridColors[3]
		}

		else if (density >= 500 && density < 750) {
			return gridColors[4]
		}

		else if (density >= 750 && density < 1000) {
			return gridColors[5]
		}

		else if (density >= 1000) {
			return gridColors[6]
		}
}


var tempRect = new L.featureGroup();

var eventMarkers = new L.featureGroup();





function drawMarkers(rectId) {
	for (var i2=0; i2 < eventCoords[rectId].length; i2++) {
		marker = new L.marker([eventCoords[rectId][i2][0], eventCoords[rectId][i2][1]]).
		bindPopup("Event: "+eventCoords[rectId][i2][2]+"<br>Location: "+eventCoords[rectId][i2][4]+"<br>Capacity: "+eventCoords[rectId][i2][3]+"<br><a href=http://maps.google.com/?daddr="+eventCoords[rectId][i2][0]+","+eventCoords[rectId][i2][1]+" target=_blank>Navigate</a>");

		//console.log([eventCoords[rectId][i2][0], eventCoords[rectId][i2][1]]);

		eventMarkers.addLayer(marker);
	};
}


$('#reset').click(function() {

    map.fitBounds(gridCoords);

});


