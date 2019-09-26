import p5 from 'p5';
import "p5/lib/addons/p5.sound";

// import * as rl from "./random-lines/js/sketch.js"
// import * as gt from "./glowing-tiles/js/sketch.js"

import * as pouet from "./glowing-tiles/js/pouet.js"

let circleColor;
function setup() {
  createCanvas(500,500);
  background(50);

  pouet.setupPouet();
  let values = [15, 240, 120];
  circleColor = color(random(values), random(values), random(values));
}

function draw() {
  fill(circleColor);
  circle(50, 50, 50, 50);
  pouet.drawMyPouet();
}

window.setup = setup;
window.draw = draw;
