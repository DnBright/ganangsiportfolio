import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        // Default to Indonesian, check localStorage
        return localStorage.getItem('language') || 'id';
    });

    const toggleLanguage = () => {
        const newLang = language === 'id' ? 'en' : 'id';
        setLanguage(newLang);
        localStorage.setItem('language', newLang);
        // Dispatch custom event for cross-root sync
        window.dispatchEvent(new CustomEvent('language-change', { detail: newLang }));
    };

    useEffect(() => {
        const handleLanguageChange = (e) => {
            if (e.detail !== language) {
                setLanguage(e.detail);
            }
        };

        window.addEventListener('language-change', handleLanguageChange);
        return () => window.removeEventListener('language-change', handleLanguageChange);
    }, [language]);

    useEffect(() => {
        // Persist language preference
        localStorage.setItem('language', language);
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
