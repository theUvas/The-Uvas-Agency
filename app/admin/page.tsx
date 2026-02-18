"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Database, User, Mail, Phone, Briefcase, MessageSquare, Clock, Shield, Trash2, RefreshCw, CheckCircle, XCircle, AlertCircle, TrendingUp } from 'lucide-react';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
    new: { label: 'New', color: '#1976d2', bg: '#e3f2fd', icon: <AlertCircle size={11} /> },
    contacted: { label: 'Contacted', color: '#f57c00', bg: '#fff3e0', icon: <MessageSquare size={11} /> },
    qualified: { label: 'Qualified', color: '#388e3c', bg: '#e8f5e9', icon: <TrendingUp size={11} /> },
    closed: { label: 'Closed', color: '#7b1fa2', bg: '#f3e5f5', icon: <CheckCircle size={11} /> },
    lost: { label: 'Lost', color: '#c62828', bg: '#ffebee', icon: <XCircle size={11} /> },
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
        if (error) console.error('Error fetching leads:', error);
        else setLeads(data || []);
        setLoading(false);
    };

    const deleteLead = async (id: string, name: string) => {
        if (!confirm(`¿Eliminar el lead de "${name}"?`)) return;
        setDeletingId(id);
        const { error } = await supabase.from('leads').delete().eq('id', id);
        if (error) { alert('Error al eliminar.'); console.error(error); }
        else setLeads(prev => prev.filter(l => l.id !== id));
        setDeletingId(null);
    };

    const updateStatus = async (id: string, newStatus: string) => {
        setUpdatingId(id);
        const { error } = await supabase.from('leads').update({ status: newStatus }).eq('id', id);
        if (error) { alert('Error al actualizar.'); console.error(error); }
        else setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
        setUpdatingId(null);
    };

    useEffect(() => { if (authorized) fetchLeads(); }, [authorized]);

    const filteredLeads = filter === 'all' ? leads : leads.filter(l => l.status === filter);
    const stats = {
        total: leads.length,
        new: leads.filter(l => l.status === 'new').length,
        contacted: leads.filter(l => l.status === 'contacted').length,
        qualified: leads.filter(l => l.status === 'qualified').length,
    };

    if (!authorized) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)', padding: '16px' }}>
                <div style={{ maxWidth: '380px', width: '100%', textAlign: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '40px 24px', backdropFilter: 'blur(20px)' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #6c63ff, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                        <Shield size={26} color="#fff" />
                    </div>
                    <h2 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '6px' }}>CRM Admin</h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '24px', fontSize: '0.85rem' }}>The Uvas Agency</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        style={{ width: '100%', padding: '13px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)', color: '#fff', fontSize: '16px', marginBottom: '14px', outline: 'none', boxSizing: 'border-box' }}
                        onKeyDown={(e) => e.key === 'Enter' && checkAuth()}
                    />
                    <button onClick={checkAuth} style={{ width: '100%', padding: '13px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #6c63ff, #a855f7)', color: '#fff', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
                        Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <style>{`
                @media (max-width: 600px) {
                    .crm-header { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
                    .crm-stats { grid-template-columns: repeat(2, 1fr) !important; }
                    .crm-filters { gap: 6px !important; }
                    .crm-filter-btn { font-size: 0.75rem !important; padding: 6px 12px !important; }
                    .lead-card { flex-direction: column !important; gap: 14px !important; }
                    .lead-actions { flex-direction: row !important; width: 100% !important; }
                    .lead-actions select, .lead-actions button { flex: 1 !important; }
                    .lead-info-grid { grid-template-columns: 1fr !important; }
                    .lead-message { border-left: none !important; border-top: 1px solid #eee !important; padding-left: 0 !important; padding-top: 10px !important; margin-top: 4px !important; }
                }
            `}</style>

            <div style={{ minHeight: '100vh', background: '#f4f6fb', padding: '20px 16px' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

                    {/* Header */}
                    <div className="crm-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', gap: '12px' }}>
                        <div>
                            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#111' }}>CRM Dashboard</h1>
                            <p style={{ color: '#888', margin: '3px 0 0', fontSize: '0.82rem' }}>The Uvas Agency — {leads.length} leads</p>
                        </div>
                        <button onClick={fetchLeads} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '10px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', color: '#444', whiteSpace: 'nowrap' }}>
                            <RefreshCw size={14} /> Refresh
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="crm-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
                        {[
                            { label: 'Total', value: stats.total, color: '#6c63ff' },
                            { label: 'New', value: stats.new, color: '#1976d2' },
                            { label: 'Contacted', value: stats.contacted, color: '#f57c00' },
                            { label: 'Qualified', value: stats.qualified, color: '#388e3c' },
                        ].map(stat => (
                            <div key={stat.label} style={{ background: '#fff', borderRadius: '12px', padding: '14px 12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                                <div style={{ fontSize: '0.72rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '4px' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Filters */}
                    <div className="crm-filters" style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                        {['all', 'new', 'contacted', 'qualified', 'closed', 'lost'].map(f => (
                            <button key={f} className="crm-filter-btn" onClick={() => setFilter(f)} style={{
                                padding: '7px 14px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem',
                                background: filter === f ? '#6c63ff' : '#fff',
                                color: filter === f ? '#fff' : '#666',
                                boxShadow: filter === f ? '0 2px 8px rgba(108,99,255,0.3)' : '0 1px 4px rgba(0,0,0,0.08)',
                                textTransform: 'capitalize',
                            }}>
                                {f === 'all' ? `All (${leads.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${leads.filter(l => l.status === f).length})`}
                            </button>
                        ))}
                    </div>

                    {/* Leads */}
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>Loading leads...</div>
                    ) : filteredLeads.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '50px', background: '#fff', borderRadius: '16px', color: '#aaa' }}>
                            <Database size={36} style={{ marginBottom: '10px', opacity: 0.3 }} />
                            <p style={{ margin: 0, fontSize: '0.9rem' }}>No leads in this category yet.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '12px' }}>
                            {filteredLeads.map((lead) => {
                                const statusCfg = STATUS_CONFIG[lead.status] || STATUS_CONFIG['new'];
                                const isDeleting = deletingId === lead.id;
                                const isUpdating = updatingId === lead.id;

                                return (
                                    <div key={lead.id} className="lead-card" style={{ background: '#fff', borderRadius: '14px', padding: '18px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', gap: '14px', alignItems: 'flex-start', opacity: isDeleting ? 0.5 : 1, transition: 'opacity 0.2s' }}>

                                        {/* Avatar */}
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #6c63ff, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <User size={18} color="#fff" />
                                        </div>

                                        {/* Info */}
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                                                <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#111' }}>{lead.name}</h3>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '0.7rem', background: statusCfg.bg, color: statusCfg.color, padding: '2px 8px', borderRadius: '100px', fontWeight: 700 }}>
                                                    {statusCfg.icon} {statusCfg.label}
                                                </span>
                                            </div>
                                            <div className="lead-info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '5px', marginBottom: '8px' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: '#555' }}><Mail size={12} color="#6c63ff" /> {lead.email}</span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: '#555' }}><Phone size={12} color="#6c63ff" /> {lead.phone}</span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: '#555' }}><Briefcase size={12} color="#6c63ff" /> {lead.business_type}</span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: '#999' }}><Clock size={12} /> {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                            {lead.message && (
                                                <p className="lead-message" style={{ margin: 0, fontSize: '0.78rem', color: '#777', background: '#f8f8f8', borderRadius: '8px', padding: '7px 10px', borderLeft: '3px solid #6c63ff' }}>
                                                    "{lead.message}"
                                                </p>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="lead-actions" style={{ display: 'flex', flexDirection: 'column', gap: '7px', flexShrink: 0 }}>
                                            <select value={lead.status} disabled={isUpdating} onChange={(e) => updateStatus(lead.id, e.target.value)}
                                                style={{ padding: '7px 8px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', background: '#fafafa', color: '#444', outline: 'none' }}>
                                                {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                                                    <option key={key} value={key}>{cfg.label}</option>
                                                ))}
                                            </select>
                                            <button onClick={() => deleteLead(lead.id, lead.name)} disabled={isDeleting}
                                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '7px 10px', borderRadius: '8px', border: '1px solid #ffcdd2', background: '#fff5f5', color: '#c62828', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}>
                                                <Trash2 size={12} /> {isDeleting ? '...' : 'Delete'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
