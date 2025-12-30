const btn = document.getElementById("generate");
const out = document.getElementById("output");

btn.onclick = () => {
  // Step 1: theoretical resistance
  const R_theory = rand(3, 9);

  // Step 2: actual resistance (hidden)
  const deviation = 1 + rand(-0.1, 0.1);
  const R_actual = R_theory * deviation;
  const R_series = 2 * R_actual;

  // Step 3: generate data
  const currents = [0.2, 0.4, 0.6, 0.8, 1.0, 1.2];
  const voltages = currents.map(i => +(i * R_series).toFixed(3));

  // Step 4: linear regression
  const n = currents.length;
  const sumX = sum(currents);
  const sumY = sum(voltages);
  const sumXY = sum(currents.map((x, i) => x * voltages[i]));
  const sumX2 = sum(currents.map(x => x * x));

  const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
  const c = (sumY - m * sumX) / n;

  const xBar = sumX / n;
  const residuals = voltages.map((y, i) => y - (m * currents[i] + c));
  const sigma_m = Math.sqrt(
    sum(residuals.map(r => r ** 2)) /
    ((n - 2) * sum(currents.map(x => (x - xBar) ** 2)))
  );

  // Step 5: percentage error
  const R_expected = 2 * R_theory;
  const percentError = Math.abs(m - R_expected) / R_expected * 100;

  // Output
  out.innerHTML = `
    <p><b>Theoretical resistance (single):</b> ${R_theory.toFixed(2)} Ω</p>

    <table>
      <tr><th>Current (A)</th><th>Voltage (V)</th></tr>
      ${currents.map((i, idx) => `
        <tr><td>${i.toFixed(2)}</td><td>${voltages[idx].toFixed(3)}</td></tr>
      `).join("")}
    </table>

    <p><b>Centroid (x̄, ȳ):</b> (${(sumX/n).toFixed(3)}, ${(sumY/n).toFixed(3)})</p>
    <p><b>Best fit line:</b> V = ${m.toFixed(3)}I + ${c.toFixed(3)}</p>
    <p><b>Gradient (R):</b> ${m.toFixed(3)} Ω</p>
    <p><b>Uncertainty in gradient:</b> ±${sigma_m.toFixed(4)} Ω</p>
    <p><b>Percentage error:</b> ${percentError.toFixed(2)}%</p>
  `;
};

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}
