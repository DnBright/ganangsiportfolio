export const translations = {
    // Hero Section
    hero: {
        tagline: {
            id: "Dark & Bright Agency // Presisi & Fokus",
            en: "Dark & Bright Agency // Precision & Focus"
        },
        dark: {
            id: "Integritas Absolut",
            en: "Absolute Integrity"
        },
        bright: {
            id: "Kejernihan Digital",
            en: "Digital Clarity"
        }
    },

    // Slogan & Services
    slogan: {
        headline: {
            id: "Kami membangun solusi digital yang presisi dan fokus pada kebutuhan bisnis Anda",
            en: "We build digital solutions with precision and focus on your business needs"
        },
        services: {
            id: "Layanan Kami",
            en: "Our Services"
        },
        webDev: {
            title: {
                id: "Pengembangan Web",
                en: "Web Development"
            },
            desc: {
                id: "Sistem web kustom yang dirancang untuk efisiensi maksimal",
                en: "Custom web systems designed for maximum efficiency"
            }
        },
        uiux: {
            title: {
                id: "Desain UI/UX",
                en: "UI/UX Design"
            },
            desc: {
                id: "Antarmuka yang intuitif dan pengalaman pengguna yang mulus",
                en: "Intuitive interfaces and seamless user experiences"
            }
        },
        consulting: {
            title: {
                id: "Konsultasi Digital",
                en: "Digital Consulting"
            },
            desc: {
                id: "Strategi digital yang disesuaikan dengan tujuan bisnis Anda",
                en: "Digital strategies tailored to your business goals"
            }
        }
    },

    // Solutions Section
    solutions: {
        headline: {
            id: "Solusi Kami",
            en: "Our Solutions"
        },
        subtitle: {
            id: "Kamu bukan tukang website, tapi problem solver",
            en: "You're not just a website builder, but a problem solver"
        },
        education: {
            title: {
                id: "Institusi & Pendidikan",
                en: "Institutions & Education"
            },
            desc: {
                id: "Transformasi digital untuk ekosistem pendidikan masa depan. Sistem manajemen pembelajaran, administrasi, dan operasional yang terintegrasi.",
                en: "Digital transformation for future educational ecosystems. Integrated learning management, administration, and operational systems."
            }
        },
        business: {
            title: {
                id: "Perusahaan & Bisnis",
                en: "Companies & Business"
            },
            desc: {
                id: "Solusi enterprise yang scalable untuk mempercepat pertumbuhan bisnis. Otomasi workflow, analitik data, dan efisiensi operasional.",
                en: "Scalable enterprise solutions to accelerate business growth. Workflow automation, data analytics, and operational efficiency."
            }
        },
        digitalization: {
            title: {
                id: "Digitalisasi Proses Administrasi",
                en: "Administrative Process Digitalization"
            },
            desc: {
                id: "Ubah tumpukan kertas menjadi data digital yang mudah diakses. Hemat waktu, kurangi error, dan tingkatkan produktivitas tim.",
                en: "Transform paper stacks into easily accessible digital data. Save time, reduce errors, and increase team productivity."
            }
        },
        custom: {
            title: {
                id: "Sistem Berbasis Kebutuhan",
                en: "Need-Based Systems"
            },
            desc: {
                id: "Bukan solusi generik. Kami membangun sistem yang dirancang khusus untuk memecahkan masalah unik organisasi Anda.",
                en: "Not generic solutions. We build systems specifically designed to solve your organization's unique problems."
            }
        }
    },

    // Portfolio Section
    portfolio: {
        selectedWorks: {
            id: "Karya Terpilih",
            en: "Selected Works"
        },
        year: {
            id: "Karya Terpilih",
            en: "Selected Works"
        },
        featured: {
            id: "PROYEK UNGGULAN",
            en: "FEATURED PROJECTS"
        },
        subtitle: {
            id: "Kurasi karya digital terbaik kami. Setiap proyek adalah bukti dedikasi kami terhadap presisi dan estetika.",
            en: "A curation of our finest digital craftsmanship. Each project is a testament to our dedication to precision and aesthetics."
        },
        scroll: {
            id: "Gulir untuk Menjelajah",
            en: "Scroll to Explore"
        },
        viewCase: {
            id: "Lihat Studi Kasus",
            en: "View Case Study"
        },
        ready: {
            id: "Siap Memulai?",
            en: "Ready to Start?"
        },
        cta: {
            id: "Mari membangun sesuatu yang luar biasa bersama.",
            en: "Let's build something exceptional together."
        },
        contact: {
            id: "Hubungi Kami",
            en: "Get in Touch"
        },
        viewAll: {
            id: "Lihat Semua Karya",
            en: "View All Work"
        }
    },

    // Contact & Footer
    contact: {
        title: {
            id: "Mari Bekerja Sama",
            en: "Let's Work Together"
        },
        subtitle: {
            id: "Siap memulai proyek Anda berikutnya? Hubungi kami.",
            en: "Ready to start your next project? Get in touch."
        },
        email: {
            id: "Email Kami",
            en: "Email Us"
        },
        follow: {
            id: "Ikuti Kami",
            en: "Follow Us"
        },
        form: {
            name: {
                id: "Nama Anda",
                en: "Your Name"
            },
            email: {
                id: "Email Anda",
                en: "Your Email"
            },
            message: {
                id: "Pesan Anda",
                en: "Your Message"
            },
            send: {
                id: "Kirim Pesan",
                en: "Send Message"
            }
        },
        copyright: {
            id: "Hak Cipta Dilindungi",
            en: "All rights reserved"
        }
    },

    // Navigation
    nav: {
        home: {
            id: "Beranda",
            en: "Home"
        },
        about: {
            id: "Tentang",
            en: "About"
        },
        services: {
            id: "Layanan",
            en: "Services"
        },
        solutions: {
            id: "Solusi",
            en: "Solutions"
        },
        portfolio: {
            id: "Portfolio",
            en: "Portfolio"
        },
        contact: {
            id: "Kontak",
            en: "Contact"
        }
    }
};

// Helper function to get translation
export const t = (path, lang = 'id') => {
    const keys = path.split('.');
    let value = translations;

    for (const key of keys) {
        value = value[key];
        if (!value) return path;
    }

    return value[lang] || value['id'];
};
