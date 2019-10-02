import p5 from 'p5';
import "p5/lib/addons/p5.sound";
import "lodash";

// sketches list

import * as randomLines from "./random-lines/js/sketch.js"
import * as glowingTiles from "./glowing-tiles/js/sketch.js"

let currentSketch = glowingTiles; // use the sketch you want to see :)

window.preload = currentSketch.preload;
window.setup = currentSketch.setup;
window.draw = currentSketch.draw;
window.keyPressed = currentSketch.keyPressed;
