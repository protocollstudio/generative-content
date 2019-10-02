import { parametersPanelManager } from "Modules/ParametersPanelManager.js";
import { configuration } from "./configuration.js"

export { setup, draw };

let vec, c1, c2;
let increment = 0;
let nbAgents = 200;
let agents = [];



function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(230);
  stroke(40);
  frameRate(30);
  parametersPanelManager.setup(false);
}

function draw() {
  background(configuration.bgColor);

  // camera setup
  createCamera();

}

function spherePoint(radius, u, v) {
  vec = createVector();
  u = radians(u);
  v = radians(v);
  vec.x = radius * cos(u) * cos(v);
  vec.y = radius * sin(u) * cos(v);
  vec.z = radius * sin(v);
  return vec;
}

