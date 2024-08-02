let osc, envelope, oldX = 0, oldY = 0;
let note = 0;
let frame_release = 25;
let idle = 0;
let i = 0;

let muteButton, muteState;

var audio_context = new AudioContext;
var audio_no_permission = true;

function setup() {
    createCanvas(1100, 10); 
  
    // make the mute button
    muteState = true;
    outputVolume(0, 0);

    // generate all synth variables
    d_bass = new drum_bass();
    d_snare = new drum_snare();

}

function draw_old_theremin() {

    if(audio_context.state=='running'){
        if(oldX == mouseX && oldY == mouseY){
            idle = min(idle + 1, 300);
        }
        else{
            idle = 0;
        }
    
        if (frameCount % frame_release === 0 || frameCount === 1) {
    
            if(idle<300){
                midiValue = 48 + int(mouseX/width * 12)-2;
            }
            else{
                midiValue = 42 + int(random(28))-1;
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

}
