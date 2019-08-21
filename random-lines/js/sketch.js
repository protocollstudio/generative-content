/*
* @Author: OMAO
* @Date:   2018-09-05 08:12:52
* @Last Modified by:   OMAO
* @Last Modified time: 2019-08-21 13:05:52
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
  lineManager.mouseMoved(mouseX, mouseY);
}

function keyPressed() {
  lineManager.keyPressed();
  if (keyCode == ENTER) {
    parametersPanelManager.changeVisibility();
  }
}

function getParameters() {
  return [
    ["lineNumberMax", this.lineManager.lineNumberMax],
    ["jumpDistance", this.lineManager.jumpDistance],
    ["jumpDistanceRoom", this.lineManager.jumpDistanceRoom],
    ["bendProbability", this.lineManager.bendProbability],
    ["bendDuration", this.lineManager.bendDuration],
    ["bendAmplitude", this.lineManager.bendAmplitude],
    ["bendAmplitudeRoom", this.lineManager.bendAmplitudeRoom],
    ["aberationProbability", this.lineManager.aberationProbability],
    ["bendDuration", this.lineManager.bendDuration]
  ];
}

function updateMidi(note, velocity) {
  console.log("note: " + note + ", velocity: " + velocity);
}
