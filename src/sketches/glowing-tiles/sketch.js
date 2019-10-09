import { audioReactiveManager } from "Modules/AudioReactiveManager.js";
import { EVENT } from "Modules/midi/EVENT.js";
import { midiManager } from "Modules/midi/MidiManager.js";
import { midiMixController } from "Modules/midi/MidiMixController.js";
import { parametersPanelManager } from "Modules/ParametersPanelManager.js";

import { configuration } from "./Configuration.js";
import { rectangleManager } from "./RectangleManager.js";

export {
  preload,
  setup,
  draw,
  keyPressed
};

function preload() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
  audioReactiveManager.preload();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
  background(0);
  frameRate(25);

  configuration.setup();
  parametersPanelManager.setup(false);
  rectangleManager.setup();
  audioReactiveManager.setup();
  setupMidi();
  midiManager.setup();
}

function draw() {
  background(0);
  rectangleManager.draw();
  audioReactiveManager.analyse()
    .processSound();
  parametersPanelManager.draw(getParameters());
}

function keyPressed() {
  parametersPanelManager.keyPressed();
}

function getParameters() {
  return [
    parametersPanelManager.createParameter("[1.S] scaleChance", rectangleManager, "scaleChance"),
    parametersPanelManager.createParameter("[1.1] scaleAmountMin", rectangleManager, "scaleAmountMin"),
    parametersPanelManager.createParameter("[1.2] scaleAmountMax", rectangleManager, "scaleAmountMax"),
    parametersPanelManager.createParameter("rectScaleInitMin", rectangleManager, "rectScaleInitMin"),
    parametersPanelManager.createParameter("rectScaleInitMax", rectangleManager, "rectScaleInitMax"),
    parametersPanelManager.createParameter("[2.S] opacityChance", rectangleManager, "opacityChance"),
    parametersPanelManager.createParameter("[3.S] angleChance", rectangleManager, "angleChance"),
    parametersPanelManager.createParameter("[3.1] rotationSpeedMax", rectangleManager, "rotationSpeedMax"),
    parametersPanelManager.createParameter("initAnglePerturbation", rectangleManager, "initAnglePerturbation"),
    parametersPanelManager.createParameter("[M.S] tileSize", configuration, "tileSize")
  ];
}

function setupMidi() {
  midiMixController.addControlWithValues(EVENT.MASTER_SLIDER, rectangleManager, "tileSize", 50, 20);
  midiMixController.addControl(EVENT.TRACK_01_SLIDER, rectangleManager, "scaleChance", true);
  midiMixController.addControlWithValues(EVENT.TRACK_01_KNOB_01, rectangleManager, "scaleAmountMin", 0.1, 7);
  midiMixController.addControlWithValues(EVENT.TRACK_01_KNOB_02, rectangleManager, "scaleAmountMax", 0.1, 7);
  midiMixController.addControl(EVENT.TRACK_02_SLIDER, rectangleManager, "opacityChance", true);
  midiMixController.addControl(EVENT.TRACK_03_SLIDER, rectangleManager, "angleChance");
  midiMixController.addControlWithValues(EVENT.TRACK_03_KNOB_01, rectangleManager, "rotationSpeedMax", 1, 50);
}
