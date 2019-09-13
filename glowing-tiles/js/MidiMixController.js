/*
* @Author: OMAO
* @Date:   2019-08-22 12:43:03
* @Last Modified by:   OMAO
* @Last Modified time: 2019-09-13 15:25:46
*/

// need MIDI_NOTE
// need EVENT

class MidiMixController extends EventTarget {
  constructor(color) {
    super();
    this._name = "MIDI Mix";
    this._color = color;
  }

  get name() { return this._name; }
  get color() { return this._color; }

  selectEventType(note) {
      let eventType = EVENT.ALL;

      let eventNoteMapping = [
        [MIDI_NOTE.MASTER_SLIDER, EVENT.MASTER_SLIDER],
        [MIDI_NOTE.TRACK_01_KNOB_01, EVENT.TRACK_01_KNOB_01],
        [MIDI_NOTE.TRACK_01_KNOB_02, EVENT.TRACK_01_KNOB_02],
        [MIDI_NOTE.TRACK_01_KNOB_03, EVENT.TRACK_01_KNOB_03],
        [MIDI_NOTE.TRACK_01_SLIDER, EVENT.TRACK_01_SLIDER],
        [MIDI_NOTE.TRACK_02_KNOB_01, EVENT.TRACK_02_KNOB_01],
        [MIDI_NOTE.TRACK_02_KNOB_02, EVENT.TRACK_02_KNOB_02],
        [MIDI_NOTE.TRACK_02_KNOB_03, EVENT.TRACK_02_KNOB_03],
        [MIDI_NOTE.TRACK_02_SLIDER, EVENT.TRACK_02_SLIDER],
        [MIDI_NOTE.TRACK_03_KNOB_01, EVENT.TRACK_03_KNOB_01],
        [MIDI_NOTE.TRACK_03_KNOB_02, EVENT.TRACK_03_KNOB_02],
        [MIDI_NOTE.TRACK_03_KNOB_03, EVENT.TRACK_03_KNOB_03],
        [MIDI_NOTE.TRACK_03_SLIDER, EVENT.TRACK_03_SLIDER],
        [MIDI_NOTE.TRACK_04_KNOB_01, EVENT.TRACK_04_KNOB_01],
        [MIDI_NOTE.TRACK_04_KNOB_02, EVENT.TRACK_04_KNOB_02],
        [MIDI_NOTE.TRACK_04_KNOB_03, EVENT.TRACK_04_KNOB_03],
        [MIDI_NOTE.TRACK_04_SLIDER, EVENT.TRACK_04_SLIDER]
      ];

      eventNoteMapping.forEach( function(mapping, index) {
        if (note == mapping[0]) {
          eventType = mapping[1];
        }
      });

      return eventType;
  }

  mapVelocityToParameter(velocity, parameterValueMin = 0, parameterValueMax = 100, rounded = true) {
      let mapped =  map(velocity, 0, 127, parameterValueMin, parameterValueMax);
      return rounded ? int(mapped) : mapped;
  }

};

