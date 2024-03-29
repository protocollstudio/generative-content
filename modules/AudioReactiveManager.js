import p5 from 'p5';
// impossible d'importer un module spécifique dans un module générique ! anyé !

class AudioReactiveManager {

  constructor() {
    return this;
  }

  preload(soundFilePath = 'Assets/lille.mp3') {
    this.soundFilePath = `Assets/${this.getRandomSoundName()}`;
    this.sound = loadSound(this.soundFilePath);
    return this;
  }

  setup() {
    this.soundAvg = 0;
    this.fft = new p5.FFT();
    this.sound.amp(1);
    this.sound.play();
    //this.sound.jump(int(random(120, 300)), 2);
    return this;
  }

  analyse() {
    this.spectrum = this.fft.analyze();
    return this;
  }

  processSound() {
    if (this.spectrum == undefined) {
      return this;
    }

    let spectrumSize = 200;
    //let spectrumSize = this.spectrum.length;
    let initSize = 500;
    let total = 0;

    for (var i = initSize; i < initSize + spectrumSize; i++) {
      total += this.spectrum[i];
      /*
        fill(255,0,0);
        var x = map(i, 0, this.spectrum.length, 0, width);
        var h = -height + map(this.spectrum[i], 0, 255, height, 0);
        rect(x, height, width / this.spectrum.length, h);
      */
    }
    let newAvg = int(total / (spectrumSize));
    let spaceBetweenAvgMax = 5;
    this.soundAvg = abs(newAvg - this.soundAvg) > spaceBetweenAvgMax ? newAvg : this.soundAvg;
    /*textSize(50);
    fill(89, 255, 200);
    text(this.soundAvg, 10, 100);
    if (this.soundAvg * 4 > 255) {
      text(">255", 10, 160);
    }*/
    // configuration.soundAvg = this.soundAvg;

    return this;
  }

  getRandomSoundName() {
    let soundNameList = [
      "fanfare-trumpets.mp3",
      "success.wav",
      "success-jingle.wav"
    ];
    return soundNameList[int(random(0, soundNameList.length - 1))];
  }

}
export let audioReactiveManager = new AudioReactiveManager();
