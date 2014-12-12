function createDrivesTable(arr) {
        var data = '<table>';
        var head = ('<tr>' +
                    '<th class="place">Start</th>' +
                    '<th class="mag">End</th>' +
                    '<th class="time">Duration</th>' +
                    '<th class="lat">Fare</th>' +               
                    '</tr>');
        data += head

        for(var i=0; i<arr.length; i++) {
            data += ('<tr>' +
            '<td class="place">'+ arr[i][0]+'</td>' +
            '<td class="mag">' + arr[i][1] + '</td>' +
            '<td class="lat">' + arr[i][2] + '</td>' + 
            '<td class="long">' + arr[i][3] + '</td></tr>'); 
        }
        data += '</table>'	
        document.getElementById("analyticsDashboard").innerHTML = data;
    };

setDefaults();

function setDefaults(){
	data = getData()
	console.log(data)
	createDrivesTable(data)
};


function getData() {

	selectedTime = $("#selectedTime").val();
	
	return $.getJSON('/_getAnalytics', {
		driverID: "",
		time: selectedTime,
		timeperiod: "DAY"
	}, function(data) {
		createDrivesTable(data)
	});
};
