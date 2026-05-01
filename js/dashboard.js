// dashboard.js - Dashboard Page
// Handles charts, counters, widgets

import { getPlanetsData, getAPOD, getRandomSpaceFact } from './api.js';
import { showToast, initCommonUI, formatDate } from './ui.js';

let planets = [];

document.addEventListener('DOMContentLoaded', () => {
    initCommonUI();
    initDashboard();
});

async function initDashboard() {
    planets = getPlanetsData();
    
    animateCounters();
    initCharts();
    initWidgets();
}

// Animated stat counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateNumber(counter, 0, target, 2000);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateNumber(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const current = Math.floor(start + (range * eased));
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Chart.js initialization
function initCharts() {
    if (typeof Chart === 'undefined') return;
    
    const planetNames = planets.map(p => p.name);
    const diameters = planets.map(p => parseInt(p.diameter.replace(/,/g, '')));
    const moons = planets.map(p => p.moons);
    const colors = planets.map(p => p.color);
    
    // Diameter Bar Chart
    const diameterCtx = document.getElementById('diameterChart');
    if (diameterCtx) {
        new Chart(diameterCtx, {
            type: 'bar',
            data: {
                labels: planetNames,
                datasets: [{
                    label: 'Diameter (km)',
                    data: diameters,
                    backgroundColor: colors.map(c => c + '80'),
                    borderColor: colors,
                    borderWidth: 2,
                    borderRadius: 8,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255,255,255,0.1)' },
                        ticks: { color: '#9CA3AF' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#9CA3AF' }
                    }
                }
            }
        });
    }
    
    // Moons Doughnut Chart
    const moonsCtx = document.getElementById('moonsChart');
    if (moonsCtx) {
        new Chart(moonsCtx, {
            type: 'doughnut',
            data: {
                labels: planetNames,
                datasets: [{
                    data: moons,
                    backgroundColor: colors.map(c => c + 'CC'),
                    borderColor: colors,
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#9CA3AF', padding: 15 }
                    }
                }
            }
        });
    }
}

// Widgets
async function initWidgets() {
    // Random space fact
    const factElement = document.getElementById('spaceFact');
    const newFactBtn = document.getElementById('newFactBtn');
    
    if (factElement) {
        factElement.textContent = await getRandomSpaceFact();
    }
    
    if (newFactBtn) {
        newFactBtn.addEventListener('click', async () => {
            if (factElement) {
                factElement.textContent = await getRandomSpaceFact();
            }
        });
    }
    
    // Latest APOD widget
    const latestApod = document.getElementById('latestApod');
    if (latestApod) {
        try {
            const data = await getAPOD();
            latestApod.innerHTML = `
                <div class="cursor-pointer hover:opacity-80 transition-opacity" onclick="window.location='apod.html'">
                    <img src="${data.url}" alt="${data.title}" class="w-full h-48 object-cover rounded-xl mb-3">
                    <h4 class="font-semibold mb-1 line-clamp-2">${data.title}</h4>
                    <p class="text-sm text-gray-400">${formatDate(data.date)}</p>
                </div>
            `;
        } catch (error) {
            latestApod.innerHTML = '<p class="text-red-400">Gagal memuat APOD.</p>';
        }
    }
}
