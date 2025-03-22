let osc, envelope, oldX = 0, oldY = 0;
let note = 0;
let frame_release = 25;
let idle = 0;
let idle_limit = 120;

let muteButton, muteState;

var audio_context = new AudioContext;
var audio_no_permission = true;

function setup() {
    createCanvas(windowWidth-14 , 10); 
  
    // make the mute button
    muteState = true;
    outputVolume(0, 0);

    osc = new p5.SinOsc();
    reverb = new p5.Reverb();
    // Instantiate the envelope
    envelope = new p5.Envelope();
    // set attackTime, decayTime, sustainRatio, releaseTime
    envelope.setADSR(0.001, 0.5, 0.1, 0.3, 0);
    // set attackLevel, releaseLevel
    envelope.setRange(0.1, 0.4, 0.1, 0.5);
    
    osc.start();
    reverb.process(osc, 2, 2);

}

function draw() {

    if(audio_context.state=='running'){
        if(oldX == mouseX && oldY == mouseY){
            idle = min(idle + 1, idle_limit);
        }
        else{
            idle = 0;
        }

        if (frameCount % frame_release == 0 || frameCount === 1) {
    
            if(idle<idle_limit){
                midiValue = 48 + int(mouseX/width * 12)-1;
            }
            else{
                midiValue = 42 + int(random(28));
            }
    
            
            let freqValue = midiToFreq(midiValue);
            osc.freq(freqValue);    
            
            let dryWet = constrain(map(mouseY, -900, height, 0, 1), 0, 1);
            reverb.drywet(dryWet);
    
            envelope.play(osc, 0, 4);
            note = (note + 1) % 8;
    
            oldX = mouseX
            oldY = mouseY
        }
    }   

}

function toggleAudioContext() {
    if(audio_context.state=='suspended'){
        audio_context.resume();
    }
}

function toggleMute() {
    
    if(audio_no_permission){
        userStartAudio();
        audio_no_permission = false;
    }

    toggleAudioContext();

    if (muteState === false) {
        document.getElementById("mute_button").src = "icons/player/mute-48.png";
        outputVolume(0, 1);
        muteState = true;//adjusts state variable
    } else {
        document.getElementById("mute_button").src = "icons/player/voice-48.png";
        outputVolume(1, 1);
        muteState = false; //adjusts state variable
    }
}