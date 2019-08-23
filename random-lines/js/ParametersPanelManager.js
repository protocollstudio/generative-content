/*
* @Author: OMAO
* @Date:   2019-08-21 11:12:07
* @Last Modified by:   OMAO
* @Last Modified time: 2019-08-23 14:56:52
*/

class ParametersPanelManager {
	constructor(isVisible = false) {
		// DI
		//

		// parameters
		//
	    this.titleTextSize = 100;
	    this.normalTextSize = 30;
	    this.parameterOffset = 45;
	    this.xOffset = 20;

	    this.panelBgColor = color(0, 0, 0, 150);
	    this.panelTextColor = color(0, 200, 153);

	    this.isVisible = isVisible;

	}

	print(parameterList) {
	    fill(this.panelBgColor);
	    strokeWeight(0);
	    rect(0, 0, 600, 600);

	    fill(this.panelTextColor);

	    textSize(this.titleTextSize);
	    text("Parameters", this.xOffset, 100);

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
