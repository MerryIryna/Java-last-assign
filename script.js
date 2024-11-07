
const timerDisplay = document.getElementById('timer-display');
const progressBar = document.getElementById('progress-bar');
const durationSelect = document.getElementById('duration');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const stopButton = document.getElementById('stop-btn');
const resetButton = document.getElementById('reset-btn');

let duration = 30000; 
let elapsedTime = 0;
let startTime;
let timerRunning = false;
let animationFrameId;

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
durationSelect.addEventListener('change', () => {
    duration = parseInt(durationSelect.value);
    resetTimer();
});

function formatTime(ms) {
    const minutes = String(Math.floor(ms / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    const centiseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    return `${minutes}:${seconds}:${centiseconds}`;
}

function updateTimerDisplay() {
    const timeLeft = Math.max(duration - elapsedTime, 0);
    timerDisplay.textContent = formatTime(timeLeft);
}

function updateProgressBar() {
    const progress = Math.min((elapsedTime / duration) * 100, 100);
    progressBar.style.width = progress + '%';

    if (progress >= 50) {
        progressBar.style.backgroundColor = '#4caf50'; 
    } else if (progress >= 25) {
        progressBar.style.backgroundColor = '#ff9800'; 
    } else {
        progressBar.style.backgroundColor = '#f44336'; 
    }
}

function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        startTime = Date.now() - elapsedTime;
        requestAnimationFrame(updateTimer);
    }
}

function updateTimer() {
    if (timerRunning) {
        elapsedTime = Date.now() - startTime;
        updateTimerDisplay();
        updateProgressBar();

        if (elapsedTime >= duration) {
            stopTimer(); 
        } else {
            animationFrameId = requestAnimationFrame(updateTimer);
        }
    }
}

function pauseTimer() {
    if (timerRunning) {
        timerRunning = false;
        cancelAnimationFrame(animationFrameId);
    }
}

function stopTimer() {
    timerRunning = false;
    elapsedTime = 0;
    cancelAnimationFrame(animationFrameId);
    updateTimerDisplay();
    updateProgressBar();
}

function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    updateTimerDisplay();
    updateProgressBar();
}

class FlyingObject {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'flying-object';
        this.resetPosition();
        document.getElementById('game-board').appendChild(this.element);
        this.animate();
    }

    resetPosition() {
        this.x = document.getElementById('game-board').offsetWidth;
        this.y = Math.random() * (document.getElementById('game-board').offsetHeight - 30);
        this.speed = 2 + Math.random() * 3;
    }

    animate() {
        if (this.x < -30) {
            this.resetPosition();
        } else {
            this.x -= this.speed;
            this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
        }
        requestAnimationFrame(this.animate.bind(this));
    }
}

setInterval(() => new FlyingObject(), 2000);
