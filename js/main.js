// main.js - Main entry point
// Initializes common UI elements across all pages

import { initCommonUI, initParticles } from './ui.js';
import { getAPOD } from './api.js';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    initCommonUI();
    
    // Initialize particles on homepage
    if (document.getElementById('particles-js')) {
        initParticles();
    }
    
    // Load featured APOD on homepage
    const featuredApod = document.getElementById('featuredApod');
    if (featuredApod) {
        try {
            const data = await getAPOD();
            featuredApod.innerHTML = `
                <div class="grid md:grid-cols-2 gap-6 items-center">
                    <div class="rounded-xl overflow-hidden">
                        ${data.media_type === 'image' 
                            ? `<img src="${data.url}" alt="${data.title}" class="w-full h-64 object-cover hover:scale-105 transition-transform duration-500">`
                            : `<iframe src="${data.url}" class="w-full h-64" frameborder="0" allowfullscreen></iframe>`
                        }
                    </div>
                    <div>
                        <h3 class="font-space font-bold text-xl mb-2">${data.title}</h3>
                        <p class="text-neon-cyan text-sm mb-3">${data.date}</p>
                        <p class="text-gray-300 text-sm line-clamp-4">${data.explanation}</p>
                        <a href="apod.html" class="inline-block mt-4 px-6 py-2 glass rounded-full hover:bg-white/10 transition-all duration-300">
                            Lihat Selengkapnya →
                        </a>
                    </div>
                </div>
            `;
        } catch (error) {
            featuredApod.innerHTML = `
                <div class="text-center py-8">
                    <p class="text-red-400">Gagal memuat APOD. Silakan coba lagi nanti.</p>
                </div>
            `;
        }
    }
});
