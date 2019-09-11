/*
* @Author: OMAO
* @Date:   2019-08-22 12:43:03
* @Last Modified by:   OMAO
* @Last Modified time: 2019-08-22 13:27:51
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

