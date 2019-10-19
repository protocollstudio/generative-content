class Util {
  saveOnKeyPressed() {
    if (key == 's' || key == 'S') {
      saveCanvas(gd.timestamp(), 'png');
    }
  }
}

export let util = new Util();
