import React, { useState } from 'react';
import SimulationWrapper from './SimulationWrapper';

const KursusJepangSimulation = ({ onClose }) => {
    const [activePage, setActivePage] = useState('dashboard');

    const DashboardView = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <h2 className="text-xl font-bold text-slate-800 mb-1">Ringkasan Hari Ini</h2>
                <p className="text-xs text-slate-400 mb-6">Pantau aktivitas kelas dan siswa Anda.</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Kelas Aktif', value: '5', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
                        { label: 'Total Siswa', value: '128', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
                        { label: 'Jadwal Hari Ini', value: '2', sub: 'Kelas', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
                        { label: 'Perlu Dinilai', value: '8', sub: 'Tugas', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
                    ].map((stat, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">{stat.label}</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
                                {stat.sub && <span className="text-xs text-slate-400">{stat.sub}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-800">Kelas Terdekat</h3>
                        <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full">Hari Ini</span>
                    </div>
                    <div className="bg-red-50 p-5 rounded-xl border border-red-100">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <span className="px-2 py-1 bg-blue-600 text-white text-[10px] font-bold rounded">INTENSIVE N4</span>
                                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded">LIVE ZOOM</span>
                            </div>
                        </div>
                        <h4 className="font-bold text-slate-800 mb-2">Bunpou Practice: Conditional Forms</h4>
                        <p className="text-sm text-slate-500 mb-4">Materi fokus pada penggunaan Tara, Ba, dan Nara dalam percakapan sehari-hari</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="text-center">
                                    <p className="text-xs text-slate-400 uppercase font-bold">Hari Ini</p>
                                    <p className="text-2xl font-black text-red-600">19:00</p>
                                    <p className="text-xs text-slate-400">WIB</p>
                                </div>
                            </div>
                            <button className="px-6 py-2.5 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700">Mulai Kelas</button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                    <h3 className="font-bold text-slate-800 mb-6">Aktivitas Terakhir</h3>
                    <div className="space-y-4">
                        {[
                            { name: 'Ahmad Rizki', action: 'mengumpulkan tugas Sakubun (Writing) N4', time: '10 Menit yang lalu', badge: 'Review' },
                            { name: 'Siti Aminah', action: 'menyelesaikan modul Kanji N5 Bab 3', time: '36 Menit yang lalu' },
                            { name: 'Budi Santoso', action: 'bertanya di diskusi Partikel Wa & Ga', time: '1 Jam yang lalu', badge: 'Balas' }
                        ].map((activity, i) => (
                            <div key={i} className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0">
                                <div className="w-8 h-8 bg-slate-200 rounded-full flex-shrink-0"></div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-slate-700"><span className="font-bold">{activity.name}</span> {activity.action}</p>
                                    <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                                </div>
                                {activity.badge && <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg">{activity.badge}</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const KelasSayaView = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-1">Kelas Saya</h2>
                    <p className="text-xs text-slate-400">Kelola semua kelas yang Anda ajar.</p>
                </div>
                <div className="flex gap-3">
                    <input type="text" placeholder="Cari nama kelas atau level..." className="px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button className="px-4 py-2 bg-slate-800 text-white text-sm font-bold rounded-xl">Semua</button>
                    <button className="px-4 py-2 bg-slate-100 text-slate-600 text-sm font-bold rounded-xl">Aktif</button>
                    <button className="px-4 py-2 bg-slate-100 text-slate-600 text-sm font-bold rounded-xl">Selesai</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: 'Intensive N4: Bunpou & Dokkai', level: 'N4', students: 12, schedule: 'Senin & Rabu', time: '19.00 - 21.00 WIB', platform: 'Zoom', status: 'Hari Ini', statusColor: 'red' },
                    { title: 'Basic Conversation: Daily Life', level: 'N5', students: 8, schedule: 'Selasa & Kamis', time: '15.00 - 17.00 WIB', platform: 'Zoom', status: 'Aktif', statusColor: 'green' },
                    { title: 'Kanji Mastery N3', level: 'N3', students: 20, schedule: 'Sabtu', time: '09.00 - 12.00 WIB', platform: 'LMS', status: 'Selesai', statusColor: 'gray' },
                    { title: 'Persiapan Tokutei Ginou', level: 'TG', students: 15, schedule: 'Jumat', time: '13.00 - 15.30 WIB', platform: 'Zoom', status: 'Aktif', statusColor: 'green' }
                ].map((kelas, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <span className={`px-3 py-1 text-xs font-bold rounded ${kelas.level === 'N4' ? 'bg-blue-100 text-blue-700' : kelas.level === 'N5' ? 'bg-green-100 text-green-700' : kelas.level === 'N3' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}>{kelas.level}</span>
                            <span className={`px-3 py-1 text-xs font-bold rounded ${kelas.statusColor === 'red' ? 'bg-red-100 text-red-600' : kelas.statusColor === 'green' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'}`}>• {kelas.status}</span>
                        </div>
                        <h3 className="font-bold text-slate-800 mb-4">{kelas.title}</h3>
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                <span>{kelas.students} Siswa</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                <span>{kelas.schedule}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{kelas.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                <span>{kelas.platform}</span>
                            </div>
                        </div>
                        <button className="w-full py-2 bg-slate-800 text-white text-sm font-bold rounded-xl hover:bg-slate-900">Detail</button>
                    </div>
                ))}
            </div>
        </div>
    );

    const LiveClassView = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-1">Live Class</h2>
                    <p className="text-xs text-slate-400">Dashboard &gt; Live Class</p>
                </div>
                <button className="px-6 py-3 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700">+ Jadwalkan Live Class</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Bulan Ini', value: '12', sub: 'Sesi', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
                    { label: 'Hari Ini', value: '1', sub: 'Sesi', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                    { label: 'Sedang Berlangsung', value: '1', sub: 'Sesi', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                                </svg>
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">{stat.label}</p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
                            <span className="text-xs text-slate-400">{stat.sub}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <div className="flex gap-4 mb-6 border-b border-slate-200">
                    <button className="pb-3 px-4 text-sm font-bold text-slate-800 border-b-2 border-slate-800">Akan Datang</button>
                    <button className="pb-3 px-4 text-sm font-bold text-slate-400">Sedang Berlangsung</button>
                    <button className="pb-3 px-4 text-sm font-bold text-slate-400">Selesai</button>
                </div>

                <div className="space-y-4">
                    {[
                        { title: 'Bunpou Practice: Conditional Forms', level: 'N4', date: 'Hari Ini', time: '19:00 - 21:00 WIB', students: 15, status: 'live', platform: 'Zoom' },
                        { title: 'Basic Conversation: Daily Life', level: 'N5', date: 'Besok, 7 Jan', time: '15:00 - 17:00 WIB', students: 8, platform: 'Zoom' },
                        { title: 'Kanji Mastery N3: Week 1', level: 'N3', date: 'Kemarin, 5 Jan', time: '09:00 - 12:00 WIB', students: 20, status: 'done', platform: 'Zoom' },
                        { title: 'Persiapan Tokutei Ginou: Food Service', level: 'TG', date: 'Jumat, 9 Jan', time: '13:00 - 15:30 WIB', students: 15, platform: 'Zoom' }
                    ].map((session, i) => (
                        <div key={i} className="p-5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="text-center">
                                    <p className="text-xs text-slate-400 uppercase font-bold">{session.date}</p>
                                    <p className="text-xl font-black text-slate-800">{session.time.split(' - ')[0]}</p>
                                    <p className="text-xs text-slate-400">WIB</p>
                                </div>
                                <div className="h-12 w-px bg-slate-200"></div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2 py-1 text-xs font-bold rounded ${session.level === 'N4' ? 'bg-blue-100 text-blue-700' : session.level === 'N5' ? 'bg-green-100 text-green-700' : session.level === 'N3' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}>{session.level}</span>
                                        <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                            {session.platform}
                                        </span>
                                        {session.status === 'live' && <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded animate-pulse">• LIVE</span>}
                                    </div>
                                    <h4 className="font-bold text-slate-800">{session.title}</h4>
                                    <p className="text-xs text-slate-500 mt-1">{session.time} • {session.students} Terdaftar</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                {session.status === 'live' ? (
                                    <button className="px-6 py-2.5 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700">Join Session</button>
                                ) : session.status === 'done' ? (
                                    <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700">Lihat Rekaman</button>
                                ) : (
                                    <>
                                        <button className="px-4 py-2.5 bg-blue-50 text-blue-600 text-sm font-bold rounded-xl hover:bg-blue-100">Akan Datang</button>
                                        <button className="px-4 py-2.5 bg-slate-100 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-200">Edit Jadwal</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const MateriView = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-1">Materi & Modul</h2>
                    <p className="text-xs text-slate-400">Kelola konten pembelajaran untuk kelas Anda ajar.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-slate-100 text-slate-600 text-sm font-bold rounded-xl">Kelola Modul</button>
                    <button className="px-6 py-3 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700">+ Buat Materi Baru</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Materi Aktif', value: '45', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
                    { label: 'Total Modul', value: '12', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
                    { label: 'Terpopuler', value: 'Video: Partikel...', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
                    { label: 'Draft', value: '3', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                                </svg>
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">{stat.label}</p>
                        <h3 className="text-xl font-black text-slate-800 truncate">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                        <input type="text" placeholder="Cari materi..." className="px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64" />
                        <select className="px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none">
                            <option>Semua Level</option>
                        </select>
                    </div>

                    <div className="space-y-3">
                        {[
                            { title: 'Dasar Tata Bahasa N5', level: 'N5', modules: 8, status: 'Published' },
                            { title: 'Percakapan Sehari-hari (Kaiwa)', level: 'N4', modules: 5, status: 'Published' },
                            { title: 'Persiapan Tokutei Ginou: Food Service', level: 'TG', modules: 0, status: 'Draft' }
                        ].map((materi, i) => (
                            <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-slate-100 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                                        <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`px-2 py-1 text-xs font-bold rounded ${materi.level === 'N5' ? 'bg-green-100 text-green-700' : materi.level === 'N4' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>{materi.level}</span>
                                            <span className={`px-2 py-1 text-xs font-bold rounded ${materi.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>• {materi.status}</span>
                                        </div>
                                        <h4 className="font-bold text-slate-800">{materi.title}</h4>
                                        <p className="text-xs text-slate-500 mt-1">{materi.modules} Materi • Published</p>
                                    </div>
                                </div>
                                <button className="px-4 py-2 bg-slate-800 text-white text-sm font-bold rounded-xl hover:bg-slate-900">Detail</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                    <h3 className="font-bold text-slate-800 mb-6">Aksi Cepat</h3>
                    <div className="space-y-3">
                        {[
                            { label: 'Upload Video', sub: 'Unggah file video (max 500mb)', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', color: 'red' },
                            { label: 'Upload PDF', sub: 'Kirim file bacaan di slide', icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z', color: 'blue' },
                            { label: 'Buat Materi Teks', sub: 'Artikel & Penjelasan', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', color: 'purple' }
                        ].map((action, i) => (
                            <button key={i} className={`w-full p-4 bg-${action.color}-50 rounded-xl border border-${action.color}-100 text-left hover:bg-${action.color}-100 transition-colors`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 bg-${action.color}-100 rounded-lg flex items-center justify-center text-${action.color}-600`}>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={action.icon} />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className={`font-bold text-${action.color}-800 text-sm`}>{action.label}</h4>
                                        <p className="text-xs text-slate-500">{action.sub}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const QuizView = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-1">Quiz & Penilaian</h2>
                    <p className="text-xs text-slate-400">Kelola evaluasi pembelajaran dan pantau hasil siswa.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-slate-100 text-slate-600 text-sm font-bold rounded-xl">Buat Tugas / Essay</button>
                    <button className="px-6 py-3 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700">+ Buat Quiz Baru</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Quiz Aktif', value: '8', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                    { label: 'Tugas Essay', value: '4', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
                    { label: 'Perlu Dinilai', value: '25', sub: 'Siswa', icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                    { label: 'Rata-rata Nilai', value: '86', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                                </svg>
                            </div>
                        </div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">{stat.label}</p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
                            {stat.sub && <span className="text-xs text-slate-400">{stat.sub}</span>}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <div className="flex gap-4 mb-6 border-b border-slate-200">
                    <button className="pb-3 px-4 text-sm font-bold text-slate-800 border-b-2 border-slate-800">Daftar Quiz</button>
                    <button className="pb-3 px-4 text-sm font-bold text-slate-400">Tugas & Essay</button>
                    <button className="pb-3 px-4 text-sm font-bold text-slate-400">Hasil Penilaian</button>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <input type="text" placeholder="Cari quiz atau tugas..." className="px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64" />
                    <div className="flex gap-3">
                        <select className="px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none">
                            <option>Semua Level</option>
                        </select>
                        <select className="px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none">
                            <option>Semua Status</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-3">
                    {[
                        { title: 'Evaluasi Bab 1-5 (Tata Bahasa N5)', level: 'N5', questions: 50, type: 'Pilihan Ganda', deadline: '10 Jan 2024', status: 'Aktif' },
                        { title: 'Latihan Kanji Mingguan', level: 'N4', questions: 20, type: 'Pilihan Ganda', deadline: 'Hari Ini', status: 'Aktif' },
                        { title: 'Ujian Akhir Semester Ganjil', level: 'N3', questions: 100, type: 'Campuran', deadline: '-', status: 'Draft' }
                    ].map((quiz, i) => (
                        <div key={i} className="p-5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-slate-100 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                                    <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`px-2 py-1 text-xs font-bold rounded ${quiz.level === 'N5' ? 'bg-green-100 text-green-700' : quiz.level === 'N4' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{quiz.level}</span>
                                        <span className={`px-2 py-1 text-xs font-bold rounded ${quiz.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>• {quiz.status}</span>
                                    </div>
                                    <h4 className="font-bold text-slate-800">{quiz.title}</h4>
                                    <p className="text-xs text-slate-500 mt-1">{quiz.questions} Soal • {quiz.type} • Deadline: {quiz.deadline}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50">Preview</button>
                                <button className="px-4 py-2 bg-slate-800 text-white text-sm font-bold rounded-xl hover:bg-slate-900">Edit Quiz</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <SimulationWrapper title="Kursus Jepang - Sensei Portal" onClose={onClose}>
            <div className="flex h-full overflow-hidden bg-slate-50">
                {/* Sidebar */}
                <div className="w-64 bg-slate-900 text-white flex flex-col p-6 hidden md:flex">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">K</div>
                        <div>
                            <h1 className="text-sm font-bold leading-tight">KursusJepang</h1>
                            <p className="text-[10px] text-slate-400 uppercase tracking-tight">Sensei Portal</p>
                        </div>
                    </div>

                    <nav className="space-y-1 flex-1">
                        {[
                            { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                            { id: 'kelas-saya', label: 'Kelas Saya', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
                            { id: 'live-class', label: 'Live Class', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
                            { id: 'materi', label: 'Materi & Modul', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
                            { id: 'quiz', label: 'Quiz & Penilaian', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                            { id: 'siswa', label: 'Siswa', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
                            { id: 'jadwal', label: 'Jadwal Mengajar', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' }
                        ].map((item, i) => (
                            <div
                                key={i}
                                onClick={() => setActivePage(item.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${activePage === item.id ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                </svg>
                                <span className="text-sm font-medium">{item.label}</span>
                            </div>
                        ))}
                    </nav>

                    <div className="pt-6 border-t border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold">G</div>
                            <div>
                                <h3 className="text-sm font-bold">Ganang</h3>
                                <p className="text-xs text-slate-400">Sensei / Pengajar</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
                        <h2 className="text-lg font-bold text-slate-800">Dashboard</h2>
                        <div className="flex items-center gap-4">
                            <button className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </button>
                            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold cursor-pointer">G</div>
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto p-8">
                        <div className="max-w-7xl mx-auto">
                            {activePage === 'dashboard' && <DashboardView />}
                            {activePage === 'kelas-saya' && <KelasSayaView />}
                            {activePage === 'live-class' && <LiveClassView />}
                            {activePage === 'materi' && <MateriView />}
                            {activePage === 'quiz' && <QuizView />}
                            {activePage === 'siswa' && (
                                <div className="space-y-6">
                                    <div className="bg-white rounded-2xl p-6 border border-slate-200 flex items-center justify-between">
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-800 mb-1">Siswa</h2>
                                            <p className="text-xs text-slate-400">Pantau dan kelola siswa dari seluruh kelas yang Anda ajar.</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <input type="text" placeholder="Cari nama siswa..." className="px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                            <select className="px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none">
                                                <option>Semua Kelas</option>
                                            </select>
                                            <select className="px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none">
                                                <option>Semua Level</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        {[
                                            { label: 'Siswa Aktif', value: '45', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
                                            { label: 'Siswa Baru', value: '+5', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
                                            { label: 'Perlu Evaluasi', value: '8', icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                                            { label: 'Progress Rata²', value: '68%', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }
                                        ].map((stat, i) => (
                                            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-600">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">{stat.label}</p>
                                                <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-white rounded-2xl p-6 border border-slate-200">
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b border-slate-200">
                                                        <th className="text-left py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Siswa</th>
                                                        <th className="text-left py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Kelas & Level</th>
                                                        <th className="text-left py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Progress Materi</th>
                                                        <th className="text-center py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Rata-rata Nilai</th>
                                                        <th className="text-center py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                                        <th className="text-center py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {[
                                                        { name: 'Budi Santoso', date: 'Bergabung 1 Jan 2024', level: 'N5 Intensive A', badge: 'N5', progress: 85, score: 92, status: 'Aktif', statusColor: 'green' },
                                                        { name: 'Siti Aminah', date: 'Bergabung 10 Des 2023', level: 'N4 Regular B', badge: 'N4', progress: 60, score: 78, status: 'Aktif', statusColor: 'green' },
                                                        { name: 'Rizky Pratama', date: 'Bergabung 8 Nov 2023', level: 'TG Food Service', badge: 'TG', progress: 25, score: 65, status: 'Tidak Aktif', statusColor: 'gray' },
                                                        { name: 'Dewi Lestari', date: 'Bergabung 2 Jan 2024', level: 'N5 Intensive A', badge: 'N5', progress: 95, score: 98, status: 'Aktif', statusColor: 'green' },
                                                        { name: 'Ahmad Fauzi', date: 'Bergabung 10 Des 2023', level: 'N4 Regular B', badge: 'N4', progress: 40, score: 70, status: 'Perlu Perhatian', statusColor: 'orange' }
                                                    ].map((student, i) => (
                                                        <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                                                            <td className="py-4 px-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold text-sm">
                                                                        {student.name.split(' ').map(n => n[0]).join('')}
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-bold text-slate-800 text-sm">{student.name}</h4>
                                                                        <p className="text-xs text-slate-400">{student.date}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                <div className="flex items-center gap-2">
                                                                    <span className={`px-2 py-1 text-xs font-bold rounded ${student.badge === 'N5' ? 'bg-green-100 text-green-700' : student.badge === 'N4' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>{student.badge}</span>
                                                                    <span className="text-sm text-slate-600">{student.level}</span>
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                                                                        <div className={`h-full rounded-full ${student.progress >= 80 ? 'bg-green-500' : student.progress >= 50 ? 'bg-blue-500' : 'bg-orange-500'}`} style={{ width: `${student.progress}%` }}></div>
                                                                    </div>
                                                                    <span className="text-sm font-bold text-slate-600 w-12">{student.progress}%</span>
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-4 text-center">
                                                                <span className={`text-lg font-black ${student.score >= 90 ? 'text-green-600' : student.score >= 75 ? 'text-blue-600' : 'text-red-600'}`}>{student.score}</span>
                                                            </td>
                                                            <td className="py-4 px-4 text-center">
                                                                <span className={`px-3 py-1 text-xs font-bold rounded ${student.statusColor === 'green' ? 'bg-green-100 text-green-700' : student.statusColor === 'orange' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'}`}>{student.status}</span>
                                                            </td>
                                                            <td className="py-4 px-4 text-center">
                                                                <button className="px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-900">Detail</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-slate-200 text-center">
                                            <button className="text-sm text-slate-400 hover:text-slate-600 font-bold">Menampilkan 5 dari 45 siswa</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activePage === 'jadwal' && (
                                <div className="space-y-6">
                                    <div className="bg-white rounded-2xl p-6 border border-slate-200 flex items-center justify-between">
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-800 mb-1">Jadwal Mengajar</h2>
                                            <p className="text-xs text-slate-400">Kelola dan pantau agenda kelas Anda secara terstruktur.</p>
                                        </div>
                                        <button className="px-6 py-3 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700">+ Tambah Jadwal</button>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <div className="bg-white rounded-2xl p-6 border border-slate-200">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="font-bold text-slate-800">Agenda Hari Ini</h3>
                                                <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-black">3</span>
                                            </div>
                                            <div className="space-y-4">
                                                {[
                                                    { time: '10:00 - 11:30', title: 'Live Class: Tata Bahasa N5', type: 'Intensive A - Online', color: 'red' },
                                                    { time: '14:00 - 14:30', title: 'Sesi Konsultasi Siswa', type: 'Siti Aminah - Offline Meet', color: 'blue' }
                                                ].map((agenda, i) => (
                                                    <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                                        <div className="flex items-start gap-3">
                                                            <div className={`w-1 h-full ${agenda.color === 'red' ? 'bg-red-500' : 'bg-blue-500'} rounded-full`}></div>
                                                            <div className="flex-1">
                                                                <p className="text-xs text-slate-400 font-bold mb-1">{agenda.time}</p>
                                                                <h4 className="font-bold text-slate-800 text-sm mb-1">{agenda.title}</h4>
                                                                <p className="text-xs text-slate-500">{agenda.type}</p>
                                                                <button className={`mt-3 w-full py-2 ${agenda.color === 'red' ? 'bg-red-600' : 'bg-blue-600'} text-white text-xs font-bold rounded-lg hover:opacity-90`}>
                                                                    {agenda.color === 'red' ? 'Mulai Kelas Sekarang' : 'Masuk Room Konsultasi'}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center gap-4">
                                                    <button className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200">
                                                        <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                                        </svg>
                                                    </button>
                                                    <h3 className="text-lg font-bold text-slate-800">Januari 2024</h3>
                                                    <button className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200">
                                                        <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button className="px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-lg">Mingguan</button>
                                                    <button className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg">Bulanan</button>
                                                    <button className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg">List View</button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-7 gap-4">
                                                {['SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB', 'MIN'].map((day, i) => (
                                                    <div key={i} className="text-center text-xs font-bold text-slate-400 uppercase pb-2">{day}</div>
                                                ))}
                                                {[
                                                    { day: '', events: [] },
                                                    { day: '', events: [] },
                                                    { day: '', events: [] },
                                                    { day: '', events: [] },
                                                    { day: '', events: [] },
                                                    { day: '', events: [] },
                                                    { day: '', events: [] },
                                                    { day: '1', events: [{ title: 'N5 Intensive A', time: '19:00 - 11:30', color: 'red', badge: 'N5' }] },
                                                    { day: '2', events: [{ title: 'TG Food Servi...', time: '19:00 - 21:00', color: 'orange', badge: 'TG' }] },
                                                    { day: '3', events: [{ title: 'Konsultasi: Budi', time: '14:00 - 14:30', color: 'blue', badge: 'N5' }] },
                                                    { day: '4', events: [{ title: 'N4 Regular B', time: '16:00 - 17:00', color: 'blue', badge: 'N4' }] },
                                                    { day: '5', events: [{ title: 'Evaluasi Ming...', time: '09:00 - 10:00', color: 'purple', badge: 'ALL' }] },
                                                    { day: '6', events: [] },
                                                    { day: '7', events: [] }
                                                ].map((cell, i) => (
                                                    <div key={i} className={`min-h-24 p-2 rounded-lg border ${cell.day ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-100'}`}>
                                                        {cell.day && <div className="text-xs font-bold text-slate-600 mb-2">{cell.day}</div>}
                                                        <div className="space-y-1">
                                                            {cell.events.map((event, j) => (
                                                                <div key={j} className={`p-2 rounded text-xs ${event.color === 'red' ? 'bg-red-50 border border-red-200' : event.color === 'blue' ? 'bg-blue-50 border border-blue-200' : event.color === 'orange' ? 'bg-orange-50 border border-orange-200' : 'bg-purple-50 border border-purple-200'}`}>
                                                                    <div className={`text-[10px] font-bold mb-1 ${event.color === 'red' ? 'text-red-700' : event.color === 'blue' ? 'text-blue-700' : event.color === 'orange' ? 'text-orange-700' : 'text-purple-700'}`}>{event.badge}</div>
                                                                    <div className="font-bold text-slate-800 leading-tight mb-1">{event.title}</div>
                                                                    <div className="text-[10px] text-slate-500">{event.time}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </SimulationWrapper>
    );
};

export default KursusJepangSimulation;
