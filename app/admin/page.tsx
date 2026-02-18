"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Database, User, Mail, Phone, Briefcase, MessageSquare, Clock, Shield } from 'lucide-react';

export default function AdminDashboard() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [password, setPassword] = useState('');

    const checkAuth = () => {
        // Simple password protection for now as requested "simple and easy"
        // In a real app, use Supabase Auth properly
        if (password === 'uvas2024') {
            setAuthorized(true);
            fetchLeads();
        } else {
            alert('Incorrect password');
        }
    };

    const fetchLeads = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching leads:', error);
        } else {
            setLeads(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (authorized) {
            fetchLeads();
        }
    }, [authorized]);

    if (!authorized) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
                <div className="glass-card" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
                    <Shield size={48} color="var(--primary)" style={{ marginBottom: '20px' }} />
                    <h2>Admin Login</h2>
                    <p style={{ marginBottom: '20px' }}>Enter password to view leads</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input"
                        placeholder="Password"
                        style={{ marginBottom: '20px' }}
                        onKeyDown={(e) => e.key === 'Enter' && checkAuth()}
                    />
                    <button onClick={checkAuth} className="btn btn-primary" style={{ width: '100%' }}>Login</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: '40px', background: '#f8f9fa', minHeight: '100vh' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>CRM Dashboard</h1>
                        <p>Managing {leads.length} leads</p>
                    </div>
                    <button onClick={fetchLeads} className="btn" style={{ background: '#fff', border: '1px solid #ddd' }}>Refresh Data</button>
                </div>

                {loading ? (
                    <p>Loading leads...</p>
                ) : (
                    <div style={{ display: 'grid', gap: '20px' }}>
                        {leads.length === 0 ? (
                            <div className="glass-card" style={{ textAlign: 'center', padding: '60px' }}>
                                <Database size={48} opacity={0.2} style={{ margin: '0 auto 20px' }} />
                                <p>No leads yet. They will appear here when someone fills the contact form.</p>
                            </div>
                        ) : (
                            leads.map((lead) => (
                                <div key={lead.id} className="glass-card" style={{ padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                                            <h3 style={{ margin: 0 }}>{lead.name}</h3>
                                            <span style={{ fontSize: '0.75rem', background: '#e3f2fd', color: '#1976d2', padding: '4px 10px', borderRadius: '100px', fontWeight: 700 }}>{lead.status.toUpperCase()}</span>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#666' }}>
                                                <Mail size={16} /> {lead.email}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#666' }}>
                                                <Phone size={16} /> {lead.phone}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#666' }}>
                                                <Briefcase size={16} /> {lead.business_type}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#666' }}>
                                                <Clock size={16} /> {new Date(lead.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ maxWidth: '300px', paddingLeft: '20px', borderLeft: '1px solid #eee' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', fontWeight: 600, fontSize: '0.85rem' }}>
                                            <MessageSquare size={14} /> Message:
                                        </div>
                                        <p style={{ fontSize: '0.85rem', margin: 0, color: '#555' }}>{lead.message || 'No message provided'}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
