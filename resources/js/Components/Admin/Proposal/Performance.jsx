import React, { useState } from 'react';
import VisionChart from '../Charts/VisionChart';

const Performance = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [performanceInsight, setPerformanceInsight] = useState(null);

    const stats = {
        today: 2,
        target: 3,
        totalMonth: 42,
        avgTime: '45m',
        winRate: '68%'
    };

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setPerformanceInsight({
                status: 'On Track',
                bottleneck: 'Tahap Manual Refinement (Editor) memakan waktu 60% dari total proses.',
                tip: 'Gunakan fitur "Duplicate" dari library untuk klien LPK agar fase Draft AI bisa langsung fokus pada penyesuaian harga.'
            });
            setIsAnalyzing(false);
        }, 2500);
    };

    return (
        <div className="space-y-6 animate-fade-up animate-duration-500 pb-10">
            {/* Header Content */}
            <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 overflow-hidden relative group">
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full group-hover:bg-indigo-500/15 transition-all duration-700" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-indigo-600/20">
                            📈
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Performance Analytics</h2>
                            <p className="text-xs text-white/40">Monitor disiplin dan efisiensi pengerjaan proposal DNB Agency.</p>
                        </div>
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-bold transition-all shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center gap-2"
                    >
                        {isAnalyzing ? (
                            <>
                                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <><span>🧐</span> Analyze Performance</>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Target Tracker Card */}
                <div className="lg:col-span-12 xl:col-span-4 h-full">
                    <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 h-full flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 text-4xl opacity-10 group-hover:opacity-20 transition-opacity">🎯</div>
                        <div>
                            <h3 className="text-sm font-bold mb-1">Daily Discipline</h3>
                            <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Target: 3 Proposal / Day</p>
                        </div>

                        <div className="my-10 text-center">
                            <div className="inline-flex items-baseline gap-1">
                                <span className="text-6xl font-black text-white">{stats.today}</span>
                                <span className="text-xl text-white/20">/ {stats.target}</span>
                            </div>
                            <p className="text-xs text-indigo-400 font-bold mt-2">
                                {stats.today >= stats.target ? 'Target Achieved! 🔥' : `${stats.target - stats.today} More to Reach Target`}
                            </p>
                        </div>

                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full transition-all duration-1000"
                                style={{ width: `${(stats.today / stats.target) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* AI Analyst Insight Area */}
                <div className="lg:col-span-12 xl:col-span-8">
                    <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 h-full min-h-[300px]">
                        {performanceInsight ? (
                            <div className="animate-fade space-y-8">
                                <div className="flex items-center gap-4">
                                    <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                                        Status: {performanceInsight.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest">Bottleneck Identified</h4>
                                        <p className="text-sm text-white/80 leading-relaxed font-medium">
                                            {performanceInsight.bottleneck}
                                        </p>
                                    </div>
                                    <div className="space-y-3 p-6 bg-indigo-500/5 border border-indigo-500/10 rounded-3xl">
                                        <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Practical Efficiency Tip</h4>
                                        <p className="text-sm text-white leading-relaxed font-bold">
                                            "{performanceInsight.tip}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center py-10 opacity-40">
                                <div className="text-4xl mb-4">🔎</div>
                                <h3 className="text-sm font-bold">Ready for Analysis</h3>
                                <p className="text-xs max-w-xs mx-auto mt-2">Klik tombol di atas untuk melihat evaluasi disiplin dan saran efisiensi proses Anda.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Secondary Stats Row */}
                <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: 'Total Proposals', value: stats.totalMonth, sub: 'This Month', icon: '📝' },
                        { label: 'Avg Generation Time', value: stats.avgTime, sub: 'Per Document', icon: '⚡' },
                        { label: 'Conversion Rate', value: stats.winRate, sub: 'from Sent to Deal', icon: '💎' },
                    ].map((item, i) => (
                        <div key={i} className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 flex items-center justify-between group hover:bg-white/5 transition-all">
                            <div>
                                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-1">{item.label}</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-black">{item.value}</span>
                                    <span className="text-[10px] text-white/40 font-bold">{item.sub}</span>
                                </div>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Performance;
