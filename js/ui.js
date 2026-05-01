// ui.js - UI Helper Functions
// Handles DOM rendering, animations, and reusable UI components

// Show toast notification
export function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast || !toastMessage) return;
    
    toastMessage.textContent = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    
    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-20', 'opacity-0');
    }, duration);
}

// Create skeleton loader
export function createSkeleton(type = 'card') {
    const skeletons = {
        card: `<div class="glass rounded-2xl p-6 animate-pulse">
            <div class="skeleton w-full h-48 rounded-xl mb-4"></div>
            <div class="skeleton w-3/4 h-6 rounded mb-2"></div>
            <div class="skeleton w-1/2 h-4 rounded"></div>
        </div>`,
        image: `<div class="skeleton w-full h-64 rounded-xl"></div>`,
        text: `<div class="skeleton w-full h-4 rounded mb-2"></div>
               <div class="skeleton w-3/4 h-4 rounded"></div>`
    };
    return skeletons[type] || skeletons.card;
}

// Render error state
export function renderError(container, message = 'Terjadi kesalahan. Silakan coba lagi.') {
    if (!container) return;
    container.innerHTML = `
        <div class="text-center py-12 glass rounded-2xl p-8">
            <svg class="w-16 h-16 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="text-xl text-red-400">${message}</p>
            <button onclick="location.reload()" class="mt-4 px-6 py-2 glass rounded-full hover:bg-white/10 transition-colors">
                Coba Lagi
            </button>
        </div>
    `;
}

// Modal system
export function createModal(content, options = {}) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm opacity-0 transition-opacity duration-300';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    
    modal.innerHTML = `
        <div class="glass rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto ${options.className || ''}">
            <div class="sticky top-0 z-10 glass rounded-t-2xl px-6 py-4 flex justify-between items-center">
                <h3 class="font-space font-bold text-xl">${options.title || ''}</h3>
                <button class="modal-close p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Close modal">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div class="p-6">${content}</div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
    });
    
    // Close handlers
    const closeModal = () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
        document.body.style.overflow = '';
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
    
    document.body.style.overflow = 'hidden';
    
    return { modal, close: closeModal };
}

// LocalStorage helpers
export const storage = {
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    },
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Storage error:', e);
        }
    },
    remove(key) {
        localStorage.removeItem(key);
    }
};

// Format date
export function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Debounce function
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize particles background
export function initParticles(elementId = 'particles-js') {
    if (typeof particlesJS === 'undefined') return;
    
    particlesJS(elementId, {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: ['#8b5cf6', '#3b82f6', '#06b6d4'] },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#3b82f6',
                opacity: 0.2,
                width: 1
            },
            move: { enable: true, speed: 2, direction: 'none', random: true, out_mode: 'out' }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' }
            }
        },
        retina_detect: true
    });
}

// Initialize common UI elements (navbar, scroll progress, back to top)
export function initCommonUI() {
    // Scroll progress bar
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + '%';
        });
    }
    
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.remove('opacity-0', 'invisible');
                backToTop.classList.add('opacity-100', 'visible');
            } else {
                backToTop.classList.add('opacity-0', 'invisible');
                backToTop.classList.remove('opacity-100', 'visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const htmlElement = document.documentElement;
    
    const toggleTheme = () => {
        htmlElement.classList.toggle('dark');
        const isDark = htmlElement.classList.contains('dark');
        storage.set('theme', isDark ? 'dark' : 'light');
    };
    
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
    
    // Load saved theme
    const savedTheme = storage.get('theme', 'dark');
    if (savedTheme === 'light') {
        htmlElement.classList.remove('dark');
    }
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true });
    }
}
