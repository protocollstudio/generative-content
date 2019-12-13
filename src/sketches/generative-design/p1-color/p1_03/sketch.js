import { util } from 'Modules/Util';
import { parametersPanelManager } from 'Modules/ParametersPanelManager.js';

let param = {
	radius: 300,
	segmentCount: 360,
	angleStep: 1,
	coordList: []
};

function setup() {
	createCanvas(windowWidth, windowHeight);
	parametersPanelManager.setup(false, 600, 300);
	noStroke();
	generateCircleList();
}

function draw() {
	param.segmentCount = int(map(mouseX, 0, width, 0, 50));

	colorMode(RGB, 360, width, height);
	background(360, width, height);

	param.angleStep = int(360 / param.segmentCount);

	param.coordList.forEach(coord => drawCircle(coord));
	parametersPanelManager.draw(getParameters());
}

function generateCircleList() {
	param.coordList = [];
  for (let i = 0; i < random(10, 50); i++) {
		param.coordList.push([ 
      random(0, width), // 
      random(0, height), //
      random(10, 200), //
      random(0, 360) //
    ]);
	}
}

function drawCircle([ centerX, centerY, radius, offset ]) {
  push();
	beginShape(TRIANGLE_FAN);
	vertex(centerX, centerY);

	for (var angle = 0 + offset; angle <= 360 + offset; angle += param.angleStep) {
		var vx = centerX + cos(radians(angle)) * radius;
		var vy = centerY + sin(radians(angle)) * radius;
		vertex(vx, vy);
		fill(angle, mouseX, mouseY);
	}
	endShape();
  //filter(BLUR, int(5/random(1,5))); // blur only one time.
  pop();
}

function mouseClicked() {
  generateCircleList();
}

function keyPressed() {
	// util.saveOnKeyPressed();
	parametersPanelManager.keyPressed();
}

const getParameters = () => [
	parametersPanelManager.createParameter('segmentCount', param, 'segmentCount'),
	parametersPanelManager.createParameter('angleStep', param, 'angleStep'),
	parametersPanelManager.createParameter('radius', param, 'radius')
];

export { setup, draw, keyPressed, mouseClicked};
