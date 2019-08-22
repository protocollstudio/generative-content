/*
* @Author: OMAO
* @Date:   2019-08-22 12:43:03
* @Last Modified by:   OMAO
* @Last Modified time: 2019-08-22 12:46:09
*/

class MidiMixManager extends EventTarget {
  constructor(content) {
    super();
    this._content = content;
    this._color = "#444";
  }

  get content() { return this._content; }
  get color() { return this._color; }
};

var midiMixManager = new MidiMixManager("poil");

midiMixManager.addEventListener(EVENT.TRACK_01_KNOB_01, function(e) {
  console.log(e);

  this._content = e.detail.note;
  this._color = e.detail.velocity;

  console.log("content = " + this._content);
  console.log("color = " + this._color);

  // fait le job
  /*const paragraph = document.getElementById("para1");
  paragraph.innerHTML = this._content;
  paragraph.style.color = this._color;*/
});

