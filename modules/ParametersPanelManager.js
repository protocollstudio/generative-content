class ParametersPanelManager {
  setup(isVisible = false) {

    this.isVisible = isVisible;

    this.titleText = "Parameters";
    this.titleTextSize = 100;
    this.titleTextXPos = 100;

    this.normalTextSize = 30;
    this.parameterLineHeight = 45;
    this.xOffset = 40;
    this.yOffset = this.titleTextSize + 20;

    this.panelBgColor = color(0, 0, 0, 250);
    this.panelWidth = 600;
    this.panelHeight = 600;

    this.panelTextColor = color(0, 200, 153);

    this.changeVisibilityKey = ENTER;
  }

  draw(parameterList = []) {
    if (!this.isVisible) {
      return;
    }

    push();
    rectMode(CORNER);

    // draw background
    fill(this.panelBgColor);
    strokeWeight(0);
    rect(0, 0, this.panelWidth, this.panelHeight);

    // draw title
    this.printTitle();
    if (parameterList.length > 0) { this.printParameters(parameterList); }
    else {
      textSize(this.normalTextSize);
      text("{no parameter}", this.xOffset, this.yOffset + this.parameterLineHeight);
    }
    pop();
  }

  keyPressed() {
    if (keyCode == this.changeVisibilityKey) {
      this.changeVisibility();
    }
  }

  printTitle() {
    fill(this.panelTextColor);
    textSize(this.titleTextSize);
    text(this.titleText, this.xOffset, this.titleTextXPos);
  }

  printParameters(parameterList) {
    textSize(this.normalTextSize);
    parameterList.forEach((param, index) => {
      text(param.parameterName + " = " + _.get(param.object, param.propertyName), this.xOffset, this.yOffset + this.parameterLineHeight * (index + 1));
    });
  }

  createParameter(parameterName, object, propertyName) {
    return {
      "parameterName": parameterName,
      "object": object,
      "propertyName": propertyName
    }
  }

  isVisible() {
    return this.isVisible;
  }

  changeVisibility() {
    this.isVisible = !this.isVisible;
  }
}

export let parametersPanelManager = new ParametersPanelManager();
