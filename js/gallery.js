// gallery.js - Gallery Page
// Handles gallery grid, filtering, lightbox

import { getGalleryImages } from './api.js';
import { showToast, initCommonUI } from './ui.js';

let images = [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    initCommonUI();
    loadGallery();
    initFilters();
});

function loadGallery() {
    const container = document.getElementById('galleryContainer');
    if (!container) return;
    
    images = getGalleryImages();
    
    // Initialize lightbox
    if (typeof GLightbox !== 'undefined') {
        GLightbox({ selector: '.gallery-link' });
    }
    
    renderGallery();
}

function renderGallery() {
    const container = document.getElementById('galleryContainer');
    if (!container) return;
    
    const filtered = currentFilter === 'all' 
        ? images 
        : images.filter(img => img.category === currentFilter);
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12 glass rounded-2xl">
                <p class="text-gray-400">Tidak ada gambar dalam kategori ini.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filtered.map((img, index) => `
        <a href="${img.url}" class="gallery-link gallery-item glass rounded-xl overflow-hidden" 
           data-gallery="space" 
           data-aos="fade-up" 
           data-aos-delay="${index * 50}"
           data-title="${img.title}">
            <img src="${img.url}" alt="${img.title}" 
                 class="w-full h-64 object-cover lazyload" 
                 loading="lazy">
            <div class="p-3">
                <p class="text-sm font-semibold">${img.title}</p>
                <span class="text-xs text-gray-400 capitalize">${img.category}</span>
            </div>
        </a>
    `).join('');
    
    // Reinitialize lightbox after rendering
    if (typeof GLightbox !== 'undefined') {
        setTimeout(() => {
            GLightbox({ selector: '.gallery-link' });
        }, 100);
    }
}

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active', 'bg-white/10'));
            btn.classList.add('active', 'bg-white/10');
            
            // Apply filter
            currentFilter = btn.getAttribute('data-filter');
            renderGallery();
        });
    });
}
