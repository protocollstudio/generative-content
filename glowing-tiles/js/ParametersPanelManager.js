/*
* @Author: OMAO
* @Date:   2019-09-16 16:39:50
* @Last Modified by:   OMAO
* @Last Modified time: 2019-09-20 16:08:42
*/

// need p5 global

class ParametersPanelManager {
  constructor() {
    this.titleTextSize = 100;
    this.normalTextSize = 30;
    this.parameterOffset = 45;
    this.xOffset = 20;

    //this.panelBgColor = color(0, 0, 0, 200);
    this.panelBgColor = 12;
    this.panelWidth = 1200;
    this.panelHeight = 1200;

    //this.panelTextColor = color(0, 200, 153);
    this.panelTextColor = 200;
  }
  setup(isVisible = false) {
    this.isVisible = isVisible;
  }

  print(parameterList) {
      if (!this.isVisible) {
        return;
      }

      // draw background
      fill(this.panelBgColor);
      strokeWeight(0);
      rect(0, 0, this.panelWidth, this.panelHeight);

      this.printTitle();
      this.printParameters(parameterList);
  }

  printTitle() {
      fill(this.panelTextColor);
      textSize(this.titleTextSize);
      text("Parameters", this.xOffset, 100);
  }

  printParameters(parameterList) {
    textSize(this.normalTextSize);
      parameterList.forEach((value, index) => {
        text(value[0] + " = " + value[1], this.xOffset + 20, this.titleTextSize + 20 + this.parameterOffset * (index + 1));
      });
  }

  isVisible() {
    return this.isVisible;
  }

  changeVisibility() {
    this.isVisible = !this.isVisible;
  }
}

export let parametersPanelManager = new ParametersPanelManager();
