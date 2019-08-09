/*
* @Author: OMAO
* @Date:   2018-09-05 08:12:52
* @Last Modified by:   OMAO
* @Last Modified time: 2019-08-09 10:06:54
*/

var delay = 0;
var lineManager;

function setup() {
  //createCanvas(1920, 1080);
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  lineManager = new LineManager(width, height);
  lineManager.addLine();
}

function draw() {
  background(0);
  lineManager.draw();
}

function mouseClicked(event) {
  event.preventDefault();
  lineManager.addLine();
}

/*function mouseClicked(event) {
  event.preventDefault();
  lineManager.removeLine();
}*/

function mouseWheel() {
  lineManager.reset();
}
