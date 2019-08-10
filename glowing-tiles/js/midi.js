/*
* @Author: OMAO
* @Date:   2019-08-10 13:23:17
* @Last Modified by:   OMAO
* @Last Modified time: 2019-08-10 13:26:57
*/

console.log("yesyes yoyo");


if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI!');
} else {
    console.log('WebMIDI is not supported in this browser.');
}

navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
    console.log(midiAccess);

    for (var input of midiAccess.inputs.values()) {
        input.onmidimessage = getMIDIMessage;
    }
}

function getMIDIMessage(midiMessage) {
    console.log(midiMessage);
}

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}




