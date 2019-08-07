/*
* @Author: OMAO
* @Date:   2018-09-05 08:37:26
* @Last Modified by:   OMAO
* @Last Modified time: 2019-08-07 12:16:11
*/

class LineManager {

	constructor() {
		this.lineList = [];
	}

	// methods

	addLine() {
		let lineColor = color(random(50, 255));
		let linePosition = random(0, height);
		let lineSpeed = random(1, 15);
		let lineWeight = random(2, 5);

		this.lineList.push(new GlitchLine(lineColor, linePosition, lineSpeed, lineWeight));
	}

	draw() {
		this.lineList.forEach((line) => {
	    line.draw();
			line.move();

			if (random(0,100) > 95) {
				var distance = random(5, 100); // Distance par bon
				line.glitchMove(distance);
			}

			if (!line.isBending && random(0,100) > 95) {
				var bendDelayMax = random(5,20); // Longueur du bend (exprimé en nombre de frame)
				line.glitchBend(bendDelayMax);
			}
			if (line.isBending){
				var bendOffset = random(10); // Vitesse du ben (exprimé en nombre de pixels déplacés par frame)
				line.bend(bendOffset);
			}

		});
	}

	reset() {
		this.lineList = [];
	}

}

