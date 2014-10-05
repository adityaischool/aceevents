var map = L.map('map').setView([37.756631, -122.442222], 12);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var grid = new L.featureGroup();
var rects = new L.featureGroup();

var ebEvents = [[37.80100, -122.49], [37.7914, -122.48], [37.758650, -122.425927], [37.742905, -122.480515], [37.731231, -122.473649], [37.747792, -122.440690], [37.758542, -122.439964]]

var gridCoords = [[[37.81, -122.5155], [37.81, -122.47891125000001], [37.7833015, -122.5155], [37.7833015, -122.47891125000001]], [[37.81, -122.47891125000001], [37.81, -122.4423225], [37.7833015, -122.47891125000001], [37.7833015, -122.4423225]], [[37.81, -122.4423225], [37.81, -122.40573375], [37.7833015, -122.4423225], [37.7833015, -122.40573375]], [[37.81, -122.40573375], [37.81, -122.369145], [37.7833015, -122.40573375], [37.7833015, -122.369145]], [[37.7833015, -122.5155], [37.7833015, -122.47891125000001], [37.756603, -122.5155], [37.756603, -122.47891125000001]], [[37.7833015, -122.47891125000001], [37.7833015, -122.4423225], [37.756603, -122.47891125000001], [37.756603, -122.4423225]], [[37.7833015, -122.4423225], [37.7833015, -122.40573375], [37.756603, -122.4423225], [37.756603, -122.40573375]], [[37.7833015, -122.40573375], [37.7833015, -122.369145], [37.756603, -122.40573375], [37.756603, -122.369145]], [[37.756603, -122.5155], [37.756603, -122.47891125000001], [37.7299045, -122.5155], [37.7299045, -122.47891125000001]], [[37.756603, -122.47891125000001], [37.756603, -122.4423225], [37.7299045, -122.47891125000001], [37.7299045, -122.4423225]], [[37.756603, -122.4423225], [37.756603, -122.40573375], [37.7299045, -122.4423225], [37.7299045, -122.40573375]], [[37.756603, -122.40573375], [37.756603, -122.369145], [37.7299045, -122.40573375], [37.7299045, -122.369145]], [[37.7299045, -122.5155], [37.7299045, -122.47891125000001], [37.703206, -122.5155], [37.703206, -122.47891125000001]], [[37.7299045, -122.47891125000001], [37.7299045, -122.4423225], [37.703206, -122.47891125000001], [37.703206, -122.4423225]], [[37.7299045, -122.4423225], [37.7299045, -122.40573375], [37.703206, -122.4423225], [37.703206, -122.40573375]], [[37.7299045, -122.40573375], [37.7299045, -122.369145], [37.703206, -122.40573375], [37.703206, -122.369145]]];

//var ebEventCoords = [[37.80100, -122.49], [37.7914, -122.48]];

