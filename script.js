// Get elements
const sections = document.querySelectorAll('.section');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');

let currentSection = 0;

// Function to update progress bar
function updateProgress() {
    const progress = ((currentSection + 1) / sections.length) * 100;
    progressBar.style.width = progress + '%';
}

// Function to scroll to a specific section
function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
        sections[index].scrollIntoView({ behavior: 'smooth' });
        currentSection = index;
        updateProgress();
    }
}

// Event listeners for navigation buttons
prevBtn.addEventListener('click', () => {
    scrollToSection(currentSection - 1);
});

nextBtn.addEventListener('click', () => {
    scrollToSection(currentSection + 1);
});

// Intersection Observer for animations and updating current section
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const index = Array.from(sections).indexOf(entry.target);
            currentSection = index;
            updateProgress();
        }
    });
}, { threshold: 0.5 });

// Observe all sections
sections.forEach(section => {
    observer.observe(section);
});

// Initial progress update
updateProgress();