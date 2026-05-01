// api.js - NASA API Manager
// Handles all API requests with error handling and caching

const API_KEY = '3vZgh1G5NxAHmiAfks4ieO9W8Y8f3mWpwJvhtmJ7';
const BASE_URL = 'https://api.nasa.gov';

// Cache implementation
const cache = new Map();

async function fetchWithCache(url, cacheTime = 300000) {
    const now = Date.now();
    const cached = cache.get(url);
    
    if (cached && (now - cached.timestamp) < cacheTime) {
        return cached.data;
    }
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        cache.set(url, { data, timestamp: now });
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// NASA APOD API
export async function getAPOD(date = null) {
    const url = date 
        ? `${BASE_URL}/planetary/apod?api_key=${API_KEY}&date=${date}`
        : `${BASE_URL}/planetary/apod?api_key=${API_KEY}`;
    return fetchWithCache(url);
}

// Get multiple APODs
export async function getAPODRange(startDate, endDate) {
    const url = `${BASE_URL}/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;
    return fetchWithCache(url, 600000);
}

// Planet data (static since no free planet API available)
export function getPlanetsData() {
    return [
        {
            name: 'Mercury',
            type: 'Terrestrial',
            diameter: '4,879 km',
            gravity: '3.7 m/s²',
            distanceFromSun: '57.9 million km',
            orbitalPeriod: '88 days',
            temperature: '-180 to 430°C',
            moons: 0,
            description: 'Planet terkecil di tata surya dan terdekat ke Matahari.',
            color: '#8C7853',
            image: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=600'
        },
        {
            name: 'Venus',
            type: 'Terrestrial',
            diameter: '12,104 km',
            gravity: '8.87 m/s²',
            distanceFromSun: '108.2 million km',
            orbitalPeriod: '225 days',
            temperature: '462°C',
            moons: 0,
            description: 'Planet terpanas dengan atmosfer tebal yang memerangkap panas.',
            color: '#FFC649',
            image: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=600'
        },
        {
            name: 'Earth',
            type: 'Terrestrial',
            diameter: '12,742 km',
            gravity: '9.8 m/s²',
            distanceFromSun: '149.6 million km',
            orbitalPeriod: '365.25 days',
            temperature: '15°C (avg)',
            moons: 1,
            description: 'Satu-satunya planet yang diketahui mendukung kehidupan.',
            color: '#6B93D6',
            image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=600'
        },
        {
            name: 'Mars',
            type: 'Terrestrial',
            diameter: '6,779 km',
            gravity: '3.72 m/s²',
            distanceFromSun: '227.9 million km',
            orbitalPeriod: '687 days',
            temperature: '-140 to 20°C',
            moons: 2,
            description: 'Planet merah dengan gunung berapi tertinggi di tata surya.',
            color: '#E27B58',
            image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=600'
        },
        {
            name: 'Jupiter',
            type: 'Gas Giant',
            diameter: '139,820 km',
            gravity: '24.79 m/s²',
            distanceFromSun: '778.5 million km',
            orbitalPeriod: '12 years',
            temperature: '-108°C',
            moons: 79,
            description: 'Planet terbesar dengan Bintik Merah Raksasa yang ikonik.',
            color: '#C88B3A',
            image: 'https://images.unsplash.com/photo-1614314107760-44e7323cc076?w=600'
        },
        {
            name: 'Saturn',
            type: 'Gas Giant',
            diameter: '116,460 km',
            gravity: '10.44 m/s²',
            distanceFromSun: '1.434 billion km',
            orbitalPeriod: '29 years',
            temperature: '-139°C',
            moons: 82,
            description: 'Dikenal karena sistem cincinnya yang indah dan spektakuler.',
            color: '#E4CD9E',
            image: 'https://images.unsplash.com/photo-1614314107760-44e7323cc076?w=600'
        },
        {
            name: 'Uranus',
            type: 'Ice Giant',
            diameter: '50,724 km',
            gravity: '8.87 m/s²',
            distanceFromSun: '2.871 billion km',
            orbitalPeriod: '84 years',
            temperature: '-197°C',
            moons: 27,
            description: 'Planet yang berputar pada sisinya dengan warna biru kehijauan.',
            color: '#4FD0E7',
            image: 'https://images.unsplash.com/photo-1614314107760-44e7323cc076?w=600'
        },
        {
            name: 'Neptune',
            type: 'Ice Giant',
            diameter: '49,244 km',
            gravity: '11.15 m/s²',
            distanceFromSun: '4.495 billion km',
            orbitalPeriod: '165 years',
            temperature: '-201°C',
            moons: 14,
            description: 'Planet terjauh dengan angin terkuat di tata surya.',
            color: '#4B70DD',
            image: 'https://images.unsplash.com/photo-1614314107760-44e7323cc076?w=600'
        }
    ];
}

// Random Space Fact
export async function getRandomSpaceFact() {
    const facts = [
        'Matahari memproduksi energi setara dengan 100 miliar bom atom setiap detik.',
        'Satu hari di Venus lebih lama dari satu tahun di Venus.',
        'Jupiter memiliki bulan Ganymede yang lebih besar dari planet Merkurius.',
        'Lubang hitam bisa memiliki massa jutaan kali Matahari.',
        'Suhu permukaan Venus bisa mencapai 462°C - lebih panas dari Merkurius.',
        'Bintang paling dekat dengan Matahari adalah Proxima Centauri, berjarak 4.24 tahun cahaya.',
        'Galaksi Bima Sakti memiliki sekitar 200-400 miliar bintang.',
        'Saturnus tidak satu-satunya planet dengan cincin - Jupiter, Uranus, dan Neptune juga memilikinya.'
    ];
    return facts[Math.floor(Math.random() * facts.length)];
}

// Gallery images (curated space images)
export function getGalleryImages() {
    return [
        { url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800', title: 'Earth from Space', category: 'earth' },
        { url: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800', title: 'Mercury Surface', category: 'planets' },
        { url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800', title: 'Nebula', category: 'nebula' },
        { url: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800', title: 'Galaxy', category: 'galaxy' },
        { url: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800', title: 'Star Cluster', category: 'stars' },
        { url: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=800', title: 'Milky Way', category: 'galaxy' },
        { url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800', title: 'From Orbit', category: 'earth' },
        { url: 'https://images.unsplash.com/photo-1614314107760-44e7323cc076?w=800', title: 'Gas Giants', category: 'planets' },
        { url: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800', title: 'Night Sky', category: 'stars' },
        { url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800', title: 'Cosmic Clouds', category: 'nebula' },
        { url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800', title: 'Blue Planet', category: 'earth' },
        { url: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800', title: 'Deep Space', category: 'stars' }
    ];
}
