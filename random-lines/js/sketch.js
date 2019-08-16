/*
* @Author: OMAO
* @Date:   2018-09-05 08:12:52
* @Last Modified by:   OMAO
* @Last Modified time: 2019-08-16 20:13:38
*/

var delay = 0;
var lineManager;
var areParametersVisible = true;

function setup() {
  //createCanvas(1920, 1080);
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  lineManager = new LineManager(width, height);
  lineManager.generateLineList();
}

function draw() {
  background(0);
  lineManager.draw();
  if (areParametersVisible) {
    showParameters();
  }
}

function mouseWheel() {
  lineManager.reset();
}

function mouseMoved() {
  lineManager.mouseMoved(mouseX, mouseY);
}

function keyPressed() {
  lineManager.keyPressed();
  if (keyCode == ENTER) {
    areParametersVisible = !areParametersVisible;
  }
}

function showParameters() {
    let titleSize = 100;
    let parameterOffset = 45;
    let xOffset = 20;

    fill(0, 0, 0, 150);
    strokeWeight(0);
    rect(0, 0, 600, 600);

    fill(0, 200, 153);

    textSize(titleSize);
    text("Parameters", xOffset, 100);

    textSize(30);
    var valeurList = [
      ["lineNumberMax", lineManager.lineNumberMax],
      ["jumpDistance", lineManager.jumpDistance],
      ["jumpDistanceRoom", lineManager.jumpDistanceRoom],
      ["bendProbability", lineManager.bendProbability],
      ["bendDuration", lineManager.bendDuration],
      ["bendAmplitude", lineManager.bendAmplitude],
      ["bendAmplitudeRoom", lineManager.bendAmplitudeRoom],
      ["aberationProbability", lineManager.aberationProbability],
      ["bendDuration", lineManager.bendDuration]
    ];

    valeurList.forEach((valeur, index) => {
      text(valeur[0] + " = " + valeur[1], xOffset + 20, titleSize + 20 + parameterOffset * (index + 1));
    });

  }
