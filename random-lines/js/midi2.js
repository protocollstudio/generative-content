/*
* @Author: OMAO
* @Date:   2019-08-10 13:23:17
* @Last Modified by:   OMAO
* @Last Modified time: 2019-08-21 17:21:18
*/

const MIDI_NOTE = {
    TRACK_01_KNOB_01: 16,
    TRACK_01_KNOB_02: 17,
    TRACK_01_KNOB_03: 18,
    TRACK_01_SLIDER: 19,
    TRACK_01_BUTTON_MUTE: 1,
    TRACK_01_BUTTON_REC: 3,

    TRACK_02_KNOB_01: 20,
    TRACK_02_KNOB_02: 21,
    TRACK_02_KNOB_03: 22,
    TRACK_02_SLIDER: 23,
    TRACK_02_BUTTON_MUTE: 4,
    TRACK_02_BUTTON_REC: 6,

    TRACK_03_KNOB_01: 24,
    TRACK_03_KNOB_02: 25,
    TRACK_03_KNOB_03: 26,
    TRACK_03_SLIDER: 27,
    TRACK_03_BUTTON_MUTE: 7,
    TRACK_03_BUTTON_REC: 9,

    TRACK_04_KNOB_01: 28,
    TRACK_04_KNOB_02: 29,
    TRACK_04_KNOB_03: 30,
    TRACK_04_SLIDER: 31,
    TRACK_04_BUTTON_MUTE: 10,
    TRACK_04_BUTTON_REC: 12,

    TRACK_05_KNOB_01: 46,
    TRACK_05_KNOB_02: 47,
    TRACK_05_KNOB_03: 48,
    TRACK_05_SLIDER: 49,
    TRACK_05_BUTTON_MUTE: 13,
    TRACK_05_BUTTON_REC: 15,

    TRACK_06_KNOB_01: 50,
    TRACK_06_KNOB_02: 51,
    TRACK_06_KNOB_03: 52,
    TRACK_06_SLIDER: 53,
    TRACK_06_BUTTON_MUTE: 16,
    TRACK_06_BUTTON_REC: 18,

    TRACK_07_KNOB_01: 54,
    TRACK_07_KNOB_02: 55,
    TRACK_07_KNOB_03: 56,
    TRACK_07_SLIDER: 57,
    TRACK_07_BUTTON_MUTE: 19,
    TRACK_07_BUTTON_REC: 21,

    TRACK_08_KNOB_01: 58,
    TRACK_08_KNOB_02: 59,
    TRACK_08_KNOB_03: 60,
    TRACK_08_SLIDER: 61,
    TRACK_08_BUTTON_MUTE: 22,
    TRACK_08_BUTTON_REC: 24
}

WebMidi.enable((err) => {

    if (err) {
        console.log("WebMidi could not be enabled.", err);
        return;
    } else {
        console.log("WebMidi enabled!");
    }

    let input = WebMidi.getInputByName("MIDI Mix");
    console.log(input);

    input.addListener('controlchange', "all",
        function (e) {
            updateMidi(e.controller.number, e.value);
        }
    );

    // Listen to NRPN message on all channels
    input.addListener('noteon', "all",
        function (e) {
            console.log(e.note.number);
        }
    );

});


