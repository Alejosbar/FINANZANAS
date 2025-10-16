// Common JavaScript for all pages

document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to all forms for validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default submission
            if (validateForm(form)) {
                alert('Formulario enviado correctamente. (Simulación)');
                form.reset(); // Reset form after submission
            }
        });
    });

    // Add click events to buttons if needed
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = '#444';
        }
    });
    if (!isValid) {
        alert('Por favor, completa todos los campos obligatorios.');
    }
    return isValid;
}