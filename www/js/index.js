/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
let count_calls = 0;
document.addEventListener('deviceready', onDeviceReady, false);

function beaconMonitor(data) {
    // do something
    count_calls++;
    var json = JSON.parse(data);
    console.log(json);
    console.log(cordova.plugins.simplexpbeacon);
    if(json.status === 'OK'){
        document.getElementById('beacon_info').innerText = data+'--Count: '+count_calls;
        if(json.hasOwnProperty('data')){
            document.getElementById('beacon_info').innerText = 'SE ENCONTRARON BEACONS'
        }
    }
    
}

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    cordova.plugins.simplexpbeacon.initialiseBluetooth(
        function (data) {
            var json = JSON.parse(data);
            
            if (json.status === 'OK') {
                document.getElementById('status_msg').innerHTML =  'Bluetooth Iniciado Correctamente';
                cordova.plugins.simplexpbeacon.startMonitoring(beaconMonitor);
            }else{
                document.getElementById('status_msg').innerHTML =  'No  se pudo iniciar el dispositivo Bluetooth';
            }
        }
    );
}
