import { EVENT } from "Modules/midi/EVENT.js"
import { midiMixController } from "Modules/midi/MidiMixController.js"
import { parametersPanelManager } from "Modules/ParametersPanelManager.js"
import { midiManager } from "Modules/midi/MidiManager.js"

import { lineManager } from "./LineManager.js";

export {
  setup,
  draw,
  keyPressed
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  lineManager.generateLineList();
  parametersPanelManager.setup(true);
  setupMidi();
  midiManager.setup();
}

function draw() {
  background(0);
  lineManager.draw();
  parametersPanelManager.draw(getParameters());
}

function keyPressed() {
  parametersPanelManager.keyPressed();
}

function getParameters() {
  return [
    parametersPanelManager.createParameter("jumpProbability", lineManager, "jumpProbability"),
    parametersPanelManager.createParameter("jumpDistance", lineManager, "jumpDistance"),
    parametersPanelManager.createParameter("jumpDistanceRoom", lineManager, "jumpDistanceRoom"),
    parametersPanelManager.createParameter("bendProbability", lineManager, "bendProbability"),
    parametersPanelManager.createParameter("bendDuration", lineManager, "bendDuration"),
    parametersPanelManager.createParameter("bendAmplitude", lineManager, "bendAmplitude"),
    parametersPanelManager.createParameter("bendAmplitudeRoom", lineManager, "bendAmplitudeRoom"),
    parametersPanelManager.createParameter("lineNumberMax", lineManager, "lineNumberMax"),
    parametersPanelManager.createParameter("line number", lineManager, "lineList.length"),
    parametersPanelManager.createParameter("aberationProbability", lineManager, "aberationProbability")
  ];
}

function setupMidi() {
  midiMixController.linkControlToEvent(EVENT.MASTER_SLIDER, (e) => { lineManager.updateLineNumber(e.detail.velocity, 127); });
  midiMixController.addControlWithValues(EVENT.TRACK_01_SLIDER, lineManager, "bendProbability", 0, 100);
  midiMixController.addControlWithValues(EVENT.TRACK_01_KNOB_01, lineManager, "bendDuration", 0, 100);
  midiMixController.addControlWithValues(EVENT.TRACK_01_KNOB_02, lineManager, "bendAmplitude", 0, 150);
  midiMixController.addControlWithValues(EVENT.TRACK_01_KNOB_03, lineManager, "bendAmplitudeRoom", 0, 50); //lineManager.bendAmplitude
  midiMixController.addControlWithValues(EVENT.TRACK_02_SLIDER, lineManager, "jumpProbability", 0, 100);
  midiMixController.addControlWithValues(EVENT.TRACK_02_KNOB_01, lineManager, "jumpDistance", 0, 100);
  midiMixController.addControlWithValues(EVENT.TRACK_02_KNOB_02, lineManager, "jumpDistanceRoom", 0, 100); //lineManager.jumpDistance
}
