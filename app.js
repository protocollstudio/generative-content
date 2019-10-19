import p5 from 'Node/p5';
import "Node/p5/lib/addons/p5.sound";
import "Node/lodash";

// sketches list

//import * as randomLines from "Sketches/random-lines/sketch.js"
//import * as glowingTiles from "Sketches/glowing-tiles/sketch.js"
//import * as p1_01 from "Sketches/generative-design/p1-color/p1_01/sketch"
import * as p1_02 from "Sketches/generative-design/p1-color/p1_02/sketch"

let currentSketch = p1_02; // use the sketch you want to see :)

window.preload = currentSketch.preload;
window.setup = currentSketch.setup;
window.draw = currentSketch.draw;
window.keyPressed = currentSketch.keyPressed;
