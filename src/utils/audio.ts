/**
 * Local Web Audio & Speech Synthesis Engine
 * Works 100% offline in browser without external APIs
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Speak English words or phrases using Web Speech API
export function speakEnglish(
  text: string, 
  options: { rate?: number; pitch?: number; onEnd?: () => void } = {}
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not available');
    options.onEnd?.();
    return;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any currently playing audio

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = options.rate ?? 0.88; // Slightly slower for clear English learning
    utterance.pitch = options.pitch ?? 1.0;

    // Pick best English voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Karen')))) 
      || voices.find(v => v.lang.startsWith('en'));

    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    if (options.onEnd) {
      utterance.onend = () => options.onEnd?.();
      utterance.onerror = () => options.onEnd?.();
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis error:', err);
    options.onEnd?.();
  }
}

// Stop current speech
export function stopSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// Speak individual phoneme with phonetic clarity
export function speakPhoneme(phoneme: string, letter: string, onEnd?: () => void): void {
  // If letter is a vowel or consonant, pronounce the clear sound
  const soundMap: Record<string, string> = {
    'A': 'ah',
    'S': 'sss',
    'T': 't',
    'P': 'puh',
    'I': 'ih',
    'N': 'nnn',
    'C': 'kuh',
    'M': 'mmm',
    'D': 'duh',
    '/æ/': 'a',
    '/s/': 'ssss',
    '/t/': 't',
    '/p/': 'p',
    '/ɪ/': 'i',
    '/n/': 'n',
    '/k/': 'k',
    '/m/': 'm',
    '/d/': 'd',
  };

  const toSpeak = soundMap[letter.toUpperCase()] || soundMap[phoneme] || letter;
  speakEnglish(toSpeak, { rate: 0.75, pitch: 1.05, onEnd });
}

// Synthesize pleasant sound effects with Web Audio API
export function playSuccessChime(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'triangle';
    osc2.type = 'sine';

    // Harmonic pleasant major third to fifth (C5 -> E5 -> G5)
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
    osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5

    osc2.frequency.setValueAtTime(1046.5, now + 0.15); // C6 spark

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now + 0.15);
    osc1.stop(now + 0.55);
    osc2.stop(now + 0.55);
  } catch (e) {
    // Ignore audio context errors silently
  }
}

export function playTryAgainSound(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.25);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  } catch (e) {}
}

export function playClapSound(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // Create white noise buffer for clap acoustic burst
    const bufferSize = ctx.sampleRate * 0.12;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.03));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1100;
    filter.Q.value = 1.2;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.15);
  } catch (e) {}
}

export function playClickPop(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  } catch (e) {}
}
