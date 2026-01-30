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
import { LanguageProvider } from './Contexts/LanguageContext';

window.Alpine = Alpine;
Alpine.start();

// Mount PillNav if the container exists
const navbarRoot = document.getElementById('navbar-root');
if (navbarRoot) {
    const root = createRoot(navbarRoot);
    const navItems = [
        { label: 'nav.home', href: '/' },
        { label: 'nav.services', href: '/services' },
        { label: 'nav.solutions', href: '/solutions' },
        { label: 'nav.portfolio', href: '/portfolio' },
        { label: 'nav.about', href: '/about' },
        { label: 'nav.contact', href: '/contact' }
    ];

    root.render(
        <LanguageProvider>
            <PillNav items={navItems} />
        </LanguageProvider>
    );
}

// Mount Hero if the container exists
const heroRoot = document.getElementById('hero-root');
if (heroRoot) {
    const root = createRoot(heroRoot);
    root.render(
        <LanguageProvider>
            <Hero />
        </LanguageProvider>
    );
}

// Mount AdminDashboard if the container exists
const adminDashboardRoot = document.getElementById('admin-dashboard-root');
if (adminDashboardRoot) {
    const root = createRoot(adminDashboardRoot);
    // Parse data from data attributes if needed
    const data = adminDashboardRoot.dataset.stats ? JSON.parse(adminDashboardRoot.dataset.stats) : {};
    root.render(
        <LanguageProvider>
            <AdminDashboard stats={data} />
        </LanguageProvider>
    );
}

// Mount SloganServices if the container exists
const sloganServicesRoot = document.getElementById('slogan-services-root');
if (sloganServicesRoot) {
    const root = createRoot(sloganServicesRoot);
    root.render(
        <LanguageProvider>
            <SloganServices />
        </LanguageProvider>
    );
}

// Mount Solutions if the container exists
const solutionsRoot = document.getElementById('solutions-root');
if (solutionsRoot) {
    const root = createRoot(solutionsRoot);
    root.render(
        <LanguageProvider>
            <Solutions />
        </LanguageProvider>
    );
}

// Mount PortfolioShowcase if the container exists
const portfolioRoot = document.getElementById('portfolio-root');
if (portfolioRoot) {
    const root = createRoot(portfolioRoot);
    const portfolios = JSON.parse(portfolioRoot.dataset.portfolios || '[]');
    root.render(
        <LanguageProvider>
            <PortfolioShowcase portfolios={portfolios} />
        </LanguageProvider>
    );
}

// Mount ContactFooter if the container exists
const contactFooterRoot = document.getElementById('contact-footer-root');
if (contactFooterRoot) {
    const root = createRoot(contactFooterRoot);
    root.render(
        <LanguageProvider>
            <ContactFooter />
        </LanguageProvider>
    );
}
