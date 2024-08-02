let osc, envelope, oldX = 0, oldY = 0;
let note = 0;
let frame_release = 20;
let idle = 0;
let i = 0;
let arp_num = 0;

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
    // i_sparkles = new sprinkle_clouds();

    // TEMP CODE

    d_bass_sets = [[1, 0, 0, 0],[1, 0, 1, 0],[1, 0, 1, 1]];
    d_bass_on = d_bass_sets[0];
    d_snare_sets = [[0, 1, 0, 1],[0, 1, 1, 1]];
    d_snare_on = d_bass_sets[0];

}


function draw() {

    if(audio_context.state=='running'){

        beat = int(frameCount / frame_release);

        if (frameCount % frame_release === 0 || frameCount === 1) {
    
            //envelope.play(osc, 0, 10);
            if(d_bass_on[i]){
                d_bass.play_me();
            }
            if(d_snare_on[i]){
                d_snare.play_me();
            }

            // if(beat >= 48){
            //     if(i == 0 || i == 2){
            //         i_sparkles.play_me(arp_num, i);
            //     }
            //     else{
            //         if(beat>=80){
            //             if(Math.random() > 0.7){
            //                 i_sparkles.play_me(arp_num, i);
            //             }
            //         }
            //         if(beat>=120){
            //             if(Math.random() > 0.3){
            //                 i_sparkles.play_me(arp_num, i);
            //             }
            //         }
            //     }                    
            // }

            // create a manual beat tracker
            i = i + 1;
            // reset at 4th beat
            if(i == 4){
                
                i = 0;
                
                // reset to a random snare pattern
                if(Math.random() > 0.7){
                    d_snare_on = d_snare_sets[1];
                }
                else{
                    d_snare_on = d_snare_sets[0];
                }
                
                // rset bass pattern
                if(beat % 8*4 == 0){
                    d_bass_on = d_bass_sets[1];
                }
                else{
                    if(beat % 10*4 == 0){
                        d_bass_on = d_bass_sets[2];
                    }
                    else{
                        if(beat % 12*4 == 0){
                            d_bass_on = d_bass_sets[0];
                        }  
                    }                        
                }
                

                // reset to arpegiator
                if(beat>64){
                    if(Math.random() > 0.92){
                        arp_num = 3
                    }
                    if(Math.random() > 0.84){
                        arp_num = 2
                    }
                    if(Math.random() > 0.75){
                        arp_num = 1;
                    }
                    else{
                        arp_num = 0;
                    }
                }
                
            }
            console.log('Beat: ',beat, d_bass_on);
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