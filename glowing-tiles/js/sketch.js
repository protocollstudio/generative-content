/*
* @Author: OMAO
* @Date:   2019-08-07 11:39:48
* @Last Modified by:   OMAO
* @Last Modified time: 2019-08-26 22:33:21
*/

let globalWidth = 800;
let globalHeight = 800;

let gAngle = 0; // to delete
let x = 200; // to delete
let y = 200; // to delete

let panelSide;
let tileSize = 25;

let rectList = [];
let scaleAmountMax = 7; // 0 -> 7
let rectScaleInitMin = 1; // 0 -> 7
let rectScaleInitMax = 1; // 0 -> 7
let initAnglePerturbation = 10; // 0 -> 90
let rotationSpeedMax = 10; // 1 -> 20

let opacityChance = 40; // 0 -> 100
let scaleChance = 1; // 0 -> 100
let angleChance = 0; // 0 -> 100

let spectrum;
let fft;
let sound;
let soundAvg = 0;

function preload(){
  sound = loadSound('assets/lille.mp3');
}

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

  fft = new p5.FFT();

  sound.amp(1);
  //sound.isPlaying();
  sound.play();
  sound.jump(100, 30);
}

function draw() {
/*  console.log("displayHeight = "+displayHeight);
  console.log("displayWidth = "+displayWidth);
  console.log("height = "+height);
  console.log("width = "+width);
  console.log("windowWidth = "+windowWidth);
  console.log("windowHeight = "+windowHeight);*/
  spectrum = fft.analyze();

  drawRectangleList();
  drawSpectrum();

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

function drawSpectrum() {
  if (spectrum !== undefined) {
    let spectrumSize = 200;
    //let spectrumSize = spectrum.length;
    let initSize = 500;
    let total = 0;

    for (var i = initSize; i < initSize + spectrumSize; i++){
      total += spectrum[i];
      /*fill(255,0,0);
      var x = map(i, 0, spectrum.length, 0, width);
      var h = -height + map(spectrum[i], 0, 255, height, 0);
      rect(x, height, width / spectrum.length, h);*/
    }
    let newAvg = int(total / (spectrumSize));
    let spaceBetweenAvgMax = 5;
    soundAvg = abs(newAvg - soundAvg) > spaceBetweenAvgMax ? newAvg : soundAvg;
    /*textSize(50);
    fill(89, 255, 200);
    text(soundAvg, 10, 100);
    if (soundAvg * 4 > 255) {
      text(">255", 10, 160);
    }*/
  }
}
function createRectangleList() {
  for(let i = 0; i < panelSide; i++) {
    for(let j = 0; j < panelSide; j++) {
      let side = random(tileSize * rectScaleInitMin, tileSize * rectScaleInitMax);
      rectList.push(new Rectangle(i * tileSize, j * tileSize, side, side, random(0,initAnglePerturbation)));
      //console.log("["+ rectList.length - 1 +"] = " + rectList[rectList.length - 1].hypotenuse);
    }
  }
}

function drawRectangleList() {
  background(0);

  rectList.forEach((rectangle, index) => {
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

function editScale(rectangle) {
  if (random(0,100) <= scaleChance) {
//    let scaleAmount = map(windowWidth-mouseX, 0, windowWidth, 0, scaleAmount);
    let scaleAmount = map(soundAvg, 0, 255, 0, scaleAmountMax);
    scaleAmountMax = map(mouseX, 0, width, 0, 7);
    rectangle.scaleX = scaleAmount;
    rectangle.scaleY = scaleAmount;
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


