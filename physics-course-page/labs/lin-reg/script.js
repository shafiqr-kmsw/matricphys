let myChart; // Global variable to hold the chart instance

document.getElementById('analyzeButton').addEventListener('click', analyzeData);
document.getElementById('exportPdfButton').addEventListener('click', exportPdf); // New event listener

function analyzeData() {
    const xDataInput = document.getElementById('xDataInput').value;
    const yDataInput = document.getElementById('yDataInput').value;
    const graphTitle = document.getElementById('graphTitle').value;
    const xAxisTitle = document.getElementById('xAxisTitle').value;
    const yAxisTitle = document.getElementById('yAxisTitle').value;

    const xValues = xDataInput.split(',').map(Number);
    const yValues = yDataInput.split(',').map(Number);

    if (xValues.length !== yValues.length) {
        alert("The number of X values must match the number of Y values.");
        return;
    }

    if (xValues.length < 2) {
        alert("Please enter at least two data points to perform linear regression.");
        return;
    }

    // Combine X and Y values into pairs for simple-statistics
    const dataPoints = xValues.map((x, index) => [x, yValues[index]]);

    // Perform linear regression using simple-statistics
    const regression = ss.linearRegression(dataPoints);
    const m = regression.m; // gradient
    const c = regression.b; // y-intercept

    // Calculate uncertainties manually
    const n = dataPoints.length;
    let sumX = 0;
    let sumY = 0;
    let sumX2 = 0;
    let sumXY = 0;

    dataPoints.forEach(([x, y]) => {
        sumX += x;
        sumY += y;
        sumX2 += x * x;
        sumXY += x * y;
    });

    const denominator = (n * sumX2 - sumX * sumX);

    // Calculate standard error of the estimate (s_e)
    let sumSquaredResiduals = 0;
    dataPoints.forEach(([x, y]) => {
        const predictedY = m * x + c;
        sumSquaredResiduals += (y - predictedY) ** 2;
    });
    // Handle case where n-2 is 0 or less (e.g., only 2 data points)
    const se = (n - 2 > 0) ? Math.sqrt(sumSquaredResiduals / (n - 2)) : 0; // If only 2 points, residual is 0, so se is 0.

    // Standard error of gradient (s_m)
    const sm = (denominator > 0) ? se * Math.sqrt(n / denominator) : Infinity; // Handle division by zero

    // Standard error of y-intercept (s_c)
    const sc = (denominator > 0) ? se * Math.sqrt(sumX2 / denominator) : Infinity; // Handle division by zero

    // Determine decimal places for output based on input data's precision
    const getDecimalPlaces = (num) => {
        const parts = num.toString().split('.');
        if (parts.length > 1) {
            // Check if there are significant digits after decimal.
            // e.g., 5.00 should have 2 decimal places, not 0.
            const decimalPart = parts[1];
            if (decimalPart.length > 0) {
                // Find the last non-zero digit or if it's all zeros after decimal, count all.
                let effectiveLength = decimalPart.length;
                let trailingZeros = 0;
                for (let i = decimalPart.length - 1; i >= 0; i--) {
                    if (decimalPart[i] === '0') {
                        trailingZeros++;
                    } else {
                        break;
                    }
                }
                return effectiveLength; // Keep all decimal places as entered.
            }
        }
        return 0;
    };

    let maxDecimalPlaces = 0;
    xValues.forEach(val => {
        maxDecimalPlaces = Math.max(maxDecimalPlaces, getDecimalPlaces(val));
    });
    yValues.forEach(val => {
        maxDecimalPlaces = Math.max(maxDecimalPlaces, getDecimalPlaces(val));
    });

    // For uncertainties, it's common practice to report to 1 or 2 significant figures,
    // and the regression coefficients to a similar precision, usually aligning with
    // the uncertainty. For simplicity here, we'll aim for a consistent number of
    // decimal places relative to the input data's precision, adding 2 for coefficients/uncertainties.
    const outputDecimalPlaces = maxDecimalPlaces + 3; // Give a bit more precision for calculated values

    const formatNumber = (num, dp) => {
        if (!isFinite(num)) {
            return 'Undefined'; // Or 'Infinity', based on preference
        }
        return num.toFixed(dp);
    };

    const formattedM = formatNumber(m, outputDecimalPlaces);
    const formattedC = formatNumber(c, outputDecimalPlaces);
    const formattedSm = formatNumber(sm, outputDecimalPlaces);
    const formattedSc = formatNumber(sc, outputDecimalPlaces);

    document.getElementById('trendlineEquation').textContent = `y = ${formattedM}x + ${formattedC}`;
    document.getElementById('gradientUncertainty').textContent = `± ${formattedSm}`;
    document.getElementById('yInterceptUncertainty').textContent = `± ${formattedSc}`;

    // Prepare data for Chart.js
    const chartData = dataPoints.map(([x, y]) => ({ x: x, y: y }));

    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const trendlinePoints = [];
    trendlinePoints.push({ x: minX, y: m * minX + c });
    trendlinePoints.push({ x: maxX, y: m * maxX + c });


    if (myChart) {
        myChart.destroy();
    }

    const ctx = document.getElementById('regressionChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Data Points',
                    data: chartData,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    pointRadius: 5,
                    pointHoverRadius: 7,
                },
                {
                    label: 'Trendline',
                    data: trendlinePoints,
                    type: 'line',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: false,
                    pointRadius: 0,
                    borderWidth: 2,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: graphTitle,
                    font: {
                        size: 18
                    }
                },
                legend: {
                    display: true
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: xAxisTitle
                    },
                    min: minX - (maxX - minX) * 0.05, // Small padding
                    max: maxX + (maxX - minX) * 0.05
                },
                y: {
                    title: {
                        display: true,
                        text: yAxisTitle
                    }
                }
            }
        }
    });
}

async function exportPdf() {
    const { jsPDF } = window.jspdf;
    const content = document.getElementById('contentToExport'); // This is the div containing chart and results

    // Use html2canvas to render the content as an image
    const canvas = await html2canvas(content, { scale: 2 }); // Scale up for better resolution in PDF
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' size

    const imgWidth = 190; // A4 width is 210mm, leave some margins
    const pageHeight = pdf.internal.pageSize.height;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 10; // Initial position from top

    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // If content exceeds one page (unlikely for this simple layout, but good practice)
    while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
    }

    const graphTitle = document.getElementById('graphTitle').value;
    pdf.save(`${graphTitle || 'Linear_Regression_Report'}.pdf`);
}


// Initial analysis when the page loads with default values
document.addEventListener('DOMContentLoaded', analyzeData);