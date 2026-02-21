"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface ContactFormProps {
    t: any;
    lang: string;
}

export const ContactForm = ({ t, lang }: ContactFormProps) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        business_type: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('leads')
                .insert([formData]);

            if (error) throw error;

            // Trigger Google Ads conversion tracking
            if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
                (window as any).gtag('event', 'conversion', {
                    'send_to': 'AW-17964200045/nUzMCLqvpvwbEO3g__VC'
                });
            }

            alert(lang === 'es' ? '¡Gracias! Hemos recibido tu solicitud.' : 'Thank you! We have received your request.');
            setFormData({
                name: '',
                email: '',
                phone: '',
                business_type: '',
                message: ''
            });
        } catch (error) {
            console.error('Error submitting lead:', error);
            alert(lang === 'es' ? 'Error al enviar. Intenta de nuevo.' : 'Error sending. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form className="glass-card" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">{t.form_name}</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder={t.form_name_ph}
                />
            </div>
            <div className="form-group">
                <label className="form-label">{t.form_email}</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder={t.form_email_ph}
                />
            </div>
            <div className="form-group">
                <label className="form-label">{t.form_phone}</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder={t.form_phone_ph}
                />
            </div>
            <div className="form-group">
                <label className="form-label">{t.form_biz}</label>
                <input
                    type="text"
                    name="business_type"
                    value={formData.business_type}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder={t.form_biz_ph}
                />
            </div>
            <div className="form-group">
                <label className="form-label">{t.form_msg}</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder={t.form_msg_ph}
                ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? (lang === 'es' ? 'Enviando...' : 'Sending...') : t.form_submit}
            </button>
        </form>
    );
};
