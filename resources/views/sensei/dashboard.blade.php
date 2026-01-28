<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Sensei Dashboard - Kursus Jepang') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <h3 class="text-lg font-bold mb-4">Kelas & Jadwal Mengajar</h3>
                    <div class="space-y-4">
                        <div class="p-4 border rounded-lg flex justify-between items-center">
                            <div>
                                <h4 class="font-bold">Kelas N5 - Dasar 1</h4>
                                <p class="text-sm text-gray-600 text-primary-red">Selasa, 19:00 - 21:00 (Zoom)</p>
                            </div>
                            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg">Buka Kelas</button>
                        </div>
                        <div class="p-4 border rounded-lg flex justify-between items-center">
                            <div>
                                <h4 class="font-bold">Kelas N4 - Intermediate B</h4>
                                <p class="text-sm text-gray-600">Kamis, 19:00 - 21:00</p>
                            </div>
                            <button class="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed">Belum Mulai</button>
                        </div>
                    </div>
                    
                    <div class="mt-8">
                        <h4 class="font-semibold mb-4">Monitoring Siswa</h4>
                        <table class="min-w-full">
                            <thead>
                                <tr class="text-left bg-gray-50">
                                    <th class="p-2">Nama Siswa</th>
                                    <th class="p-2">Progress</th>
                                    <th class="p-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b">
                                    <td class="p-2">Ahmad Dhani</td>
                                    <td class="p-2">75%</td>
                                    <td class="p-2"><button class="text-red-600 hover:underline">Beri Nilai</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
