let osc, envelope, oldX = 0, oldY = 0;
let note = 0;
let frame_release = 26;
let idle = 0;
let idle_limit = 120;

let muteButton, muteState, tabActiveState;

var audio_context = new AudioContext;
var audio_no_permission = true;

// Drum MAchine variables
let kick_osc, kick_envelope;
let snare_osc, snare_envelope;
let hihat_osc, hihat_envelope;
let ride_osc, ride_envelope;
let ride_osc_list = [];
let ride_envelope_list = [];


function setup() {
    createCanvas(windowWidth-14 , 10); 
  
    // make the mute button
    tabActiveState = true;
    muteState = true;
    outputVolume(0, 0);

    osc = new p5.SinOsc();
    reverb = new p5.Reverb();
    // Instantiate the envelope
    envelope = new p5.Envelope();
    // set attackTime, decayTime, sustainRatio, releaseTime
    envelope.setADSR(0.001, 0.62, 0.12, 0.3);
    // set attackLevel, releaseLevel
    envelope.setRange(0.1, 0.6, 0.1, 0.45);
    // envelope.setRange(0.1, 0.7);
    
    // setup the drums
    setup_drum_machine();
    
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
                midiValue = 68 + int(mouseX/width * 12)-1;
            }
            else{
                midiValue = 62 + int(random(28));
            }
    
            
            let freqValue = midiToFreq(midiValue);
            osc.freq(freqValue);    
            
            let dryWet = constrain(map(mouseY, -400, 500, 0, 0.75), 0, 1);
            reverb.drywet(dryWet);

    
            envelope.play(osc, 0, 4);
            note = (note + 1) % 8;

            oldX = mouseX;
            oldY = mouseY;
        }

        // DRUM MACHINE!

        // right-leg
        if (frameCount % (4*frame_release) == 0 || (frameCount + 15*frame_release) % (16*frame_release) == 0){
            play_kick();
        }
        // left-hand
        if ((frameCount + 2*frame_release) % (4*frame_release) == 0 || (frameCount + 7*frame_release) % (12*frame_release) == 0){
            play_snare();
        }
        
        // right-hand
        if (frameCount % (16*frame_release) == 0){
            play_ride();
        }
        else if (frameCount % (1*frame_release) == 0){
            play_hihat();
        }

        // check if user moved away from the tab
        if (document.hidden){
            osc.stop();
            kick_osc.stop();
            tabActiveState = false;
        }
        else if(!tabActiveState){
            osc.start();
            tabActiveState = true;
        }
    }   

}


// Setting up the drums and their playing patterns
function setup_drum_machine(){
    
    // setup KICK
    kick_osc = new p5.SinOsc();
    kick_osc.freq(120); // starting frequency
    kick_envelope = new p5.Envelope();
    kick_envelope.setADSR(0.001, 0.2, 0.125, 0.1);
    kick_envelope.setRange(2.0, 0.0);
    reverb.process(kick_envelope,1,1);

    // setup SNARE - will need a tonal base followed by a noise
    snare_osc = new p5.SinOsc();
    snare_envelope = new p5.Envelope();

    snare_osc.freq(180 + random(-10,10));    
    snare_envelope.setADSR(0.001, 0.2, 0.1, 0.1);
    snare_envelope.setRange(0.5, 0.0);

    // Bandpass filter to shape snare noise
    snare_noise = new p5.Noise('white');
    snare_filter = new p5.BandPass();
    snare_noise_envelope = new p5.Envelope();

    snare_filter.freq(1800);  // center frequency
    snare_filter.res(1);      // resonance
    snare_noise.disconnect();
    snare_noise.connect(snare_filter);
        
    snare_noise_envelope.setADSR(0.001, 0.1, 0.1, 0.1);
    snare_noise_envelope.setRange(0.5, 0.0);

    // setup HIHAT(closed) - will need noise like snare but tonla will be at a much highher frequency
    hihat_osc = new p5.SinOsc();
    hihat_envelope = new p5.Envelope();

    hihat_osc.freq(11480 + random(-200,200));    
    hihat_envelope.setADSR(0.001, 0.07, 0, 0.07);
    hihat_envelope.setRange(0.6, 0.0);

    hihat_noise = new p5.Noise('white');
    hihat_filter = new p5.BandPass();
    hihat_noise_envelope = new p5.Envelope();

    hihat_filter.freq(14000);  
    hihat_filter.res(1);      // resonance
    hihat_noise.disconnect();
    hihat_noise.connect(hihat_filter);
    
    hihat_noise_envelope.setADSR(0.001, 0.07, 0, 0.07);
    hihat_noise_envelope.setRange(0.5, 0.0);

    // setup CYMBAL(Ride) - will need to build metalic harmonics and then add noise with a high pass filter
    base = 440;
    harmonic_freq = [base, base*2-random(-20,20), base*3-random(-40,40), base*4-random(-80,80), base*5-random(-40,40)-random(-160,160)];
    
    ride_osc = new p5.SinOsc();
    ride_envelope = new p5.Envelope();
    for(let f of harmonic_freq){
        ride_osc.freq(f + random(-20,20));
        ride_osc.amp(0);
        ride_osc.start();
        ride_osc_list.push(ride_osc);
        
        ride_envelope.setADSR(0.001, 0.4, 0.6, 1);
        ride_envelope.setRange(0.03, 0.0);
        ride_envelope_list.push(ride_envelope);
    }

    ride_noise = new p5.Noise('white');
    ride_filter = new p5.HighPass();
    ride_noise_envelope = new p5.Envelope();

    ride_filter.freq(5000);  // higer frequency
    ride_noise.disconnect();
    ride_noise.connect(ride_filter);
    
    ride_noise_envelope.setADSR(0.001, 0.4, 0.6, 1);
    ride_noise_envelope.setRange(0.1, 0.0);

}

function play_kick() {
    // Trigger kick oscillator
    kick_osc.start();   
    kick_osc.freq(120, 0.05); // drop to ~120 in 50ms
    kick_osc.freq(60, 0.15);  // glide down to ~50 Hz 
    kick_envelope.play(kick_osc);
}

function play_snare() {
    // Trigger kick oscillator along with the noise
    snare_osc.start();
    snare_envelope.play(snare_osc);    
    snare_noise.start();
    snare_noise_envelope.play(snare_noise);

    setTimeout(() => {
        snare_noise.stop();
    }, 300); 
}

function play_hihat(){
    // Trigger kick oscillator along with the noise
    hihat_osc.start();
    hihat_envelope.play(hihat_osc);    
    hihat_noise.start();
    hihat_noise_envelope.play(hihat_noise);

    setTimeout(() => {
        hihat_noise.stop();
    }, 100); 
}

function play_ride(){

    for (let i = 0; i < ride_osc_list.length; i++) {
        ride_envelope_list[i].play(ride_osc_list[i]);
    }
    ride_noise.start();
    ride_noise_envelope.play(ride_noise);

    setTimeout(() => {
        ride_noise.stop();
    }, 3000); 
}

// Function for controling th audio context and muting functionalities

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