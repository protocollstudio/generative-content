/*
* @Author: OMAO
* @Date:   2019-08-07 11:39:48
* @Last Modified by:   OMAO
* @Last Modified time: 2019-08-09 13:08:08
*/

let globalWidth = 800;
let globalHeight = 800;

let gAngle = 0; // to delete
let x = 200; // to delete
let y = 200; // to delete

let panelSide;
let tileSize = 30;

let rectList = [];
let scaleAmount = 4; // 0 -> 7
let initAnglePerturbation = 0; // 0 -> 90
let rotationSpeedMax = 0; // 1 -> 20

let opacityChance = 0; // 0 -> 100
let scaleChance = 1; // 0 -> 100
let angleChance = 0; // 0 -> 100

function setup() {
  createCanvas(windowWidth, windowHeight);
  //createCanvas(globalWidth, globalHeight);
  //frameRate(30);
  angleMode(DEGREES);
  rectMode(CENTER);
  background(0);

  panelSide = width / tileSize;
  //translate(tileSize/2, tileSize/2);
  createRectangleList();
  drawRectangleList();
  drawRandomRectangleInterval = setInterval(drawRandomRectangle, 0);
}

function createRectangleList() {
  for(let i = 0; i < panelSide; i++) {
    for(let j = 0; j < panelSide; j++) {
      let side = random(tileSize * 0.1, tileSize * 0.9);
      rectList.push(new Rectangle(i * tileSize, j * tileSize, side, side, random(0,initAnglePerturbation)));
    }
  }
}

function drawRectangleList() {
  background(0);
  rectList.forEach((rectangle) => {
    editScale(rectangle);
    editOpacity(rectangle);
    editAngle(rectangle);
    rectangle.draw();
  });
}

function drawRandomRectangle() {
  let index = int(random(0, rectList.length));
  rectList[index].draw();
}

function draw() {

  drawRectangleList();

  updateScaleChance();
  //updateOpacityChance();
  //updateAngleChance();

/*
  push();
  gAngle += 2;
  translate(x, y);
  rotate(gAngle);
  fill(255,0,0);
  rect(0, 0, 50, 50);
  pop();
*/
}

function editScale(rectangle) {
  if (random(0,100) <= scaleChance) {
    rectangle.scaleX = ((mouseX - windowWidth) / windowWidth) * scaleAmount + 0.4;
    rectangle.scaleY = ((mouseX - windowWidth) / windowWidth) * scaleAmount + 0.4;
  }
}

function editOpacity(rectangle) {
  if (random(0,100) <= opacityChance) {
    rectangle.opacity = random(0, 255);
  }
}

function editAngle(rectangle) {
  if (random(0,100) <= angleChance) {
    rectangle.angle += rectangle.rotationSpeed;
  }
}


function updateScaleChance() {
  scaleChance = (mouseY / windowHeight) * 100;
}

function updateOpacityChance() {
  opacityChance = (mouseY / windowHeight) * 100;
}

function updateAngleChance() {
  angleChance = (mouseY / windowHeight) * 100;
}


class Rectangle {

  constructor(x, y, width, height, angle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;

    this.scaleX = 1;
    this.scaleY = 1;
    this.opacity = random(0, 255);
    this.rotationSpeed = random(-rotationSpeedMax,rotationSpeedMax);
  }

  draw() {
    push();
    translate(this.x, this.y);

    //angle
    rotate(this.angle);
    //this.angle += 1;

    //scale
    scale(this.scaleX, this.scaleY);

    //stroke
    stroke(0);
    strokeWeight(0);

    //draw rectangle
    fill(255,255,255,this.opacity);
    rect(0, 0, this.width, this.height);

    pop();
  }

}
