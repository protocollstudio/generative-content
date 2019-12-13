import { util } from "Modules/Util";

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(255, map(mouseX, 0, width, 0, 255), map(mouseY, 0, height, 0, 255));
}

function keyPressed() {
  util.saveOnKeyPressed();
}

export {
  setup,
  draw,
  keyPressed
};