import { translations } from './translations.js';

document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('preferred_lang') || 'en';

    function updateLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('preferred_lang', lang);

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[lang][key];
                } else {
                    el.innerHTML = translations[lang][key];
                }
            }
        });

        // Update button text
        langToggle.innerText = lang === 'en' ? 'ES' : 'EN';
        document.documentElement.lang = lang;
    }

    langToggle.addEventListener('click', () => {
        const nextLang = currentLang === 'en' ? 'es' : 'en';
        updateLanguage(nextLang);
    });

    // Initial load
    updateLanguage(currentLang);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Form handling
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;

            submitBtn.innerText = currentLang === 'es' ? 'Enviando...' : 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                console.log('Form submission:', data);
                await new Promise(resolve => setTimeout(resolve, 1500));

                const successMsg = currentLang === 'es'
                    ? '¡Gracias! Hemos recibido tu solicitud. Te contactaremos pronto.'
                    : 'Thank you! We have received your request. We will contact you soon.';

                alert(successMsg);
                form.reset();
            } catch (error) {
                console.error('Error:', error);
                const errorMsg = currentLang === 'es'
                    ? 'Hubo un error al enviar el formulario. Por favor intenta de nuevo.'
                    : 'There was an error sending the form. Please try again.';
                alert(errorMsg);
            } finally {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Testimonials Data
    const testimonials = [
        { name: "John Smith", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", role: "CEO @ TechFlow", content: "Extremely happy with the results. Our lead flow doubled in just 3 weeks.", source: "LinkedIn" },
        { name: "Maria Garcia", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", role: "Founder @ GlowStudio", content: "The best investment we've made this year. Professional and result-driven.", source: "Google" },
        { name: "David Chen", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", role: "Manager @ UrbanFit", content: "Their CRM integration is a game changer. We never miss a lead now.", source: "X (Twitter)" },
        { name: "Sarah Miller", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", role: "Owner @ FrameIt", content: "Finally an agency that actually understands creative businesses.", source: "Google" },
        { name: "Carlos Ruiz", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", role: "VP @ LocalServe", content: "Top tier strategy. The Uvas team transformed our digital presence.", source: "LinkedIn" },
        { name: "Emily White", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", role: "Creative Dir @ PixelArt", content: "Highly recommended for startups looking to scale quickly.", source: "NichePost" },
        { name: "Robert Brown", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop", role: "CEO @ PureSpa", content: "Our ROAS went from 2x to 8x in two months. Incredible.", source: "Google" },
        { name: "Lisa Thompson", avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop", role: "Marketing Lead @ ZenithHub", content: "Obsessive attention to detail and weekly reports that actually make sense.", source: "LinkedIn" },
        { name: "James Wilson", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop", role: "Director @ HomeCore", content: "Transparent, honest, and they deliver exactly what they promise.", source: "X (Twitter)" },
        { name: "Ana Martinez", avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&h=100&fit=crop", role: "Founder @ EcoBoutique", content: "The level of expertise they bring to small businesses is unprecedented.", source: "Google" }
    ];

    const marquee = document.getElementById('testimonials-marquee');
    if (marquee) {
        // Double the array for seamless infinite loop
        const displayList = [...testimonials, ...testimonials];
        marquee.innerHTML = displayList.map(t => `
            <div class="testimonial-card">
                <div class="testimonial-source">${t.source}</div>
                <p style="margin: 15px 0;">"${t.content}"</p>
                <div class="testimonial-user">
                    <div class="testimonial-avatar">
                        <img src="${t.avatar}" alt="${t.name}">
                    </div>
                    <div>
                        <div style="font-weight: 800; color: var(--text-main);">${t.name}</div>
                        <div style="font-size: 0.8rem; color: var(--text-muted);">${t.role}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
    });
});
