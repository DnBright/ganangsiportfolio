<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-6">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
            
            <!-- Welcome Banner -->
            <div class="relative bg-gradient-to-r from-red-600 to-red-800 rounded-3xl p-8 text-white overflow-hidden shadow-xl">
                <div class="absolute right-0 top-0 h-full w-1/3 opacity-10 pointer-events-none">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#FFFFFF" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.5,31.2C58.9,40.9,46.9,47.4,35.3,53.4C23.7,59.4,12.5,64.9,-0.7,66.1C-13.9,67.3,-26.1,64.2,-37.2,57.5C-48.3,50.8,-58.3,40.5,-67.2,28.6C-76.1,16.7,-83.9,3.2,-80.6,-8.1C-77.3,-19.4,-62.9,-28.5,-50.8,-37.6C-38.7,-46.7,-28.9,-55.8,-17.7,-64.8C-6.5,-73.8,6.1,-82.7,20.2,-83.1C34.3,-83.5,49.9,-75.4,44.7,-76.4Z" transform="translate(100 100)" />
                    </svg>
                </div>
                <div class="relative z-10">
                    <h1 class="text-3xl font-bold mb-2">Ohaio, {{ Auth::user()->name }}! 👋</h1>
                    <p class="text-red-100 text-lg max-w-xl">Siap melanjutkan perjalananmu menuju Jepang? Lanjutkan pelajaran terakhirmu dan capai target harian!</p>
                    <div class="mt-6 flex gap-4">
                        <button class="bg-white text-red-700 px-6 py-2.5 rounded-full font-bold shadow-lg hover:bg-gray-50 transition transform hover:-translate-y-1">
                            Lanjut Belajar
                        </button>
                        <button class="bg-red-700 bg-opacity-50 text-white px-6 py-2.5 rounded-full font-semibold border border-red-400 hover:bg-opacity-70 transition">
                            Lihat Jadwal
                        </button>
                    </div>
                </div>
            </div>

            <!-- Stats Row -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div class="p-3 bg-red-50 text-red-600 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flame"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-2.246-3.666-1.921-5.758 5.623 3.996 4.793 7.854 4.793 7.854A2.5 2.5 0 0 0 16 12.5c0-1.66-1-3-2-5 .245-1.996 1.83-3.235 3.126-3.832 1.34-1.284 3.493-1.636 4.874.157 2.062 2.679 1.157 8.083-2.613 11.727a8.441 8.441 0 0 1-5.463 2.636 8.356 8.356 0 0 1-5.69-1.928 8.435 8.435 0 0 1-3.21-6.69c.148-2.67 1.637-4.72 3.395-5.325"/></svg>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500 font-medium uppercase tracking-wide">Streak</p>
                        <p class="text-xl font-bold text-gray-800">12 Hari</p>
                    </div>
                </div>
                <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div class="p-3 bg-blue-50 text-blue-600 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500 font-medium uppercase tracking-wide">Pelajaran</p>
                        <p class="text-xl font-bold text-gray-800">24 Selesai</p>
                    </div>
                </div>
                <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div class="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trophy"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500 font-medium uppercase tracking-wide">Poin</p>
                        <p class="text-xl font-bold text-gray-800">1,250 XP</p>
                    </div>
                </div>
                <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div class="p-3 bg-purple-50 text-purple-600 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-target"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500 font-medium uppercase tracking-wide">Target</p>
                        <p class="text-xl font-bold text-gray-800">{{ Auth::user()->target_kerja ?? 'Set Target' }}</p>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Main Content Left -->
                <div class="lg:col-span-2 space-y-8">
                    
                    <!-- Current Courses -->
                    <section>
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-xl font-bold text-gray-800">Kursus Saya</h3>
                            <a href="#" class="text-red-600 font-semibold text-sm hover:underline">Lihat Semua</a>
                        </div>
                        
                        <!-- Course Card 1 -->
                        <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4 transition hover:shadow-md">
                            <div class="flex gap-5">
                                <div class="w-32 h-32 bg-gray-100 rounded-xl flex-shrink-0 relative overflow-hidden">
                                     <!-- Placeholder for Course Image -->
                                    <div class="absolute inset-0 flex items-center justify-center bg-red-50 text-red-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                                    </div>
                                    <div class="absolute top-2 left-2 bg-white px-2 py-1 rounded-md text-xs font-bold shadow-sm text-gray-700">N5</div>
                                </div>
                                <div class="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div class="flex justify-between items-start">
                                            <h4 class="text-lg font-bold text-gray-800">Mastering Basic Japanese N5</h4>
                                            <div class="bg-green-100 text-green-700 p-1.5 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                                            </div>
                                        </div>
                                        <p class="text-gray-500 text-sm mt-1">Module 4: Introduction to Particles (Wa, Ga, Wo)</p>
                                    </div>
                                    
                                    <div>
                                        <div class="flex justify-between text-xs text-gray-500 mb-2 font-medium">
                                            <span>Progress: 45%</span>
                                            <span>9/20 Lessons</span>
                                        </div>
                                        <div class="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                            <div class="bg-red-600 h-2.5 rounded-full" style="width: 45%"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4 pt-4 border-t border-gray-50 flex justify-end">
                                <button class="bg-gray-900 text-white px-5 py-2 rounded-lg font-medium text-sm hover:bg-black transition flex items-center gap-2">
                                    Lanjutkan Belajar
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                </button>
                            </div>
                        </div>

                    </section>

                    <!-- Latest Quiz / Activity -->
                    <section>
                        <h3 class="text-xl font-bold text-gray-800 mb-6">Aktivitas & Tugas</h3>
                        <div class="space-y-4">
                            <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition cursor-pointer group">
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen-tool"><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
                                    </div>
                                    <div>
                                        <h5 class="font-bold text-gray-800 text-sm">Quiz Harian: Katakana Part 1</h5>
                                        <p class="text-xs text-gray-500">Tenggat: Hari ini, 23:59</p>
                                    </div>
                                </div>
                                <span class="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full font-bold">Belum Dikerjakan</span>
                            </div>

                            <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition cursor-pointer">
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                                    </div>
                                    <div>
                                        <h5 class="font-bold text-gray-800 text-sm">Latihan Listening N5 - Eps 3</h5>
                                        <p class="text-xs text-gray-500">Selesai • Score: 85/100</p>
                                    </div>
                                </div>
                                <span class="text-gray-400 text-xs font-medium">2 Jam lalu</span>
                            </div>
                        </div>
                    </section>

                </div>

                <!-- Sidebar Right -->
                <div class="space-y-8">
                    <!-- Live Class Widget -->
                    <div class="bg-gray-900 text-white p-6 rounded-3xl relative overflow-hidden">
                        <div class="absolute top-0 right-0 p-4 opacity-10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-video"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
                        </div>
                        <div class="relative z-10 flex flex-col h-full justify-between gap-4">
                            <div>
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                    <span class="text-xs font-bold uppercase tracking-wider text-gray-400">Live Class</span>
                                </div>
                                <h4 class="text-xl font-bold">Percakapan N5: Jikoshoukai</h4>
                                <p class="text-gray-400 text-sm mt-1">Bersama Tanaka Sensei</p>
                            </div>
                            
                            <div class="bg-gray-800 rounded-xl p-3 flex items-center justify-between">
                                <div class="text-center">
                                    <p class="text-xs text-gray-400">Jam</p>
                                    <p class="font-bold">19:00</p>
                                </div>
                                <div class="h-8 w-[1px] bg-gray-700"></div>
                                <div class="text-center">
                                    <p class="text-xs text-gray-400">Durasi</p>
                                    <p class="font-bold">90m</p>
                                </div>
                                <div class="h-8 w-[1px] bg-gray-700"></div>
                                <button class="bg-red-600 p-2 rounded-lg hover:bg-red-700 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                                </button>
                            </div>
                            <p class="text-xs text-center text-gray-500 mt-2">Mulai dalam 3 jam 20 menit</p>
                        </div>
                    </div>

                    <!-- Leaderboard / Motivation -->
                    <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h4 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-crown text-yellow-500"><path d="m2 4 3 12h14l3-12-6 7-4-3-4 3-6-7z"/></svg>
                            Top Siswa Minggu Ini
                        </h4>
                        <div class="space-y-4">
                            @foreach(range(1, 3) as $i)
                            <div class="flex items-center gap-3">
                                <div class="font-bold text-gray-400 text-sm w-4">{{ $i }}</div>
                                <div class="w-8 h-8 rounded-full bg-gray-200"></div>
                                <div class="flex-1">
                                    <p class="text-sm font-bold text-gray-800">Siswa {{ $i }}</p>
                                    <p class="text-xs text-gray-500">1,{{ 9 - $i }}00 XP</p>
                                </div>
                            </div>
                            @endforeach
                        </div>
                        <button class="w-full mt-4 text-center text-sm text-gray-500 hover:text-red-600 transition">Lihat Peringkat Lengkap</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>
