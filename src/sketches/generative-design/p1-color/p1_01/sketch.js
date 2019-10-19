
export {
  setup,
  draw
};

function setup() {
  createCanvas(720, 720);
  noCursor();
  colorMode(HSB, 360, 100, 100);
  rectMode(CENTER );
  strokeWeight(0);
}

function draw() {
  background(mouseY / 2, 30, 100);

  fill(360 - mouseY / 2, 30, 100);
  rect(720 / 2, 720 / 2, mouseX, mouseX);
}
