import { EVENT } from "Modules/midi/EVENT.js"
import { midiMixController } from "Modules/midi/MidiMixController.js"
import { parametersPanelManager } from "Modules/ParametersPanelManager.js"
import { midiManager } from "Modules/midi/MidiManager.js"

import { lineManager } from "./LineManager.js";

export function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  lineManager.generateLineList();
  parametersPanelManager.setup(true);
  setupMidi();
  midiManager.setup();
}

export function draw() {
  background(0);
  lineManager.draw();
  parametersPanelManager.print(getParameters());
}

export function keyPressed() {
  console.log("keypressed");
  if (keyCode == ENTER) {
    parametersPanelManager.changeVisibility();
  }
}

export function getParameters() {
  return [
    ["jumpProbability", lineManager.jumpProbability],
    ["jumpDistance", lineManager.jumpDistance],
    ["jumpDistanceRoom", lineManager.jumpDistanceRoom],

    ["bendProbability", lineManager.bendProbability],
    ["bendDuration", lineManager.bendDuration],
    ["bendAmplitude", lineManager.bendAmplitude],
    ["bendAmplitudeRoom", lineManager.bendAmplitudeRoom],

    ["lineNumberMax", lineManager.lineNumberMax],
    ["line number", lineManager.lineList.length],
    ["aberationProbability", lineManager.aberationProbability]
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
