/**
* Created at www.klairvoyant.in
* User: john
* Date: 8/28/12
* Time: 11:13 AM
* To change this template use File | Settings | File Templates.
*/


var display;
$(document).ready(function(){


});


function load() {
   display = new Garmin.DeviceDisplay("garminDisplay", {
//                pathKeyPairsArray:      ["http://developer.garmin.com","49048b3369edffd4a511d920202a6214"],
        autoFindDevices: true, //start searching for devices
        showStatusElement: true, //basic feedback provided
        showReadDataElement: false //don't offer to read data
        //add other options per the documentation
    });
}

