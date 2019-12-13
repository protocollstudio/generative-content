import p5 from 'Node/p5';
import 'Node/p5/lib/addons/p5.sound';
import 'Node/lodash';

// sketches list

//import * as currentSketch from "Sketches/random-lines/sketch.js";
//import * as currentSketch from "Sketches/glowing-tiles/sketch.js";
//import * as currentSketch from "Sketches/generative-design/p1-color/p1_01/sketch";
//import * as currentSketch from "Sketches/generative-design/p1-color/p1_02/sketch";
import * as currentSketch from 'Sketches/generative-design/p1-color/p1_03/sketch';

window.preload = currentSketch.preload;
window.setup = currentSketch.setup;
window.draw = currentSketch.draw;
window.keyPressed = currentSketch.keyPressed;
window.mouseClicked = currentSketch.mouseClicked;
