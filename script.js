let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let paused = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        timerInterval = setInterval(updateTime, 10);
        running = true;
        paused = false;
    }
}

function pauseTimer() {
    if (!paused) {
        clearInterval(timerInterval);
        paused = true;
        running = false;
        updatedTime = new Date().getTime() - startTime;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    running = false;
    paused = false;
    display.innerHTML = "00:00:00";
    lapsList.innerHTML = "";
    startTime = 0;
    updatedTime = 0;
    difference = 0;
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    difference = new Date(updatedTime);
    let minutes = difference.getUTCMinutes();
    let seconds = difference.getUTCSeconds();
    let milliseconds = difference.getUTCMilliseconds();

    display.innerHTML = 
        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
        (seconds < 10 ? "0" + seconds : seconds) + ":" + 
        (milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds);
}

function recordLap() {
    if (running) {
        const li = document.createElement("li");
        li.textContent = display.innerHTML;
        lapsList.appendChild(li);
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
