let osc, envelope, oldX = 0, oldY = 0;
let note = 0;
let frame_release = 60;
let idle = 0;

function setup() {
  createCanvas(1100, 750);  
  
  osc = new p5.SinOsc();
  reverb = new p5.Reverb();
  // Instantiate the envelope
  envelope = new p5.Env();
  // set attackTime, decayTime, sustainRatio, releaseTime
  envelope.setADSR(0.001, 0.5, 0.1, 0.3, 0);
  // set attackLevel, releaseLevel
  envelope.setRange(0.1, 0.4, 0.1, 0.5);
  
  osc.start();
  reverb.process(osc, 2, 2);
}

function draw() {

    if(oldX == mouseX && oldY == mouseY){
        idle = min(idle + 1, 300);
    }
    else{
        idle = 0;
    }

    if (frameCount % frame_release === 0 || frameCount === 1) {

        if(idle<300){
            midiValue = 48 + int(mouseX/width * 12)-1;
        }
        else{
            midiValue = 42 + int(random(28));
        }

        
        let freqValue = midiToFreq(midiValue);
        osc.freq(freqValue);

        let dryWet = constrain(map(mouseY, 0, height, 0, 1), 0, 1);
        // 1 = all reverb, 0 = no reverb
        reverb.drywet(dryWet);

        envelope.play(osc, 0, 4);
        note = (note + 1) % 8;

        oldX = mouseX
        oldY = mouseY
    }

}