class Configuration {
  constructor() {
    this.panelSide;
    this.tileSize = 25;
    this.soundAvg;
  }
  setup() {
    this.panelSide = width / this.tileSize;
  }
}

export let configuration = new Configuration();
