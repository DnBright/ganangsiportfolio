import React, { useState } from 'react';
import SimulationWrapper from './SimulationWrapper';

const SaitamaSimulation = ({ onClose }) => {
    const [students, setStudents] = useState([
        { id: 1, name: '', eval1: 0, eval2: 0, date: '' },
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
                            { label: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
                            { label: 'Pengajaran', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
                            { label: 'Penilaian Kelas', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01', active: true },
                            { label: 'Evaluasi Seleksi', icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
                            { label: 'Status Siswa', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' }
                        ].map((item, i) => (
                            <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${item.active ? 'bg-[#1e3a8a] text-white shadow-lg shadow-blue-900/20' : 'text-slate-500 hover:bg-slate-50'}`}>
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
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                                ))}
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-4 md:p-8">
                        <div className="max-w-6xl mx-auto space-y-6">
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
                                                        <th className="pb-4 text-center">Eval 1</th>
                                                        <th className="pb-4 text-center">Eval 2</th>
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
                                                                    className="w-full bg-transparent border-none text-sm font-bold placeholder:text-slate-300 focus:ring-0"
                                                                    value={student.name}
                                                                    onChange={(e) => handleUpdate(student.id, 'name', e.target.value)}
                                                                />
                                                            </td>
                                                            <td className="py-2 text-center">
                                                                <input
                                                                    type="number"
                                                                    className={`w-12 bg-transparent border-none text-center text-sm font-black focus:ring-0 ${student.eval1 >= 75 ? 'text-green-500' : student.eval1 > 0 ? 'text-red-500' : 'text-slate-300'}`}
                                                                    value={student.eval1}
                                                                    onChange={(e) => handleUpdate(student.id, 'eval1', e.target.value)}
                                                                />
                                                            </td>
                                                            <td className="py-2 text-center">
                                                                <input
                                                                    type="number"
                                                                    className={`w-12 bg-transparent border-none text-center text-sm font-black focus:ring-0 ${student.eval2 >= 75 ? 'text-green-500' : student.eval2 > 0 ? 'text-red-500' : 'text-slate-300'}`}
                                                                    value={student.eval2}
                                                                    onChange={(e) => handleUpdate(student.id, 'eval2', e.target.value)}
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
                    </main>
                </div>
            </div>
        </SimulationWrapper>
    );
};

export default SaitamaSimulation;
