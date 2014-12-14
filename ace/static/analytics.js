function createDrivesTable(arr) {
        if(arr.length == 0){
            data = "No Records!";
        }
        else{
            var data = '<table class="table-bordered" id="driverhistorytable">';
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
        }
        	
        document.getElementById("analyticsDashboard").innerHTML = data;
    };
$(document).ready(function() {
    setDefaults();
});

function setDefaults(){
	var data = getData();
	console.log(data);
	createDrivesTable(data);
};


function getData() {
	var selTime = $("#selectedTime").val();
    console.log(selTime);
	var selDate = dateTime
    var x = new Date(dateTime);
    var dateString = (x.getDate().toString());
    var monthString = ((x.getMonth()+1).toString());
    var yearString = ((x.getYear()+1900).toString());
    var y = dateString+" "+monthString+" "+yearString+" "+selTime;

    console.log(y);
    console.log(JSON.stringify(y));
    
    return $.getJSON('/_getAnalytics', {
		// driverID: "",
		time: JSON.stringify(y),
		timeperiod: JSON.stringify("DAY")
	}, function(data) {
		createDrivesTable(data)
	});
};