function drawGrid(map, gridCoords, grid) {

	var polyindex = 0;

	map.addLayer(grid);

	rectangle1 = new L.rectangle([gridCoords[0][0], gridCoords[0][3]]);
	rects.addLayer(rectangle1);
	//grid.addLayer(rectangle1);
	rectangle1.on("click", function (e) {
		var bounds = rectangle1.getBounds();
		//rectangle1.addLayer(ebEvents1);
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);
	});

	rectangle2 = new L.rectangle([gridCoords[1][0], gridCoords[1][3]]);
	rects.addLayer(rectangle2);
	//grid.addLayer(rectangle2);
	rectangle2.on("click", function (e) {
		var bounds = rectangle2.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);
	});

	rectangle3 = new L.rectangle([gridCoords[2][0], gridCoords[2][3]]);
	rects.addLayer(rectangle3);
	//grid.addLayer(rectangle3);
	rectangle3.on("click", function (e) {
		var bounds = rectangle3.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);
	}); 

	rectangle4 = new L.rectangle([gridCoords[3][0], gridCoords[3][3]]);
	rects.addLayer(rectangle4);
	//grid.addLayer(rectangle4);
	rectangle4.on("click", function (e) {
		var bounds = rectangle4.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);
	}); 

	rectangle5 = new L.rectangle([gridCoords[4][0], gridCoords[4][3]]);
	rects.addLayer(rectangle5);
	//grid.addLayer(rectangle5);
	rectangle5.on("click", function (e) {
		var bounds = rectangle5.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);
	}); 

	rectangle6 = new L.rectangle([gridCoords[5][0], gridCoords[5][3]]);
	rects.addLayer(rectangle6);
	//grid.addLayer(rectangle6);
	rectangle6.on("click", function (e) {
		var bounds = rectangle6.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);
	}); 

	rectangle7 = new L.rectangle([gridCoords[6][0], gridCoords[6][3]]);
	rects.addLayer(rectangle7);
	//grid.addLayer(rectangle7);
	rectangle7.on("click", function (e) {
		var bounds = rectangle7.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);
	}); 

	rectangle8 = new L.rectangle([gridCoords[7][0], gridCoords[7][3]]);
	rects.addLayer(rectangle8);
	//grid.addLayer(rectangle8);
	rectangle8.on("click", function (e) {
		var bounds = rectangle8.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);
	}); 

	rectangle9 = new L.rectangle([gridCoords[8][0], gridCoords[8][3]]);
	rects.addLayer(rectangle9);
	//grid.addLayer(rectangle9);
	rectangle9.on("click", function (e) {
		var bounds = rectangle9.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);
	}); 

	rectangle10 = new L.rectangle([gridCoords[9][0], gridCoords[9][3]]);
	rects.addLayer(rectangle10);
	//grid.addLayer(rectangle10);
	rectangle10.on("click", function (e) {
		var bounds = rectangle10.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);
	}); 

	rectangle11 = new L.rectangle([gridCoords[10][0], gridCoords[10][3]]);
	rects.addLayer(rectangle11);
	//grid.addLayer(rectangle11);
	rectangle11.on("click", function (e) {
		var bounds = rectangle11.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);
	}); 

	rectangle12 = new L.rectangle([gridCoords[11][0], gridCoords[11][3]]);
	rects.addLayer(rectangle12);
	//grid.addLayer(rectangle12);
	rectangle12.on("click", function (e) {
		var bounds = rectangle12.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);
	}); 

	rectangle13 = new L.rectangle([gridCoords[12][0], gridCoords[12][3]]);
	rects.addLayer(rectangle13);	
	//grid.addLayer(rectangle13);
	rectangle13.on("click", function (e) {
		var bounds = rectangle13.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);
	}); 

	rectangle14 = new L.rectangle([gridCoords[13][0], gridCoords[13][3]]);
	rects.addLayer(rectangle14);
	//grid.addLayer(rectangle14);
	rectangle14.on("click", function (e) {
		var bounds = rectangle14.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);
	}); 

	rectangle15 = new L.rectangle([gridCoords[14][0], gridCoords[14][3]]);
	rects.addLayer(rectangle15);
	//grid.addLayer(rectangle15);
	rectangle15.on("click", function (e) {
		var bounds = rectangle15.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);
	});

	rectangle16 = new L.rectangle([gridCoords[15][0], gridCoords[15][3]]);
	rects.addLayer(rectangle16);
	//grid.addLayer(rectangle16);
	rectangle16.on("click", function (e) {
		var bounds = rectangle16.getBounds();
        console.log(bounds);
        console.log(rectangle16.getBounds().contains(ebEvents[0][0], ebEvents[0][1]));
                //map.setCenter();
        map.fitBounds(bounds);
	}); 


	map.addLayer(rects);
}

function drawEbEvents(map, eventCoords, events, rectangle) {

	ebEventsLayer = new L.featureGroup();

	for (var i=0; i < ebEvents[0].length; i++) {
		marker = new L.marker([ebEvents[0][0], quakes[0][1]]);
		console.log()
		ebEventsLayer.addLayer(marker);
	}	

	ebEvents1.addLayer(marker);

}


	//rectangle1.addLayer(ebEvents1);

	/*for (var i=0; i < ebEventCoords.length; i++) {
		marker = new L.marker([ebEventCoords[i][0], ebEventCoords[i][1]]);
		//.bindPopup(quakes[i][5]+"<br>Time: "+quakes[i][3]+"<br>Location: "+quakes[i][0]+", "+quakes[i][1]+"<br>Magnitude: "+quakes[i][2]+"<br><a href="+quakes[i][4]+">Link</a>", {showOnMouseOver: true});
	
		grid.addLayer(marker);	

	} return false; */


function colorGrids(map){

}

drawGrid(map, gridCoords, grid);
//drawEbEvents(map, ebEventCoords, ebEvents);

map.fitBounds(grid.getBounds());