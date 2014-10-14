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

var events = $.getJSON('/_getEbData', {

		

          a: $('input[name="a"]').val(),
        }, function(data) {
        	console.log('-----------TEST---------');
        	console.log(data);

        	var size=Object.size(data);
        	//console.log(data.result[0][0].capacity);
        	//console.log('total capacity:'+data.result[1]);
        	
          //$("#data").text(data.result[1

        	for (var i=0; i < size; i++) {
        		console.log(data[i][1]);
        		gridDensities.push(data[i][1]);
        		console.log(gridDensities);
        	};   

        	console.log(gridDensities);
        	drawGrid(map, gridCoords, grid);




});

var grid = new L.featureGroup();
var rects = new L.featureGroup();
var root = [37.742255, -122.494016];
var point1 = [37.791757, -122.429597];
var point2 = [37.760335, -122.416314];
var point3 = [37.787687, -122.400178];

var trans = 0;



var line_points1 = [
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
});

var gridCoords = [[[37.81, -122.5155], [37.81, -122.47891125000001], [37.7833015, -122.5155], [37.7833015, -122.47891125000001]], [[37.81, -122.47891125000001], [37.81, -122.4423225], [37.7833015, -122.47891125000001], [37.7833015, -122.4423225]], [[37.81, -122.4423225], [37.81, -122.40573375], [37.7833015, -122.4423225], [37.7833015, -122.40573375]], [[37.81, -122.40573375], [37.81, -122.369145], [37.7833015, -122.40573375], [37.7833015, -122.369145]], [[37.7833015, -122.5155], [37.7833015, -122.47891125000001], [37.756603, -122.5155], [37.756603, -122.47891125000001]], [[37.7833015, -122.47891125000001], [37.7833015, -122.4423225], [37.756603, -122.47891125000001], [37.756603, -122.4423225]], [[37.7833015, -122.4423225], [37.7833015, -122.40573375], [37.756603, -122.4423225], [37.756603, -122.40573375]], [[37.7833015, -122.40573375], [37.7833015, -122.369145], [37.756603, -122.40573375], [37.756603, -122.369145]], [[37.756603, -122.5155], [37.756603, -122.47891125000001], [37.7299045, -122.5155], [37.7299045, -122.47891125000001]], [[37.756603, -122.47891125000001], [37.756603, -122.4423225], [37.7299045, -122.47891125000001], [37.7299045, -122.4423225]], [[37.756603, -122.4423225], [37.756603, -122.40573375], [37.7299045, -122.4423225], [37.7299045, -122.40573375]], [[37.756603, -122.40573375], [37.756603, -122.369145], [37.7299045, -122.40573375], [37.7299045, -122.369145]], [[37.7299045, -122.5155], [37.7299045, -122.47891125000001], [37.703206, -122.5155], [37.703206, -122.47891125000001]], [[37.7299045, -122.47891125000001], [37.7299045, -122.4423225], [37.703206, -122.47891125000001], [37.703206, -122.4423225]], [[37.7299045, -122.4423225], [37.7299045, -122.40573375], [37.703206, -122.4423225], [37.703206, -122.40573375]], [[37.7299045, -122.40573375], [37.7299045, -122.369145], [37.703206, -122.40573375], [37.703206, -122.369145]]];

var ebEvents = [[37.80100, -122.49], [37.7914, -122.48], [37.758650, -122.425927], [37.742905, -122.480515], [37.731231, -122.473649], [37.747792, -122.440690], [37.758542, -122.439964]];


function gridColor(rect, density) {
	var gridColors = ['#ffff4d', '#ffff00', '#ff944d', 
					'#ff6600', '#FF3333', '#ff0000', '#ff44ff']

		if (density >= 0 && density < 250) {
			return gridColors[0]
		}

		else if (density >= 250 && density < 500) {
			return gridColors[1]
		}

		else if (density >= 500 && density < 1000) {
			return gridColors[2]
		}

		else if (density >= 1000 && density < 5000) {
			return gridColors[3]
		}

		else if (density >= 5000 && density < 10000) {
			return gridColors[4]
		}

		else if (density >= 10000 && density < 30000) {
			return gridColors[5]
		}

		else if (density >= 30000) {
			return gridColors[6]
		}
}


var tempRect = new L.featureGroup();

