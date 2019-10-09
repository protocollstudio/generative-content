/*
* @Author: OMAO
* @Date:   2019-10-09 12:25:06
* @Last Modified by:   OMAO
* @Last Modified time: 2019-10-09 12:27:24
*/

import p5 from 'Node/p5';
import "Node/p5/lib/addons/p5.sound";
import "Node/lodash";

// sketches list
import * as randomLines from "Sketches/random-lines/sketch.js"
import * as glowingTiles from "Sketches/glowing-tiles/sketch.js"
import * as sphereAgents from "Sketches/sphere-agents/js/sketch.js"
import * as xySequencer from "Sketches/xy-sequencer/js/sketch.js"

let currentSketch = xySequencer; // use the sketch you want to see :)

window.preload = currentSketch.preload;
window.setup = currentSketch.setup;
window.draw = currentSketch.draw;
window.keyPressed = currentSketch.keyPressed;
