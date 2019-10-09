class Global {
  constructor() {
    this.fgColor;
    this.bgColor;
    this.cols;
    this.rows;
    this.cellSize;
    this.squares;
    this.currentTime;
    this.speed;
    this.cursorX;
    this.cursorY;
    this.frame;
  }

  init() {
    // interface colors
    this.fgColor = 70;
    this.bgColor = 240;
    // sequenceur size
    this.cols = 2;
    this.rows = 2;
    // cursor position & speed
    this.cursorX = 0;
    this.cursorY = 0;
    this.speed = 5;
    // time management
    this.frame = 1;
  }
}

export let global = new Global();