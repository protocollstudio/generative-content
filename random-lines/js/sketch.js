/*
* @Author: OMAO
* @Date:   2018-09-05 08:12:52
* @Last Modified by:   OMAO
* @Last Modified time: 2019-08-23 15:11:17
*/

var delay = 0;
var lineManager;
var parametersPanelManager;

function setup() {
  //createCanvas(1920, 1080);
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  lineManager = new LineManager(width, height);
  parametersPanelManager = new ParametersPanelManager(false);
  lineManager.generateLineList();
  refreshAll();
}

function draw() {
  background(0);
  lineManager.draw();
  if (parametersPanelManager.isVisible) {
    parametersPanelManager.print(getParameters());
  }
}

function mouseWheel() {
  lineManager.reset();
}

function mouseMoved() {
  //lineManager.mouseMoved(mouseX, mouseY);
}

function keyPressed() {
  lineManager.keyPressed();
  if (keyCode == ENTER) {
    parametersPanelManager.changeVisibility();
  }
}

function getParameters() {
  return [
    ["jumpProbability", this.lineManager.jumpProbability],
    ["jumpDistance", this.lineManager.jumpDistance],
    ["jumpDistanceRoom", this.lineManager.jumpDistanceRoom],

    ["bendProbability", this.lineManager.bendProbability],
    ["bendDuration", this.lineManager.bendDuration],
    ["bendAmplitude", this.lineManager.bendAmplitude],
    ["bendAmplitudeRoom", this.lineManager.bendAmplitudeRoom],

    ["lineNumberMax", this.lineManager.lineNumberMax],
    ["line number", this.lineManager.lineList.length],
    ["aberationProbability", this.lineManager.aberationProbability]
  ];
}


function refreshAll() {
/*  refreshLineNumber();
  refreshBendProbability();
  refreshBendDuration();
  refreshBendAmplitude();
  refreshBendAmplitudeRoom();
  refreshJumpProbability();
  refreshJumpDistance();
  refreshJumpDistanceRoom();*/
}


// ---- MASTER
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
  this.lineManager.updateLineNumber(velocity, 127);
}

// ---- BEND
// ----------------

function refreshBendProbability(velocity) {
  let parameterValueMin = 0;
  let parameterValueMax = 100;
  this.lineManager.bendProbability = int(map(velocity, 0, 127, parameterValueMin, parameterValueMax));
}
function refreshBendDuration(velocity) {
  let parameterValueMin = 0;
  let parameterValueMax = 100;
  this.lineManager.bendDuration = int(map(velocity, 0, 127, parameterValueMin, parameterValueMax));
}
function refreshBendAmplitude(velocity) {
  let parameterValueMin = 0;
  let parameterValueMax = 150;
  this.lineManager.bendAmplitude = int(map(velocity, 0, 127, parameterValueMin, parameterValueMax));
}
function refreshBendAmplitudeRoom(velocity) {
  let parameterValueMin = 0;
  let parameterValueMax = this.lineManager.bendAmplitude;
  this.lineManager.bendAmplitudeRoom = int(map(velocity, 0, 127, parameterValueMin, parameterValueMax));
}


// ---- JUMP
// ----------------

function refreshJumpProbability(velocity) {
  let parameterValueMin = 0;
  let parameterValueMax = 100;
  this.lineManager.jumpProbability = int(map(velocity, 0, 127, parameterValueMin, parameterValueMax));
}
function refreshJumpDistance(velocity) {
  let parameterValueMin = 0;
  let parameterValueMax = 100;
  this.lineManager.jumpDistance = int(map(velocity, 0, 127, parameterValueMin, parameterValueMax));
}
function refreshJumpDistanceRoom(velocity) {
  let parameterValueMin = 0;
  let parameterValueMax = this.lineManager.jumpDistance;
  this.lineManager.jumpDistanceRoom = int(map(velocity, 0, 127, parameterValueMin, parameterValueMax));
}
