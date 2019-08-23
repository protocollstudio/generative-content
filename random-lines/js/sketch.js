/*
* @Author: OMAO
* @Date:   2018-09-05 08:12:52
* @Last Modified by:   OMAO
* @Last Modified time: 2019-08-23 14:51:01
*/

var delay = 0;
var lineManager;
var parametersPanelManager;
var areParametersVisible = true;

function setup() {
  //createCanvas(1920, 1080);
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  lineManager = new LineManager(width, height);
  parametersPanelManager = new ParametersPanelManager();
  lineManager.generateLineList();
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


midiMixManager.addEventListener(EVENT.MASTER_SLIDER, (e) => {
  let parameterValueMin = 0;
  let parameterValueMax = 100;
  this.lineManager.updateLineNumber(e.detail.velocity, 127);
  // bendProbability = int(map(e.detail.velocity, 0, 127, parameterValueMin, parameterValueMax));
});


// ---- BEND
// ----------------

midiMixManager.addEventListener(EVENT.TRACK_01_SLIDER, (e) => {
  let parameterValueMin = 0;
  let parameterValueMax = 100;
  this.lineManager.bendProbability = int(map(e.detail.velocity, 0, 127, parameterValueMin, parameterValueMax));
});
midiMixManager.addEventListener(EVENT.TRACK_01_KNOB_01, (e) => {
  let parameterValueMin = 0;
  let parameterValueMax = 100;
  this.lineManager.bendDuration = int(map(e.detail.velocity, 0, 127, parameterValueMin, parameterValueMax));
});
midiMixManager.addEventListener(EVENT.TRACK_01_KNOB_02, (e) => {
  let parameterValueMin = 0;
  let parameterValueMax = 150;
  this.lineManager.bendAmplitude = int(map(e.detail.velocity, 0, 127, parameterValueMin, parameterValueMax));
  this.lineManager.bendAmplitudeRoom = int(map(e.detail.velocity, 0, 127, parameterValueMin, parameterValueMax));
});
midiMixManager.addEventListener(EVENT.TRACK_01_KNOB_03, (e) => {
  let parameterValueMin = 0;
  let parameterValueMax = this.lineManager.bendAmplitude;
  this.lineManager.bendAmplitudeRoom = int(map(e.detail.velocity, 0, 127, parameterValueMin, parameterValueMax));
});

// ---- JUMP
// ----------------

midiMixManager.addEventListener(EVENT.TRACK_02_SLIDER, (e) => {
  let parameterValueMin = 0;
  let parameterValueMax = 100;
  this.lineManager.jumpProbability = int(map(e.detail.velocity, 0, 127, parameterValueMin, parameterValueMax));
});
midiMixManager.addEventListener(EVENT.TRACK_02_KNOB_01, (e) => {
  let parameterValueMin = 0;
  let parameterValueMax = 100;
  this.lineManager.jumpDistance = int(map(e.detail.velocity, 0, 127, parameterValueMin, parameterValueMax));
});
midiMixManager.addEventListener(EVENT.TRACK_02_KNOB_02, (e) => {
  let parameterValueMin = 0;
  let parameterValueMax = this.lineManager.jumpDistance;
  this.lineManager.jumpDistanceRoom = int(map(e.detail.velocity, 0, 127, parameterValueMin, parameterValueMax));
});
