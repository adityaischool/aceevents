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

function setDefault() {

	dateTime = [];
	
	var x = selectedDate.setDate(selectedDate.getDate());

	

	var formattedDate = new Date(x);

	console.log(formattedDate);

	var dateString = (formattedDate.getDate().toString());
	var monthString = ((formattedDate.getMonth()+1).toString());

	var dateMonthString = (monthString + '/' + dateString);

	var n = formattedDate.getDay();

	document.getElementById('dayofweek').innerHTML = (days[n]+'<br>'+dateMonthString);

	dateTime.push(formattedDate);

	console.log(dateTime);

	$.getJSON('/_getEbData', {
		params: JSON.stringify(dateTime),
		time: JSON.stringify(selectedTime)

	}, function(data) {
		console.log(data.result);
		gridDensities = [];

		var size=Object.size(data);

        	for (var i=0; i < size; i++) {
        		//console.log(data[i][0][0].lat);
        		//gridDensities.push([0]);
        		console.log(data[i][1]);
        		gridDensities.push(data[i][1]);
        		console.log(gridDensities);
        		eventCoords.push([]);

        		for (var i2=0; i2 < data[i][0].length; i2++) {
        			if (data[i][0].length > 0) {
        			eventCoords[i].push([
        				data[i][0][i2].lat,
        				data[i][0][i2].lng,
        				data[i][0][i2].name,
        				data[i][0][i2].capacity,
        				data[i][0][i2].venue,
        				data[i][0][i2].endTime,
        				data[i][0][i2].date]);}


        			//if (data[i][0][i2].date = viewDay) {
        			//		gridDensities[i] += data[i][0][i2].capacity)
        			//};
        		};
        	};   

        	console.log(gridDensities);
        	console.log(eventCoords);
        	//console.log(eventCoords[0][0][0]);

        	rects.clearLayers();
			grid.clearLayers();
			//tempRect.clearLayers();
			eventMarkers.clearLayers();

        	drawGrid2(map, gridCoords, grid);

	
	
});

}


//setDefault();


$("#selectedTime").change(function () {

	console.log(dateTime);

	//console.log($("#selectedTime").val());
	selectedTime = $("#selectedTime").val();

	console.log(selectedTime);

	map.fitBounds(rects);

	var eventCoords = [];

	prettyTime = String(selectedTime % 12) + ":00"

	document.getElementById('timenavtime').innerHTML = (prettyTime);

	$.getJSON('/_getEbData', {
	params: JSON.stringify(dateTime),
	time: selectedTime

	}, function(data) {
		console.log(data.result);
		gridDensities = [];

		rects.clearLayers();
		//grid.clearLayers();
		//tempRect.clearLayers();
		eventMarkers.clearLayers();

		var size=Object.size(data);

    	for (var i=0; i < size; i++) {
 
    		console.log(data[i][1]);
    		gridDensities.push(data[i][1]);
    		console.log(gridDensities);
    		eventCoords.push([]);

    		for (var i2=0; i2 < data[i][0].length; i2++) {
    			if (data[i][0].length > 0) {
    			eventCoords[i].push([
    				data[i][0][i2].lat,
    				data[i][0][i2].lng,
    				data[i][0][i2].name,
    				data[i][0][i2].capacity,
    				data[i][0][i2].venue,
    				data[i][0][i2].endTime,
    				data[i][0][i2].date]);}

    		};
    	};   

    	console.log(gridDensities);
    	console.log(eventCoords);

    	rectangles = rects.getLayers();

    	for (var i=0; i < gridCoords.length; i++) {
    		if (gridDensities[i] > 0) {		
			rectangles[i].setStyle({fillOpacity: 0.4, fillColor: gridColor(gridDensities[i])});
			} else {
			rectangles[i].setStyle({stroke: false, fillOpacity: 0});
			}
		};
	});

});

$(".daynavcontainer").click(function() {

	dateTime = [];

	map.fitBounds(rects);

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
		console.log(data.result);
		gridDensities = [];

		rects.clearLayers();
		//grid.clearLayers();
		//tempRect.clearLayers();
		eventMarkers.clearLayers();

		var size=Object.size(data);

    	for (var i=0; i < size; i++) {
 
    		console.log(data[i][1]);
    		gridDensities.push(data[i][1]);
    		console.log(gridDensities);
    		eventCoords.push([]);

    		for (var i2=0; i2 < data[i][0].length; i2++) {
    			if (data[i][0].length > 0) {
    			eventCoords[i].push([
    				data[i][0][i2].lat,
    				data[i][0][i2].lng,
    				data[i][0][i2].name,
    				data[i][0][i2].capacity,
    				data[i][0][i2].venue,
    				data[i][0][i2].endTime,
    				data[i][0][i2].date]);}

    		};
    	};   

    	console.log(gridDensities);
    	console.log(eventCoords);

    	rectangles = rects.getLayers();

    	for (var i=0; i < gridCoords.length; i++) {
    		if (gridDensities[i] > 0) {		
			rectangles[i].setStyle({fillOpacity: 0.4, fillColor: gridColor(gridDensities[i])});
			} else {
			rectangles[i].setStyle({stroke: false, fillOpacity: 0});
			}
		};
	});
});


