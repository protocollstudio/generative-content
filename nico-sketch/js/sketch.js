import { parametersPanelManager } from "Modules/ParametersPanelManager.js";
import { configuration } from "./configuration.js"

export { setup, draw };

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(230);
  stroke(40);
  frameRate(30);

  parametersPanelManager.setup(false);
}

function draw() {
  background(bgcolor);
}

