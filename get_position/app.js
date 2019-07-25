const bleno = require("bleno");

const UUID = "0C50D390-DC8E-436B-8AD0-A36D1B304B18"; // set your own value
const MINOR = 2; // set your own value
const MAJOR = 1; // set your own value
const TX_POWER = -60; // just declare transmit power in dBm

var serviceUuids = ['0C50D390-DC8E-436B-8AD0-A36D1B304B18'];
var name = 'name';

console.log("Starting bleno...");

bleno.on("stateChange", state => {

	    if (state === 'poweredOn') {
		  console.log("Starting broadcast...");
		  bleno.startAdvertising(name, serviceUuids);
       } else {
             console.log("Stopping broadcast...");
             bleno.stopAdvertising()
       }        
});
