/*
* @Author: OMAO
* @Date:   2018-09-05 08:37:26
* @Last Modified by:   OMAO
* @Last Modified time: 2019-09-20 16:42:05
*/

import p5 from 'p5';
import {GlitchLine} from "./GlitchLine.js"

class LineManager {

  constructor() {
    this.lineList = [];
    this.lineNumberMax        = 200;

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

  generateLineList(max = this.lineNumberMax) {
    for(let i = 0; i < random(0,max); i++) {
      this.generateLine();
    }
  }

  generateLine() {
    let lineColor = color(random(50, 255));
    let linePosition = random(0, height);
    let lineSpeed = random(1, 15);
    let lineWeight = random(2, 5);

    this.lineList.push(new GlitchLine(lineColor, linePosition, lineSpeed, lineWeight));
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

  mouseMoved() {
    this.bendProbability = int(map(mouseX, 0, windowWidth, 0, 100));
    this.bendDuration = int(map(mouseY, 0, windowHeight, 0, 100));
    this.updateLineNumber(mouseX, windowWidth);
  }

  updateLineNumber(currentValue, maxValue) {
    let lineCount = int(map(currentValue, 0, maxValue, 0, this.lineNumberMax));
    if (lineCount < this.lineList.length) {
      this.lineList = this.lineList.slice(0,lineCount);
    }
    else {
      this.generateLineList(lineCount - this.lineList.length);
    }

  }

  reset() {
    this.lineList = [];
  }

  getLineCount() {
    return this.lineList.length;
  }

}

export let lineManager = new LineManager();
