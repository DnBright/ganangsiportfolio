import './bootstrap';
import Alpine from 'alpinejs';

import React from 'react';
import { createRoot } from 'react-dom/client';
import PillNav from './Components/PillNav';

import Hero from './Components/Hero';
import AdminDashboard from './Components/Admin/AdminDashboard';
import SloganServices from './Components/SloganServices';
import PortfolioShowcase from './Components/PortfolioShowcase';
import Solutions from './Components/Solutions';
import ContactFooter from './Components/ContactFooter';
import ImpactIntro from './Components/ImpactIntro';

window.Alpine = Alpine;
Alpine.start();

// Mount PillNav if the container exists
const navbarRoot = document.getElementById('navbar-root');
if (navbarRoot) {
    const root = createRoot(navbarRoot);
    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Layanan', href: '/services' },
        { label: 'Solusi', href: '/solutions' },
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

// Mount SloganServices if the container exists
const sloganServicesRoot = document.getElementById('slogan-services-root');
if (sloganServicesRoot) {
    const root = createRoot(sloganServicesRoot);
    root.render(<SloganServices />);
}

// Mount ImpactIntro if the container exists
const impactIntroRoot = document.getElementById('impact-intro-root');
if (impactIntroRoot) {
    const root = createRoot(impactIntroRoot);
    root.render(<ImpactIntro />);
}

// Mount Solutions if the container exists
const solutionsRoot = document.getElementById('solutions-root');
if (solutionsRoot) {
    const root = createRoot(solutionsRoot);
    root.render(<Solutions />);
}

// Mount PortfolioShowcase if the container exists
const portfolioRoot = document.getElementById('portfolio-root');
if (portfolioRoot) {
    const root = createRoot(portfolioRoot);
    const portfolios = portfolioRoot.dataset.portfolios ? JSON.parse(portfolioRoot.dataset.portfolios) : [];
    root.render(<PortfolioShowcase portfolios={portfolios} />);
}

// Mount ContactFooter if the container exists
const contactFooterRoot = document.getElementById('contact-footer-root');
if (contactFooterRoot) {
    const root = createRoot(contactFooterRoot);
    root.render(<ContactFooter />);
}
