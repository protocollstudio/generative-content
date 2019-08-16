/*
* @Author: OMAO
* @Date:   2018-09-05 08:37:26
* @Last Modified by:   OMAO
* @Last Modified time: 2019-08-16 18:44:04
*/

class LineManager {

	constructor() {
		this.lineList = [];
		this.lineNumberMax 	      = 100;

		// 0 -> 100
		this.jumpProbability      = 0;
		// 0 -> 100
		this.jumpDistance         = 30;
		// 0 -> jumpDistance
		this.jumpDistanceRoom     = 10;

		// 0 -> 100
		this.bendProbability      = 10;
		// 2 -> 100
		this.bendDuration         = 100;
		// 0 -> 150
		this.bendAmplitude        = 2;
		// 0 -> bendAmplitude
		this.bendAmplitudeRoom    = 0;

		// 0 -> 100
		this.aberationProbability = 0;

	}

	// methods

	generateLineList() {
		for(let i = 0; i < random(this.lineNumberMax,this.lineNumberMax); i++) {
			let lineColor = color(random(50, 255));
			let linePosition = random(0, height);
			let lineSpeed = random(1, 15);
			let lineWeight = random(2, 5);
			this.lineList.push(new GlitchLine(lineColor, linePosition, lineSpeed, lineWeight));
		}
	}

	draw() {
		this.lineList.forEach((line) => {
	    	if (random(0,100) < this.aberationProbability) {
	    		line.drawAberation();
	    	}

	    	line.draw();
			line.move();

			if (random(0,100) < this.jumpProbability) {
				line.jump(random(this.jumpDistance - this.jumpDistanceRoom, this.jumpDistance + this.jumpDistanceRoom)); // Distance par bon (+/- la marge)
			}

			if (!line.isBending && random(0,100) < this.bendProbability) {
				// var bendDelayMax = ;
				line.glitchBend(this.bendDuration); // Longueur du bend (exprimé en nombre de frame)
			}
			if (line.isBending){
				line.bend(random(this.bendAmplitude - this.bendAmplitudeRoom, this.bendAmplitude + this.bendAmplitudeRoom)); // Amplitude du bend (exprimé en nombre de pixels déplacés par frame)
			}

		});
	}

	mouseMoved(mouseX, mouseY) {
		this.bendProbability = int(map(mouseX, 0, windowWidth, 0, 100));
		this.bendDuration = int(map(mouseY, 0, windowHeight, 0, 100));
		console.log(`bendProbability =  ${this.bendProbability}, bendDuration =  ${this.bendDuration}`);
	}

	keyPressed() {
	  if (keyCode === ENTER) {
	    this.promptParameters();
	  }
	}

	promptParameters() {
		console.log("----------------------------------");
		console.log(`lineNumberMax = ${this.lineNumberMax}`);
		console.log(`jumpDistance = ${this.jumpDistance}`);
		console.log(`jumpDistanceRoom = ${this.jumpDistanceRoom}`);
		console.log(`bendProbability = ${this.bendProbability}`);
		console.log(`bendDuration = ${this.bendDuration}`);
		console.log(`bendAmplitude = ${this.bendAmplitude}`);
		console.log(`bendAmplitudeRoom = ${this.bendAmplitudeRoom}`);
		console.log(`aberationProbability = ${this.aberationProbability}`);
	}

	reset() {
		this.lineList = [];
	}

	setJumpProbability(jumpProbability) {
		this.jumpProbability = jumpProbability;
	}
	setJumpDistance(jumpDistance) {
		this.jumpDistance = jumpDistance;
	}
	setJumpDistanceRoom(jumpDistanceRoom) {
		this.jumpDistanceRoom = jumpDistanceRoom;
	}
	setBendProbability(bendProbability) {
		this.bendProbability = bendProbability;
	}
	setBendDuration(bendDuration) {
		this.bendDuration = bendDuration;
	}
	setBendAmplitude(bendAmplitude) {
		this.bendAmplitude = bendAmplitude;
	}

}

