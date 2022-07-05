let osc, envelope, oldX = 0, oldY = 0;
let note = 0;
let frame_release = 60;
let idle = 0;

function setup() {
  createCanvas(1100, 750);  
  
  osc = new p5.SinOsc();
  // Instantiate the envelope
  envelope = new p5.Env();
  // set attackTime, decayTime, sustainRatio, releaseTime
  envelope.setADSR(0.1, 0.4, 0.2, 0.3);
  // set attackLevel, releaseLevel
  envelope.setRange(0.9, 0);
  
  osc.start();
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
            midiValue = 48 + int(mouseX/width * 8)-1;
        }
        else{
            midiValue = 42 + int(random(28));
        }

        
        let freqValue = midiToFreq(midiValue);
        osc.freq(freqValue);

        envelope.play(osc, 0, 5);
        note = (note + 1) % 8;
        if(note % 4 == 0){
            frame_release = 65 + int(mouseY/height * 60)-1;
        }        

        oldX = mouseX
        oldY = mouseY
    }

}