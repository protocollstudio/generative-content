alert("coucou");

import p5 from 'Node/p5';
import { parametersPanelManager } from "Modules/ParametersPanelManager.js"

export function setupPouet() {
  alert("pouet");
  parametersPanelManager.setup(true);
}

export function drawMyPouet() {
  parametersPanelManager.print();
  fill(255);
  textSize(50);
  text("POUET", 10, 200);
}