function drawGrid(map, gridCoords, grid) {



	var fillOp = .4;

	if (trans == 1) {
		fillOp = 0;
	
	}

	//map.addLayer(grid);

	rectangle1 = new L.rectangle([gridCoords[0][0], gridCoords[0][3]]);
	rects.addLayer(rectangle1);
	rectangle1.setStyle({fillOpacity: fillOp, stroke: false, fillColor: gridColor(rectangle1, gridDensities[0])});
	//grid.addLayer(rectangle1);
	rectangle1.on("click", function (e) {
		var bounds = rectangle1.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);

        if (tempRect.getLayers().length > 0){
        map.addLayer(tempRect.getLayers()[0]);
    	};
    	
        var tempLen = tempRect.getLayers();
        console.log(tempLen);

        tempRect.clearLayers();
        tempRect.addLayer(rectangle1);

        console.log(tempRect.getLayers());

        //console.log(rects);
        map.removeLayer(rectangle1);
	});

	//rectangle1.setStyle({fillColor: '#FF0000'});

	rectangle2 = new L.rectangle([gridCoords[1][0], gridCoords[1][3]]);
	rects.addLayer(rectangle2);
	rectangle2.setStyle({fillOpacity: fillOp, stroke: false, fillColor: gridColor(rectangle2, gridDensities[1])});
	//grid.addLayer(rectangle2);
	rectangle2.on("click", function (e) {
		var bounds = rectangle2.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);

        if (tempRect.getLayers().length > 0){
        map.addLayer(tempRect.getLayers()[0]);
    	};
    	
        var tempLen = tempRect.getLayers();
        console.log(tempLen);

        tempRect.clearLayers();
        tempRect.addLayer(rectangle2);

        console.log(tempRect.getLayers());

        //console.log(rects);
        map.removeLayer(rectangle2);
	});

	rectangle3 = new L.rectangle([gridCoords[2][0], gridCoords[2][3]]);
	rects.addLayer(rectangle3);
	rectangle3.setStyle({fillOpacity: fillOp, stroke: false, fillColor: gridColor(rectangle3, gridDensities[2])});
	//grid.addLayer(rectangle3);
	rectangle3.on("click", function (e) {
		var bounds = rectangle3.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);

        if (tempRect.getLayers().length > 0){
        map.addLayer(tempRect.getLayers()[0]);
    	};
    	
        var tempLen = tempRect.getLayers();
        console.log(tempLen);

        tempRect.clearLayers();
        tempRect.addLayer(rectangle3);

        console.log(tempRect.getLayers());

        //console.log(rects);
        map.removeLayer(rectangle3);

        $.getJSON('/_getData', {

          a: $('input[name="a"]').val(),
        }, function(data) {
          $("#data").text(data.result);
        });
	}); 

	rectangle4 = new L.rectangle([gridCoords[3][0], gridCoords[3][3]]);
	rects.addLayer(rectangle4);
	rectangle4.setStyle({fillOpacity: fillOp, stroke: false, fillColor: gridColor(rectangle4, gridDensities[3])});
	//grid.addLayer(rectangle4);
	rectangle4.on("click", function (e) {
		var bounds = rectangle4.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);

        if (tempRect.getLayers().length > 0){
        map.addLayer(tempRect.getLayers()[0]);
    	};
    	
        var tempLen = tempRect.getLayers();
        console.log(tempLen);

        tempRect.clearLayers();
        tempRect.addLayer(rectangle4);

        console.log(tempRect.getLayers());

        //console.log(rects);
        map.removeLayer(rectangle4);
	}); 

	rectangle5 = new L.rectangle([gridCoords[4][0], gridCoords[4][3]]);
	rects.addLayer(rectangle5);
	rectangle5.setStyle({fillOpacity: fillOp, stroke: false, fillColor: gridColor(rectangle5, gridDensities[4])});
	//grid.addLayer(rectangle5);
	rectangle5.on("click", function (e) {
		var bounds = rectangle5.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);

        if (tempRect.getLayers().length > 0){
        map.addLayer(tempRect.getLayers()[0]);
    	};
    	
        var tempLen = tempRect.getLayers();
        console.log(tempLen);

        tempRect.clearLayers();
        tempRect.addLayer(rectangle5);

        console.log(tempRect.getLayers());

        //console.log(rects);
        map.removeLayer(rectangle5);
	}); 

	rectangle6 = new L.rectangle([gridCoords[5][0], gridCoords[5][3]]);
	rects.addLayer(rectangle6);
	rectangle6.setStyle({fillOpacity: fillOp, stroke: false, fillColor: gridColor(rectangle6, gridDensities[5])});
	//grid.addLayer(rectangle6);
	rectangle6.on("click", function (e) {
		var bounds = rectangle6.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);

        if (tempRect.getLayers().length > 0){
        map.addLayer(tempRect.getLayers()[0]);
    	};
    	
        var tempLen = tempRect.getLayers();
        console.log(tempLen);

        tempRect.clearLayers();
        tempRect.addLayer(rectangle6);

        console.log(tempRect.getLayers());

        //console.log(rects);
        map.removeLayer(rectangle6);
	}); 

	rectangle7 = new L.rectangle([gridCoords[6][0], gridCoords[6][3]]);
	rects.addLayer(rectangle7);
	rectangle7.setStyle({fillOpacity: fillOp, stroke: false, fillColor: gridColor(rectangle7, gridDensities[6])});
	//grid.addLayer(rectangle7);
	rectangle7.on("click", function (e) {
		var bounds = rectangle7.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);

        if (tempRect.getLayers().length > 0){
        map.addLayer(tempRect.getLayers()[0]);
    	};
    	
        var tempLen = tempRect.getLayers();
        console.log(tempLen);

        tempRect.clearLayers();
        tempRect.addLayer(rectangle7);

        console.log(tempRect.getLayers());

        //console.log(rects);
        map.removeLayer(rectangle7);
	}); 

	rectangle8 = new L.rectangle([gridCoords[7][0], gridCoords[7][3]]);
	rects.addLayer(rectangle8);
	rectangle8.setStyle({fillOpacity: fillOp, stroke: false, fillColor: gridColor(rectangle8, gridDensities[7])});
	//grid.addLayer(rectangle8);
	rectangle8.on("click", function (e) {
		var bounds = rectangle8.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);

        if (tempRect.getLayers().length > 0){
        map.addLayer(tempRect.getLayers()[0]);
    	};
    	
        var tempLen = tempRect.getLayers();
        console.log(tempLen);

        tempRect.clearLayers();
        tempRect.addLayer(rectangle8);

        console.log(tempRect.getLayers());

        //console.log(rects);
        map.removeLayer(rectangle8);
	}); 

	rectangle9 = new L.rectangle([gridCoords[8][0], gridCoords[8][3]]);
	rects.addLayer(rectangle9);
	rectangle9.setStyle({fillOpacity: fillOp, stroke: false, fillColor: gridColor(rectangle9, gridDensities[8])});
	//grid.addLayer(rectangle9);
	rectangle9.on("click", function (e) {
		trans = 1;
		//var bounds = grid.getBounds();
        //console.log(bounds);
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

        var bounds = rectangle9.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);

        if (tempRect.getLayers().length > 0){
        map.addLayer(tempRect.getLayers()[0]);
    	};
    	
        var tempLen = tempRect.getLayers();
        console.log(tempLen);

        tempRect.clearLayers();
        tempRect.addLayer(rectangle9);

        console.log(tempRect.getLayers());

        //console.log(rects);
        map.removeLayer(rectangle9);

        $.getJSON('/_getData', {

          a: $('input[name="a"]').val(),
        }, function(data) {
        	var x=data.result;
        	
          $("#data").text(data.result);
        });
                //map.setCenter();
        //map.fitBounds(bounds);
	}); 

	rectangle10 = new L.rectangle([gridCoords[9][0], gridCoords[9][3]]);
	rects.addLayer(rectangle10);
	rectangle10.setStyle({fillOpacity: fillOp, stroke: false, fillColor: gridColor(rectangle10, gridDensities[9])});
	//grid.addLayer(rectangle10);
	rectangle10.on("click", function (e) {
		var bounds = rectangle10.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);

        if (tempRect.getLayers().length > 0){
        map.addLayer(tempRect.getLayers()[0]);
    	};

        var tempLen = tempRect.getLayers();
        console.log(tempLen);

        tempRect.clearLayers();
        tempRect.addLayer(rectangle10);

        console.log(tempRect.getLayers());

        //console.log(rects);
        map.removeLayer(rectangle10);
	}); 

	rectangle11 = new L.rectangle([gridCoords[10][0], gridCoords[10][3]]);
	rects.addLayer(rectangle11);
	rectangle11.setStyle({fillOpacity: fillOp, stroke: false, fillColor: gridColor(rectangle11, gridDensities[10])});
	//grid.addLayer(rectangle11);
	rectangle11.on("click", function (e) {
		var bounds = rectangle11.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);

        if (tempRect.getLayers().length > 0){
        map.addLayer(tempRect.getLayers()[0]);
    	};
    	
        var tempLen = tempRect.getLayers();
        console.log(tempLen);

        tempRect.clearLayers();
        tempRect.addLayer(rectangle11);

        console.log(tempRect.getLayers());

        //console.log(rects);
        map.removeLayer(rectangle11);
	}); 

	rectangle12 = new L.rectangle([gridCoords[11][0], gridCoords[11][3]]);
	rects.addLayer(rectangle12);
	rectangle12.setStyle({fillOpacity: fillOp, stroke: false, fillColor: gridColor(rectangle12, gridDensities[11])});
	//grid.addLayer(rectangle12);
	rectangle12.on("click", function (e) {
		var bounds = rectangle12.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);

        if (tempRect.getLayers().length > 0){
        map.addLayer(tempRect.getLayers()[0]);
    	};
    	
        var tempLen = tempRect.getLayers();
        console.log(tempLen);

        tempRect.clearLayers();
        tempRect.addLayer(rectangle12);

        console.log(tempRect.getLayers());

        //console.log(rects);
        map.removeLayer(rectangle12);
	}); 

	rectangle13 = new L.rectangle([gridCoords[12][0], gridCoords[12][3]]);
	rects.addLayer(rectangle13);
	rectangle13.setStyle({fillOpacity: fillOp, stroke: false, fillColor: gridColor(rectangle13, gridDensities[12])});	
	//grid.addLayer(rectangle13);
	rectangle13.on("click", function (e) {
		var bounds = rectangle13.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);

        if (tempRect.getLayers().length > 0){
        map.addLayer(tempRect.getLayers()[0]);
    	};
    	
        var tempLen = tempRect.getLayers();
        console.log(tempLen);

        tempRect.clearLayers();
        tempRect.addLayer(rectangle13);

        console.log(tempRect.getLayers());

        //console.log(rects);
        map.removeLayer(rectangle13);
	}); 

	rectangle14 = new L.rectangle([gridCoords[13][0], gridCoords[13][3]]);
	rects.addLayer(rectangle14);
	rectangle14.setStyle({fillOpacity: fillOp, stroke: false, fillColor: gridColor(rectangle14, gridDensities[13])});
	//grid.addLayer(rectangle14);
	rectangle14.on("click", function (e) {
		var bounds = rectangle14.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);

        if (tempRect.getLayers().length > 0){
        map.addLayer(tempRect.getLayers()[0]);
    	};
    	
        var tempLen = tempRect.getLayers();
        console.log(tempLen);

        tempRect.clearLayers();
        tempRect.addLayer(rectangle14);

        console.log(tempRect.getLayers());

        //console.log(rects);
        map.removeLayer(rectangle14);
	}); 

	rectangle15 = new L.rectangle([gridCoords[14][0], gridCoords[14][3]]);
	rects.addLayer(rectangle15);
	rectangle15.setStyle({fillOpacity: fillOp, stroke: false, fillColor: gridColor(rectangle15, gridDensities[14])});
	//grid.addLayer(rectangle15);
	rectangle15.on("click", function (e) {
		var bounds = rectangle15.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);

        if (tempRect.getLayers().length > 0){
        map.addLayer(tempRect.getLayers()[0]);
    	};
    	
        var tempLen = tempRect.getLayers();
        console.log(tempLen);

        tempRect.clearLayers();
        tempRect.addLayer(rectangle15);

        console.log(tempRect.getLayers());

        //console.log(rects);
        map.removeLayer(rectangle15);
	});

	rectangle16 = new L.rectangle([gridCoords[15][0], gridCoords[15][3]]);
	rects.addLayer(rectangle16);
	rectangle16.setStyle({fillOpacity: fillOp, stroke: false, fillColor: gridColor(rectangle16, gridDensities[15])});
	//grid.addLayer(rectangle16);
	rectangle16.on("click", function (e) {
		var bounds = rectangle16.getBounds();
        console.log(bounds);
                //map.setCenter();
        map.fitBounds(bounds);

        if (tempRect.getLayers().length > 0){
        map.addLayer(tempRect.getLayers()[0]);
    	};
    	
        var tempLen = tempRect.getLayers();
        console.log(tempLen);

        tempRect.clearLayers();
        tempRect.addLayer(rectangle16);

        console.log(tempRect.getLayers());

        //console.log(rects);
        map.removeLayer(rectangle16);
	}); 


	map.addLayer(rects);
}

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


//drawGrid(map, gridCoords, grid);


