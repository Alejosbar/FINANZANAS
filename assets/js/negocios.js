function analyzeBusiness() {
    const ingresos = parseFloat(document.getElementById('ingresosTotales').value);
    const gastos = parseFloat(document.getElementById('gastosTotales').value);

    if (isNaN(ingresos) || isNaN(gastos)) {
        alert('Por favor, ingresa valores numéricos para ingresos y gastos.');
        return;
    }

    const ganancia = ingresos - gastos;
    const margen = (ingresos > 0) ? ((ganancia / ingresos) * 100).toFixed(1) : 0;

    document.getElementById('displayIngresos').textContent = `$${ingresos.toLocaleString('es-CO')}`;
    document.getElementById('displayGastos').textContent = `$${gastos.toLocaleString('es-CO')}`;
    document.getElementById('displayGanancia').textContent = `$${ganancia.toLocaleString('es-CO')}`;
    document.getElementById('displayMargen').textContent = `${margen}`;

    const gananciaDisplay = document.getElementById('displayGanancia').closest('.bg-primary-subtle');
    if (ganancia < 0) {
        gananciaDisplay.classList.remove('bg-primary-subtle', 'text-primary');
        gananciaDisplay.classList.add('bg-danger-subtle', 'text-danger');
    } else {
        gananciaDisplay.classList.remove('bg-danger-subtle', 'text-danger');
        gananciaDisplay.classList.add('bg-primary-subtle', 'text-primary');
    }
}

function clearBusinessForm() {
    document.getElementById('ingresosTotales').value = '';
    document.getElementById('gastosTotales').value = '';
    document.getElementById('displayIngresos').textContent = '$0';
    document.getElementById('displayGastos').textContent = '$0';
    document.getElementById('displayGanancia').textContent = '$0';
    document.getElementById('displayMargen').textContent = '0.0';
    const gananciaDisplay = document.getElementById('displayGanancia').closest('.bg-primary-subtle');
    gananciaDisplay.classList.remove('bg-danger-subtle', 'text-danger');
    gananciaDisplay.classList.add('bg-primary-subtle', 'text-primary');
}