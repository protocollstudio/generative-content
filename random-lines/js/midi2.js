/*
* @Author: OMAO
* @Date:   2019-08-10 13:23:17
* @Last Modified by:   OMAO
* @Last Modified time: 2019-08-22 12:43:56
*/

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

function updateMidi(note, velocity) {
  console.log("note: " + note + ", velocity: " + velocity);
  let eventType;

  if (note == MIDI_NOTE.TRACK_01_KNOB_01) {
    eventType = EVENT.TRACK_01_KNOB_01;
  }
  const event = new CustomEvent(eventType, {
    detail : {
      note : note,
      velocity : velocity
    }
  })

  midiMixManager.dispatchEvent(event);
}

