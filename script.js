const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function generateTone(key) {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;
    const upperKey = key.toUpperCase();

    switch (upperKey) {
        case 'A':
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.5);
            gain.gain.setValueAtTime(1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
            break;
        case 'S':
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(250, now);
            gain.gain.setValueAtTime(0.7, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            break;
        case 'D':
            osc.type = 'square';
            osc.frequency.setValueAtTime(800, now);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            break;
        case 'F':
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, now);
            gain.gain.setValueAtTime(0.8, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            break;
        case 'J':
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);
            gain.gain.setValueAtTime(0.9, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            break;
        case 'K':
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(600, now);
            gain.gain.setValueAtTime(0.5, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
            break;
        case 'L':
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1200, now);
            gain.gain.setValueAtTime(0.6, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
            break;
        case ';':
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(900, now);
            osc.frequency.exponentialRampToValueAtTime(200, now + 0.4);
            gain.gain.setValueAtTime(0.5, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
            break;
        default:
            osc.frequency.setValueAtTime(440, now);
            gain.gain.setValueAtTime(0.5, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    }

    osc.start(now);
    osc.stop(now + 0.8);
}

const buttons = document.querySelectorAll('.pad-btn');

function triggerPad(btn) {
    const key = btn.getAttribute('data-key');
    generateTone(key);

    btn.classList.add('active');
    setTimeout(() => {
        btn.classList.remove('active');
    }, 150);
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => triggerPad(btn));
});

window.addEventListener('keydown', (e) => {
    const pressedKey = e.key;
    const targetBtn = Array.from(buttons).find(btn => {
        const btnKey = btn.getAttribute('data-key');
        return btnKey.toLowerCase() === pressedKey.toLowerCase();
    });
    
    if (targetBtn) {
        triggerPad(targetBtn);
    }
});