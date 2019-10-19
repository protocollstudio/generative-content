import { util } from "Modules/Util";

export {
  setup,
  draw,
  keyPressed
};

var stepX;
var stepY;
var weight = 0;

function setup() {
  createCanvas(800, 400);
  stroke(255);
  colorMode(HSB, width, height, 100);
  console.log(mouseX);
  console.log(mouseY);
}

function draw() {
  stepX = mouseX + 2;
  stepY = mouseY + 2;

  console.log({ nbY: height / stepY, nbX: width / stepX, nbTotal: (height / stepY) * (width / stepX) });

  weight = map(mouseX, 0, width, 0, 15);
  strokeWeight(weight);
  console.log(weight);
  for (var gridY = 0; gridY < height; gridY += stepY) {
    for (var gridX = 0; gridX < width; gridX += stepX) {
      fill(gridX, height - gridY, 100);
      rect(gridX, gridY, stepX, stepY);
    }
  }
}

function keyPressed() {
  util.saveOnKeyPressed();
}
