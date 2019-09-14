/*
* @Author: OMAO
* @Date:   2019-08-07 11:39:48
* @Last Modified by:   OMAO
* @Last Modified time: 2019-09-13 21:20:57
*/

import ParametersPanelManager from "/js/ParametersPanelManager.js"

let soundAvg;

// global print
let panelSide;
let tileSize = 25;

// managers
let parametersPanelManager;
let rectangleManager;
let audioReactiveManager;
let midiMixController;
let midiManager;

function preload(){
  audioReactiveManager = new AudioReactiveManager().preload();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);
  rectMode(CENTER);
  background(0);
  frameRate(25);

  panelSide = width / tileSize;
  parametersPanelManager = new ParametersPanelManager(false);
  rectangleManager = new RectangleManager().setup();
  audioReactiveManager.setup();

  midiMixController = new MidiMixController();
  setupMidi();
  midiManager = new MidiManager(midiMixController);
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

    ["[M.S] tileSize", tileSize]
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
