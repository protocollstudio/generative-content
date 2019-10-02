import { global } from "./Global.js"
class Grid {

  constructor() {

  }

  init() {
   global.cellSize = floor(min(height / (rows + 4), width / (cols + 4)));
   global.squares = [];
   for (let i = 0; i < global.cols; i++) {
     for (let j = 0; j < global.rows; j++) {
        squares[i][j] = 0;
     }
   }
  }
}