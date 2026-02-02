import React, { useState } from 'react';
import SimulationWrapper from './SimulationWrapper';

const SaitamaSimulation = ({ onClose }) => {
    // Current active view
    const [activePage, setActivePage] = useState('dashboard');

    // Data for Penilaian Kelas (Existing Logic)
    const [students, setStudents] = useState([
        { id: 1, name: 'bowo', eval1: 0, eval2: 9, date: '' },
        { id: 2, name: '', eval1: 0, eval2: 0, date: '' },
        { id: 3, name: '', eval1: 0, eval2: 0, date: '' },
        { id: 4, name: '', eval1: 0, eval2: 0, date: '' },
        { id: 5, name: '', eval1: 0, eval2: 0, date: '' },
    ]);

    const handleUpdate = (id, field, value) => {
        setStudents(students.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const totalStudents = students.filter(s => s.name.trim() !== '').length;
    const passedStudents = students.filter(s => s.name.trim() !== '' && (Number(s.eval1) + Number(s.eval2)) / 2 >= 75).length;
    const percentage = totalStudents > 0 ? Math.round((passedStudents / totalStudents) * 100) : 0;

    // ----- VIEWS -----

    const DashboardView = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Profile Card */}
                <div className="md:col-span-1 bg-white rounded-[2rem] p-6 border border-slate-200 text-center flex flex-col items-center justify-center shadow-sm">
                    <div className="w-20 h-20 bg-[#1e3a8a] rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">a</div>
                    <h2 className="text-xl font-bold text-slate-800">anak</h2>
                    <p className="text-xs text-slate-400 mb-4 font-medium tracking-wide">GANANG@GMAIL.COM</p>
                    <span className="px-4 py-1.5 bg-blue-50 text-[#1e3a8a] text-[10px] font-black uppercase tracking-widest rounded-full mb-6">Sensei / Teacher</span>
                    <div className="flex gap-2 w-full">
                        <button className="flex-1 py-2 bg-[#1e3a8a] text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-900/20">Pengajaran</button>
                        <button className="flex-1 py-2 bg-slate-50 text-slate-500 text-xs font-bold rounded-xl hover:bg-slate-100">Edit Profil</button>
                    </div>
                </div>

                {/* Stats Cards */}
                {[
                    { label: 'Kehadiran Mengajar', value: '98%', badge: 'Baik', icon: 'check', color: 'green' },
                    { label: 'Siswa Binaan', value: '42', icon: 'users', color: 'orange' },
                    { label: 'Evaluasi Pending', value: '5', dot: true, icon: 'exclamation', color: 'red' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-[2rem] p-6 border border-slate-200 flex flex-col justify-between shadow-sm group hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-6 ${stat.color === 'green' ? 'bg-green-50 text-green-500' : stat.color === 'orange' ? 'bg-orange-50 text-orange-500' : 'bg-red-50 text-red-500'}`}>
                            {stat.icon === 'check' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>}
                            {stat.icon === 'users' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                            {stat.icon === 'exclamation' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                            <div className="flex items-center gap-3">
                                <h3 className="text-3xl font-black text-slate-800">{stat.value}</h3>
                                {stat.badge && <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-md">{stat.badge}</span>}
                                {stat.dot && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Filter / Schedule Mock */}
                <div className="bg-white rounded-[2rem] p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Jadwal Pengajaran</h3>
                        <span className="px-3 py-1 bg-red-50 text-red-500 text-[10px] font-bold rounded-full">Minggu Ini</span>
                    </div>
                    <div className="space-y-3">
                        {[{ title: 'Kanji', sub: 'Bahasa Jepang', time: '13.00 - 15.00', icon: 'book' }, { title: 'Kotoba', sub: 'Vocabulary', time: '15.30 - 17.30', icon: 'translate' }].map((item, i) => (
                            <div key={i} className="p-4 rounded-xl bg-slate-50 flex items-center justify-between group hover:bg-[#1e3a8a] hover:text-white transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-700 shadow-sm">
                                        {item.icon === 'book' ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">{item.title}</h4>
                                        <p className="text-[10px] opacity-60 font-medium">{item.sub}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold font-mono">{item.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chart Mock */}
                <div className="md:col-span-2 bg-white rounded-[2rem] p-8 border border-slate-200 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black text-slate-800">Performa Kelas</h3>
                            <p className="text-xs text-slate-400">Rata-rata perkembangan nilai siswa</p>
                        </div>
                        <button className="px-4 py-2 bg-[#1e3a8a] text-white text-xs font-bold rounded-xl flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Download Laporan
                        </button>
                    </div>
                    {/* CSS Chart Mock */}
                    <div className="relative h-48 w-full">
                        <svg viewBox="0 0 100 40" className="w-full h-full drop-shadow-xl" preserveAspectRatio="none">
                            <path d="M0,35 Q10,38 20,25 T40,20 T60,10 T80,15 T100,5" fill="none" stroke="#1e3a8a" strokeWidth="0.5" />
                            <path d="M0,35 Q10,38 20,25 T40,20 T60,10 T80,15 T100,5 V40 H0 Z" fill="url(#gradientBlue)" opacity="0.1" />
                            <path d="M0,10 Q15,40 30,30 T50,25 T70,35 T90,38 T100,30" fill="none" stroke="#f59e0b" strokeWidth="0.5" />
                            <defs>
                                <linearGradient id="gradientBlue" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#1e3a8a" />
                                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                        {/* Grid Lines */}
                        <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-between pointer-events-none">
                            {[100, 80, 60, 40, 20, 0].map(n => (
                                <div key={n} className="w-full border-t border-slate-100 relative">
                                    <span className="absolute -left-6 -top-2 text-[8px] text-slate-300 font-mono">{n}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const PengajaranView = () => (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-200 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-slate-800 mb-1">Pengajaran</h2>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Ringkasan Materi dan Jadwal Pengajaran Anda</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                        Filter
                    </button>
                    <button className="px-4 py-2 bg-[#1e3a8a] text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-blue-900">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                        Tambah Materi
                    </button>
                </div>
            </div>

            {/* Materials */}
            <div className="space-y-4">
                {[
                    { title: 'Kanji – Pengenalan', sub: 'A2 • HARI INI', icon: 'book' },
                    { title: 'Kotoba – Percakapan', sub: 'A2 • HARI INI', icon: 'translate' }
                ].map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 flex items-center justify-between group hover:border-[#1e3a8a] transition-all">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-800 border border-slate-100 group-hover:bg-blue-50 group-hover:text-[#1e3a8a] transition-colors">
                                {item.icon === 'book' ? (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                ) : (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
                                )}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-1">{item.title}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-green-500">{item.sub}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="w-10 h-10 rounded-full border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            </button>
                            <button className="px-6 py-2.5 bg-[#1e3a8a] text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-900/20 hover:bg-blue-900">Detail</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Schedule Widget */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-200">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="font-bold text-slate-800">Jadwal Minggu Ini</h3>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">Minggu I • Agustus 2025</p>
                    </div>
                    <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">Lihat Kalender</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xs font-black uppercase text-slate-700 shadow-sm">Rab</div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-800">Kanji</h4>
                                <p className="text-[10px] text-slate-500">15.00 - 16.00 • Ruang A2</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-[#1e3a8a] text-white text-[10px] font-bold rounded-lg">Hadir</button>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100 opacity-60">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xs font-black uppercase text-slate-700 shadow-sm">Sel</div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-800">Kotoba</h4>
                                <p className="text-[10px] text-slate-500">15.00 - 16.00 • Ruang A2</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-slate-200 text-slate-500 text-[10px] font-bold rounded-lg cursor-not-allowed">Selesai</button>
                    </div>
                </div>
            </div>
        </div>
    );

    const PenilaianKelasView = () => (
        <div className="space-y-6">
            {/* Title Section */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-200 flex flex-wrap items-center justify-between gap-6 shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#1e3a8a]">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Penilaian Bunpou</h2>
                        <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Kelas A2 • Evaluasi Tata Bahasa</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {['Kelas A2', 'Bunpou', 'Oktober'].map((f, i) => (
                        <div key={i} className={`px-4 py-2 rounded-xl text-xs font-bold border ${i === 1 ? 'bg-[#1e3a8a] border-[#1e3a8a] text-white' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                            {f}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Table Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Table Container */}
                    <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:shadow-blue-900/5">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex gap-2">
                                <button className="px-6 py-2 bg-[#1e3a8a] text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-900/20 hover:scale-105 transition-transform active:scale-95">Simpan</button>
                                <button className="px-6 py-2 bg-slate-100 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors" onClick={() => setStudents(students.map(s => ({ ...s, name: '', eval1: 0, eval2: 0, date: '' })))}>Reset</button>
                            </div>
                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-none">20 Siswa Terdaftar</span>
                        </div>

                        {/* Instruction */}
                        <div className="mx-6 mt-6 p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-center gap-4">
                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-xs font-medium text-orange-700">
                                <span className="font-bold">Instruksi:</span> Masukkan nama dan nilai Evaluasi secara manual. <span className="text-green-600">Nilai ≥75 hijau</span>, <span className="text-red-500">Nilai &lt;75 merah</span>.
                            </p>
                        </div>

                        <div className="p-6 overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50">
                                        <th className="pb-4 pl-4 w-12">No</th>
                                        <th className="pb-4">Nama Siswa</th>
                                        <th className="pb-4 text-center">Evaluasi 1</th>
                                        <th className="pb-4 text-center">Evaluasi 2</th>
                                        <th className="pb-4 pr-4 text-right">Tanggal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {students.map((student, idx) => (
                                        <tr key={student.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4 pl-4 text-xs font-bold text-slate-300">0{idx + 1}</td>
                                            <td className="py-2">
                                                <input
                                                    type="text"
                                                    placeholder="Ketik nama siswa..."
                                                    className="w-full bg-transparent border-none text-sm font-bold placeholder:text-slate-300 text-slate-700 focus:ring-0"
                                                    value={student.name}
                                                    onChange={(e) => handleUpdate(student.id, 'name', e.target.value)}
                                                />
                                            </td>
                                            <td className="py-2 text-center">
                                                <input
                                                    type="number"
                                                    className={`w-20 bg-transparent border-none text-center text-sm font-black focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${student.eval1 >= 75 ? 'text-green-500' : student.eval1 > 0 ? 'text-red-500' : 'text-slate-400'}`}
                                                    value={student.eval1 === 0 && student.eval1 !== '' ? '' : student.eval1}
                                                    placeholder="0"
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        if (val === '' || (Number(val) >= 0 && Number(val) <= 100)) {
                                                            handleUpdate(student.id, 'eval1', val === '' ? 0 : Number(val));
                                                        }
                                                    }}
                                                />
                                            </td>
                                            <td className="py-2 text-center">
                                                <input
                                                    type="number"
                                                    className={`w-20 bg-transparent border-none text-center text-sm font-black focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${student.eval2 >= 75 ? 'text-green-500' : student.eval2 > 0 ? 'text-red-500' : 'text-slate-400'}`}
                                                    value={student.eval2 === 0 && student.eval2 !== '' ? '' : student.eval2}
                                                    placeholder="0"
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        if (val === '' || (Number(val) >= 0 && Number(val) <= 100)) {
                                                            handleUpdate(student.id, 'eval2', val === '' ? 0 : Number(val));
                                                        }
                                                    }}
                                                />
                                            </td>
                                            <td className="py-2 pr-4 text-right">
                                                <input
                                                    type="date"
                                                    className="bg-transparent border-none text-xs font-bold text-slate-400 focus:ring-0 p-0 text-right cursor-pointer"
                                                    value={student.date}
                                                    onChange={(e) => handleUpdate(student.id, 'date', e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar Right */}
                <div className="space-y-6">
                    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-[#1e3a8a]">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                    </svg>
                                </div>
                                <h3 className="font-black text-slate-800 tracking-tight">Ringkasan</h3>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { label: 'Total Siswa', value: totalStudents, color: 'text-slate-800', bg: 'bg-slate-50' },
                                    { label: 'Siswa Lolos (≥75%)', value: passedStudents, color: 'text-green-600', bg: 'bg-green-50' },
                                    { label: 'Persentase Kelulusan', value: `${percentage}%`, color: 'text-orange-500', bg: 'bg-orange-50/50', large: true },
                                ].map((stat, i) => (
                                    <div key={i} className={`${stat.bg} rounded-2xl p-6 transition-all hover:translate-x-1`}>
                                        <p className={`text-[10px] uppercase font-black tracking-widest mb-1 ${stat.color} opacity-60`}>{stat.label}</p>
                                        <p className={`font-black ${stat.large ? 'text-4xl' : 'text-2xl'} ${stat.color}`}>{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const EvaluasiView = () => (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
                <div className="bg-white rounded-[2rem] p-6 border border-slate-200 text-center">
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4 border-2 border-[#1e3a8a] p-1">
                        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200" alt="Maharani" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="text-left space-y-3 px-2">
                        <div>
                            <p className="text-[10px] text-slate-400 uppercase font-black">Nama :</p>
                            <p className="text-sm font-bold text-slate-800">Maharani</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 uppercase font-black">NIM :</p>
                            <p className="text-sm font-bold text-slate-800 tracking-wide">23.12.2865</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 uppercase font-black">Status :</p>
                            <div className="mt-1 inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-lg">Presensi</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:col-span-3 space-y-6">
                {/* Top Summary */}
                <div className="bg-white rounded-[2rem] p-6 border border-slate-200 flex items-center justify-between">
                    <h2 className="font-bold text-slate-800">Nilai Evaluasi Seleksi</h2>
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">A2</span>
                </div>

                {/* Scores */}
                <div className="space-y-3">
                    {[
                        { subject: 'Kanji', score: '7.7' },
                        { subject: 'Kotoba', score: '7.7' },
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-4 rounded-2xl flex items-center justify-between border border-slate-100">
                            <span className="text-sm font-bold text-slate-600 pl-4">{item.subject}</span>
                            <span className="px-3 py-1 bg-red-500 text-white font-bold rounded-lg text-sm">{item.score}</span>
                        </div>
                    ))}
                </div>

                {/* Main Table List */}
                <div className="bg-[#1e3a8a] rounded-[1.5rem] p-4 text-white flex items-center justify-between mt-8">
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-sm pl-2">Penilaian Siswa</span>
                        <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded">A2</span>
                    </div>
                    <svg className="w-5 h-5 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                </div>

                <div className="space-y-4">
                    {['Agus', 'Budi', 'Agus', 'Yanto'].map((name, i) => (
                        <div key={i} className="bg-white p-4 rounded-2xl flex items-center justify-between border border-slate-100 hover:shadow-md transition-shadow">
                            <span className="font-bold text-sm text-slate-700 pl-4">{name}</span>
                            <div className="flex gap-4">
                                {i !== 1 && <button className="px-4 py-1.5 bg-green-500 text-white text-xs font-bold rounded-lg shadow-sm">Siap Seleksi</button>}
                                <button className="px-6 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg shadow-red-200 shadow-lg hover:bg-red-600">Nilai</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const StatusSiswaView = () => (
        <div className="space-y-6">
            <div className="bg-[#1e3a8a] rounded-[1.5rem] p-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="font-bold text-sm pl-2">Status Siswa</span>
                    <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded">A2</span>
                </div>
                <div className="relative">
                    <input type="text" placeholder="Cari siswa" className="pl-4 pr-10 py-1.5 rounded-full text-slate-800 text-xs font-bold focus:outline-none w-64" />
                    <svg className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] p-6 border border-slate-200 min-h-[600px]">
                <div className="space-y-3">
                    {[
                        { name: 'Budi A..', gen: 'Angkatan: IV', status: 'Jepang', color: 'green' },
                        { name: 'Novi A..', gen: 'Angkatan: IV', status: 'Ulang Kelas', color: 'yellow' },
                        { name: 'Andi B..', gen: 'Angkatan: IV', status: 'BLK', color: 'orange' },
                        { name: 'Yanto', gen: 'Angkatan: IV', status: 'Keluar', color: 'red' },
                        { name: 'Budi', gen: 'Angkatan: IV', status: 'Keluar', color: 'red' },
                        { name: 'Andi B..', gen: 'Angkatan: IV', status: 'BLK', color: 'orange' },
                        { name: 'Yanto', gen: 'Angkatan: IV', status: 'Keluar', color: 'red' },
                        { name: 'Budi', gen: 'Angkatan: IV', status: 'Keluar', color: 'red' },
                        { name: 'Budi A..', gen: 'Angkatan: IV', status: 'Jepang', color: 'green' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                            <div className="w-1/4 font-bold text-sm text-slate-700">{item.name}</div>
                            <div className="w-1/4 font-bold text-xs text-[#1e3a8a]">{item.gen}</div>
                            <div className="w-1/4 flex gap-2">
                                <span className="px-3 py-1 bg-red-400 text-white text-[10px] font-bold rounded-full">Siswa</span>
                                <span className="px-3 py-1 bg-red-400 text-white text-[10px] font-bold rounded-full">Orang Tua</span>
                            </div>
                            <div className="w-1/4 flex justify-end gap-3">
                                <span className={`px-4 py-1.5 text-white text-[10px] font-bold rounded-full w-24 text-center ${item.color === 'green' ? 'bg-green-600' : item.color === 'yellow' ? 'bg-yellow-500' : item.color === 'orange' ? 'bg-orange-400' : 'bg-red-500'}`}>{item.status}</span>
                                <button className="px-3 py-1 bg-white border border-slate-200 text-slate-500 text-[10px] font-bold rounded-full hover:bg-slate-50">Keterangan</button>
                                <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center text-white cursor-pointer hover:bg-red-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <SimulationWrapper title="Sistem Penilaian Saitama v1.0" onClose={onClose}>
            <div className="flex h-full overflow-hidden text-[#1e293b] font-sans bg-[#f8fafc]">
                {/* Sidebar */}
                <div className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col p-6">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-[#0f172a] rounded-lg flex items-center justify-center text-white font-bold">S</div>
                        <div>
                            <h1 className="text-sm font-bold leading-tight">PT SAITAMA</h1>
                            <p className="text-[10px] text-slate-400 uppercase tracking-tighter">Juara Mendunia</p>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        {[
                            { id: 'dashboard', label: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
                            { id: 'pengajaran', label: 'Pengajaran', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
                            { id: 'penilaian-kelas', label: 'Penilaian Kelas', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
                            { id: 'evaluasi', label: 'Evaluasi Seleksi', icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
                            { id: 'status-siswa', label: 'Status Siswa', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' }
                        ].map((item, i) => (
                            <div
                                key={i}
                                onClick={() => setActivePage(item.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${activePage === item.id ? 'bg-[#1e3a8a] text-white shadow-lg shadow-blue-900/20' : 'text-slate-500 hover:bg-slate-50'}`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                </svg>
                                <span className="text-sm font-medium">{item.label}</span>
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                    {/* Top Header */}
                    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-4">
                            <h2 className="text-lg font-bold text-slate-800">Dashboard Sensei</h2>
                            <div className="h-4 w-[1px] bg-slate-200"></div>
                            <span className="text-xs text-slate-400 font-medium">BUNPOU • OKTOBER 2026</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-4 md:p-8">
                        <div className="max-w-7xl mx-auto">
                            {activePage === 'dashboard' && <DashboardView />}
                            {activePage === 'pengajaran' && <PengajaranView />}
                            {activePage === 'penilaian-kelas' && <PenilaianKelasView />}
                            {activePage === 'evaluasi' && <EvaluasiView />}
                            {activePage === 'status-siswa' && <StatusSiswaView />}
                        </div>
                    </main>
                </div>
            </div>
        </SimulationWrapper>
    );
};

export default SaitamaSimulation;
