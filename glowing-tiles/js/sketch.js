import { audioReactiveManager } from "Modules/AudioReactiveManager.js";
import { EVENT } from "Modules/midi/EVENT.js";
import { midiManager } from "Modules/midi/MidiManager.js";
import { midiMixController } from "Modules/midi/MidiMixController.js";
import { parametersPanelManager } from "Modules/ParametersPanelManager.js";

import { configuration } from "./Configuration.js";
import { rectangleManager } from "./RectangleManager.js";


export function preload() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
  audioReactiveManager.preload();
}

export function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
  background(0);
  frameRate(25);

  configuration.init();
  parametersPanelManager.setup(false);
  rectangleManager.setup();
  audioReactiveManager.setup();
  setupMidi();
  midiManager.setup();
}

export function draw() {
  background(0);
  rectangleManager.draw();
  audioReactiveManager.analyse().processSound();
  parametersPanelManager.print(getParameters());
}

export function keyPressed() {
  if (keyCode == ENTER) {
    parametersPanelManager.changeVisibility();
  }
}

function getParameters() {
  return [
    ["[1.S] scaleChance", rectangleManager.scaleChance],
    ["[1.1] scaleAmountMin", rectangleManager.scaleAmountMin],
    ["[1.2] scaleAmountMax", rectangleManager.scaleAmountMax],
    ["rectScaleInitMin", rectangleManager.rectScaleInitMin],
    ["rectScaleInitMax", rectangleManager.rectScaleInitMax],

    ["[2.S] opacityChance", rectangleManager.opacityChance],

    ["[3.S] angleChance", rectangleManager.angleChance],
    ["[3.1] rotationSpeedMax", rectangleManager.rotationSpeedMax],
    ["initAnglePerturbation", rectangleManager.initAnglePerturbation],

    ["[M.S] tileSize", configuration.tileSize]
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

// window.preload = preload;
// window.setup = setup;
// window.draw = draw;
// window.keyPressed = keyPressed;
