let osc, envelope;
let note = 0;
let frame_release = 60;

function setup() {
  createCanvas(1100, 750);  
  
  osc = new p5.SinOsc();
  // Instantiate the envelope
  envelope = new p5.Env();
  // set attackTime, decayTime, sustainRatio, releaseTime
  envelope.setADSR(0.001, 0.6, 0.1, 0.8);
  // set attackLevel, releaseLevel
  envelope.setRange(1, 0);
  
  osc.start();
}

function draw() {

    if (frameCount % frame_release === 0 || frameCount === 1) {
        let midiValue = 60 + int(mouseX/width * 8)-1;
        let freqValue = midiToFreq(midiValue);
        osc.freq(freqValue);

        envelope.play(osc, 0, 0.45);
        note = (note + 1) % 8;
        frame_release = 60 + int(mouseY/height * 60)-1;       
    }

}