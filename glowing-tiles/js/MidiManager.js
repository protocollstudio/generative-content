/*
* @Author: OMAO
* @Date:   2019-08-10 13:23:17
* @Last Modified by:   OMAO
* @Last Modified time: 2019-09-20 14:43:20
*/

import {midiMixController} from "./MidiMixController.js";

class MidiManager {

  constructor(midiController) {
    this.midiController = midiController;
  }

  setup() {
    WebMidi.enable((err) => {

      if (err) {
          console.log("WebMidi could not be enabled.", err);
          return;
      } else {
          console.log("WebMidi enabled!");
      }

      let input = WebMidi.getInputByName(this.midiController.name);
      if (input == undefined || input == false) {
          return;
      }

      input.addListener('controlchange', "all", (e) => { this.updateMidiControlChange(e); });
      input.addListener('noteon', "all", (e) => { this.updateMidiNoteOn(e); });
      input.addListener('noteoff', "all", (e) => { this.updateMidiNoteOff(e); });

  });
  }

  updateMidiNoteOn(e) {
      const event = new CustomEvent(EVENT.ALL, {
          detail : {
              parent : e
          }
      });

      this.midiController.dispatchEvent(event);
  }

  updateMidiNoteOff(e) {
      const event = new CustomEvent(EVENT.ALL, {
          detail : {
              parent : e
          }
      });

      this.midiController.dispatchEvent(event);
  }

  updateMidiControlChange(e) {
      let note = e.controller.number;
      let velocity = e.value;

      const event = new CustomEvent(this.midiController.selectEventType(note), {
          detail : {
              note : note,
              velocity : velocity,
              parent : e
          }
      });

      this.midiController.dispatchEvent(event);
  }

}
export let midiManager = new MidiManager(midiMixController);
