import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../Contexts/LanguageContext';
import { t } from '../translations';

const PillNav = ({
    logo,
    logoAlt = 'Logo',
    items,
    activeHref,
    className = '',
    ease = 'power3.easeOut',
    baseColor = '#000000',
    pillColor = '#060010',
    hoveredPillTextColor = '#FFFFFF',
    pillTextColor,
    onMobileMenuClick,
    initialLoadAnimation = true
}) => {
    const resolvedPillTextColor = pillTextColor ?? baseColor;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const circleRefs = useRef([]);
    const tlRefs = useRef([]);
    const activeTweenRefs = useRef([]);
    const logoImgRef = useRef(null);
    const logoTweenRef = useRef(null);
    const hamburgerRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const navItemsRef = useRef(null);
    const logoRef = useRef(null);
    const { language, toggleLanguage } = useLanguage();

    // Centralized animation function
    const animateItem = useCallback((index, shouldShow) => {
        const tl = tlRefs.current[index];
        if (!tl) return;

        activeTweenRefs.current[index]?.kill();
        activeTweenRefs.current[index] = tl.tweenTo(shouldShow ? tl.duration() : 0, {
            duration: shouldShow ? 0.3 : 0.2,
            ease,
            overwrite: 'auto'
        });
    }, [ease]);

    useEffect(() => {
        const layout = () => {
            circleRefs.current.forEach((circle, index) => {
                if (!circle?.parentElement) return;

                const pill = circle.parentElement;
                const rect = pill.getBoundingClientRect();
                const { width: w, height: h } = rect;
                const R = ((w * w) / 4 + h * h) / (2 * h);
                const D = Math.ceil(2 * R) + 2;
                const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
                const originY = D - delta;

                circle.style.width = `${D}px`;
                circle.style.height = `${D}px`;
                circle.style.bottom = `-${delta}px`;

                gsap.set(circle, {
                    xPercent: -50,
                    scale: 0,
                    transformOrigin: `50% ${originY}px`
                });

                const label = pill.querySelector('.pill-label');
                const white = pill.querySelector('.pill-label-hover');

                if (label) gsap.set(label, { y: 0 });
                if (white) gsap.set(white, { y: h + 12, opacity: 0 });

                tlRefs.current[index]?.kill();
                const tl = gsap.timeline({ paused: true });

                tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

                if (label) {
                    tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
                }

                if (white) {
                    gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
                    tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
                }

                tlRefs.current[index] = tl;

                // Re-sync after layout if it's the active one
                if (items[index].href === activeHref) {
                    animateItem(index, true);
                }
            });
        };

        layout();

        const onResize = () => layout();
        window.addEventListener('resize', onResize);

        if (document.fonts?.ready) {
            document.fonts.ready.then(layout).catch(() => { });
        }

        const menu = mobileMenuRef.current;
        if (menu) {
            gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1, y: 0 });
        }

        if (initialLoadAnimation) {
            const logo = logoRef.current;
            const navItems = navItemsRef.current;

            if (logo) {
                gsap.set(logo, { scale: 0 });
                gsap.to(logo, {
                    scale: 1,
                    duration: 0.6,
                    ease
                });
            }

            if (navItems) {
                gsap.set(navItems, { width: 0, overflow: 'hidden' });
                gsap.to(navItems, {
                    width: 'auto',
                    duration: 0.6,
                    ease
                });
            }
        }

        return () => window.removeEventListener('resize', onResize);
    }, [items, ease, initialLoadAnimation]);

    // Handle scroll-based activation
    useEffect(() => {
        items.forEach((item, i) => {
            // Only deactivate if we're not currently hovering on it
            // (Actually, scroll detection should take precedence for active state)
            const isMatch = item.href === activeHref;
            animateItem(i, isMatch);
        });
    }, [activeHref, items, animateItem]);

    const handleEnter = i => {
        animateItem(i, true);
    };

    const handleLeave = i => {
        // If it's the active section, don't clear the highlight
        if (items[i].href === activeHref) return;
        animateItem(i, false);
    };

    const handleLogoEnter = () => {
        const img = logoImgRef.current;
        if (!img) return;
        logoTweenRef.current?.kill();
        gsap.set(img, { rotate: 0 });
        logoTweenRef.current = gsap.to(img, {
            rotate: 360,
            duration: 0.2,
            ease,
            overwrite: 'auto'
        });
    };

    const toggleMobileMenu = () => {
        const newState = !isMobileMenuOpen;
        setIsMobileMenuOpen(newState);

        const hamburger = hamburgerRef.current;
        const menu = mobileMenuRef.current;

        if (hamburger) {
            const lines = hamburger.querySelectorAll('.hamburger-line');
            if (newState) {
                gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
                gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
            } else {
                gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
                gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
            }
        }

        if (menu) {
            if (newState) {
                gsap.set(menu, { visibility: 'visible' });
                gsap.fromTo(
                    menu,
                    { opacity: 0, y: 10, scaleY: 1 },
                    {
                        opacity: 1,
                        y: 0,
                        scaleY: 1,
                        duration: 0.3,
                        ease,
                        transformOrigin: 'top center'
                    }
                );
            } else {
                gsap.to(menu, {
                    opacity: 0,
                    y: 10,
                    scaleY: 1,
                    duration: 0.2,
                    ease,
                    transformOrigin: 'top center',
                    onComplete: () => {
                        gsap.set(menu, { visibility: 'hidden' });
                    }
                });
            }
        }

        onMobileMenuClick?.();
    };

    const cssVars = {
        ['--base']: baseColor,
        ['--pill-bg']: pillColor,
        ['--hover-text']: hoveredPillTextColor,
        ['--pill-text']: resolvedPillTextColor,
        ['--nav-h']: '46px',
        ['--logo']: '32px',
        ['--pill-pad-x']: '20px',
        ['--pill-gap']: '4px'
    };

    return (
        <div className="fixed top-0 left-0 w-full z-[5000] flex justify-center py-6 pointer-events-none">
            <div className="flex items-center gap-3 pointer-events-auto">
                {/* Logo Section */}
                <a
                    href="/"
                    aria-label="Home"
                    onMouseEnter={handleLogoEnter}
                    ref={el => {
                        logoRef.current = el;
                    }}
                    className="flex h-[var(--nav-h)] w-[var(--nav-h)] items-center justify-center rounded-full bg-white shadow-sm border border-black/5"
                    style={cssVars}
                >
                    <img src="/images/logo-3d-user.png" alt="Logo" ref={logoImgRef} className="w-8 h-8 object-contain" />
                </a>

                {/* Nav Items Pill */}
                <nav
                    className={`relative h-[var(--nav-h)] flex items-center justify-start bg-white/95 backdrop-blur-md rounded-full border border-black/5 px-1 shadow-sm ${className}`}
                    aria-label="Primary"
                    style={cssVars}
                >
                    <div ref={navItemsRef} className="relative flex items-center h-full overflow-x-auto no-scrollbar max-w-[calc(100vw-150px)]">
                        <ul
                            role="menubar"
                            className="list-none flex items-stretch m-0 p-0 h-full"
                            style={{ gap: 'var(--pill-gap)' }}
                        >
                            {items.map((item, i) => {
                                const isActive = activeHref === item.href;

                                const pillStyle = {
                                    background: 'transparent',
                                    color: 'var(--pill-text)',
                                    paddingLeft: 'var(--pill-pad-x)',
                                    paddingRight: 'var(--pill-pad-x)'
                                };

                                const PillContent = (
                                    <>
                                        <span
                                            className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                                            style={{
                                                background: 'var(--pill-bg)',
                                                willChange: 'transform'
                                            }}
                                            aria-hidden="true"
                                            ref={el => {
                                                circleRefs.current[i] = el;
                                            }}
                                        />
                                        <span className="label-stack relative inline-block leading-[1] z-[2]">
                                            <span
                                                className="pill-label relative z-[2] inline-block leading-[1] text-[13px] md:text-[14px] font-bold"
                                                style={{
                                                    willChange: 'transform',
                                                    color: isActive ? 'var(--hover-text)' : 'inherit'
                                                }}
                                            >
                                                {t(item.label, language)}
                                            </span>
                                            <span
                                                className="pill-label-hover absolute left-0 top-0 z-[3] inline-block text-[13px] md:text-[14px] font-bold"
                                                style={{
                                                    color: 'var(--hover-text)',
                                                    willChange: 'transform, opacity'
                                                }}
                                                aria-hidden="true"
                                            >
                                                {t(item.label, language)}
                                            </span>
                                        </span>
                                    </>
                                );

                                const basePillClasses =
                                    'relative overflow-hidden inline-flex items-center justify-center h-[calc(var(--nav-h)-8px)] my-auto no-underline rounded-full box-border font-semibold tracking-[0.2px] whitespace-nowrap cursor-pointer px-0 transition-colors duration-200';

                                return (
                                    <li key={item.href} role="none" className="flex items-center h-full">
                                        <a
                                            role="menuitem"
                                            href={item.href}
                                            className={basePillClasses}
                                            style={pillStyle}
                                            aria-label={item.ariaLabel || item.label}
                                            onMouseEnter={() => handleEnter(i)}
                                            onMouseLeave={() => handleLeave(i)}
                                        >
                                            {PillContent}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </nav>

                {/* Language Switcher */}
                <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md rounded-full border border-black/10 p-1 shadow-sm h-[var(--nav-h)]">
                    <button
                        onClick={() => language !== 'id' && toggleLanguage()}
                        className={`px-4 h-[calc(var(--nav-h)-8px)] rounded-full text-[11px] font-bold transition-all duration-300 ${language === 'id'
                            ? 'bg-black text-white'
                            : 'text-black/60 hover:text-black hover:bg-black/5'
                            }`}
                    >
                        IND
                    </button>
                    <button
                        onClick={() => language !== 'en' && toggleLanguage()}
                        className={`px-4 h-[calc(var(--nav-h)-8px)] rounded-full text-[11px] font-bold transition-all duration-300 ${language === 'en'
                            ? 'bg-black text-white'
                            : 'text-black/60 hover:text-black hover:bg-black/5'
                            }`}
                    >
                        ENG
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PillNav;
