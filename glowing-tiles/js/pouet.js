alert("coucou");

import p5 from '@node/p5';
import { parametersPanelManager } from "@modules/ParametersPanelManager.js"

export function setupPouet() {
  alert("pouet");
  fill(255);
  textSize(10));
  text("POUET", 10, 100);
  parametersPanelManager.setup(true);
}

export function drawMyPouet() {
  parametersPanelManager.print();
}


