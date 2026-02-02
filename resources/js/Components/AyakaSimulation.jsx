import React, { useState } from 'react';
import SimulationWrapper from './SimulationWrapper';

const AyakaSimulation = ({ onClose }) => {
    const [activePage, setActivePage] = useState('dashboard');

    // Dashboard View
    const DashboardView = () => (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Pendaftar Hari Ini', value: '12', change: '+3', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', color: 'pink' },
                    { label: 'Total Minggu Ini', value: '47', change: '+12%', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', color: 'pink' },
                    { label: 'Perlu Follow Up', value: '8', change: 'Urgent', icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'red' },
                    { label: 'Program Aktif', value: '5', change: '2 Kuota Penuh', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'pink' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-pink-300 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color === 'red' ? 'bg-red-100' : 'bg-pink-100'}`}>
                                <svg className={`w-6 h-6 ${stat.color === 'red' ? 'text-red-600' : 'text-pink-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                                </svg>
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.color === 'red' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{stat.change}</span>
                        </div>
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-black text-slate-800">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Chart & Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border-2 border-slate-200">
                    <h3 className="font-bold text-slate-800 mb-4">Grafik Pendaftaran (7 Hari Terakhir)</h3>
                    <div className="h-64 flex items-end justify-between gap-3">
                        {[32, 45, 38, 52, 47, 58, 47].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <div className="w-full bg-gradient-to-t from-pink-500 to-pink-300 rounded-t-lg hover:from-pink-600 hover:to-pink-400 transition-all cursor-pointer" style={{ height: `${height}%` }}></div>
                                <span className="text-xs font-bold text-slate-400">
                                    {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border-2 border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-800">Notifikasi</h3>
                        <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-black">5</span>
                    </div>
                    <div className="space-y-3">
                        {[
                            { type: 'new', name: 'Siti Rahmawati', time: '5 menit lalu', program: 'Kaigo' },
                            { type: 'followup', name: 'Dewi Lestari', time: '1 jam lalu', program: 'Tokutei Ginou' },
                            { type: 'new', name: 'Nur Azizah', time: '2 jam lalu', program: 'Kaigo' }
                        ].map((notif, i) => (
                            <div key={i} className={`p-3 rounded-xl border-2 ${notif.type === 'new' ? 'bg-pink-50 border-pink-200' : 'bg-orange-50 border-orange-200'}`}>
                                <div className="flex items-start gap-2">
                                    <div className={`w-2 h-2 rounded-full mt-1.5 ${notif.type === 'new' ? 'bg-pink-500' : 'bg-orange-500'}`}></div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-800 text-sm">{notif.name}</h4>
                                        <p className="text-xs text-slate-500">{notif.program} • {notif.time}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { label: '➕ Tambah Program Baru', icon: 'M12 4v16m8-8H4' },
                        { label: '✏️ Edit Hero Section', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
                        { label: '📥 Export Data Leads', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' }
                    ].map((action, i) => (
                        <button key={i} className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/40 rounded-xl p-4 text-left transition-all">
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={action.icon} />
                                </svg>
                                <span className="font-bold text-sm">{action.label}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    // Landing Page Builder View
    const LandingBuilderView = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Editor Panel */}
            <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border-2 border-slate-200">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 bg-pink-100 text-pink-600 rounded-lg flex items-center justify-center text-sm font-black">1</span>
                        Hero Section
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-slate-600 mb-2 block">Headline</label>
                            <input type="text" defaultValue="Wujudkan Impian Kerja di Jepang" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-pink-500 focus:outline-none font-bold" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-600 mb-2 block">Sub-headline</label>
                            <textarea defaultValue="Program khusus wanita Indonesia untuk bekerja profesional di Jepang dengan gaji kompetitif" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-pink-500 focus:outline-none" rows="3"></textarea>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-600 mb-2 block">CTA Button Text</label>
                            <input type="text" defaultValue="Daftar Sekarang" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-pink-500 focus:outline-none" />
                        </div>
                        <button className="w-full py-3 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700 transition-colors">
                            Simpan Perubahan
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border-2 border-slate-200">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 bg-pink-100 text-pink-600 rounded-lg flex items-center justify-center text-sm font-black">2</span>
                        Program Management
                    </h3>
                    <div className="space-y-3">
                        {[
                            { name: 'Kaigo (Perawat Lansia)', status: 'Aktif', quota: '15/20', salary: '¥180,000' },
                            { name: 'Tokutei Ginou (Skilled Worker)', status: 'Aktif', quota: '8/15', salary: '¥200,000' },
                            { name: 'Hospitality', status: 'Kuota Penuh', quota: '10/10', salary: '¥170,000' }
                        ].map((program, i) => (
                            <div key={i} className="p-4 bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-pink-300 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-bold text-slate-800 text-sm">{program.name}</h4>
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${program.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {program.status}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-slate-500">
                                    <span>Kuota: {program.quota}</span>
                                    <span className="font-bold text-pink-600">{program.salary}/bulan</span>
                                </div>
                            </div>
                        ))}
                        <button className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 hover:border-pink-400 hover:text-pink-600 font-bold transition-colors">
                            + Tambah Program Baru
                        </button>
                    </div>
                </div>
            </div>

            {/* Live Preview Panel */}
            <div className="bg-slate-100 rounded-2xl p-6 border-2 border-slate-200 sticky top-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-800">Live Preview</h3>
                    <div className="flex gap-2">
                        <button className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-600 hover:bg-pink-100 hover:text-pink-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </button>
                        <button className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center text-white">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-xl overflow-hidden border-2 border-slate-300 shadow-lg">
                    <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-8 text-white text-center">
                        <h1 className="text-2xl font-black mb-2">Wujudkan Impian Kerja di Jepang</h1>
                        <p className="text-sm opacity-90 mb-4">Program khusus wanita Indonesia untuk bekerja profesional di Jepang dengan gaji kompetitif</p>
                        <button className="px-6 py-3 bg-white text-pink-600 font-bold rounded-xl hover:shadow-lg transition-shadow">
                            Daftar Sekarang
                        </button>
                    </div>
                    <div className="p-6 space-y-3">
                        <div className="text-xs font-bold text-slate-400 uppercase">Program Tersedia</div>
                        {['Kaigo (Perawat Lansia)', 'Tokutei Ginou', 'Hospitality'].map((prog, i) => (
                            <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                                <div className="font-bold text-slate-800 text-xs">{prog}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    // Leads Management View
    const LeadsView = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-1">Leads Management</h2>
                    <p className="text-xs text-slate-400">Kelola dan follow up calon peserta</p>
                </div>
                <div className="flex gap-3">
                    <select className="px-4 py-2 border-2 border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-pink-500">
                        <option>Semua Status</option>
                        <option>Baru</option>
                        <option>Dihubungi</option>
                        <option>Lolos</option>
                    </select>
                    <button className="px-6 py-2 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export Excel
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-slate-200">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-slate-200">
                                <th className="text-left py-4 px-4 text-xs font-bold text-slate-400 uppercase">Nama</th>
                                <th className="text-left py-4 px-4 text-xs font-bold text-slate-400 uppercase">Usia</th>
                                <th className="text-left py-4 px-4 text-xs font-bold text-slate-400 uppercase">Domisili</th>
                                <th className="text-left py-4 px-4 text-xs font-bold text-slate-400 uppercase">Program</th>
                                <th className="text-left py-4 px-4 text-xs font-bold text-slate-400 uppercase">Sumber</th>
                                <th className="text-center py-4 px-4 text-xs font-bold text-slate-400 uppercase">Status</th>
                                <th className="text-center py-4 px-4 text-xs font-bold text-slate-400 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: 'Siti Rahmawati', age: 24, city: 'Jakarta', program: 'Kaigo', source: 'Landing Page', status: 'Baru', statusColor: 'blue' },
                                { name: 'Dewi Lestari', age: 26, city: 'Bandung', program: 'Tokutei Ginou', source: 'WhatsApp', status: 'Dihubungi', statusColor: 'yellow' },
                                { name: 'Nur Azizah', age: 23, city: 'Surabaya', program: 'Kaigo', source: 'Instagram', status: 'Lolos', statusColor: 'green' },
                                { name: 'Fatimah Zahra', age: 25, city: 'Yogyakarta', program: 'Hospitality', source: 'Landing Page', status: 'Baru', statusColor: 'blue' },
                                { name: 'Aisyah Putri', age: 27, city: 'Semarang', program: 'Kaigo', source: 'WhatsApp', status: 'Dihubungi', statusColor: 'yellow' }
                            ].map((lead, i) => (
                                <tr key={i} className="border-b border-slate-100 hover:bg-pink-50 transition-colors">
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold">
                                                {lead.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800 text-sm">{lead.name}</h4>
                                                <p className="text-xs text-slate-400">ID: #{1000 + i}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-sm text-slate-600">{lead.age} tahun</td>
                                    <td className="py-4 px-4 text-sm text-slate-600">{lead.city}</td>
                                    <td className="py-4 px-4">
                                        <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-bold rounded-full">{lead.program}</span>
                                    </td>
                                    <td className="py-4 px-4 text-sm text-slate-600">{lead.source}</td>
                                    <td className="py-4 px-4 text-center">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${lead.statusColor === 'green' ? 'bg-green-100 text-green-700' :
                                                lead.statusColor === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-blue-100 text-blue-700'
                                            }`}>{lead.status}</span>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <button className="px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-900">Detail</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    // Settings View
    const SettingsView = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border-2 border-slate-200">
                <h3 className="font-bold text-slate-800 mb-4">Brand Configuration</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-600 mb-2 block">Logo URL</label>
                        <input type="text" defaultValue="/images/ayaka-logo.png" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-pink-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-600 mb-2 block">Primary Color</label>
                        <div className="flex gap-3">
                            <input type="color" defaultValue="#D91656" className="w-16 h-12 rounded-xl border-2 border-slate-200" />
                            <input type="text" defaultValue="#D91656" className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-pink-500 focus:outline-none font-mono" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-600 mb-2 block">WhatsApp Number</label>
                        <input type="text" defaultValue="+62 812-3456-7890" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-pink-500 focus:outline-none" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-slate-200">
                <h3 className="font-bold text-slate-800 mb-4">Operating Hours</h3>
                <div className="space-y-3">
                    {['Senin - Jumat', 'Sabtu', 'Minggu'].map((day, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                            <span className="font-bold text-sm text-slate-700">{day}</span>
                            <span className="text-sm text-slate-500">{i === 2 ? 'Tutup' : '09:00 - 17:00'}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <SimulationWrapper onClose={onClose} title="Ayaka Josei Center - Admin Panel">
            <div className="flex h-full bg-slate-50">
                {/* Sidebar */}
                <div className="w-72 bg-gradient-to-b from-pink-600 to-rose-700 text-white flex flex-col p-6 hidden md:flex">
                    <div className="mb-8">
                        <h1 className="text-2xl font-black mb-1">Ayaka Josei</h1>
                        <p className="text-xs text-pink-100">Admin Panel</p>
                    </div>

                    <nav className="space-y-1 flex-1">
                        {[
                            { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                            { id: 'landing', label: 'Landing Builder', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
                            { id: 'leads', label: 'Leads Management', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
                            { id: 'form', label: 'Form Management', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                            { id: 'media', label: 'Media Manager', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
                            { id: 'seo', label: 'SEO & Metadata', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
                            { id: 'users', label: 'User & Roles', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
                            { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
                        ].map((item, i) => (
                            <div
                                key={i}
                                onClick={() => setActivePage(item.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${activePage === item.id
                                        ? 'bg-white/20 text-white shadow-lg'
                                        : 'text-pink-100 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                </svg>
                                <span className="text-sm font-bold">{item.label}</span>
                            </div>
                        ))}
                    </nav>

                    <div className="pt-6 border-t border-pink-400/30">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">A</div>
                            <div>
                                <h3 className="text-sm font-bold">Admin Ayaka</h3>
                                <p className="text-xs text-pink-100">Super Admin</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                    <header className="h-16 bg-white border-b-2 border-slate-200 px-8 flex items-center justify-between shrink-0">
                        <h2 className="text-lg font-bold text-slate-800">
                            {activePage === 'dashboard' && 'Dashboard Overview'}
                            {activePage === 'landing' && 'Landing Page Builder'}
                            {activePage === 'leads' && 'Leads Management'}
                            {activePage === 'settings' && 'Settings'}
                        </h2>
                        <div className="flex items-center gap-4">
                            <button className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 hover:bg-pink-100 hover:text-pink-600 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </button>
                            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer">A</div>
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto p-8">
                        <div className="max-w-7xl mx-auto">
                            {activePage === 'dashboard' && <DashboardView />}
                            {activePage === 'landing' && <LandingBuilderView />}
                            {activePage === 'leads' && <LeadsView />}
                            {activePage === 'settings' && <SettingsView />}
                            {!['dashboard', 'landing', 'leads', 'settings'].includes(activePage) && (
                                <div className="text-center py-20">
                                    <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">Modul Dalam Pengembangan</h3>
                                    <p className="text-slate-500">Fitur ini akan segera tersedia</p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </SimulationWrapper>
    );
};

export default AyakaSimulation;
