"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Database, User, Mail, Phone, Briefcase, MessageSquare, Clock, Shield, Trash2, RefreshCw, CheckCircle, XCircle, AlertCircle, TrendingUp } from 'lucide-react';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
    new: { label: 'New', color: '#1976d2', bg: '#e3f2fd', icon: <AlertCircle size={12} /> },
    contacted: { label: 'Contacted', color: '#f57c00', bg: '#fff3e0', icon: <MessageSquare size={12} /> },
    qualified: { label: 'Qualified', color: '#388e3c', bg: '#e8f5e9', icon: <TrendingUp size={12} /> },
    closed: { label: 'Closed', color: '#7b1fa2', bg: '#f3e5f5', icon: <CheckCircle size={12} /> },
    lost: { label: 'Lost', color: '#c62828', bg: '#ffebee', icon: <XCircle size={12} /> },
};

export default function AdminDashboard() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [password, setPassword] = useState('');
    const [filter, setFilter] = useState('all');
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const checkAuth = () => {
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

    const deleteLead = async (id: string, name: string) => {
        if (!confirm(`¿Eliminar el lead de "${name}"? Esta acción no se puede deshacer.`)) return;
        setDeletingId(id);
        const { error } = await supabase.from('leads').delete().eq('id', id);
        if (error) {
            alert('Error al eliminar. Intenta de nuevo.');
            console.error(error);
        } else {
            setLeads(prev => prev.filter(l => l.id !== id));
        }
        setDeletingId(null);
    };

    const updateStatus = async (id: string, newStatus: string) => {
        setUpdatingId(id);
        const { error } = await supabase.from('leads').update({ status: newStatus }).eq('id', id);
        if (error) {
            alert('Error al actualizar el status.');
            console.error(error);
        } else {
            setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
        }
        setUpdatingId(null);
    };

    useEffect(() => {
        if (authorized) fetchLeads();
    }, [authorized]);

    const filteredLeads = filter === 'all' ? leads : leads.filter(l => l.status === filter);

    const stats = {
        total: leads.length,
        new: leads.filter(l => l.status === 'new').length,
        contacted: leads.filter(l => l.status === 'contacted').length,
        qualified: leads.filter(l => l.status === 'qualified').length,
    };

    if (!authorized) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)' }}>
                <div style={{ maxWidth: '400px', width: '100%', textAlign: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '48px 40px', backdropFilter: 'blur(20px)' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #6c63ff, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <Shield size={32} color="#fff" />
                    </div>
                    <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '8px' }}>CRM Admin</h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '28px', fontSize: '0.9rem' }}>The Uvas Agency</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: '#fff', fontSize: '1rem', marginBottom: '16px', outline: 'none', boxSizing: 'border-box' }}
                        onKeyDown={(e) => e.key === 'Enter' && checkAuth()}
                    />
                    <button
                        onClick={checkAuth}
                        style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #6c63ff, #a855f7)', color: '#fff', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f4f6fb', padding: '32px 24px' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, color: '#111' }}>CRM Dashboard</h1>
                        <p style={{ color: '#888', margin: '4px 0 0', fontSize: '0.9rem' }}>The Uvas Agency — Lead Management</p>
                    </div>
                    <button
                        onClick={fetchLeads}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', color: '#444' }}
                    >
                        <RefreshCw size={16} /> Refresh
                    </button>
                </div>

                {/* Stats Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                    {[
                        { label: 'Total Leads', value: stats.total, color: '#6c63ff', bg: '#ede9fe' },
                        { label: 'New', value: stats.new, color: '#1976d2', bg: '#e3f2fd' },
                        { label: 'Contacted', value: stats.contacted, color: '#f57c00', bg: '#fff3e0' },
                        { label: 'Qualified', value: stats.qualified, color: '#388e3c', bg: '#e8f5e9' },
                    ].map(stat => (
                        <div key={stat.label} style={{ background: '#fff', borderRadius: '14px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ fontSize: '2rem', fontWeight: 800, color: stat.color }}>{stat.value}</span>
                            <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</span>
                        </div>
                    ))}
                </div>

                {/* Filter Tabs */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    {['all', 'new', 'contacted', 'qualified', 'closed', 'lost'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '7px 16px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem',
                                background: filter === f ? '#6c63ff' : '#fff',
                                color: filter === f ? '#fff' : '#666',
                                boxShadow: filter === f ? '0 2px 8px rgba(108,99,255,0.3)' : '0 1px 4px rgba(0,0,0,0.08)',
                                textTransform: 'capitalize',
                            }}
                        >
                            {f === 'all' ? `All (${leads.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${leads.filter(l => l.status === f).length})`}
                        </button>
                    ))}
                </div>

                {/* Leads List */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>Loading leads...</div>
                ) : filteredLeads.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px', background: '#fff', borderRadius: '16px', color: '#aaa' }}>
                        <Database size={40} style={{ marginBottom: '12px', opacity: 0.3 }} />
                        <p>No leads in this category yet.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '14px' }}>
                        {filteredLeads.map((lead) => {
                            const statusCfg = STATUS_CONFIG[lead.status] || STATUS_CONFIG['new'];
                            const isDeleting = deletingId === lead.id;
                            const isUpdating = updatingId === lead.id;

                            return (
                                <div key={lead.id} style={{ background: '#fff', borderRadius: '16px', padding: '22px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', gap: '20px', alignItems: 'flex-start', opacity: isDeleting ? 0.5 : 1, transition: 'opacity 0.2s' }}>

                                    {/* Avatar */}
                                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #6c63ff, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <User size={20} color="#fff" />
                                    </div>

                                    {/* Info */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                                            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#111' }}>{lead.name}</h3>
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', background: statusCfg.bg, color: statusCfg.color, padding: '3px 10px', borderRadius: '100px', fontWeight: 700 }}>
                                                {statusCfg.icon} {statusCfg.label}
                                            </span>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '6px', marginBottom: '10px' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#555' }}><Mail size={14} color="#6c63ff" /> {lead.email}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#555' }}><Phone size={14} color="#6c63ff" /> {lead.phone}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#555' }}><Briefcase size={14} color="#6c63ff" /> {lead.business_type}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#999' }}><Clock size={14} /> {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                        {lead.message && (
                                            <p style={{ margin: 0, fontSize: '0.83rem', color: '#777', background: '#f8f8f8', borderRadius: '8px', padding: '8px 12px', borderLeft: '3px solid #6c63ff' }}>
                                                "{lead.message}"
                                            </p>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0, alignItems: 'flex-end' }}>
                                        {/* Status Selector */}
                                        <select
                                            value={lead.status}
                                            disabled={isUpdating}
                                            onChange={(e) => updateStatus(lead.id, e.target.value)}
                                            style={{ padding: '7px 10px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', background: '#fafafa', color: '#444', outline: 'none' }}
                                        >
                                            {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                                                <option key={key} value={key}>{cfg.label}</option>
                                            ))}
                                        </select>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => deleteLead(lead.id, lead.name)}
                                            disabled={isDeleting}
                                            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 12px', borderRadius: '8px', border: '1px solid #ffcdd2', background: '#fff5f5', color: '#c62828', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}
                                        >
                                            <Trash2 size={14} /> {isDeleting ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
