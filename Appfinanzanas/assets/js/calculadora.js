let ocioSlider = document.getElementById('ocioSlider');
let gastosSlider = document.getElementById('gastosSlider');
let inversionesSlider = document.getElementById('inversionesSlider');

let ocioPercentSpan = document.getElementById('ocioPercent');
let gastosPercentSpan = document.getElementById('gastosPercent');
let inversionesPercentSpan = document.getElementById('inversionesPercent');
let totalPercentSpan = document.getElementById('totalPercent');

let ocioAmountSpan = document.getElementById('ocioAmount');
let gastosAmountSpan = document.getElementById('gastosAmount');
let inversionesAmountSpan = document.getElementById('inversionesAmount');
let sueldoInput = document.getElementById('sueldoMensual');

let chartPlaceholder = document.getElementById('chartPlaceholder');
let budgetChartContainer = document.getElementById('budgetChart');
let budgetChart;

function initializeChart() {
    const ctx = budgetChartContainer.getContext('2d');
    budgetChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Ocio', 'Gastos', 'Inversiones'],
            datasets: [{
                data: [
                    parseInt(ocioSlider.value),
                    parseInt(gastosSlider.value),
                    parseInt(inversionesSlider.value)
                ],
                backgroundColor: [
                    'rgba(255, 105, 180, 0.7)', // Pink
                    'rgba(75, 192, 192, 0.7)', // Teal
                    'rgba(153, 102, 255, 0.7)' // Purple
                ],
                borderColor: [
                    'rgba(255, 105, 180, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#e0e0e0' // Light color for legend text
                    }
                }
            }
        }
    });
}

function updatePercentages(changedSlider) {
    let ocio = parseInt(ocioSlider.value);
    let gastos = parseInt(gastosSlider.value);
    let inversiones = parseInt(inversionesSlider.value);
    let total = ocio + gastos + inversiones;

    if (total > 100) {
        let diff = total - 100;
        if (changedSlider === 'ocio') {
            if (gastos > 0) gastos -= Math.min(gastos, diff);
            if (gastos + ocio + inversiones > 100 && inversiones > 0) inversiones -= Math.min(inversiones, (gastos + ocio + inversiones - 100));
        } else if (changedSlider === 'gastos') {
            if (ocio > 0) ocio -= Math.min(ocio, diff);
            if (gastos + ocio + inversiones > 100 && inversiones > 0) inversiones -= Math.min(inversiones, (gastos + ocio + inversiones - 100));
        } else if (changedSlider === 'inversiones') {
            if (ocio > 0) ocio -= Math.min(ocio, diff);
            if (ocio + gastos + inversiones > 100 && gastos > 0) gastos -= Math.min(gastos, (ocio + gastos + inversiones - 100));
        }

        // Fallback to ensure total is 100 if previous logic failed
        let newTotal = ocio + gastos + inversiones;
        if (newTotal > 100) {
             let surplus = newTotal - 100;
             if (changedSlider !== 'ocio' && ocio > 0) ocio -= Math.min(ocio, surplus);
             if (changedSlider !== 'gastos' && gastos > 0) gastos -= Math.min(gastos, surplus);
             if (changedSlider !== 'inversiones' && inversiones > 0) inversiones -= Math.min(inversiones, surplus);
        }
         // Last resort for tiny discrepancies
        while (ocio + gastos + inversiones > 100) {
            if (inversiones > 0) inversiones--;
            else if (gastos > 0) gastos--;
            else if (ocio > 0) ocio--;
        }
    }


    ocioSlider.value = ocio;
    gastosSlider.value = gastos;
    inversionesSlider.value = inversiones;

    ocioPercentSpan.textContent = ocio;
    gastosPercentSpan.textContent = gastos;
    inversionesPercentSpan.textContent = inversiones;
    totalPercentSpan.textContent = ocio + gastos + inversiones;

    calculateBudget(); // Recalculate amounts and update chart
}

function calculateBudget() {
    let sueldo = parseFloat(sueldoInput.value);
    if (isNaN(sueldo) || sueldo <= 0) {
        ocioAmountSpan.textContent = '$0.00';
        gastosAmountSpan.textContent = '$0.00';
        inversionesAmountSpan.textContent = '$0.00';
        chartPlaceholder.style.display = 'block';
        budgetChartContainer.style.display = 'none';
        if (budgetChart) budgetChart.destroy();
        return;
    }

    let ocio = parseInt(ocioSlider.value);
    let gastos = parseInt(gastosSlider.value);
    let inversiones = parseInt(inversionesSlider.value);

    let ocioAmount = (sueldo * ocio) / 100;
    let gastosAmount = (sueldo * gastos) / 100;
    let inversionesAmount = (sueldo * inversiones) / 100;

    ocioAmountSpan.textContent = `$${ocioAmount.toFixed(2)}`;
    gastosAmountSpan.textContent = `$${gastosAmount.toFixed(2)}`;
    inversionesAmountSpan.textContent = `$${inversionesAmount.toFixed(2)}`;

    chartPlaceholder.style.display = 'none';
    budgetChartContainer.style.display = 'block';

    if (budgetChart) {
        budgetChart.data.datasets[0].data = [ocio, gastos, inversiones];
        budgetChart.update();
    } else {
        initializeChart();
    }
}

// Initialize with default percentages
document.addEventListener('DOMContentLoaded', () => {
    ocioPercentSpan.textContent = ocioSlider.value;
    gastosPercentSpan.textContent = gastosSlider.value;
    inversionesPercentSpan.textContent = inversionesSlider.value;
    totalPercentSpan.textContent = parseInt(ocioSlider.value) + parseInt(gastosSlider.value) + parseInt(inversionesSlider.value);
    calculateBudget();
});