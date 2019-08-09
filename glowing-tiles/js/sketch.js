/*
* @Author: OMAO
* @Date:   2019-08-07 11:39:48
* @Last Modified by:   OMAO
* @Last Modified time: 2019-08-09 10:55:41
*/

let globalWidth = 800;
let globalHeight = 800;

let gAngle = 0; // to delete
let x = 200; // to delete
let y = 200; // to delete

let panelSide;
let tileSize = 30;

let rectList = [];
let scaleAmount = 0.5; // 0 -> 7
let anglePerturbation = 20; // 0 -> 90


function setup() {
  createCanvas(windowWidth, windowHeight);
  //createCanvas(globalWidth, globalHeight);
  //frameRate(30);
  angleMode(DEGREES);
  rectMode(CENTER);
  background(0);

  panelSide = width / tileSize;
  translate(tileSize/2, tileSize/2);
  createRectangles();
}

function createRectangles() {
  for(let i = 0; i < panelSide; i++) {
    for(let j = 0; j < panelSide; j++) {
      let side = random(tileSize * 0.1, tileSize * 0.9);
      rectList.push(new Rectangle(i * tileSize, j * tileSize, side, side, random(0,anglePerturbation)));
    }
  }
}

function draw() {

  drawRectangles();

  push();
  gAngle += 2;
  translate(x, y);
  rotate(gAngle);
  fill(255,0,0);
  rect(0, 0, 50, 50);
  pop();


}

function drawRectangles() {

  background(0);

  /*rectList.forEach((rectangle) => {
    rectangle.draw();
  });
*/
  let waveNumber = random(10, 10);

  for (let i = 0 ; i < waveNumber ; i++) {
    let index = int(random(0, rectList.length));
    rectList[index].draw();
  }

  console.log("mouseX = " + mouseX);
  console.log("windowWidth = " + windowWidth);
  console.log("mouseY = " + mouseY);
  console.log("windowHeight = " + windowHeight);
  console.log("----------------------------------");

}

class Rectangle {

  constructor(x, y, width, height, angle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    scale(((mouseX - windowWidth) / windowWidth) * scaleAmount, ((mouseY - windowHeight) / windowHeight) * scaleAmount);
    strokeWeight(0);

    let rectFill = random(0, 255);
    /*fill(255,255,255,rectFill-100);
    rect(-2, -2, this.width + 4, this.height + 4);*/

    fill(255,255,255,rectFill);
    rect(0, 0, this.width, this.height);

//    this.modifyAngle();
    pop();
  }

  modifyAngle() {
    this.angle += 1;
    console.log();
  }

}
