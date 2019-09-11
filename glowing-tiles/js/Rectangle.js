/*
* @Author: OMAO
* @Date:   2019-08-23 15:52:46
* @Last Modified by:   OMAO
* @Last Modified time: 2019-09-11 10:24:33
*/

class Rectangle {

  constructor(x, y, rectangleWidth, rectangleHeight, angle) {
    this.x = x;
    this.y = y;
    this.width = rectangleWidth;
    this.height = rectangleHeight;
    this.hypotenuse = int(abs(Math.sqrt(Math.pow(this.x - width / 2 ,2) + Math.pow(this.y - height / 2,2))));
    this.angle = angle;

    this.scaleX = 1;
    this.scaleY = 1;
    this.opacity = random(0, 255);
    this.updateRotationSpeed();
  }

  updateRotationSpeed() {
    this.rotationSpeed = random(-rotationSpeedMax,rotationSpeedMax);
  }

  draw() {
    push();
    translate(this.x, this.y);

    //angle
    rotate(this.angle);
    //this.angle += 1;

    //scale
    scale(this.scaleX, this.scaleY);

    //stroke
    stroke(0);
    strokeWeight(0);

    //draw rectangle
/*    let red = map(this.hypotenuse, 0, 900, 0, 255);
    let green = map(mouseY, 0, windowWidth, 0, 255);
    let blue = map(mouseX, 0, windowWidth, 0, 255);
*/
//    let red = map(soundAvg * 2, 0, 255, 0, 255);
    let red = 255;
    let green = 255;
    let blue = 255;

    fill(red,green,blue,this.opacity);
    rect(0, 0, this.width, this.height);

    pop();
  }

}
