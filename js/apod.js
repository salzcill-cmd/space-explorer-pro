// apod.js - Astronomy Picture of the Day Page
// Handles APOD display, date picker, favorites

import { getAPOD } from './api.js';
import { showToast, renderError, createModal, storage, formatDate } from './ui.js';

let currentAPOD = null;
let favorites = storage.get('apodFavorites', []);

document.addEventListener('DOMContentLoaded', async () => {
    await loadAPOD();
    initDatePicker();
    initFavorites();
});

async function loadAPOD(date = null) {
    const container = document.getElementById('apodContainer');
    if (!container) return;
    
    container.innerHTML = `
        <div class="glass rounded-2xl p-6">
            <div class="skeleton w-full h-96 rounded-xl mb-6"></div>
            <div class="skeleton w-3/4 h-8 rounded mb-4"></div>
            <div class="skeleton w-1/2 h-4 rounded mb-2"></div>
            <div class="skeleton w-full h-20 rounded"></div>
        </div>
    `;
    
    try {
        const data = await getAPOD(date);
        currentAPOD = data;
        renderAPOD(data);
    } catch (error) {
        renderError(container, 'Gagal memuat APOD. Periksa koneksi internet Anda.');
    }
}

function renderAPOD(data) {
    const container = document.getElementById('apodContainer');
    if (!container) return;
    
    const isFavorite = favorites.some(fav => fav.date === data.date);
    
    container.innerHTML = `
        <div class="glass rounded-2xl p-6 md:p-8">
            <div class="mb-6 rounded-xl overflow-hidden bg-black/20">
                ${data.media_type === 'image' 
                    ? `<img src="${data.url}" alt="${data.title}" class="w-full max-h-[600px] object-contain cursor-pointer hover:scale-[1.02] transition-transform duration-500" id="apodImage">`
                    : `<iframe src="${data.url}" class="w-full h-[600px]" frameborder="0" allowfullscreen></iframe>`
                }
            </div>
            
            <div class="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                    <h2 class="font-space font-bold text-2xl md:text-3xl mb-2">${data.title}</h2>
                    <p class="text-neon-cyan">${formatDate(data.date)}</p>
                </div>
                <div class="flex space-x-3 mt-4 md:mt-0">
                    <button id="favoriteBtn" class="px-6 py-3 glass rounded-full hover:bg-white/10 transition-all duration-300 flex items-center space-x-2 ${isFavorite ? 'text-neon-cyan' : ''}">
                        <svg class="w-5 h-5" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                        <span>${isFavorite ? 'Tersimpan' : 'Simpan'}</span>
                    </button>
                    <button id="fullscreenBtn" class="px-6 py-3 glass rounded-full hover:bg-white/10 transition-all duration-300 flex items-center space-x-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                        </svg>
                        <span>Fullscreen</span>
                    </button>
                </div>
            </div>
            
            <div class="prose prose-invert max-w-none">
                <p class="text-gray-300 leading-relaxed">${data.explanation}</p>
            </div>
            
            ${data.copyright ? `<p class="mt-4 text-sm text-gray-500">Credit: ${data.copyright}</p>` : ''}
        </div>
    `;
    
    // Event listeners
    const favoriteBtn = document.getElementById('favoriteBtn');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', () => toggleFavorite(data));
    }
    
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => openFullscreen(data));
    }
    
    const apodImage = document.getElementById('apodImage');
    if (apodImage) {
        apodImage.addEventListener('click', () => openFullscreen(data));
    }
}

function toggleFavorite(data) {
    const index = favorites.findIndex(fav => fav.date === data.date);
    
    if (index > -1) {
        favorites.splice(index, 1);
        showToast('Dihapus dari favorit');
    } else {
        favorites.push({
            date: data.date,
            title: data.title,
            url: data.url,
            media_type: data.media_type
        });
        showToast('Ditambahkan ke favorit');
    }
    
    storage.set('apodFavorites', favorites);
    renderAPOD(data); // Re-render to update button state
    renderFavorites();
}

function openFullscreen(data) {
    if (data.media_type === 'image') {
        createModal(`
            <img src="${data.hdurl || data.url}" alt="${data.title}" class="w-full rounded-xl">
        `, { title: data.title, className: 'bg-transparent' });
    }
}

function initDatePicker() {
    const dateInput = document.getElementById('datePicker');
    if (!dateInput) return;
    
    // Set max date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.max = today;
    dateInput.value = today;
    
    dateInput.addEventListener('change', (e) => {
        loadAPOD(e.target.value);
    });
}

function initFavorites() {
    renderFavorites();
}

function renderFavorites() {
    const container = document.getElementById('favoritesContainer');
    if (!container) return;
    
    if (favorites.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-gray-400">
                <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                <p>Belum ada favorit. Tambahkan dengan tombol Simpan.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <h3 class="font-space font-bold text-xl mb-6">Favorit (${favorites.length})</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${favorites.map(fav => `
                <div class="glass rounded-xl p-4 hover:neon-glow transition-all duration-300">
                    <img src="${fav.url}" alt="${fav.title}" class="w-full h-32 object-cover rounded-lg mb-3">
                    <h4 class="font-semibold mb-2 line-clamp-2">${fav.title}</h4>
                    <p class="text-sm text-gray-400 mb-3">${fav.date}</p>
                    <button onclick="removeFavorite('${fav.date}')" class="text-red-400 hover:text-red-300 text-sm transition-colors">
                        Hapus
                    </button>
                </div>
            `).join('')}
        </div>
    `;
}

// Global function for removing favorites
window.removeFavorite = function(date) {
    favorites = favorites.filter(fav => fav.date !== date);
    storage.set('apodFavorites', favorites);
    showToast('Dihapus dari favorit');
    renderFavorites();
    
    // Update main APOD if it's the same date
    if (currentAPOD && currentAPOD.date === date) {
        renderAPOD(currentAPOD);
    }
};
