//set initial map state

//Initialization
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

var driverid = 'driver@example.com';

var start_datetime = '';
var end_datetime = '';
var start_lat = 0;
var start_long = 0;
var end_lat = 0;
var end_long = 0;

var iconScale = 1.3;

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
function setDatetimeDefault() {
	$("#nav").css({"display": "none"});
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
	// getDayNow();
	// getTimeNow();
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

	if (x.getHours() % 12 === 0) {
		hours = '12';
	} else {
		hours = String(Math.floor(selectedTime) % 12);
	}
	var prettyTime = "Driver history from&nbsp;" + hours + ":" + minutes + " " + ampm;
	document.getElementById('timenavtime').innerHTML = (prettyTime);
	getData();
};


//changeTime takes the currently selected time from the time slider
//and queries the database with the updated date & time
function changeTime() {
	selectedTime = $("#selectedTime").val();
	//map.setView(center, 12)
	eventCoords = [];
	var x = selectedTime * 2;
	var min = '';
	if (x % 2 === 1) {
		min = '30';
	} else if (x % 2 === 0) {
		min = '00';
	}
	var ampm = '';
	if (x < 24) {
		ampm = 'am';
	} else if (x >= 24) {
		ampm = 'pm';
	};

	var hours = '';
	if (x === 0 || x === 1 ||
		x === 24 ||x === 25 ||
		x === 48) {
		hours = '12';
	} else {
		hours = String(Math.floor(selectedTime) % 12)
	}
	var prettyTime = "Driver history from&nbsp;" + hours + ":" + min + " " + ampm;
	document.getElementById('timenavtime').innerHTML = prettyTime;
	getData();
};


//changeDay takes the currently selected date from the date selector
//and queries the database with the updated date & time
function changeDay() {
	dateTime = [];
	eventCoords = [];
	var plusMinus = 0;
	if (this.children[0].id === 'rightArrow') {
		plusMinus = 1;
		dayCounter += 1;
	} else if (this.children[0].id === 'leftArrow' && dayCounter > 0) {
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

//"now" button handler
$('#reset').click(function() {
	setDefault();
	$('#nav').css({"display": "none"});
});

//time slider handler
$("#selectedTime").change(changeTime);

//daynavcontainer left & right arrow handler
$(".daynavcontainer").click(changeDay);


$(document).ready(function() {

	setDatetimeDefault();

});
