const ctx = document.getElementById('dataChart').getContext('2d');
let chart;

function generateData() {
  const g = 9.81;
  const n = 6;
  const noise_amplitude = 0.1; // seconds
  const lengths = new Set();

  // Generate 6 unique lengths from 0.2m to 1.0m
  while (lengths.size < n) {
    let L = +(Math.random() * 0.8 + 0.2).toFixed(2);
    lengths.add(L);
  }

  const sortedLengths = Array.from(lengths).sort((a, b) => a - b);
  const times10 = sortedLengths.map(L => {
    const T10 = 20 * Math.PI * Math.sqrt(L / g);
    const noise = (Math.random() * 2 - 1) * noise_amplitude;
    return T10 + noise;
  });

  updateTable(sortedLengths, times10);
  plotData(sortedLengths, times10);

  const T_squared = times10.map(T10 => (T10 / 10) ** 2);
  const { m, c, dm, dc } = linearRegression(sortedLengths, T_squared);

document.getElementById('equation').textContent =
  `T² = ${m.toFixed(3)}L + ${c.toFixed(3)}`;

document.getElementById('uncertainties').textContent =
  `Uncertainty in slope: ±${dm.toFixed(3)}, Uncertainty in intercept: ±${dc.toFixed(3)}`;

// Experimental gravitational acceleration
const g_exp = (4 * Math.PI ** 2) / m;
const dg = (4 * Math.PI ** 2 / (m ** 2)) * dm;

document.getElementById('gravity').textContent =
  `Experimental gravitational acceleration: g = ${g_exp.toFixed(3)} ± ${dg.toFixed(3)} m/s²`;

}

function updateTable(lengths, times10) {
  const tbody = document.querySelector('#dataTable tbody');
  tbody.innerHTML = "";
  for (let i = 0; i < lengths.length; i++) {
    const row = `<tr><td>${lengths[i]}</td><td>${times10[i].toFixed(2)}</td></tr>`;
    tbody.innerHTML += row;
  }
}

function plotData(lengths, times10) {
  const T_squared = times10.map(T10 => (T10 / 10) ** 2);
  const dataPoints = lengths.map((L, i) => ({ x: L, y: T_squared[i] }));
  const { m, c } = linearRegression(lengths, T_squared);
  const trendline = [
    { x: Math.min(...lengths), y: m * Math.min(...lengths) + c },
    { x: Math.max(...lengths), y: m * Math.max(...lengths) + c }
  ];

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Data Points (L vs T²)',
          data: dataPoints,
          backgroundColor: 'blue'
        },
        {
          label: 'Trendline',
          data: trendline,
          type: 'line',
          fill: false,
          borderColor: 'red',
          borderWidth: 2,
          pointRadius: 0
        }
      ]
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Length (m)'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Period Squared T² (s²)'
          }
        }
      }
    }
  });
}

function linearRegression(x, y) {
  const n = x.length;
  const sum_x = x.reduce((a, b) => a + b, 0);
  const sum_y = y.reduce((a, b) => a + b, 0);
  const x_bar = sum_x / n;
  const y_bar = sum_y / n;

  let Sxx = 0, Sxy = 0;
  for (let i = 0; i < n; i++) {
    Sxx += (x[i] - x_bar) ** 2;
    Sxy += (x[i] - x_bar) * (y[i] - y_bar);
  }

  const m = Sxy / Sxx;
  const c = y_bar - m * x_bar;

  let residuals = 0;
  for (let i = 0; i < n; i++) {
    const y_fit = m * x[i] + c;
    residuals += (y[i] - y_fit) ** 2;
  }

  const sigma2 = residuals / (n - 2);
  const dm = Math.sqrt(sigma2 / Sxx);
  const dc = Math.sqrt(sigma2 * (1 / n + x_bar ** 2 / Sxx));

  return { m, c, dm, dc };
}
