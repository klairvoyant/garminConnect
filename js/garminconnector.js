/**
* Created at www.klairvoyant.in
* User: john
* Date: 8/28/12
* Time: 11:13 AM
*
*/
var content=new String("");
//'walk_courses.tcx'
var dataFile=['activity-goals-fr405.TCX'];
function load()
{
   var  display = new Garmin.DeviceDisplay("garminDisplay",
        {
//                        pathKeyPairsArray: ["http://developer.garmin.com/","ee3934433a35ee348583236c2eeadbc1"],
            unlockOnPageLoad: true,
            showStatusElement: true,
            autoFindDevices: true,
            findDevicesButtonText: "Search for Devices",
            showCancelFindDevicesButton: false,
            autoWriteData: false,
            activityDirectoryCheckAllTooltip: "select all",//jj
            activityDirectoryHeaderStatus: false,//jj
            autoReadData: true,
            showReadDataElement: true,
            uploadSelectedActivities: true,
            showReadTracksSelect: true,
            useDeviceBrowser: false,
            postActivityHandler: function(aFile, aDisplay){ postFile(aFile, aDisplay);},
            statusCellProcessingImg: '<img src="../img/spinner.gif" width="15" height="15" />', //change default path for loading img
            readDataType: Garmin.DeviceControl.FILE_TYPES.readableDir,
            fileListingOptions:	[
                {dataTypeName: 'GPSData',dataTypeID: 'http://www.topografix.com/GPX/1/1', computeMD5: false},
                {dataTypeName: 'FitnessHistory', dataTypeID: 'http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2',computeMD5: false}
                               ]
        });

}

function postFile(aFile, aDisplay)
{

    var pass=false;
    var theStatusCell = aDisplay.currentActivityStatusElement();
    content="";
    var theContent = $('outputDiv').innerHTML;

    if( theContent.length == 0 )
    {
        theContent = '<strong>Succesfully Read  File(s):</strong>';
    }
    //aFile is a UUEncoded file, not just the string!
    //This is where you'd do a custom post to your server or some other useful thing.
    //We'll just print out the file header (begin <mode> <filename>)
    var wholetext = aFile.split('\n');
    var n=wholetext[0].lastIndexOf(" ");
    var nam=wholetext[0].slice(n);
    nam=nam.replace(/^\s+|\s+$/g, '') ;// for replace spaces
    for(var j=0;j<dataFile.length;j++)
    {
        if(nam==dataFile[j])
        {
            pass=true;
        }

    }

      if(pass==true)
        {
//            var theStatusCell = aDisplay.currentActivityStatusElement();
            theStatusCell.innerHTML = 'Exists';
        }
        else if(pass==false)
        {

            for(var i = 1; i < wholetext.length-1; i++){

                content = content.concat( wholetext[i] );
            }
            var theLines = decode64(content);

            readXML(theLines);
//
//            if( theLines.length > 0 )
//            {
//
//                theContent+="Name is "+ nam;
//                theContent += '<br/>' + '<pre>' +theLines.escapeHTML()+'</pre>';
//            }
//            $('outputDiv').innerHTML = theContent;

            //set upload status.
//            var theStatusCell = aDisplay.currentActivityStatusElement();
            if( theStatusCell ) {
                theStatusCell.innerHTML = 'Done';

            }


        }

    if( aDisplay.activityQueue.size() == 1)
    {
        //this is the last file (it will be popped off the queue after we're called).
        //In a production environment, if you define your own postActivityHandler, you'd have your own XHR callbacks
        //to determine when to finalize the DeviceDisplay status. Here, we'll pretend the uploads were instantaneous.
        aDisplay.setStatus('The Selected Binary file reads are complete!');
    }

}


function decode64(input) {

    var keyStr = "ABCDEFGHIJKLMNOP" +
    "QRSTUVWXYZabcdef" +
    "ghijklmnopqrstuv" +
    "wxyz0123456789+/" +
    "=";

    var output = "";

    var chr1, chr2, chr3 = "";

    var enc1, enc2, enc3, enc4 = "";

    var i = 0;

    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =

    var base64test = /[^A-Za-z0-9\+\/\=]/g;

    if (base64test.exec(input)) {

        alert("There were invalid base64 characters in the input text.\n" +

        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +

        "Expect errors in decoding.");

    }

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    do {

        enc1 = keyStr.indexOf(input.charAt(i++));

        enc2 = keyStr.indexOf(input.charAt(i++));

        enc3 = keyStr.indexOf(input.charAt(i++));

        enc4 = keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);

        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);

        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {

            output = output + String.fromCharCode(chr2);

        }

        if (enc4 != 64) {

            output = output + String.fromCharCode(chr3);

        }

        chr1 = chr2 = chr3 = "";

        enc1 = enc2 = enc3 = enc4 = "";



    } while (i < input.length);


    return decodeURI(output);

}

function readXML(aFile) {

    var da;

    if (window.DOMParser)
  {
      parser=new DOMParser();
      xmlDoc=parser.parseFromString(aFile,"text/xml");
      }
    else // Internet Explorer
  {
      xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async=false;
      xmlDoc.loadXML(aFile);
      }
     da+=xmlDoc.getElementsByTagName("TotalTimeSeconds")[0].childNodes[0].nodeValue;

    jk= xmlDoc.getElementsByTagName("BeginPosition");
    da+=" Begin Point"
    da+=jk[0].getElementsByTagName("LatitudeDegrees")[0].childNodes[0].nodeValue
    da+=" - ";
    da+=jk[0].getElementsByTagName("LongitudeDegrees")[0].childNodes[0].nodeValue
    document.getElementById('outputDiv').innerHTML =da


//    document.getElementById("to").innerHTML=xmlDoc.getElementsByTagName("to")[0].childNodes[0].nodeValue;
//    document.getElementById("from").innerHTML=xmlDoc.getElementsByTagName("from")[0].childNodes[0].nodeValue;
//    document.getElementById("message").innerHTML=xmlDoc.getElementsByTagName("body")[0].childNodes[0].nodeValue;


}


