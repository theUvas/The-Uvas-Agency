"use client";

import React from 'react';

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

export const TestimonialsMarquee = () => {
    const displayList = [...testimonials, ...testimonials];

    return (
        <div className="marquee-container">
            <div className="marquee-content">
                {displayList.map((t, i) => (
                    <div key={i} className="testimonial-card">
                        <div className="testimonial-source">{t.source}</div>
                        <p style={{ margin: "15px 0" }}>"{t.content}"</p>
                        <div className="testimonial-user">
                            <div className="testimonial-avatar">
                                <img src={t.avatar} alt={t.name} loading="lazy" />
                            </div>
                            <div>
                                <div style={{ fontWeight: 800, color: "var(--text-main)" }}>{t.name}</div>
                                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{t.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
