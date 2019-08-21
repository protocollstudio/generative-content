/*
* @Author: OMAO
* @Date:   2019-08-10 13:23:17
* @Last Modified by:   OMAO
* @Last Modified time: 2019-08-21 12:53:03
*/

console.log("------ MIDI");


if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI!');
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
} else {
    console.log('WebMIDI is not supported in this browser.');
}



function onMIDISuccess(midiAccess) {
    console.log(midiAccess);

    for (var input of midiAccess.inputs.values()) {
        input.onmidimessage = getMIDIMessage;
    }
}

function getMIDIMessage(message) {
    var command = message.data[0];
    var note = message.data[1];
    var velocity = (message.data.length > 2) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command

    console.log("command = " + command);
    console.log("note = " + note);
    console.log("velocity = " + velocity);
    switch (command) {
        case 144: // noteOn
            if (velocity > 0) {
                noteOn(note, velocity);
            } else {
                noteOff(note);
            }
            break;
        case 128: // noteOff
            noteOff(note);
            break;
        // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
    }
}

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}




