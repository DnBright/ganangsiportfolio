import './bootstrap';
import Alpine from 'alpinejs';

import React from 'react';
import { createRoot } from 'react-dom/client';
import PillNav from './Components/PillNav';

window.Alpine = Alpine;
Alpine.start();

// Mount PillNav if the container exists
const navbarRoot = document.getElementById('navbar-root');
if (navbarRoot) {
    const root = createRoot(navbarRoot);
    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Portfolio', href: '/portfolio' },
        { label: 'Contact', href: '/contact' }
    ];

    root.render(
        <PillNav
            items={navItems}
            activeHref={window.location.pathname}
            baseColor="#1a1a2e"
            pillColor="#00adb5"
            hoveredPillTextColor="#ffffff"
            pillTextColor="#ffffff"
        />
    );
}
