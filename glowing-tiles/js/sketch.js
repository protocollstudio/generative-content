/*
* @Author: OMAO
* @Date:   2019-08-07 11:39:48
* @Last Modified by:   OMAO
* @Last Modified time: 2019-08-07 16:02:36
*/

let globalWidth = 800;
let globalHeight = 800;

let gAngle = 0;
let scaleAmount = 1;
let x = 200;
let y = 200;

let panelSide;
let tileSize = 30;

let rectList = [];

function setup() {
  createCanvas(globalWidth, globalHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
  background(0);

  panelSide = width / tileSize;
  //translate(tileSize/2, tileSize/2);
  createRectangles();
  rectList.forEach((rectangle) => {
    rectangle.draw();
  });
}

function draw() {
  gAngle += 2;
  scaleAmount += 0.01;

  push();
  translate(x, y);
  rotate(gAngle);
  fill(255,0,0);
  rect(0, 0, 200, 200);
  pop();

/*  stroke(255);
  strokeWeight(4);
  line(0,0, 100,100);*/
}


function createRectangles() {
  for(let i = 0; i < panelSide; i++) {
    for(let j = 0; j < panelSide; j++) {
      let side = random(tileSize * 0.4, tileSize * 0.6);
      rectList.push(new Rectangle(i * tileSize, j * tileSize, side, side, random(0,12)));
    }
  }
}


class Rectangle {

  constructor(x, y, width, height, angle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.angle = angle;

    this.rectangle = createGraphics(this.width, this.height);
    this.rectangle.rectMode(CENTER);
    this.rectangle.background(255);
    this.rectangle.fill(255,255,255,100);
    this.rectangle.noStroke();
    this.rectangle.rect(0, 0, this.width/2, this.height/2);

    this.rectangleBlur = createGraphics(this.width*2, this.height*2);
    this.rectangleBlur.background(255);
    this.rectangleBlur.fill(255,255,255,100);
    this.rectangleBlur.noStroke();
    this.rectangleBlur.rect(0, 0, this.width/2, this.height/2);
    this.rectangleBlur.filter(BLUR,5);
  }

  draw() {
    push()
    translate(this.x, this.y);
    rotate(this.angle);
    this.angle+=2;
    //scale((mouseX / 100) - 1, (mouseY / 100) - 1);
    noStroke();
    //rect(-5, -5, this.width + 10, this.height + 10);
    //rect(0, 0, this.width, this.height);

    image(this.rectangleBlur,0,0,0,0);
    //image(this.rectangle,0,0,0,0);
    this.modifyAngle();
    pop();
  }

  modifyAngle() {
    this.rectangleBlur.rotate(this.angle + 1);
    console.log();
  }

}
