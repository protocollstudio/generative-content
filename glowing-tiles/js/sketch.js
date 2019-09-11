/*
* @Author: OMAO
* @Date:   2019-08-07 11:39:48
* @Last Modified by:   OMAO
* @Last Modified time: 2019-09-11 11:58:40
*/


// -----------------------------

/*let scaleChance = 0; // 0 -> 100
let scaleAmountMax = 1; // 0 -> 7
let scaleAmountMin = 0.5; // 0 -> 7
let rectScaleInitMin = 1; // 0 -> 7
let rectScaleInitMax = 1; // 0 -> 7

let opacityChance = 0; // 0 -> 100

let angleChance = 0; // 0 -> 100
let initAnglePerturbation = 0; // 0 -> 90
let rotationSpeedMax = 0; // 1 -> 20*/

// global print
let panelSide;
let tileSize = 150;

// sound management
let spectrum;
let fft;
let sound;
let soundAvg = 0;

// managers
let parametersPanelManager;
let rectangleManager;

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
  parametersPanelManager = new ParametersPanelManager(false);
  rectangleManager = new RectangleManager();
  rectangleManager.createRectangleList();
  rectangleManager.drawRectangleList();

  fft = new p5.FFT();

  sound.amp(1);
  sound.play();
  sound.jump(100, 30);
}

function draw() {
  background(0);
  spectrum = fft.analyze();

  rectangleManager.drawRectangleList();
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



// PANEL

function keyPressed() {
  if (keyCode == ENTER) {
    parametersPanelManager.changeVisibility();
  }
}
function getParameters() {
  return [
    ["[1.S] scaleChance", rectangleManager.scaleChance],
    ["[1.1] scaleAmountMin", rectangleManager.scaleAmountMin],
    ["[1.2] scaleAmountMax", rectangleManager.scaleAmountMax],
    ["rectScaleInitMin", rectangleManager.rectScaleInitMin],
    ["rectScaleInitMax", rectangleManager.rectScaleInitMax],

    ["[2.S] opacityChance", rectangleManager.opacityChance],

    ["[3.S] angleChance", rectangleManager.angleChance],
    ["[3.1] rotationSpeedMax", rectangleManager.rotationSpeedMax],
    ["initAnglePerturbation", rectangleManager.initAnglePerturbation],

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
function refreshScaleChance(velocity) { rectangleManager.scaleChance = mapVelocityToParameter(velocity); }

midiMixManager.addEventListener(EVENT.TRACK_01_KNOB_01, (e) => { refreshScaleAmountMin(e.detail.velocity); });
function refreshScaleAmountMin(velocity) { rectangleManager.scaleAmountMin = mapVelocityToParameter(velocity, 0.1, 7, false); }

midiMixManager.addEventListener(EVENT.TRACK_01_KNOB_02, (e) => { refreshScaleAmountMax(e.detail.velocity); });
function refreshScaleAmountMax(velocity) { rectangleManager.scaleAmountMax = mapVelocityToParameter(velocity, 0.1, 7, false); }

/*
  opacityChance: 0 -> 100
*/

midiMixManager.addEventListener(EVENT.TRACK_02_SLIDER, (e) => { refreshOpacityChance(e.detail.velocity); });
function refreshOpacityChance(velocity) { rectangleManager.opacityChance = mapVelocityToParameter(velocity); }


/*
  angleChance:   0 -> 100
  rotationSpeedMax:      1 -> 20
  initAnglePerturbation: 0 -> 90
*/

midiMixManager.addEventListener(EVENT.TRACK_03_SLIDER, (e) => { refreshAngleChance(e.detail.velocity); });
function refreshAngleChance(velocity) { rectangleManager.angleChance = mapVelocityToParameter(velocity); }

midiMixManager.addEventListener(EVENT.TRACK_03_KNOB_01, (e) => { refreshRotationSpeedMax(e.detail.velocity); });
function refreshRotationSpeedMax(velocity) { rectangleManager.rotationSpeedMax = mapVelocityToParameter(velocity, 1, 50); }

/*midiMixManager.addEventListener(EVENT.TRACK_03_KNOB_02, (e) => { refreshInitAnglePerturbation(e.detail.velocity); });
function refreshInitAnglePerturbation(velocity) { rectangleManager.initAnglePerturbation = mapVelocityToParameter(velocity, 0, 90); }*/

midiMixManager.addEventListener(EVENT.MASTER_SLIDER, (e) => { refreshTileSize(e.detail.velocity); });
function refreshTileSize(velocity) { rectangleManager.tileSize = mapVelocityToParameter(velocity, 50, 200); }
