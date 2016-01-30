var noble = require('noble');

var _characteristic = null;

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning(['ffe0'], false);
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
  console.log('peripheral discovered (' + peripheral.id +
              ' with address <' + peripheral.address +  ', ' + peripheral.addressType + '>,' +
              ' connectable ' + peripheral.connectable + ',' +
              ' RSSI ' + peripheral.rssi + ':');
  console.log('\thello my local name is:');
  console.log('\t\t' + peripheral.advertisement.localName);
  console.log('\tcan I interest you in any of the following advertised services:');
  console.log('\t\t' + JSON.stringify(peripheral.advertisement.serviceUuids));


  peripheral.connect(
    function (error) {
      console.log(error);
    }
  );


  peripheral.discoverSomeServicesAndCharacteristics(['ffe0'], [],
                function (err, services, characteristics) {

      _characteristic = characteristics[0];
      characteristics[0].on('read', function (data, isNotification) {
        // Push the data into the stream buffer
        console.log(data);
      });
  });

  var serviceData = peripheral.advertisement.serviceData;
  if (serviceData && serviceData.length) {
    console.log('\there is my service data:');
    for (var i in serviceData) {
      console.log('\t\t' + JSON.stringify(serviceData[i].uuid) + ': ' + JSON.stringify(serviceData[i].data.toString('hex')));
    }
  }
 
  var buf = new Buffer("AoYVzaOYjTy+lexHrJgFyXrglvFY1QBhm6mWRW7eZu37Aw==", 'base64'); // Ta-da  
  setTimeout(function(){ writeBLEdata(buf); }, 3000);
});

function writeBLEdata(chunk) {
  // Do we have a characteristic?
  if (_characteristic) {
    // Then write our data to it, in 20 byte chunks
    for (var i = 0; i < chunk.length; i += 20) {
      _characteristic.write(chunk.slice(i, i + 20), true);
    }
    // Everything is fine
    console.log("wrote some data");
  } else {
    // There's a problem
    console.log("No connection");
  }
}

//http://bluebuy.herokuapp.com/api/get_vending_machine?ble_ssid=bluebuy-12
//AoYVzaOYjTy+lexHrJgFyXrglvFY1QBhm6mWRW7eZu37Aw==