import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminDashboard from '../AdminDashboard';

const ProductivityCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [calendarData, setCalendarData] = useState({});
    const [admins, setAdmins] = useState([]);
    const [monthStats, setMonthStats] = useState({});
    const [loading, setLoading] = useState(true);

    // Modal State
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dailyDetails, setDailyDetails] = useState(null);
    const [selectedAdminTab, setSelectedAdminTab] = useState('');

    // Log Form State
    const [logForm, setLogForm] = useState({
        focus_of_day: '',
        blockers: '',
        next_day_plan: ''
    });

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const fetchCalendarData = async () => {
        setLoading(true);
        try {
            // Check if we are fetching for the correct month (local time consideration)
            // Using ISO string YYYY-MM
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');

            const response = await axios.get(`/productivity/data?month=${year}-${month}`);
            setCalendarData(response.data.calendar);
            setAdmins(response.data.admins);
            setMonthStats(response.data.month_stats);
            if (response.data.admins.length > 0 && !selectedAdminTab) {
                setSelectedAdminTab(response.data.admins[0]);
            }
        } catch (error) {
            console.error("Error fetching calendar data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCalendarData();
    }, [currentDate]);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay(); // 0 = Sunday
    };

    const handleDateClick = async (day, fullDateStr) => {
        setSelectedDate(fullDateStr);
        setDailyDetails(null); // Clear previous details
        setIsModalOpen(true);

        // Populate form if log exists for current selected admin
        updateLogForm(fullDateStr, selectedAdminTab);

        try {
            const response = await axios.get(`/productivity/details?date=${fullDateStr}`);
            setDailyDetails(response.data);
        } catch (error) {
            console.error("Error fetching daily details:", error);
        }
    };

    const updateLogForm = (dateStr, adminName) => {
        if (calendarData[dateStr] && calendarData[dateStr][adminName] && calendarData[dateStr][adminName].log) {
            const log = calendarData[dateStr][adminName].log;
            setLogForm({
                focus_of_day: log.focus_of_day || '',
                blockers: log.blockers || '',
                next_day_plan: log.next_day_plan || ''
            });
        } else {
            setLogForm({
                focus_of_day: '',
                blockers: '',
                next_day_plan: ''
            });
        }
    };

    const handleAdminTabChange = (admin) => {
        setSelectedAdminTab(admin);
        if (selectedDate) {
            updateLogForm(selectedDate, admin);
        }
    };

    const handleLogSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/productivity/log', {
                admin_name: selectedAdminTab,
                log_date: selectedDate,
                ...logForm
            });
            // Refresh data to update local state (or optimistic update)
            fetchCalendarData();
            alert('Daily Log Saved!');
        } catch (error) {
            console.error("Error saving log:", error);
            alert('Failed to save log.');
        }
    };

    // --- Render Helpers ---

    const renderCalendarGrid = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);

        const blanks = [];
        for (let i = 0; i < firstDay; i++) {
            blanks.push(<div key={`blank-${i}`} className="h-32 bg-white/5 rounded-xl opacity-30"></div>);
        }

        const days = [];
        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const dataForDay = calendarData[dateStr] || {};

            days.push(
                <div
                    key={d}
                    onClick={() => handleDateClick(d, dateStr)}
                    className="h-32 bg-[#0f1535] border border-white/10 rounded-xl p-2 hover:border-blue-500/50 cursor-pointer transition-all flex flex-col justify-between overflow-hidden relative group"
                >
                    <span className="text-white/40 font-bold text-sm">{d}</span>

                    <div className="flex flex-col gap-1 mt-1">
                        {admins.map(admin => {
                            const adminData = dataForDay[admin];
                            const count = adminData ? adminData.count : 0;
                            const hasLog = adminData && adminData.log;
                            const isMet = count >= 6;

                            // Color logic: Green if met, Yellow if progress, Red/Gray if 0
                            let colorClass = 'bg-white/10';
                            if (count >= 6) colorClass = 'bg-green-500';
                            else if (count > 0) colorClass = 'bg-yellow-500';
                            else if (hasLog) colorClass = 'bg-blue-400'; // Has log but no proposals? maybe planning day

                            return (
                                <div key={admin} className="flex items-center gap-1 text-[10px]">
                                    <div className={`h-1.5 w-1.5 rounded-full ${colorClass}`}></div>
                                    <span className="text-white/60 truncate w-12">{admin}</span>
                                    <span className={`ml-auto font-mono ${isMet ? 'text-green-400 font-bold' : 'text-white/40'}`}>
                                        {count}/6
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    {/* Hover Effect overlay */}
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
            );
        }

        return [...blanks, ...days];
    };

    return (
        <div className="space-y-6">

            {/* Header & Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Calendar Controls */}
                <div className="lg:col-span-3 bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">
                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </h2>
                        <div className="flex gap-2">
                            <button onClick={handlePrevMonth} className="p-2 px-4 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors">← Prev</button>
                            <button onClick={handleNextMonth} className="p-2 px-4 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors">Next →</button>
                        </div>
                    </div>

                    {/* Calendar Grid Header */}
                    <div className="grid grid-cols-7 gap-4 mb-2 text-center">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="text-white/30 text-xs font-bold uppercase tracking-wider">{day}</div>
                        ))}
                    </div>

                    {/* Calendar Grid Body */}
                    <div className="grid grid-cols-7 gap-4">
                        {loading ? (
                            <div className="col-span-7 h-64 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                            </div>
                        ) : renderCalendarGrid()}
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Monthly Summary</h3>
                        <div className="space-y-4">
                            {admins.map(admin => {
                                const stats = monthStats[admin] || { total_proposals: 0, target_days_met: 0 };
                                const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
                                // Just a rough calculation for working days or just total days
                                const consistency = Math.round((stats.target_days_met / daysInMonth) * 100);

                                return (
                                    <div key={admin} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-white">{admin}</span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${consistency >= 80 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                {consistency}% Reliability
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm text-white/60 mb-1">
                                            <span>Total Proposals</span>
                                            <span className="text-white font-mono">{stats.total_proposals}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-white/60">
                                            <span>Days Target Met (6+)</span>
                                            <span className="text-white font-mono">{stats.target_days_met}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="bg-blue-600/20 backdrop-blur-xl border border-blue-500/30 rounded-[30px] p-6 text-center">
                        <h3 className="text-white font-bold mb-2">Daily Goal 🎯</h3>
                        <p className="text-blue-200 text-sm">Target: 6 Proposals / Person / Day</p>
                        <p className="text-white/40 text-xs mt-4">"Consistency is the key to success."</p>
                    </div>
                </div>
            </div>

            {/* Daily Detail Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#1a2042] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">

                        {/* Modal Header */}
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0f1535]">
                            <div>
                                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                    📅 {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </h3>
                                <p className="text-white/50 text-sm">Daily Performance & Logs</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white text-2xl">×</button>
                        </div>

                        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                            {/* Left: Admin Tabs & Proposal List */}
                            <div className="w-full md:w-1/2 border-r border-white/10 flex flex-col">
                                <div className="flex border-b border-white/10 bg-[#0f1535]/50">
                                    {admins.map(admin => (
                                        <button
                                            key={admin}
                                            onClick={() => handleAdminTabChange(admin)}
                                            className={`flex-1 py-4 text-sm font-bold transition-colors ${selectedAdminTab === admin ? 'bg-[#1a2042] text-blue-400 border-b-2 border-blue-400' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                                        >
                                            {admin}
                                        </button>
                                    ))}
                                </div>

                                <div className="p-6 flex-1 overflow-y-auto">
                                    <h4 className="text-white/60 text-xs uppercase font-bold tracking-wider mb-4">
                                        Proposals Created ({dailyDetails && dailyDetails[selectedAdminTab] ? dailyDetails[selectedAdminTab].length : 0})
                                    </h4>

                                    <div className="space-y-3">
                                        {dailyDetails && dailyDetails[selectedAdminTab] && dailyDetails[selectedAdminTab].length > 0 ? (
                                            dailyDetails[selectedAdminTab].map(prop => (
                                                <div key={prop.id} className="bg-white/5 p-3 rounded-lg border border-white/5">
                                                    <div className="font-bold text-white text-sm">{prop.company_name}</div>
                                                    <div className="flex justify-between text-xs text-white/50 mt-1">
                                                        <span>{prop.industry}</span>
                                                        <span className={prop.proposal_status === 'Approved' ? 'text-green-400' : ''}>{prop.proposal_status}</span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center text-white/20 italic py-10">
                                                No proposals recorded for this admin on this day.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Daily Note Form */}
                            <div className="w-full md:w-1/2 bg-[#0f1535]/30 p-6 overflow-y-auto">
                                <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                                    📝 Daily Log: <span className="text-blue-400">{selectedAdminTab}</span>
                                </h4>

                                <form onSubmit={handleLogSubmit} className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-sm text-white/60 font-medium">🎯 Focus of the Day</label>
                                        <textarea
                                            value={logForm.focus_of_day}
                                            onChange={(e) => setLogForm({ ...logForm, focus_of_day: e.target.value })}
                                            className="w-full h-20 bg-[#0f1535] border border-white/10 rounded-xl p-3 text-white text-sm focus:border-blue-500 outline-none resize-none"
                                            placeholder="What was the main priority?"
                                        ></textarea>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm text-white/60 font-medium">🚧 Blockers / Challenges</label>
                                        <textarea
                                            value={logForm.blockers}
                                            onChange={(e) => setLogForm({ ...logForm, blockers: e.target.value })}
                                            className="w-full h-20 bg-[#0f1535] border border-white/10 rounded-xl p-3 text-white text-sm focus:border-red-500/50 outline-none resize-none"
                                            placeholder="Any issues faced?"
                                        ></textarea>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm text-white/60 font-medium">🚀 Next Day Plan</label>
                                        <textarea
                                            value={logForm.next_day_plan}
                                            onChange={(e) => setLogForm({ ...logForm, next_day_plan: e.target.value })}
                                            className="w-full h-20 bg-[#0f1535] border border-white/10 rounded-xl p-3 text-white text-sm focus:border-green-500/50 outline-none resize-none"
                                            placeholder="Action plan for tomorrow..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95"
                                    >
                                        Save Daily Log
                                    </button>
                                </form>

                                <div className="mt-6 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                                    <p className="text-xs text-yellow-200/70">
                                        ℹ️ Note: This log is shared with the team lead for evaluation. Be honest about your progress and blockers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductivityCalendar;
