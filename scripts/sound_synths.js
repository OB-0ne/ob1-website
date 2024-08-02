class drum_bass {
    
    osc = new p5.SinOsc();
    env = new p5.Envelope();
    reverb = new p5.Reverb();

    constructor(){
        this.osc.start();
        this.osc.amp(0.6);
        this.osc.freq(58);
    
        // Instantiate the envelope
        this.env.setADSR(0.001, 0.6, 0.4, 0.2);
        this.env.setRange(1, 0);

        // add some reverb
        this.reverb.process(this.osc, 0.1, 0.2);
        this.reverb.drywet(.4);
    }

    /**
     * This plays the synth when triggered
     */
    play_me() {
        this.env.play(this.osc,0,0);
    }
}

class drum_snare {
    
    osc = new p5.SinOsc();
    env = new p5.Envelope();
    reverb = new p5.Reverb();

    constructor(){
        this.osc.start();
        this.osc.amp(0.15);
        this.osc.freq(138);        
    
        // Instantiate the envelope
        this.env.setADSR(0.001, 0.1, 0.1, 0.1,0);
        this.env.setRange(0.6, 0.2, 0.2, 0);

        // add some reverb
        this.reverb.process(this.osc, .2, 0.2);
        this.reverb.drywet(.4);
    }

    /**
     * This plays the synth when triggered
     */
    play_me() {
        this.env.play(this.osc);
        this.osc.freq(130 + Math.random()*16); 
    }
}

class sprinkle_clouds {
    
    osc = new p5.SinOsc();
    env = new p5.Envelope();
    reverb = new p5.Reverb();
    delay = new p5.Delay();

    arps = [[0,1,4,5],[0,2,4,5],[2,4,5,5],[2,7,4,5]];
    root_note_midi = 70; // A#4
    
    constructor(){
        this.osc.start();
        this.osc.amp(0.6);
        this.osc.freq(0);        
    
        // Instantiate the envelope
        this.env.setADSR(0.001, 0.1, 0.4, 0);
        this.env.setRange(0.2, 0);

        this.delay.process(this.osc, 0.42, 0.55, 1200);
        this.delay.drywet(0.6);

        // add some reverb
        this.reverb.process(this.osc, 1, .2);
        this.reverb.drywet(.6);
    }

    /**
     * This plays the synth when triggered
     */
    play_me(arp_num, curr_beat) {
        this.env.play(this.osc,0,0);
        this.osc.freq(midiToFreq(this.root_note_midi + this.arps[arp_num][curr_beat])); 
    }
}