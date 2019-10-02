import { global } from "./Global.js"
import { grid } from "./Grid.js"
export { setup, draw }


function setup() {
  createCanvas(windowWidth, windowHeight);
  grid.init();
}

function draw() {
  background(global.bgColor);
  translate(global.cellSize * 2, global.cellSize * 2);


}
