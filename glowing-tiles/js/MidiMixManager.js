/*
* @Author: OMAO
* @Date:   2019-08-22 12:43:03
* @Last Modified by:   OMAO
* @Last Modified time: 2019-09-11 15:13:55
*/

// need Webmidi
// need MidiMixManager
// need MIDI_NOTE
// need EVENT

class MidiMixManager extends EventTarget {
  constructor(content) {
    super();
    this._content = content;
    this._color = "#444";
  }

  get content() { return this._content; }
  get color() { return this._color; }


  setup() {
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
              this.updateMidiControlChange(e);
          }
      );
      input.addListener('noteon', "all",
          function (e) {
              this.updateMidiNoteOn(e);
          }
      );
      input.addListener('noteoff', "all",
          function (e) {
              this.updateMidiNoteOff(e);
          }
      );

  });
  }

  updateMidiNoteOn(e) {
      const event = new CustomEvent(EVENT.ALL, {
          detail : {
              parent : e
          }
      });

      this.dispatchEvent(event);
  }

  updateMidiNoteOff(e) {
      const event = new CustomEvent(EVENT.ALL, {
          detail : {
              parent : e
          }
      });

      this.dispatchEvent(event);
  }

  updateMidiControlChange(e) {
      let note = e.controller.number;
      let velocity = e.value;

      console.log(e);

      const event = new CustomEvent(this.selectEventType(note), {
          detail : {
              note : note,
              velocity : velocity,
              parent : e
          }
      });

      this.dispatchEvent(event);
  }

  selectEventType(note) {
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

};

