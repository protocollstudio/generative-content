/*
* @Author: OMAO
* @Date:   2018-09-05 08:12:52
* @Last Modified by:   OMAO
* @Last Modified time: 2019-09-20 17:00:13
*/

import p5 from 'p5';
import "p5/lib/addons/p5.sound";
import {EVENT} from "./EVENT.js"
import {lineManager} from "./LineManager.js";
import {midiMixController} from "./MidiMixController.js"
import {parametersPanelManager} from "./ParametersPanelManager.js"
import {midiManager} from "./MidiManager.js"

//var lineManager;
//var parametersPanelManager;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  //lineManager = new LineManager(width, height);
  //parametersPanelManager = new ParametersPanelManager(false);
  lineManager.generateLineList();
  parametersPanelManager.setup(true);
  setupMidi();
  midiManager.setup();
}

function draw() {
  background(0);
  lineManager.draw();
  parametersPanelManager.print(getParameters());
}

function keyPressed() {
  console.log("keypressed");
  if (keyCode == ENTER) {
    parametersPanelManager.changeVisibility();
  }
}

function getParameters() {
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



/*// ---- MASTER
// ----------------

midiMixManager.addEventListener(EVENT.MASTER_SLIDER, (e) => {
  refreshLineNumber(e.detail.velocity);
});


// ---- BEND
// ----------------

midiMixManager.addEventListener(EVENT.TRACK_01_SLIDER, (e) => {
  refreshBendProbability(e.detail.velocity);
});
midiMixManager.addEventListener(EVENT.TRACK_01_KNOB_01, (e) => {
  refreshBendDuration(e.detail.velocity);
});
midiMixManager.addEventListener(EVENT.TRACK_01_KNOB_02, (e) => {
  refreshBendAmplitude(e.detail.velocity);
});
midiMixManager.addEventListener(EVENT.TRACK_01_KNOB_03, (e) => {
  refreshBendAmplitudeRoom(e.detail.velocity);
});


// ---- JUMP
// ----------------

midiMixManager.addEventListener(EVENT.TRACK_02_SLIDER, (e) => {
  refreshJumpProbability(e.detail.velocity);
});
midiMixManager.addEventListener(EVENT.TRACK_02_KNOB_01, (e) => {
  refreshJumpDistance(e.detail.velocity);
});
midiMixManager.addEventListener(EVENT.TRACK_02_KNOB_02, (e) => {
  refreshJumpDistanceRoom(e.detail.velocity);
});



// ---- MASTER
// ----------------

function refreshLineNumber(velocity) {
  let parameterValueMin = 0;
  let parameterValueMax = 100;
  lineManager.updateLineNumber(velocity, 127);
}

// ---- BEND
// ----------------

function refreshBendProbability(velocity) {
  let parameterValueMin = 0;
  let parameterValueMax = 100;
  lineManager.bendProbability = int(map(velocity, 0, 127, parameterValueMin, parameterValueMax));
}
function refreshBendDuration(velocity) {
  let parameterValueMin = 0;
  let parameterValueMax = 100;
  lineManager.bendDuration = int(map(velocity, 0, 127, parameterValueMin, parameterValueMax));
}
function refreshBendAmplitude(velocity) {
  let parameterValueMin = 0;
  let parameterValueMax = 150;
  lineManager.bendAmplitude = int(map(velocity, 0, 127, parameterValueMin, parameterValueMax));
}
function refreshBendAmplitudeRoom(velocity) {
  let parameterValueMin = 0;
  let parameterValueMax = lineManager.bendAmplitude;
  lineManager.bendAmplitudeRoom = int(map(velocity, 0, 127, parameterValueMin, parameterValueMax));
}


// ---- JUMP
// ----------------

function refreshJumpProbability(velocity) {
  let parameterValueMin = 0;
  let parameterValueMax = 100;
  lineManager.jumpProbability = int(map(velocity, 0, 127, parameterValueMin, parameterValueMax));
}
function refreshJumpDistance(velocity) {
  let parameterValueMin = 0;
  let parameterValueMax = 100;
  lineManager.jumpDistance = int(map(velocity, 0, 127, parameterValueMin, parameterValueMax));
}
function refreshJumpDistanceRoom(velocity) {
  let parameterValueMin = 0;
  let parameterValueMax = lineManager.jumpDistance;
  lineManager.jumpDistanceRoom = int(map(velocity, 0, 127, parameterValueMin, parameterValueMax));
}

*/

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

//window.preload = preload;
window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
