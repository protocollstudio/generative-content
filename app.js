import p5 from 'p5';
import "p5/lib/addons/p5.sound";

// import * as rl from "./random-lines/js/sketch.js"
// import * as gt from "./glowing-tiles/js/sketch.js"
import * as ns from "./sphere-agents/js/sketch.js"
import * as xy from "./xy-sequencer/js/sketch.js"

let currentSketch = xy; // use the sketch you want to see :)

window.preload = currentSketch.preload;
window.setup = currentSketch.setup;
window.draw = currentSketch.draw;
window.keyPressed = currentSketch.keyPressed;
