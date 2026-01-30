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
        { label: 'nav.home', href: '#beranda' },
        { label: 'nav.services', href: '#layanan' },
        { label: 'nav.solutions', href: '#solusi' },
        { label: 'nav.portfolio', href: '#portfolio' },
        { label: 'nav.contact', href: '#kontak' }
    ];

    const NavbarWrapper = () => {
        const [activeSection, setActiveSection] = React.useState('#beranda');

        React.useEffect(() => {
            const observerOptions = {
                root: null,
                rootMargin: '-10% 0px -80% 0px', // Focus on the top area of the viewport
                threshold: 0
            };

            const observerCallback = (entries) => {
                const intersecting = entries.filter(e => e.isIntersecting);

                if (intersecting.length > 0) {
                    // Pick the section closest to the top of the viewport
                    const winner = intersecting.reduce((prev, curr) => {
                        return (prev.boundingClientRect.top > curr.boundingClientRect.top) ? curr : prev;
                    });

                    const id = winner.target.id;
                    let activeId = '#' + id;
                    if (id === 'hero-root') activeId = '#beranda';
                    if (id === 'slogan-services-root') activeId = '#layanan';
                    if (id === 'solutions-root') activeId = '#solusi';
                    if (id === 'portfolio-root') activeId = '#portfolio';
                    if (id === 'contact-footer-root') activeId = '#kontak';

                    setActiveSection(activeId);
                }
            };

            const observer = new IntersectionObserver(observerCallback, observerOptions);

            ['hero-root', 'slogan-services-root', 'solutions-root', 'portfolio-root', 'contact-footer-root'].forEach(id => {
                const el = document.getElementById(id);
                if (el) observer.observe(el);
            });

            return () => observer.disconnect();
        }, []);

        return (
            <LanguageProvider>
                <PillNav items={navItems} activeHref={activeSection} />
            </LanguageProvider>
        );
    };

    root.render(<NavbarWrapper />);
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
