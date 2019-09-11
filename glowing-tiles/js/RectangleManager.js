/*
* @Author: OMAO
* @Date:   2019-09-11 11:32:35
* @Last Modified by:   OMAO
* @Last Modified time: 2019-09-11 12:03:36
*/

// need p5
// need Rectangle

class RectangleManager {

  constructor() {
    this.rectList = [];

    this.scaleChance = 0; // 0 -> 100
    this.scaleAmountMax = 1; // 0 -> 7
    this.scaleAmountMin = 0.5; // 0 -> 7
    this.rectScaleInitMin = 1; // 0 -> 7
    this.rectScaleInitMax = 1; // 0 -> 7

    this.opacityChance = 0; // 0 -> 100

    this.angleChance = 0; // 0 -> 100
    this.initAnglePerturbation = 0; // 0 -> 90
    this.rotationSpeedMax = 0; // 1 -> 20
  }

  createRectangleList() {
    for(let i = 0; i < panelSide; i++) {
      for(let j = 0; j < panelSide; j++) {
        let side = random(tileSize * this.rectScaleInitMin, tileSize * this.rectScaleInitMax);
        this.rectList.push(new Rectangle(i * tileSize, j * tileSize, side, side, random(0,this.initAnglePerturbation), this.rotationSpeedMax));
        //console.log("["+ this.rectList.length - 1 +"] = " + this.rectList[this.rectList.length - 1].hypotenuse);
      }
    }
  }

  drawRectangleList() {
    background(0);

    this.rectList.forEach((rectangle, index) => {
      this.editScale(rectangle);
      this.editOpacity(rectangle);
      this.editAngle(rectangle);
      rectangle.draw();
    });
  }


  editScale(rectangle) {
    if (random(0,100) <= this.scaleChance) {
      let scaleAmount = random(this.scaleAmountMin, this.scaleAmountMax);
      //let scaleAmount = map(soundAvg, 0, 255, 0, scaleAmountMax);
      //scaleAmountMax = map(mouseX, 0, width, 0, 7);
      rectangle.scaleX = scaleAmount;
      rectangle.scaleY = scaleAmount;
    }
  }

  editOpacity(rectangle) {
    if (random(0,100) <= this.opacityChance) {
      rectangle.opacity = random(0, 255);
    }
  }

  editAngle(rectangle) {
    if (random(0,100) <= this.angleChance) {
      rectangle.angle += rectangle.rotationSpeed;
    }
  }

  // To delete : car double emploi avec MIDI
  updateScaleChance() { this.scaleChance = (mouseY / height) * 100; }
  updateOpacityChance() { this.opacityChance = (mouseY / width) * 100; }
  updateAngleChance() { this.angleChance = (mouseY / height) * 100; }

}
