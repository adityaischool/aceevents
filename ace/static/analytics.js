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
            '<td class="place">'+ arr.features[i][0]+'</td>' +
            '<td class="mag">' + arr.features[i][1] + '</td>' +
            '<td class="lat">' + arr.features[i][2] + '</td>' + 
            '<td class="long">' + arr.features[i][3] + '</td></tr>'); 
        }
        data += '</table>'	
        document.getElementById("analyticsDashboard").innerHTML = data;
    }