var grid = new L.featureGroup();
var rects = new L.featureGroup();
var root = [37.742255, -122.494016];
var point1 = [37.791757, -122.429597];
var point2 = [37.760335, -122.416314];
var point3 = [37.787687, -122.400178];

var trans = 0;



/*var line_points1 = [
      [37.742255, -122.494016],
      [37.791757, -122.429597]
  ];

var line_points2 = [
      [37.742255, -122.494016],
      [37.760335, -122.416314]
  ];

var line_points3 = [
      [37.742255, -122.494016],
      [37.787687, -122.400178]
  ];


var polyline_options1 = {
  color: '#1c1c1c',
  weight: 3,
};

var polyline_options2 = {
  color: '#1c1c1c',
  weight: 2,
};

var polyline_options3 = {
  color: '#1c1c1c',
  weight: 5,
};


var uberMarker = L.icon({
	iconUrl: '/static/uberMarker.png',
	iconAnchor: [25,15]
});

var uberMarkerGrey = L.icon({
	iconUrl: '/static/uberMarkerGrey.png',
	iconAnchor: [25,15]
});  */

var gridCoords = [[[37.81, -122.5155], [37.81, -122.47891125000001], [37.7833015, -122.5155], [37.7833015, -122.47891125000001]], [[37.81, -122.47891125000001], [37.81, -122.4423225], [37.7833015, -122.47891125000001], [37.7833015, -122.4423225]], [[37.81, -122.4423225], [37.81, -122.40573375], [37.7833015, -122.4423225], [37.7833015, -122.40573375]], [[37.81, -122.40573375], [37.81, -122.369145], [37.7833015, -122.40573375], [37.7833015, -122.369145]], [[37.7833015, -122.5155], [37.7833015, -122.47891125000001], [37.756603, -122.5155], [37.756603, -122.47891125000001]], [[37.7833015, -122.47891125000001], [37.7833015, -122.4423225], [37.756603, -122.47891125000001], [37.756603, -122.4423225]], [[37.7833015, -122.4423225], [37.7833015, -122.40573375], [37.756603, -122.4423225], [37.756603, -122.40573375]], [[37.7833015, -122.40573375], [37.7833015, -122.369145], [37.756603, -122.40573375], [37.756603, -122.369145]], [[37.756603, -122.5155], [37.756603, -122.47891125000001], [37.7299045, -122.5155], [37.7299045, -122.47891125000001]], [[37.756603, -122.47891125000001], [37.756603, -122.4423225], [37.7299045, -122.47891125000001], [37.7299045, -122.4423225]], [[37.756603, -122.4423225], [37.756603, -122.40573375], [37.7299045, -122.4423225], [37.7299045, -122.40573375]], [[37.756603, -122.40573375], [37.756603, -122.369145], [37.7299045, -122.40573375], [37.7299045, -122.369145]], [[37.7299045, -122.5155], [37.7299045, -122.47891125000001], [37.703206, -122.5155], [37.703206, -122.47891125000001]], [[37.7299045, -122.47891125000001], [37.7299045, -122.4423225], [37.703206, -122.47891125000001], [37.703206, -122.4423225]], [[37.7299045, -122.4423225], [37.7299045, -122.40573375], [37.703206, -122.4423225], [37.703206, -122.40573375]], [[37.7299045, -122.40573375], [37.7299045, -122.369145], [37.703206, -122.40573375], [37.703206, -122.369145]]];

var ebEvents = [[37.80100, -122.49], [37.7914, -122.48], [37.758650, -122.425927], [37.742905, -122.480515], [37.731231, -122.473649], [37.747792, -122.440690], [37.758542, -122.439964]];



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



