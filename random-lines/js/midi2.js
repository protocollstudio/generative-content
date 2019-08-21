/*
* @Author: OMAO
* @Date:   2019-08-10 13:23:17
* @Last Modified by:   OMAO
* @Last Modified time: 2019-08-21 13:05:22
*/

console.log("------ MIDI 2");

WebMidi.enable(function (err) {

  if (err) {
    console.log("WebMidi could not be enabled.", err);
  } else {
    console.log("WebMidi enabled!");
  }

    console.log(WebMidi.inputs);
    console.log(WebMidi.outputs);

    let input = WebMidi.getInputByName("MIDI Mix");
    console.log(input);

    // Listen to NRPN message on all channels
    input.addListener('controlchange', "all",
        function (e) {
            updateMidi(e.controller.number, e.value);
        }
    );

});


