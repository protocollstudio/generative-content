/*
* @Author: OMAO
* @Date:   2019-08-07 11:39:48
* @Last Modified by:   OMAO
* @Last Modified time: 2019-09-11 14:57:35
*/

let soundAvg;

// global print
let panelSide;
let tileSize = 25;

// managers
let parametersPanelManager;
let rectangleManager;
let audioReactiveManager;

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


// MIDI

/*
  scaleChance:   0 -> 100
  scaleAmountMax:        0 -> 7
  scaleAmountMin:        0 -> 7
  rectScaleInitMin:      0 -> 7
  rectScaleInitMax:      0 -> 7
*/

midiMixManager.addEventListener(EVENT.TRACK_01_SLIDER, (e) => { refreshScaleChance(e.detail.velocity); });
function refreshScaleChance(velocity) { rectangleManager.scaleChance = mapVelocityToParameter(velocity); }

midiMixManager.addEventListener(EVENT.TRACK_01_KNOB_01, (e) => { refreshScaleAmountMin(e.detail.velocity); });
function refreshScaleAmountMin(velocity) { rectangleManager.scaleAmountMin = mapVelocityToParameter(velocity, 0.1, 7, false); }

midiMixManager.addEventListener(EVENT.TRACK_01_KNOB_02, (e) => { refreshScaleAmountMax(e.detail.velocity); });
function refreshScaleAmountMax(velocity) { rectangleManager.scaleAmountMax = mapVelocityToParameter(velocity, 0.1, 7, false); }

/*
  opacityChance: 0 -> 100
*/

midiMixManager.addEventListener(EVENT.TRACK_02_SLIDER, (e) => { refreshOpacityChance(e.detail.velocity); });
function refreshOpacityChance(velocity) { rectangleManager.opacityChance = mapVelocityToParameter(velocity); }


/*
  angleChance:   0 -> 100
  rotationSpeedMax:      1 -> 20
  initAnglePerturbation: 0 -> 90
*/

midiMixManager.addEventListener(EVENT.TRACK_03_SLIDER, (e) => { refreshAngleChance(e.detail.velocity); });
function refreshAngleChance(velocity) { rectangleManager.angleChance = mapVelocityToParameter(velocity); }

midiMixManager.addEventListener(EVENT.TRACK_03_KNOB_01, (e) => { refreshRotationSpeedMax(e.detail.velocity); });
function refreshRotationSpeedMax(velocity) { rectangleManager.rotationSpeedMax = mapVelocityToParameter(velocity, 1, 50); }

/*midiMixManager.addEventListener(EVENT.TRACK_03_KNOB_02, (e) => { refreshInitAnglePerturbation(e.detail.velocity); });
function refreshInitAnglePerturbation(velocity) { rectangleManager.initAnglePerturbation = mapVelocityToParameter(velocity, 0, 90); }*/

midiMixManager.addEventListener(EVENT.MASTER_SLIDER, (e) => { refreshTileSize(e.detail.velocity); });
function refreshTileSize(velocity) { rectangleManager.tileSize = mapVelocityToParameter(velocity, 50, 200); }
