// planets.js - Planets Page
// Handles planet cards, search, filter, and detail modal

import { getPlanetsData } from './api.js';
import { showToast, createModal, renderError, initCommonUI, formatDate, debounce } from './ui.js';

let planets = [];
let filteredPlanets = [];

document.addEventListener('DOMContentLoaded', () => {
    initCommonUI();
    loadPlanets();
    initSearchAndFilter();
});

async function loadPlanets() {
    const container = document.getElementById('planetsContainer');
    if (!container) return;
    
    try {
        planets = getPlanetsData();
        filteredPlanets = [...planets];
        renderPlanets();
    } catch (error) {
        renderError(container, 'Gagal memuat data planet.');
    }
}

function renderPlanets() {
    const container = document.getElementById('planetsContainer');
    if (!container) return;
    
    if (filteredPlanets.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12 glass rounded-2xl">
                <p class="text-xl text-gray-400">Tidak ada planet yang ditemukan.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredPlanets.map((planet, index) => `
        <div class="glass rounded-2xl overflow-hidden hover:neon-glow transition-all duration-500 transform hover:-translate-y-2 planet-card cursor-pointer" 
             data-aos="fade-up" data-aos-delay="${index * 100}"
             onclick="showPlanetDetail('${planet.name}')">
            <div class="relative h-48 overflow-hidden bg-black/20">
                <img src="${planet.image}" alt="${planet.name}" 
                     class="planet-image w-full h-full object-cover transition-transform duration-700"
                     loading="lazy">
                <div class="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold glass">
                    ${planet.type}
                </div>
            </div>
            <div class="p-6">
                <h3 class="font-space font-bold text-xl mb-2" style="color: ${planet.color}">${planet.name}</h3>
                <p class="text-gray-300 text-sm mb-4 line-clamp-2">${planet.description}</p>
                <div class="grid grid-cols-2 gap-3 text-sm">
                    <div>
                        <p class="text-gray-500">Diameter</p>
                        <p class="font-semibold">${planet.diameter}</p>
                    </div>
                    <div>
                        <p class="text-gray-500">Gravitasi</p>
                        <p class="font-semibold">${planet.gravity}</p>
                    </div>
                    <div>
                        <p class="text-gray-500">Suhu</p>
                        <p class="font-semibold">${planet.temperature}</p>
                    </div>
                    <div>
                        <p class="text-gray-500">Bulan</p>
                        <p class="font-semibold">${planet.moons}</p>
                    </div>
                </div>
                <button class="mt-4 w-full py-2 glass rounded-full hover:bg-white/10 transition-all duration-300 text-sm">
                    Lihat Detail →
                </button>
            </div>
        </div>
    `).join('');
}

// Search and filter functionality
function initSearchAndFilter() {
    const searchInput = document.getElementById('searchInput');
    const filterType = document.getElementById('filterType');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
            applyFilters();
        }, 300));
    }
    
    if (filterType) {
        filterType.addEventListener('change', () => {
            applyFilters();
        });
    }
}

function applyFilters() {
    const searchQuery = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const selectedType = document.getElementById('filterType')?.value || 'all';
    
    filteredPlanets = planets.filter(planet => {
        const matchesSearch = planet.name.toLowerCase().includes(searchQuery) || 
                           planet.description.toLowerCase().includes(searchQuery);
        const matchesType = selectedType === 'all' || planet.type === selectedType;
        return matchesSearch && matchesType;
    });
    
    renderPlanets();
}

// Planet detail modal
window.showPlanetDetail = function(planetName) {
    const planet = planets.find(p => p.name === planetName);
    if (!planet) return;
    
    const content = `
        <div class="grid md:grid-cols-2 gap-8">
            <div>
                <img src="${planet.image}" alt="${planet.name}" class="w-full rounded-xl mb-4">
                <div class="grid grid-cols-2 gap-4">
                    <div class="glass rounded-xl p-4 text-center">
                        <p class="text-2xl font-bold" style="color: ${planet.color}">${planet.moons}</p>
                        <p class="text-sm text-gray-400">Bulan</p>
                    </div>
                    <div class="glass rounded-xl p-4 text-center">
                        <p class="text-2xl font-bold" style="color: ${planet.color}">${planet.orbitalPeriod}</p>
                        <p class="text-sm text-gray-400">Periode Orbital</p>
                    </div>
                </div>
            </div>
            <div>
                <h3 class="font-space font-bold text-3xl mb-4" style="color: ${planet.color}">${planet.name}</h3>
                <p class="text-gray-300 mb-6">${planet.description}</p>
                
                <div class="space-y-4">
                    <div class="flex justify-between py-3 border-b border-white/10">
                        <span class="text-gray-400">Tipe</span>
                        <span class="font-semibold">${planet.type}</span>
                    </div>
                    <div class="flex justify-between py-3 border-b border-white/10">
                        <span class="text-gray-400">Diameter</span>
                        <span class="font-semibold">${planet.diameter}</span>
                    </div>
                    <div class="flex justify-between py-3 border-b border-white/10">
                        <span class="text-gray-400">Gravitasi</span>
                        <span class="font-semibold">${planet.gravity}</span>
                    </div>
                    <div class="flex justify-between py-3 border-b border-white/10">
                        <span class="text-gray-400">Jarak ke Matahari</span>
                        <span class="font-semibold">${planet.distanceFromSun}</span>
                    </div>
                    <div class="flex justify-between py-3 border-b border-white/10">
                        <span class="text-gray-400">Suhu</span>
                        <span class="font-semibold">${planet.temperature}</span>
                    </div>
                    <div class="flex justify-between py-3 border-b border-white/10">
                        <span class="text-gray-400">Periode Orbital</span>
                        <span class="font-semibold">${planet.orbitalPeriod}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    createModal(content, { title: planet.name, className: 'max-w-5xl' });
};
