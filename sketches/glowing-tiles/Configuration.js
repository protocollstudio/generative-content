class Configuration {
  setup() {
    this.tileSize = 25;
    this.soundAvg;
    this.panelSide = width / this.tileSize;
  }
}

export let configuration = new Configuration();
