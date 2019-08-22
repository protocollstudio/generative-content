/*
* @Author: OMAO
* @Date:   2018-09-05 08:12:52
* @Last Modified by:   OMAO
* @Last Modified time: 2019-08-22 12:46:32
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


midiMixManager.addEventListener(EVENT.TRACK_01_KNOB_01, function(e) {
  console.log(e);

  this._content = e.detail.note;
  this._color = e.detail.velocity;

  console.log("content = " + this._content);
  console.log("color = " + this._color);

  // fait le job
  /*const paragraph = document.getElementById("para1");
  paragraph.innerHTML = this._content;
  paragraph.style.color = this._color;*/
});

