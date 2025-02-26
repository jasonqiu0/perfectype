let progressChart;
let chartData = {
    times: [],
    wpm: [],
    wpmRaw: []
};

function initChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    
    progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.times,
            datasets: [{
                label: 'Pure WPM',
                data: chartData.wpm,
                borderColor: '#80baa5',
                tension: 0.1,
                color: 'white',
            },
            {
                label: 'Raw WPM',
                data: chartData.wpmRaw,
                borderColor: 'white',
                tension: 0.1,
                color: 'white',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'WPM / RAW WPM',
                        color: '#5f7a71',
                        
                    },
                    grid: {
                        color: '#5f7a71',
                    },
                    ticks: {
                        color: '#5f7a71',
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time (seconds)',
                        color: '#5f7a71',
                    },
                    grid: {
                        color: '#5f7a71',
                    },
                    ticks: {
                        color: '#5f7a71',
                    }
                }
            }
        }
    });
}

function updateChart() {

    const currentTime = (Date.now() - timeStart) / 1000;
    if(currentTime % 1 > 0.1) return;

    const wpm = Math.round((correctWords) / (currentTime / 60));
    const wpmRaw = Math.round((typedWords) / (currentTime / 60));

    chartData.times.push(currentTime.toFixed(1));
    chartData.wpm.push(wpm);
    chartData.wpmRaw.push(wpmRaw);
    
    progressChart.update();
}

function resetChart() {
    chartData = { times: [], wpm: [], wpmRaw: [] };
    if(progressChart) {
        progressChart.destroy();
    }
    initChart();
}