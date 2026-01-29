import React from 'react';
import VisionSidebar from './VisionSidebar';
import StatCard from './StatCard';
import VisionChart from './Charts/VisionChart';
import ProjectTable from './ProjectTable';

const AdminDashboard = ({ stats = {} }) => {
    return (
        <div className="min-h-screen bg-[#060010] text-white p-6 font-sans antialiased overflow-hidden">
            {/* Background Glows */}
            <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="flex gap-6 relative z-10">
                {/* Sidebar */}
                <VisionSidebar />

                {/* Main Content */}
                <div className="flex-1 space-y-6 overflow-y-auto max-h-[calc(100vh-48px)] no-scrollbar">
                    {/* Top Bar placeholder */}
                    <div className="flex justify-between items-center px-2 py-4">
                        <div className="text-sm opacity-50">Pages / Dashboard</div>
                        <div className="flex items-center gap-4">
                            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md text-xs">Search...</div>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" />
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <StatCard title="Today's Money" value="$53,000" growth="+55%" icon="money" />
                        <StatCard title="Today's Users" value="2,300" growth="+3%" icon="users" />
                        <StatCard title="New Clients" value="+3,462" growth="-2%" icon="clients" />
                        <StatCard title="Total Sales" value="$173,000" growth="+8%" icon="sales" />
                    </div>

                    {/* Top Row Charts/Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1 bg-gradient-to-br from-blue-600/20 to-indigo-900/20 rounded-[30px] p-8 border border-white/10 backdrop-blur-xl relative overflow-hidden group">
                            <img src="/images/jellyfish-bg.png" className="absolute right-[-20%] bottom-[-20%] w-full opacity-30 group-hover:scale-110 transition-transform duration-700" alt="" />
                            <p className="text-sm opacity-60 mb-1">Welcome back,</p>
                            <h2 className="text-3xl font-bold mb-4">Artur Johnson</h2>
                            <p className="text-sm opacity-60 max-w-[200px]">Glad to see you again! Ask me anything.</p>
                            <button className="mt-8 text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:translate-x-1 transition-transform">
                                Tap to record <span className="text-blue-400">→</span>
                            </button>
                        </div>

                        <div className="lg:col-span-1 bg-black/40 rounded-[30px] p-8 border border-white/5 backdrop-blur-xl">
                            <h3 className="text-lg font-bold mb-6">Satisfaction Rate</h3>
                            <div className="flex flex-col items-center justify-center pt-4">
                                <div className="relative w-40 h-40 flex items-center justify-center">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle cx="80" cy="80" r="70" className="stroke-white/5" strokeWidth="12" fill="none" />
                                        <circle cx="80" cy="80" r="70" className="stroke-blue-500" strokeWidth="12" fill="none" strokeDasharray="440" strokeDashoffset="110" strokeLinecap="round" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <div className="text-4xl font-bold">95%</div>
                                        <div className="text-[10px] opacity-40 uppercase">Based on likes</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1 bg-black/40 rounded-[30px] p-8 border border-white/5 backdrop-blur-xl">
                            <h3 className="text-lg font-bold mb-2">Referral Tracking</h3>
                            <div className="space-y-6 mt-6">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <p className="text-xs opacity-50 mb-1">Invited</p>
                                    <p className="text-xl font-bold">145 people</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <p className="text-xs opacity-50 mb-1">Bonus</p>
                                    <p className="text-xl font-bold">1,465</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Chart Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-black/40 rounded-[30px] p-8 border border-white/5 backdrop-blur-xl">
                            <h3 className="text-lg font-bold">Sales overview</h3>
                            <p className="text-xs text-green-400 mt-1 mb-8">(+5) more in 2021</p>
                            <div className="h-64 flex items-end gap-2">
                                {/* Mock Wave Chart using pure CSS/Tailwind for initial pass */}
                                <div className="w-full h-full bg-gradient-to-t from-blue-600/20 to-transparent relative rounded-b-2xl">
                                    <div className="absolute inset-0 border-b border-white/10 border-dashed" />
                                    <VisionChart type="area" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 rounded-[30px] p-8 border border-white/5 backdrop-blur-xl flex flex-col">
                            <div className="mb-8">
                                <div className="h-48 w-full bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl p-4 overflow-hidden relative">
                                    <VisionChart type="bar" />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Active Users</h3>
                            <p className="text-xs opacity-60">(+23) than last week</p>
                            <div className="grid grid-cols-4 gap-4 mt-8">
                                <div>
                                    <p className="text-xs opacity-40 mb-1">Users</p>
                                    <p className="font-bold">32,984</p>
                                </div>
                                <div>
                                    <p className="text-xs opacity-40 mb-1">Clicks</p>
                                    <p className="font-bold">2.42m</p>
                                </div>
                                <div>
                                    <p className="text-xs opacity-40 mb-1">Sales</p>
                                    <p className="font-bold">2,400$</p>
                                </div>
                                <div>
                                    <p className="text-xs opacity-40 mb-1">Items</p>
                                    <p className="font-bold">320</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Projects Table Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-black/40 rounded-[30px] p-8 border border-white/5 backdrop-blur-xl">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-lg font-bold">Projects</h3>
                                    <p className="text-xs opacity-60">30 done this month</p>
                                </div>
                                <button className="text-white/40 hover:text-white">•••</button>
                            </div>
                            <ProjectTable />
                        </div>

                        <div className="lg:col-span-1 bg-black/40 rounded-[30px] p-8 border border-white/5 backdrop-blur-xl">
                            <h3 className="text-lg font-bold mb-2">Orders overview</h3>
                            <p className="text-xs text-green-400 mb-8">+30% this month</p>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-1 h-32 bg-white/10 rounded-full relative">
                                        <div className="absolute top-0 left-[-4px] w-3 h-3 bg-blue-500 rounded-full border-2 border-[#060010]" />
                                        <div className="absolute top-16 left-[-4px] w-3 h-3 bg-blue-500 rounded-full border-2 border-[#060010]" />
                                    </div>
                                    <div className="space-y-12">
                                        <div>
                                            <p className="text-sm font-bold">$2400, Design changes</p>
                                            <p className="text-xs opacity-40 uppercase">22 DEC 7:20 PM</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">New order #1832412</p>
                                            <p className="text-xs opacity-40 uppercase">21 DEC 11:21 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
