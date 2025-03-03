let progressChart;
let chartData = {
    times: [],
    wpm: [],
    wpmRaw: [],
    accuracy: []
};

function initChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    
    progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.times,
            datasets: [{
                label: 'WPM',
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
            },
            {
                label: 'Accuracy%',
                data: chartData.accuracy,
                borderColor: '#f55',
                tension: 0.1,
                color: '#f55',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: 'white',
                        font: {
                            size: 20, 
                            family: 'Inconsolata'
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'WPM / RAW WPM / Accuracy%',
                        color: '#5f7a71',
                        font: {
                            size: 25,
                            family: 'Inconsolata'
                        }
                        
                    },
                    grid: {
                        color: '#5f7a71',
                    },
                    ticks: {
                        color: '#5f7a71',
                        font: {
                            size: 20,
                            family: 'Inconsolata'
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time (s)',
                        color: '#5f7a71',
                        font: {
                            size: 25,
                            family: 'Inconsolata'
                        }
                    },
                    grid: {
                        color: '#5f7a71',
                    },
                    ticks: {
                        color: '#5f7a71',
                        font: {
                            size: 20,
                            family: 'Inconsolata'
                        }
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

    const accuracy = typedWords > 0 ? (correctWords / typedWords) * 100 : 0;

    chartData.times.push(currentTime.toFixed(1));
    chartData.wpm.push(wpm);
    chartData.wpmRaw.push(wpmRaw);
    chartData.accuracy.push(accuracy.toFixed(1));
    
    progressChart.update();
}

function resetChart() {
    chartData = { times: [], wpm: [], wpmRaw: [], accuracy: [] };
    if(progressChart) {
        progressChart.destroy();
    }
    initChart();
}
