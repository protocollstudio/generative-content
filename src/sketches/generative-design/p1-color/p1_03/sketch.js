import { util } from "Modules/Util";

export {
  setup,
  draw,
  keyPressed
};

var segmentCount = 360;
var radius = 300;

function setup() {
  createCanvas(800, 800);
  noStroke();
}

function draw() {
  background(255, map(mouseX, 0, width, 0, 255), map(mouseY, 0, height, 0, 255));
}

function keyPressed() {
  util.saveOnKeyPressed();
}
