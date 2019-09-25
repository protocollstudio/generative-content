/*
* @Author: OMAO
* @Date:   2019-09-16 16:39:49
* @Last Modified by:   OMAO
* @Last Modified time: 2019-09-20 16:07:46
*/

import p5 from 'p5';
import "p5/lib/addons/p5.sound";
import { configuration } from "./Configuration.js";
import { audioReactiveManager } from "./AudioReactiveManager.js"
import { EVENT } from "./EVENT.js"
import { midiMixController } from "./MidiMixController.js"
import { parametersPanelManager } from "./ParametersPanelManager.js"
import { midiManager } from "./MidiManager.js"
import { rectangleManager } from "./RectangleManager.js"

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

  configuration.init();
  parametersPanelManager.setup(false);
  rectangleManager.setup();
  audioReactiveManager.setup();
  setupMidi();
  midiManager.setup();
}

function draw() {
  background(0);
  rectangleManager.draw();
  audioReactiveManager.analyse().processSound();
  parametersPanelManager.print(getParameters());
}

// PANEL

function keyPressed() {
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

window.preload = preload;
window.setup = setup;
window.draw = draw;