function drawGrid2(map, gridCoords, grid) {

	rects.clearLayers();

	var fillOp = .4;

	if (trans == 1) {
		fillOp = 0;
	};

	console.log(gridCoords.length);

	var rectNames = []
	var tempName = ''

	for (var i=0; i< gridCoords.length; i++) {
		tempName = "rectangle" +i;
		rectNames.push(tempName);
	};

	console.log(rectNames);
	
	for (var i=0; i < gridCoords.length; i++) {



		//console.log(rectNames[i]);

		rectNames[i] = new L.rectangle([gridCoords[i][0], gridCoords[i][3]]);
		rects.addLayer(rectNames[i]);


		if (gridDensities[i] > 0) {		
		rectNames[i].setStyle({fillOpacity: 0.4, stroke: false, fillColor: gridColor(gridDensities[i])});
		} else {
		rectNames[i].setStyle({stroke: false, fillOpacity: 0});
		}

		//rectNames[i].setStyle({fillOpacity: fillOp, stroke: false, fillColor: gridColor(gridDensities[i])});
		

		rectNames[i]._leaflet_id = i + 1;
		console.log(rectNames[i]._leaflet_id);
		//grid.addLayer(rectangle1);
		//console.log(rectNames[i]);
		rectNames[i].on("click", function (e) {

			var bounds = this.getBounds();
			//console.log(bounds);
			    //map.setCenter();
			map.fitBounds(bounds);

			if (tempRect.getLayers().length > 0 && tempRect._leaflet_id != this._leaflet_id){
			map.addLayer(tempRect.getLayers()[0]);
			};

			var tempLen = tempRect.getLayers();
			//console.log(tempLen);

			tempRect.clearLayers();
			tempRect.addLayer(this);

			eventMarkers.clearLayers();

			console.log(this);

			var rectId = this._leaflet_id - 1;
			console.log(rectId);

			//console.log(eventCoords);
			//console.log(eventCoords[1]);

			/* HERE for (var i2=0; i2 < eventCoords[rectId].length; i2++) {
				marker = new L.marker([eventCoords[rectId][i2][0], eventCoords[rectId][i2][1]]).
				bindPopup("Event: "+eventCoords[rectId][i2][2]+"<br>Location: "+eventCoords[rectId][i2][4]+"<br>Capacity: "+eventCoords[rectId][i2][3]+"<br><a href=http://maps.google.com/?daddr="+eventCoords[rectId][i2][0]+","+eventCoords[rectId][i2][1]+" target=_blank>Navigate</a>");
				
				//console.log([eventCoords[rectId][i2][0], eventCoords[rectId][i2][1]]);
				
				eventMarkers.addLayer(marker);
			}; TO HERE*/

			drawMarkers(rectId);

			console.log(eventMarkers);
			map.removeLayer(this);
			map.addLayer(eventMarkers); 

			//or (var i=0; )

			//console.log(tempRect.getLayers());

			//console.log(rects);
			
		});

	};

	map.addLayer(rects);
	trans = 1;

	var bounds = rects.getBounds();
    console.log(bounds);

    map.fitBounds(bounds);

	if (tempRect.getLayers().length > 0){
    	map.addLayer(tempRect.getLayers()[0]);
	};
	
    var tempLen = tempRect.getLayers();
    console.log(tempLen);

    tempRect.clearLayers();
    eventMarkers.clearLayers();
}


function drawMarkers(rectId) {
	for (var i2=0; i2 < eventCoords[rectId].length; i2++) {
		marker = new L.marker([eventCoords[rectId][i2][0], eventCoords[rectId][i2][1]]).
		bindPopup("Event: "+eventCoords[rectId][i2][2]+"<br>Location: "+eventCoords[rectId][i2][4]+"<br>Capacity: "+eventCoords[rectId][i2][3]+"<br><a href=http://maps.google.com/?daddr="+eventCoords[rectId][i2][0]+","+eventCoords[rectId][i2][1]+" target=_blank>Navigate</a>");

		//console.log([eventCoords[rectId][i2][0], eventCoords[rectId][i2][1]]);

		eventMarkers.addLayer(marker);
	};
}

        /*marker = new L.marker([root[0], root[1]], {icon: uberMarkerGrey}).
        bindPopup("Event X").addTo(map);
        marker2 = new L.marker([point1[0], point1[1]], {icon: uberMarker}).
        bindPopup("Destination 1");
        marker3 = new L.marker([point2[0], point2[1]], {icon: uberMarker}).
        bindPopup("Destination 3");
        marker4 = new L.marker([point3[0], point3[1]], {icon: uberMarker}).
        bindPopup("Destination 2");

        $('#sidebar').css("display: inline");

        polyline1 = L.polyline(line_points1, polyline_options1).addTo(map);
        polyline2 = L.polyline(line_points2, polyline_options2).addTo(map);
        polyline3 = L.polyline(line_points3, polyline_options3).addTo(map);

        map.addLayer(marker);
        map.addLayer(marker2);
        map.addLayer(marker3);
        map.addLayer(marker4);*/

$('#reset').click(function() {
	trans = 1;

	var bounds = rects.getBounds();
    console.log(bounds);

    map.fitBounds(bounds);

    if (tempRect.getLayers().length > 0){
    	map.addLayer(tempRect.getLayers()[0]);
	};
	
    var tempLen = tempRect.getLayers();
    console.log(tempLen);

    tempRect.clearLayers();
    eventMarkers.clearLayers();
	/*drawGrid(map, gridCoords, grid);
	map.removeLayer(marker);
	map.removeLayer(marker2);
	map.removeLayer(marker3);
	map.removeLayer(marker4);
	map.removeLayer(polyline1);
	map.removeLayer(polyline2);
	map.removeLayer(polyline3);*/
	//grid.removeLayer();
	//map.fitBounds(grid.getBounds());
});


