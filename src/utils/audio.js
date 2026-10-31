// Procedural Ambient Sound Generator using Web Audio API
class AudioAtmosphere {
  constructor() {
    this.ctx = null;
    this.oscillators = [];
    this.gainNode = null;
    this.isPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  start() {
    this.init();
    if (this.isPlaying) return;

    try {
      const now = this.ctx.currentTime;
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.001, now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.08, now + 3);

      // Low pass filter for soft luxury warmth
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(260, now);

      this.gainNode.connect(filter);
      filter.connect(this.ctx.destination);

      // Warm ambient harmonic frequencies (D minor / cinematic root: D2, A2, F3)
      const freqs = [73.42, 110.0, 174.61, 220.0];

      this.oscillators = freqs.map((freq, i) => {
        const osc = this.ctx.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // subtle detune for rich spatial warmth
        osc.detune.setValueAtTime((i - 1.5) * 4, now);

        const oscGain = this.ctx.createGain();
        oscGain.gain.setValueAtTime(0.25, now);
        osc.connect(oscGain);
        oscGain.connect(this.gainNode);

        osc.start();
        return osc;
      });

      this.isPlaying = true;
    } catch (e) {
      console.warn('Web Audio playback error:', e);
    }
  }

  stop() {
    if (!this.isPlaying || !this.gainNode) return;

    try {
      const now = this.ctx.currentTime;
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      setTimeout(() => {
        this.oscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (err) {}
        });
        this.oscillators = [];
        this.isPlaying = false;
      }, 1250);
    } catch (e) {
      this.isPlaying = false;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const ambientSound = new AudioAtmosphere();
