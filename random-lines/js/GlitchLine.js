/*
* @Author: OMAO
* @Date:   2018-09-05 08:17:16
* @Last Modified by:   OMAO
* @Last Modified time: 2019-09-20 16:34:38
*/

export class GlitchLine {

  constructor(color, position, speed, weight) {
    this.color = color;
    this.positionStart = position;
    this.positionEnd = position;
    this.speed = speed;
    this.weight = weight;
    this.isBending = false;
    this.aberationLineOffset = 10;
  }

  move(speed) {
    if (speed === undefined) {
      speed = this.speed;
    }

    this.positionStart = this.positionStart - speed;
    this.positionEnd = this.positionEnd - speed;

    if (this.positionStart < 0) {
      this.positionStart = height;
      this.positionEnd = height;
    }
  }

  jump(distance) {
    this.move(distance);
  }

  glitchBend(bendDelayMax) {
    this.isBending = true;
    this.bendDelay = 0;
    this.bendDelayMax = bendDelayMax;
    this.bendDirection = round(random(20) % 2) == 0 ? "right" : "left";
  }

  bend(bendOffset) {
    if (this.bendDirection == "right") {
      this.bendRight(bendOffset);
    }
    else {
      this.bendLeft(bendOffset);
    }

    this.bendDelay++;

    if (this.bendDelay >= this.bendDelayMax) {
      this.bendDelay = 0;
      this.isBending = false;
      this.positionStart = this.positionEnd;
    }
  }

  bendRight(bendOffset) {
    this.positionStart -= bendOffset;
    this.positionEnd += bendOffset;
  }

  bendLeft(bendOffset) {
    this.positionStart += bendOffset;
    this.positionEnd -= bendOffset;
  }

  draw() {
    stroke(this.color);
    strokeWeight(this.weight);
    line(0, this.positionStart, width, this.positionEnd);
  }
  drawAberation() {

    if (random(100) < 50) {
      stroke(255, 0, 0);
    } else {
      stroke(0, 0, 255);
    }

		/*strokeWeight(this.weight);
		line(0, this.positionStart - random(0,this.aberationLineOffset), width, this.positionEnd + random(0,this.aberationLineOffset));*/

    strokeWeight(this.weight);
    line(0, this.positionStart + random(0, this.aberationLineOffset), width, this.positionEnd + random(0, this.aberationLineOffset));
  }
}
