/*
* @Author: OMAO
* @Date:   2019-08-10 13:23:17
* @Last Modified by:   OMAO
* @Last Modified time: 2019-09-11 10:21:36
*/

WebMidi.enable((err) => {

    if (err) {
        console.log("WebMidi could not be enabled.", err);
        return;
    } else {
        console.log("WebMidi enabled!");
    }

    let input = WebMidi.getInputByName("MIDI Mix");
    if (input == undefined || input == false) {
        return;
    }

    input.addListener('controlchange', "all",
        function (e) {
            updateMidiControlChange(e);
        }
    );

    input.addListener('noteon', "all",
        function (e) {
            updateMidiNoteOn(e);
        }
    );
    input.addListener('noteoff', "all",
        function (e) {
            updateMidiNoteOff(e);
        }
    );

});

function updateMidiNoteOn(e) {
    const event = new CustomEvent(EVENT.ALL, {
        detail : {
            parent : e
        }
    });

    midiMixManager.dispatchEvent(event);
}

function updateMidiNoteOff(e) {
    const event = new CustomEvent(EVENT.ALL, {
        detail : {
            parent : e
        }
    });

    midiMixManager.dispatchEvent(event);
}

function updateMidiControlChange(e) {
    let note = e.controller.number;
    let velocity = e.value;

    console.log(e);

    const event = new CustomEvent(selectEventType(note), {
        detail : {
            note : note,
            velocity : velocity,
            parent : e
        }
    });

    midiMixManager.dispatchEvent(event);
}

function selectEventType(note) {
    let eventType = EVENT.ALL;

    if (note == MIDI_NOTE.MASTER_SLIDER) {
        eventType = EVENT.MASTER_SLIDER;
    }
    else if (note == MIDI_NOTE.TRACK_01_KNOB_01) {
        eventType = EVENT.TRACK_01_KNOB_01;
    }
    else if (note == MIDI_NOTE.TRACK_01_KNOB_02) {
        eventType = EVENT.TRACK_01_KNOB_02;
    }
    else if (note == MIDI_NOTE.TRACK_01_KNOB_03) {
        eventType = EVENT.TRACK_01_KNOB_03;
    }
    else if (note == MIDI_NOTE.TRACK_01_SLIDER) {
        eventType = EVENT.TRACK_01_SLIDER;
    }

    else if (note == MIDI_NOTE.TRACK_02_KNOB_01) {
        eventType = EVENT.TRACK_02_KNOB_01;
    }
    else if (note == MIDI_NOTE.TRACK_02_KNOB_02) {
        eventType = EVENT.TRACK_02_KNOB_02;
    }
    else if (note == MIDI_NOTE.TRACK_02_KNOB_03) {
        eventType = EVENT.TRACK_02_KNOB_03;
    }
    else if (note == MIDI_NOTE.TRACK_02_SLIDER) {
        eventType = EVENT.TRACK_02_SLIDER;
    }

    else if (note == MIDI_NOTE.TRACK_03_KNOB_01) {
        eventType = EVENT.TRACK_03_KNOB_01;
    }
    else if (note == MIDI_NOTE.TRACK_03_KNOB_02) {
        eventType = EVENT.TRACK_03_KNOB_02;
    }
    else if (note == MIDI_NOTE.TRACK_03_KNOB_03) {
        eventType = EVENT.TRACK_03_KNOB_03;
    }
    else if (note == MIDI_NOTE.TRACK_03_SLIDER) {
        eventType = EVENT.TRACK_03_SLIDER;
    }

    else if (note == MIDI_NOTE.TRACK_04_KNOB_01) {
        eventType = EVENT.TRACK_04_KNOB_01;
    }
    else if (note == MIDI_NOTE.TRACK_04_KNOB_02) {
        eventType = EVENT.TRACK_04_KNOB_02;
    }
    else if (note == MIDI_NOTE.TRACK_04_KNOB_03) {
        eventType = EVENT.TRACK_04_KNOB_03;
    }
    else if (note == MIDI_NOTE.TRACK_04_SLIDER) {
        eventType = EVENT.TRACK_04_SLIDER;
    }

    return eventType;
}

function mapVelocityToParameter(velocity, parameterValueMin = 0, parameterValueMax = 100, rounded = true) {
    let mapped =  map(velocity, 0, 127, parameterValueMin, parameterValueMax);
    return rounded ? int(mapped) : mapped;
}
