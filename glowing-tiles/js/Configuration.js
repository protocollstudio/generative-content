/*
* @Author: OMAO
* @Date:   2019-09-16 14:01:44
* @Last Modified by:   OMAO
* @Last Modified time: 2019-09-20 15:03:44
*/

// need p5 global

class Configuration {
  constructor() {
    this.panelSide;
    this.tileSize = 25;
    this.soundAvg;
  }

  init() {
    this.panelSide = width / this.tileSize;
  }
}

export let configuration = new Configuration();
