let timeInterval;
let timeStart = 0;
let timeStarted = false;
function startTime() {
    timeStart = Date.now();
    timeInterval = setInterval(() => {
        const elapsed = (Date.now() - timeStart) / 1000;
        //console.log(elapsed.toFixed(2));
        document.getElementById("timer").textContent = elapsed.toFixed(2)
        updateChart();
    }, 100);
}

function stopTime() {
    clearInterval(timeInterval);
    timeStarted = false;
}

function resetTime() {
    clearInterval(timeInterval);
    timeStarted = false;
    document.getElementById("timer").textContent = "0.00";
  }

document.getElementById("game").addEventListener('keydown', (ev) => {
    if (!timeStarted && ev.key.length == 1) {
        timeStarted = true;
        startTime();
        document.getElementById("game").focus()
    }
});
