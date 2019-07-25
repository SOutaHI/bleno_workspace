'use strict'

const bleno = require('bleno');
const BlenoPrimaryService = bleno.PrimaryService;

const SERVECE_UUID = `0C50D390-DC8E-436B-8AD0-A36D1B304B18`; //適宜書き換え
const CHARACTERISTIC_UUID = `03fa75f0-0388-43c0-bbda-c8b40b1c888e`; //適宜書き換え
const DEVICE_NAME = `raspberry_pi_as_peripheral`; //デバイス名
console.log(`bleno - ${DEVICE_NAME}`);

let counter = 0;
setInterval(()=>{counter++}, 1000); //値の変化を見るために毎秒インクリメント

// Ball Posiiton(x, y)
var x_position_ball = 0.0;
var y_position_ball = 0.0;

const Characteristic = bleno.Characteristic;

const characteristic = new Characteristic({
    uuid: CHARACTERISTIC_UUID,
    properties: ['write',`notify`],
    onWriteRequest: (data, offset, callback) => { //Central側からWriteリクエストが来ると発火
        console.log(counter); //WRITEリクエストでカウントを表示
        const result = Characteristic.RESULT_SUCCESS;
        //const data = new Buffer.from(`${counter}`);

        //x_position_ball = data.readFloatBE(0);
        //y_position_ball = data.readFloatBE(1);

        console.log(data.toString());
        //console.log(data.readFloatBE(1));

        //callback(this.RESULT_SUCCESS);
    }
});

bleno.on('stateChange', (state) => {
    console.log(`on -> stateChange: ${state}`);
    if (state === 'poweredOn') {
        bleno.startAdvertising(DEVICE_NAME, [SERVECE_UUID]);
    } else {
        bleno.stopAdvertising();
    }
});

bleno.on('advertisingStart', (error) => {
    console.log(`on -> advertisingStart: ${(error ? 'error ' + error : 'success')}`);
    if(error) return;

    const blenoService = new BlenoPrimaryService({
        uuid: SERVECE_UUID,
        characteristics: [characteristic]
    });

    bleno.setServices([blenoService]);
    console.log(`set -> service: ${(error ? 'error ' + error : 'success')}`);

});