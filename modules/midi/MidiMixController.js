import { MIDI_NOTE } from "Modules/midi/MIDI_NOTE.js"
import { EVENT } from "Modules/midi/EVENT.js"

class MidiMixController extends EventTarget {

  constructor() {
    super();
    this._name = "MIDI Mix";

    this.velocityMaxValue = 127;
    this.velocityMinValue = 0;
    this.defaultMapMinValue = 0;
    this.defaultMapMaxValue = 100;

  }

  get name() { return this._name; }

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

    eventNoteMapping.forEach(function (mapping, index) {
      if (note == mapping[0]) {
        eventType = mapping[1];
      }
    });

    return eventType;
  }

  linkControlToEvent(event, callback) {
    // if (event is in not EVENT) {
    //    return "exception de que l'event y connais po"
    // "}
    midiMixController.addEventListener(event, callback);
  }

  addControl(event, object, property, rounded = false) {
    this.linkControlToEvent(event, (e) => {
      object[property] = midiMixController.mapVelocityToParameter(e.detail.velocity, this.defaultMapMinValue, this.defaultMapMaxValue, rounded);;
    })
  }

  addControlWithValues(event, object, property, minValue, maxValue, rounded = false) {
    this.linkControlToEvent(event, (e) => {
      object[property] = midiMixController.mapVelocityToParameter(e.detail.velocity, minValue, maxValue, rounded);;
    })
  }

  mapVelocityToParameter(velocity, parameterValueMin = 0, parameterValueMax = 100, rounded = true) {
    let mapped = map(velocity, this.velocityMinValue, this.velocityMaxValue, parameterValueMin, parameterValueMax);
    return rounded ? int(mapped) : mapped;
  }

};
export let midiMixController = new MidiMixController();
