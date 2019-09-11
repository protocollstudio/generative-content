/*
* @Author: OMAO
* @Date:   2019-08-07 11:39:48
* @Last Modified by:   OMAO
* @Last Modified time: 2019-09-11 11:01:45
*/

let globalWidth = 800;
let globalHeight = 800;

let gAngle = 0; // to delete
let x = 200; // to delete
let y = 200; // to delete

let panelSide;
let tileSize = 150;

let rectList = [];

// -----------------------------

let scaleChance = 0; // 0 -> 100
let scaleAmountMax = 1; // 0 -> 7
let scaleAmountMin = 0.5; // 0 -> 7
let rectScaleInitMin = 1; // 0 -> 7
let rectScaleInitMax = 1; // 0 -> 7

let opacityChance = 0; // 0 -> 100

let angleChance = 0; // 0 -> 100
let initAnglePerturbation = 0; // 0 -> 90
let rotationSpeedMax = 0; // 1 -> 20

// -----------------------------

let spectrum;
let fft;
let sound;
let soundAvg = 0;
var parametersPanelManager;

function preload(){
  sound = loadSound('assets/lille.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);
  rectMode(CENTER);
  background(0);
  frameRate(5);

  panelSide = width / tileSize;
  createRectangleList();
  drawRectangleList();
  drawRandomRectangleInterval = setInterval(drawRandomRectangle, 0);
  parametersPanelManager = new ParametersPanelManager(false);

  fft = new p5.FFT();

  sound.amp(1);
  sound.play();
  sound.jump(100, 30);
}

function draw() {
  spectrum = fft.analyze();

  drawRectangleList();
  //processSound();

  //updateScaleChance();
  //updateOpacityChance();
  //updateAngleChance();

  parametersPanelManager.print(getParameters());
}

function processSound() {
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
    let scaleAmount = random(scaleAmountMin, scaleAmountMax);
    //let scaleAmount = map(soundAvg, 0, 255, 0, scaleAmountMax);
    //scaleAmountMax = map(mouseX, 0, width, 0, 7);
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

function updateScaleChance() { scaleChance = (mouseY / windowHeight) * 100; }
function updateOpacityChance() { opacityChance = (mouseY / windowHeight) * 100; }
function updateAngleChance() { angleChance = (mouseY / windowHeight) * 100; }


// PANEL

function keyPressed() {
  if (keyCode == ENTER) {
    parametersPanelManager.changeVisibility();
  }
}
function getParameters() {
  return [
    ["[1.S] scaleChance", scaleChance],
    ["[1.1] scaleAmountMin", scaleAmountMin],
    ["[1.2] scaleAmountMax", scaleAmountMax],
    ["rectScaleInitMin", rectScaleInitMin],
    ["rectScaleInitMax", rectScaleInitMax],

    ["[2.S] opacityChance", opacityChance],

    ["[3.S] angleChance", angleChance],
    ["[3.1] rotationSpeedMax", rotationSpeedMax],
    ["initAnglePerturbation", initAnglePerturbation],

    ["[M.S] tileSize", tileSize]
  ];
}





// MIDI

/*
  scaleChance:   0 -> 100
  scaleAmountMax:        0 -> 7
  scaleAmountMin:        0 -> 7
  rectScaleInitMin:      0 -> 7
  rectScaleInitMax:      0 -> 7
*/

midiMixManager.addEventListener(EVENT.TRACK_01_SLIDER, (e) => { refreshScaleChance(e.detail.velocity); });
function refreshScaleChance(velocity) { scaleChance = mapVelocityToParameter(velocity); }

midiMixManager.addEventListener(EVENT.TRACK_01_KNOB_01, (e) => { refreshScaleAmountMin(e.detail.velocity); });
function refreshScaleAmountMin(velocity) { scaleAmountMin = mapVelocityToParameter(velocity, 0.1, 7, false); }

midiMixManager.addEventListener(EVENT.TRACK_01_KNOB_02, (e) => { refreshScaleAmountMax(e.detail.velocity); });
function refreshScaleAmountMax(velocity) { scaleAmountMax = mapVelocityToParameter(velocity, 0.1, 7, false); }

/*
  opacityChance: 0 -> 100
*/

midiMixManager.addEventListener(EVENT.TRACK_02_SLIDER, (e) => { refreshOpacityChance(e.detail.velocity); });
function refreshOpacityChance(velocity) { opacityChance = mapVelocityToParameter(velocity); }


/*
  angleChance:   0 -> 100
  rotationSpeedMax:      1 -> 20
  initAnglePerturbation: 0 -> 90
*/

midiMixManager.addEventListener(EVENT.TRACK_03_SLIDER, (e) => { refreshAngleChance(e.detail.velocity); });
function refreshAngleChance(velocity) { angleChance = mapVelocityToParameter(velocity); }

midiMixManager.addEventListener(EVENT.TRACK_03_KNOB_01, (e) => { refreshRotationSpeedMax(e.detail.velocity); });
function refreshRotationSpeedMax(velocity) { rotationSpeedMax = mapVelocityToParameter(velocity, 1, 50); }

/*midiMixManager.addEventListener(EVENT.TRACK_03_KNOB_02, (e) => { refreshInitAnglePerturbation(e.detail.velocity); });
function refreshInitAnglePerturbation(velocity) { initAnglePerturbation = mapVelocityToParameter(velocity, 0, 90); }*/

midiMixManager.addEventListener(EVENT.MASTER_SLIDER, (e) => { refreshTileSize(e.detail.velocity); });
function refreshTileSize(velocity) { tileSize = mapVelocityToParameter(velocity, 50, 200); }
