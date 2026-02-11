"use client";

import React, { useEffect, useState } from "react";
import { translations } from "@/js/translations";
import { TestimonialsMarquee } from "@/components/TestimonialsMarquee";
import { ContactForm } from "@/components/ContactForm";
import { MoveRight, CheckCircle2, Search, BarChart3, Radio, Database, Globe, MessageSquare } from "lucide-react";

export default function LandingPage() {
    const [lang, setLang] = useState<"en" | "es">("en");
    const t = (translations as any)[lang];

    useEffect(() => {
        const savedLang = localStorage.getItem("preferred_lang") as "en" | "es";
        if (savedLang) setLang(savedLang);

        // Scroll animation observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const toggleLang = () => {
        const nextLang = lang === "en" ? "es" : "en";
        setLang(nextLang);
        localStorage.setItem("preferred_lang", nextLang);
    };

    return (
        <main>
            {/* Navigation */}
            <nav className="sticky-header">
                <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <img src="/assets/logo.webp" alt="The Uvas" height="40" />
                        <span className="nav-brand-name" style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--primary)", letterSpacing: "0.02em" }}>
                            THE UVAS
                        </span>
                    </div>

                    <div className="nav-menu" style={{ display: "flex", alignItems: "center", gap: "35px" }}>
                        <a href="#services" className="nav-link">{t.nav_services}</a>
                        <a href="#results" className="nav-link">{t.nav_results}</a>
                        <a href="#pricing" className="nav-link">{t.nav_pricing}</a>
                        <a href="#process" className="nav-link">{t.nav_process}</a>
                        <a href="#features" className="nav-link">{t.nav_why}</a>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                        <button
                            onClick={toggleLang}
                            className="btn"
                            style={{ background: "#fff", padding: "6px 12px", fontSize: "0.75rem", border: "1px solid var(--glass-border)", borderRadius: "8px", fontWeight: 700 }}
                        >
                            {lang === "en" ? "ES" : "EN"}
                        </button>
                        <a href="#contact" className="btn btn-primary nav-cta-btn" style={{ padding: "12px 28px", fontSize: "0.95rem", borderRadius: "12px", fontWeight: 700 }}>
                            {t.nav_cta}
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero animate-on-scroll">
                <div className="container hero-content">
                    <div className="hero-header-flex animate-on-scroll">
                        <div className="hero-logo-container">
                            <div className="logo-frame">
                                <img src="/assets/logo.webp" alt="The Uvas Large" />
                            </div>
                        </div>
                        <div className="hero-text-container" style={{ textAlign: "left", maxWidth: "800px" }}>
                            <h1 style={{ marginBottom: 0 }}>
                                <span>{t.hero_h1_start}</span>
                                <span className="accent-text">{t.hero_h1_span}</span>
                            </h1>
                        </div>
                    </div>

                    <p style={{ margin: "50px auto", maxWidth: "850px", fontSize: "1.4rem", lineHeight: 1.6, color: "var(--text-muted)", fontWeight: 400 }} className="animate-on-scroll delay-100">
                        {t.hero_p.replace(/<[^>]*>?/gm, '')}
                    </p>

                    <div style={{ display: "flex", gap: "20px", justifyContent: "center" }} className="animate-on-scroll delay-200">
                        <a href="#contact" className="btn btn-primary" style={{ padding: "22px 60px", fontSize: "1.15rem", borderRadius: "100px", fontWeight: 800, boxShadow: "0 15px 40px var(--primary-glow)" }}>
                            {t.hero_cta}
                        </a>
                    </div>

                    <div className="hero-stats animate-on-scroll delay-300" style={{ marginTop: "100px" }}>
                        <div className="stat-item">
                            <div className="stat-icon"><Search size={20} strokeWidth={2.5} /></div>
                            <span>{t.hero_stat1}</span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon"><Globe size={20} strokeWidth={2.5} /></div>
                            <span>{t.hero_stat2}</span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon"><BarChart3 size={20} strokeWidth={2.5} /></div>
                            <span>{t.hero_stat3}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Case Studies */}
            <section id="case-studies" style={{ background: "var(--bg-card)", padding: "80px 0 60px" }}>
                <div className="container">
                    <div className="section-header" style={{ marginBottom: "40px" }}>
                        <h2 dangerouslySetInnerHTML={{ __html: t.cases_h2 }}></h2>
                    </div>

                    <div className="case-study-compact animate-on-scroll">
                        <div className="case-logo-center">
                            <img src="/assets/inkstinct-logo.png" alt="Inkstinct NYC" />
                        </div>
                        <blockquote className="case-quote-compact">
                            "{t.case_inkstinct_quote}"
                        </blockquote>
                        <div className="case-author-compact">
                            <strong>{t.case_inkstinct_author}</strong> • <span>{t.case_inkstinct_location}</span> • <a href="https://inkstinctnyc.com/" target="_blank" rel="noopener">inkstinctnyc.com ↗</a>
                        </div>
                        <div className="case-metrics-bottom">
                            <div className="metric-compact">
                                <div className="metric-value-compact">+85%</div>
                                <div className="metric-label-compact">{t.case_inkstinct_metric1}</div>
                            </div>
                            <div className="metric-compact">
                                <div className="metric-value-compact">6.2x</div>
                                <div className="metric-label-compact">{t.case_inkstinct_metric2}</div>
                            </div>
                            <div className="metric-compact">
                                <div className="metric-value-compact">2+</div>
                                <div className="metric-label-compact">{t.case_inkstinct_metric3}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Marquee */}
            <section style={{ background: "#fff", padding: "100px 0", borderTop: "1px solid var(--glass-border)", borderBottom: "1px solid var(--glass-border)" }}>
                <div className="container">
                    <div className="section-header">
                        <h2>{t.testimonials_title}</h2>
                    </div>
                </div>
                <TestimonialsMarquee />
            </section>

            {/* Results */}
            <section id="results" style={{ padding: "var(--section-spacing) 0", background: "#fff" }} className="animate-on-scroll">
                <div className="container">
                    <div className="section-header" style={{ maxWidth: "800px" }}>
                        <h2 dangerouslySetInnerHTML={{ __html: t.results_h2 }}></h2>
                    </div>
                    <div className="grid-3" style={{ marginTop: "60px" }}>
                        <div className="results-card animate-on-scroll delay-100">
                            <div className="result-metric">8x</div>
                            <h4 style={{ marginBottom: "15px", color: "var(--text-main)" }}>ROAS on Meta</h4>
                            <p>Average return on ad spend for our creative studio partners.</p>
                        </div>
                        <div className="results-card animate-on-scroll delay-200">
                            <div className="result-metric">+120%</div>
                            <h4 style={{ marginBottom: "15px", color: "var(--text-main)" }}>Booking Rate</h4>
                            <p>Increase in monthly bookings within the first 60 days of setup.</p>
                        </div>
                        <div className="results-card animate-on-scroll delay-300">
                            <div className="result-metric">Top 3</div>
                            <h4 style={{ marginBottom: "15px", color: "var(--text-main)" }}>AI Visibility</h4>
                            <p>Dominating Search & AI discovery platforms for local niche keywords.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section id="services" style={{ background: "var(--bg-card)", padding: "var(--section-spacing) 0" }}>
                <div className="container">
                    <div className="section-header">
                        <h2>
                            <span dangerouslySetInnerHTML={{ __html: t.services_h2_start }}></span>
                            <span className="accent-text" dangerouslySetInnerHTML={{ __html: t.services_h2_span }}></span>
                        </h2>
                        <p>{t.services_p}</p>
                    </div>
                    <div className="grid-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="glass-card">
                                <div className="service-icon">{['📢', '💻', '🤖', '🔍', '📊', '💬'][i - 1]}</div>
                                <h4>{t[`service${i}_h4`]}</h4>
                                <p>{t[`service${i}_p`]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section id="process" style={{ padding: "var(--section-spacing) 0" }}>
                <div className="container">
                    <div className="section-header">
                        <h2>{t.process_h2}</h2>
                    </div>
                    <div className="grid-steps">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="process-card animate-on-scroll delay-100">
                                <div className="step-number">0{i}</div>
                                <div className="process-icon">{['🔍', '🎯', '🚀'][i - 1]}</div>
                                <h3>{t[`process_step${i}_h3`]}</h3>
                                <p>{t[`process_step${i}_p`]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" style={{ background: "#fff", padding: "var(--section-spacing) 0" }} className="animate-on-scroll">
                <div className="container">
                    <div className="section-header">
                        <h2>{t.compare_h2}</h2>
                    </div>
                    <table className="pricing-table animate-on-scroll delay-100">
                        <thead>
                            <tr>
                                <th>{t.compare_th1}</th>
                                <th>{t.compare_th2}</th>
                                <th>{t.compare_th3}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3].map((i) => (
                                <tr key={i}>
                                    <td><strong>{t[`compare_opt${i}`]}</strong></td>
                                    <td>{['$4,000+', '$5,000 - $10,000', '$2,000 - $3,000'][i - 1]}</td>
                                    <td>{t[`compare_res${i}`]}</td>
                                </tr>
                            ))}
                            <tr className="pricing-row-uvas">
                                <td><strong className="accent-text">{t.compare_opt4}</strong></td>
                                <td><strong>$1,500</strong></td>
                                <td><strong dangerouslySetInnerHTML={{ __html: t.compare_res4 }}></strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Features/Diff */}
            <section id="features" className="diff-section">
                <div className="container">
                    <div className="section-header">
                        <h2 dangerouslySetInnerHTML={{ __html: t.diff_h2 }}></h2>
                    </div>
                    <div className="grid-3" style={{ marginTop: "60px" }}>
                        {[1, 2, 3].map((i) => (
                            <div key={i} className={`diff-card animate-on-scroll delay-${i}00`}>
                                <div className="diff-tag">{['ELITE', 'ADVANCED', 'EXCLUSIVE'][i - 1]}</div>
                                <div className="diff-icon">
                                    {i === 1 ? <Database /> : i === 2 ? <Radio /> : <CheckCircle2 />}
                                </div>
                                <h4>{t[`diff_card${i}_h4`]}</h4>
                                <p>{t[`diff_card${i}_p`]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="contact-section">
                <div className="container">
                    <div className="grid-2" style={{ alignItems: "center" }}>
                        <div>
                            <h2>{t.contact_h2}</h2>
                            <p style={{ marginBottom: "30px", lineHeight: 1.6, fontSize: "1.1rem" }} dangerouslySetInnerHTML={{ __html: t.contact_p }}></p>
                            <div style={{ background: "rgba(124, 58, 237, 0.05)", padding: "24px", borderRadius: "20px", border: "1px solid rgba(124, 58, 237, 0.1)", marginTop: "20px" }}>
                                <h4 style={{ color: "var(--primary)", marginBottom: "16px", fontSize: "1.1rem", letterSpacing: "-0.01em" }}>{t.bonus_h4}</h4>
                                <ul style={{ listStyle: "none", color: "var(--text-muted)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <li key={i} style={{ fontSize: "0.9rem", lineHeight: 1.4 }}>{t[`bonus_li${i}`]}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <ContactForm t={t} lang={lang} />
                    </div>
                </div>
            </section>

            <footer style={{ padding: "40px 0", borderTop: "1px solid var(--glass-border)", marginTop: "60px" }}>
                <div className="container" style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    <p>{t.footer_copy}</p>
                </div>
            </footer>
        </main>
    );
}
