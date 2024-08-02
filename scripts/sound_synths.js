class drum_bass {
    
    osc = new p5.SinOsc();
    env = new p5.Envelope();
    reverb = new p5.Reverb();

    constructor(){
        this.osc.start();
        this.osc.amp(0.6);
        this.osc.freq(55);
    
        // Instantiate the envelope
        this.env.setADSR(0.001, 0.6, 0.4, 1);
        this.env.setRange(1, 0);

        // add some reverb
        this.reverb.process(this.osc, 0.1, 1);
        this.reverb.drywet(.8);
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
        this.osc.amp(0.6);
        this.osc.freq(220);        
    
        // Instantiate the envelope
        this.env.setADSR(0.001, 0.1, 0.6, 0);
        this.env.setRange(0.8, 0);

        // add some reverb
        this.reverb.process(this.osc, 10, 10);
        this.reverb.drywet(.8);
    }

    /**
     * This plays the synth when triggered
     */
    play_me() {
        this.env.play(this.osc,0,0);
    }
}