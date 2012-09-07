/**
* Created at www.klairvoyant.in
* User: john
* Date: 8/28/12
* Time: 11:13 AM
*
*/


function load()
{
    var display = new Garmin.DeviceDisplay("garminDisplay",
        {
//                        pathKeyPairsArray: ["http://developer.garmin.com/","ee3934433a35ee348583236c2eeadbc1"],
            unlockOnPageLoad: true,
            showStatusElement: true,
            autoFindDevices: true,
            findDevicesButtonText: "List Readable Files",
            showCancelFindDevicesButton: false,
            autoWriteData: false,
            autoReadData: true,
            showReadDataElement: false,
            uploadSelectedActivities: true,
            showReadTracksSelect: true,
            useDeviceBrowser: false,
            postActivityHandler: function(aFile, aDisplay){ postFile(aFile, aDisplay);},
            statusCellProcessingImg: '<img src="img/ajax-loader.gif" width="15" height="15" />', //change default path for loading img

            readDataType: Garmin.DeviceControl.FILE_TYPES.readableDir,

            fileListingOptions:	[ {dataTypeName: 'GPSData',
                dataTypeID: 'http://www.topografix.com/GPX/1/1',
                computeMD5: false} ]
        });
}

function postFile(aFile, aDisplay)
{

    var theContent = $('outputDiv').innerHTML;

    if( theContent.length == 0 )
    {
        theContent = '<strong>Succesfully Read  File(s):</strong>';
    }
    //aFile is a UUEncoded file, not just the string!
    //This is where you'd do a custom post to your server or some other useful thing.
    //We'll just print out the file header (begin <mode> <filename>)
//            var theLines = aFile.split('\n');
    var theLines = aFile;
    if( theLines.length > 0 )
    {
        //theContent += '<br/>' + theLines[0];
        theContent += '<br/>' + '<pre>' +theLines.escapeHTML()+'</pre>';
    }
    $('outputDiv').innerHTML = theContent;


    //set upload status.
    var theStatusCell = aDisplay.currentActivityStatusElement();
    if( theStatusCell ) {
        theStatusCell.innerHTML = 'Done';

    }

    if( aDisplay.activityQueue.size() == 1)
    {
        //this is the last file (it will be popped off the queue after we're called).
        //In a production environment, if you define your own postActivityHandler, you'd have your own XHR callbacks
        //to determine when to finalize the DeviceDisplay status. Here, we'll pretend the uploads were instantaneous.
        aDisplay.setStatus('The Selected Binary file reads are complete!');
    }
}