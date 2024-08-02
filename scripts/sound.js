let osc, envelope, oldX = 0, oldY = 0;
let note = 0;
let frame_release = 35;
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


function draw() {

    if(audio_context.state=='running'){

        d_bass_sets = [1, 0, 1, 0]
        d_bass_on = d_bass_sets[0]
        d_snare_sets = [[0, 1, 0, 1],[0, 1, 1, 1]]
        d_snare_on = d_bass_sets[0]
    
        if (frameCount % frame_release === 0 || frameCount === 1) {
    
            //envelope.play(osc, 0, 10);
            if(d_bass_on[i]){
                d_bass.play_me();
            }
            if(Math.random()>0.75){
                temp = 1;
            }
            else{
                temp = 0;
            }
            if(d_snare_on[i]){
                d_snare.play_me();
            }

            // create a manual beat tracker
            i = i + 1;
            if(i == 4){
                // reset at 4th beat
                i = 0;
                
                // reset to a random snare pattern
                
            }
        }
    }   

}


// turns on the audio context to the js code for audio in the browser window
function toggleAudioContext() {
    if(audio_context.state=='suspended'){
        audio_context.resume();
    }
}

// Works with the mute button to mute/unmute sound on window
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