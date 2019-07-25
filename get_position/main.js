const bleno = require('bleno');

var BlenoPrimaryService = bleno.PrimaryService;
const SERVECE_UUID = `0C50D390-DC8E-436B-8AD0-A36D1B304B18`; //適宜書き換え
const DEVICE_NAME = `raspberry_pi_as_peripheral`; //デバイス名
var EchoCharacteristic = require('./characteristic');

console.log(`bleno - ${DEVICE_NAME}`);

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);
    if (state === 'poweredOn') {
        bleno.startAdvertising(DEVICE_NAME, [SERVECE_UUID]);
    } else {
        bleno.stopAdvertising();
    }
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

  if (!error) {
    bleno.setServices([
      new BlenoPrimaryService({
        uuid: 'SERVECE_UUID',
        characteristics: [
          new EchoCharacteristic()
        ]
      })
    ]);
  }
});