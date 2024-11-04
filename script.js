let chartData = {
    labels: [],
    datasets: [{
        label: '# of Values',
        data: [],
        backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
};

/**
 * Creates a chart using Chart.js library.
 *
 * @param {string} type - The type of chart to create (e.g., 'bar', 'line').
 * @param {number} [height=400] - The height of the chart in pixels.
 * @returns {Chart} The created Chart.js instance.
 */
function createChart(type, height = 400) {
    const canvasContainer = document.getElementById('canvas-container');
    canvasContainer.innerHTML = `<canvas id="myChart"></canvas>`;
    canvasContainer.style.height = `${height}px`;

    const ctx = document.getElementById('myChart').getContext('2d');
    return new Chart(ctx, {
        type: type,
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            onClick: (event, activeElements) => {
                if (activeElements.length > 0) {
                    const { datasetIndex, index } = activeElements[0];
                    removeData(datasetIndex, index);
                }
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'index',
                intersect: false
            }
        }
    });

}

let myChart = createChart('bar'); // Create initial chart with default height = 400

/**
 * Adds a new data point to the chart.
 * 
 * This function retrieves the values from the input fields with IDs 'labelInput' and 'dataInput'.
 * If both input fields have values, it adds the label to the chart's labels and the data to each dataset.
 * After updating the chart, it clears the input fields.
 */
function addData() {
    const labelInput = document.getElementById('labelInput');
    const dataInput = document.getElementById('dataInput');

    if (labelInput.value && dataInput.value) {
        chartData.labels.push(labelInput.value);
        chartData.datasets.forEach((dataset) => {
            dataset.data.push(dataInput.value);
        });
        myChart.update();
        labelInput.value = '';
        dataInput.value = '';
    }

}

function updateChartType() {
    const selectedType = document.getElementById('chartType').value;
    myChart.destroy(); // Destroy the old chart
    myChart = createChart(selectedType);
}

/**
 * Removes a data point from the specified dataset and updates the chart.
 *
 * @param {number} datasetIndex - The index of the dataset from which to remove the data point.
 * @param {number} index - The index of the data point to remove.
 */
function removeData(datasetIndex, index) {
    if (chartData.labels.length > index) {
        chartData.labels.splice(index, 1);
        chartData.datasets[datasetIndex].data.splice(index, 1);
        myChart.update();
    }
}
