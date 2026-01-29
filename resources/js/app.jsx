import './bootstrap';
import Alpine from 'alpinejs';

import React from 'react';
import { createRoot } from 'react-dom/client';
import PillNav from './Components/PillNav';

import Hero from './Components/Hero';
import AdminDashboard from './Components/Admin/AdminDashboard';

window.Alpine = Alpine;
Alpine.start();

// Mount PillNav if the container exists
const navbarRoot = document.getElementById('navbar-root');
if (navbarRoot) {
    const root = createRoot(navbarRoot);
    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Layanan', href: '/services' },
        { label: 'Portfolio', href: '/portfolio' },
        { label: 'Tentang', href: '/about' },
        { label: 'Kontak', href: '/contact' }
    ];

    root.render(
        <PillNav
            items={navItems}
            activeHref={window.location.pathname}
            baseColor="#000000"
            pillColor="#000000"
            hoveredPillTextColor="#ffffff"
            pillTextColor="#000000"
        />
    );
}

// Mount Hero if the container exists
const heroRoot = document.getElementById('hero-root');
if (heroRoot) {
    const root = createRoot(heroRoot);
    root.render(<Hero />);
}

// Mount AdminDashboard if the container exists
const adminDashboardRoot = document.getElementById('admin-dashboard-root');
if (adminDashboardRoot) {
    const root = createRoot(adminDashboardRoot);
    // Parse data from data attributes if needed
    const data = adminDashboardRoot.dataset.stats ? JSON.parse(adminDashboardRoot.dataset.stats) : {};
    root.render(<AdminDashboard stats={data} />);
}
