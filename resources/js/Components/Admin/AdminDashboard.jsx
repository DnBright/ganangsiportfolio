import React, { useState, useEffect } from 'react';
import VisionSidebar from './VisionSidebar';
import StatCard from './StatCard';
import VisionChart from './Charts/VisionChart';
import ProjectTable from './ProjectTable';
import WelcomeCard from './WelcomeCard';
import SatisfactionGauge from './SatisfactionGauge';
import ReferralTracking from './ReferralTracking';
import ActiveUsersChart from './ActiveUsersChart';
import ProposalCreator from './Proposal/ProposalCreator';
import DraftAI from './Proposal/DraftAI';
import ProposalEditorComponent from './Proposal/ProposalEditor';
import ProposalLibrary from './Proposal/ProposalLibrary';
import TemplatesPrompt from './Proposal/TemplatesPrompt';
import Performance from './Proposal/Performance';
import axios from 'axios'; // Added axios import

const AdminDashboard = ({ stats = {} }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [currentProposal, setCurrentProposal] = useState(null);
    const [draftResult, setDraftResult] = useState({
        title: '',
        executive_summary: '',
        problem_analysis: '',
        project_objectives: '',
        solutions: '',
        scope_of_work: '',
        system_walkthrough: '',
        timeline: '',
        investment: '',
        roi_impact: '',
        value_add: '',
        closing_cta: ''
    });
    const [proposals, setProposals] = useState([]); // Changed to empty array
    const [savedTemplates, setSavedTemplates] = useState([
        { id: 1, name: 'Standard LPK Template', industry: 'LPK', date: '2026-01-10', quality: 'High' },
        { id: 2, name: 'Creative Agency Pitch', industry: 'Startup', date: '2026-01-12', quality: 'Balanced' },
        { id: 3, name: 'Corporate Profile v2', industry: 'Manufacturing', date: '2026-01-20', quality: 'Professional' },
    ]);

    const fetchProposals = async () => {
        try {
            const response = await axios.get('/proposals');
            setProposals(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching proposals:', error);
            setProposals([]);
        }
    };

    useEffect(() => {
        console.log('AdminDashboard: currentProposal updated:', currentProposal);
    }, [currentProposal]);

    useEffect(() => {
        fetchProposals();
    }, []);

    const handleAddProposal = async (finalData) => {
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;

            const newProposalData = {
                client_name: currentProposal?.client_name || 'Unnamed Client',
                industry: currentProposal?.industry || 'General',
                target_website: currentProposal?.target_website || '',
                problem_statement: currentProposal?.problem_statement || currentProposal?.client_problem || '',
                title: finalData.title || draftResult.title,
                executive_summary: finalData.executive_summary || draftResult.executive_summary,
                problem_analysis: finalData.problem_analysis || draftResult.problem_analysis,
                project_objectives: finalData.project_objectives || draftResult.project_objectives,
                solutions: finalData.solutions || draftResult.solutions,
                scope_of_work: finalData.scope_of_work || draftResult.scope_of_work,
                system_walkthrough: finalData.system_walkthrough || draftResult.system_walkthrough,
                timeline: finalData.timeline || draftResult.timeline,
                investment: finalData.investment || draftResult.investment,
                roi_impact: finalData.roi_impact || draftResult.roi_impact,
                value_add: finalData.value_add || draftResult.value_add,
                closing_cta: finalData.closing_cta || draftResult.closing_cta,
                pricing: finalData.pricing || '-',
                status: 'Approved'
            };

            if (currentProposal?.id) {
                // Update existing
                await axios.patch(`/proposals/${currentProposal.id}`, newProposalData, {
                    headers: { 'X-CSRF-TOKEN': csrfToken }
                });
            } else {
                // Create new
                await axios.post('/proposals', newProposalData, {
                    headers: { 'X-CSRF-TOKEN': csrfToken }
                });
            }

            fetchProposals();
            setActiveTab('proposal_library');
        } catch (error) {
            console.error('Error saving proposal:', error.response?.data || error.message);
            const errorMsg = error.response?.data?.message || 'Failed to save proposal to database. Please check console for details.';
            alert(errorMsg);
        }
    };

    const handleDeleteProposal = async (id) => {
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
            await axios.delete(`/proposals/${id}`, {
                headers: { 'X-CSRF-TOKEN': csrfToken }
            });
            fetchProposals();
        } catch (error) {
            console.error('Error deleting proposal:', error);
            alert('Gagal menghapus proposal.');
        }
    };

    const handleEditProposal = (proposal) => {
        setCurrentProposal(proposal);
        setDraftResult({
            title: proposal.title,
            executive_summary: proposal.executive_summary,
            problem_analysis: proposal.problem_analysis,
            project_objectives: proposal.project_objectives,
            solutions: proposal.solutions,
            scope_of_work: proposal.scope_of_work,
            system_walkthrough: proposal.system_walkthrough,
            timeline: proposal.timeline,
            investment: proposal.investment,
            roi_impact: proposal.roi_impact,
            value_add: proposal.value_add,
            closing_cta: proposal.closing_cta,
            pricing: proposal.pricing
        });
        setActiveTab('editor_proposal');
    };

    const handleDuplicateProposal = (proposal) => {
        // Strip out IDs and dates for duplication
        const duplicateData = {
            ...proposal,
            client_name: `${proposal.client_name} (Copy)`,
            id: null,
            created_at: null,
            updated_at: null
        };

        setCurrentProposal(duplicateData);
        setDraftResult({
            title: proposal.title,
            executive_summary: proposal.executive_summary,
            problem_analysis: proposal.problem_analysis,
            project_objectives: proposal.project_objectives,
            solutions: proposal.solutions,
            scope_of_work: proposal.scope_of_work,
            system_walkthrough: proposal.system_walkthrough,
            timeline: proposal.timeline,
            investment: proposal.investment,
            roi_impact: proposal.roi_impact,
            value_add: proposal.value_add,
            closing_cta: proposal.closing_cta,
            pricing: proposal.pricing
        });
        setActiveTab('editor_proposal');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'create_proposal':
                return (
                    <ProposalCreator
                        onSubmit={(data) => {
                            console.log('Proposal Form Data:', data);
                            setCurrentProposal(data);
                            setActiveTab('draft_ai');
                        }}
                    />
                );
            case 'draft_ai':
                return (
                    <DraftAI
                        key={currentProposal?.client_name || 'ai_draft'}
                        analysisData={currentProposal || {}}
                        onBack={() => setActiveTab('create_proposal')}
                        onNext={(draft) => {
                            console.log('AI Draft Result Received:', draft);
                            setDraftResult(draft || {
                                title: 'Untitled',
                                executive_summary: '',
                                problem_analysis: '',
                                project_objectives: '',
                                solutions: '',
                                scope_of_work: '',
                                system_walkthrough: '',
                                timeline: '',
                                investment: '',
                                roi_impact: '',
                                value_add: '',
                                closing_cta: ''
                            });
                            setActiveTab('editor_proposal');
                        }}
                    />
                );
            case 'editor_proposal':
                return (
                    <ProposalEditorComponent
                        draftContent={draftResult}
                        onBack={() => setActiveTab('draft_ai')}
                        onSave={handleAddProposal}
                    />
                );
            case 'proposal_library':
                return (
                    <ProposalLibrary
                        proposals={proposals}
                        onEdit={handleEditProposal}
                        onDuplicate={handleDuplicateProposal}
                        onDelete={handleDeleteProposal}
                    />
                );
            case 'templates_prompt':
                return (
                    <TemplatesPrompt
                        savedTemplates={savedTemplates}
                        onSaveTemplate={(newT) => setSavedTemplates([newT, ...savedTemplates])}
                    />
                );
            case 'performance':
                return <Performance proposals={proposals} />;
            case 'dashboard':
            default:
                return (
                    <>
                        {/* Stats Row (4 columns) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard title="Total Leads" value={stats.totalLeads || 0} growth={stats.newLeads > 0 ? `+${stats.newLeads}` : "0"} icon="money" />
                            <StatCard title="New Leads" value={stats.newLeads || 0} growth="+100%" icon="users" />
                            <StatCard title="Total Portfolios" value={stats.totalPortfolios || 0} growth="" icon="clients" />
                            <StatCard title="Featured Portfolios" value={stats.featuredPortfolios || 0} growth="" icon="sales" />
                        </div>

                        {/* Middle Row (Welcome, Satisfaction, Referral) - 3 columns */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                            <div className="lg:col-span-5">
                                <WelcomeCard name={stats.userName || "Admin"} />
                            </div>
                            <div className="lg:col-span-3">
                                <SatisfactionGauge percentage={95} />
                            </div>
                            <div className="lg:col-span-4">
                                <ReferralTracking />
                            </div>
                        </div>

                        {/* Charts Row - 2 columns */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            <div className="lg:col-span-7 bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-6">
                                <div className="mb-0">
                                    <h3 className="text-sm font-bold mb-1">Sales overview</h3>
                                    <p className="text-xs text-green-400 font-bold mb-8">(+5) more <span className="text-white/40 font-normal">in 2021</span></p>
                                </div>
                                <div className="h-[280px]">
                                    <VisionChart type="area" />
                                </div>
                            </div>
                            <div className="lg:col-span-5 h-full">
                                <ActiveUsersChart />
                            </div>
                        </div>

                        {/* Bottom Row - Projects & Orders */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6">
                            <div className="lg:col-span-8 bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-6">
                                <div className="flex justify-between items-center mb-6 px-1">
                                    <div>
                                        <h3 className="text-sm font-bold mb-1">Projects</h3>
                                        <p className="text-xs text-white/50 flex items-center gap-1">
                                            <span className="text-green-500 font-bold">✔</span> 30 done <span className="text-white/30 lowercase">this month</span>
                                        </p>
                                    </div>
                                    <span className="bg-[#1b2252]/60 p-2 rounded-xl text-[10px] cursor-pointer hover:bg-white/10">⋮</span>
                                </div>
                                <div className="overflow-x-auto">
                                    <ProjectTable />
                                </div>
                            </div>

                            <div className="lg:col-span-4 bg-[#0f1535]/60 backdrop-blur-xl border border-white/10 rounded-[30px] p-6">
                                <div className="mb-8 px-1">
                                    <h3 className="text-sm font-bold mb-1">Orders overview</h3>
                                    <p className="text-xs text-green-400 font-bold mb-0">+30% <span className="text-white/40 font-normal">this month</span></p>
                                </div>
                                <div className="space-y-8 pl-2">
                                    {[
                                        { title: '$2400, Design changes', time: '22 DEC 7:20 PM', color: 'bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]' },
                                        { title: 'New order #1832412', time: '21 DEC 11:21 PM', color: 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' },
                                        { title: 'Server Payments for April', time: '21 DEC 9:28 PM', color: 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' },
                                        { title: 'New card added for order #4395133', time: '20 DEC 3:52 PM', color: 'bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.5)]' },
                                        { title: 'Unlock packages for development', time: '19 DEC 11:35 PM', color: 'bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]' },
                                        { title: 'New order #9851213', time: '18 DEC 4:41 PM', color: 'bg-[#1b2252]' },
                                    ].map((order, i) => (
                                        <div key={i} className="flex gap-4 relative">
                                            {i < 5 && <div className="w-[2px] h-full bg-white/10 absolute left-[5px] top-6" />}
                                            <div className={`w-2.5 h-2.5 rounded-full ${order.color} mt-1 relative z-10`} />
                                            <div>
                                                <p className="text-xs font-bold leading-tight tracking-tight">{order.title}</p>
                                                <p className="text-[10px] text-white/40 mt-1 font-bold">{order.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="min-h-screen bg-[#060b26] text-white p-6 font-sans antialiased overflow-x-hidden selection:bg-blue-500/30">
            {/* Background Glows (Matching Design) */}
            <div className="fixed top-[-10%] left-[-5%] w-[60%] h-[60%] bg-[#2d5cfe]/10 blur-[120px] rounded-full pointer-events-none z-0" />
            <div className="fixed bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-[#01c0c8]/5 blur-[100px] rounded-full pointer-events-none z-0" />

            <div className="flex gap-6 relative z-10 max-w-[1600px] mx-auto">
                {/* Sidebar */}
                <div className="hidden xl:block w-64 shrink-0 no-print">
                    <VisionSidebar activeTab={activeTab} onNavigate={(id) => setActiveTab(id)} />
                </div>

                {/* Main Dynamic Content Area */}
                <div className="flex-1 space-y-6 min-h-[600px]">
                    {/* Top Bar / Breadcrumb */}
                    <div className="flex justify-between items-center px-2 no-print">
                        <div className="space-y-1">
                            <p className="text-[10px] text-white/40 font-medium tracking-wider uppercase">Pages / {activeTab === 'dashboard' ? 'Dashboard' : 'Proposal'}</p>
                            <h1 className="text-sm font-bold tracking-tight capitalize">{activeTab.replace('_', ' ')}</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-[#0f1535]/80 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2.5 flex items-center gap-2">
                                <span className="text-white/40 text-xs">🔍</span>
                                <input type="text" placeholder="Type here..." className="bg-transparent border-none outline-none text-xs w-32 placeholder:text-white/20" />
                            </div>
                            <div className="flex items-center gap-4 text-xs font-bold text-white/70">
                                <span className="cursor-pointer hover:text-white transition-colors">⚙️</span>
                                <span className="cursor-pointer hover:text-white transition-colors">🔔</span>
                            </div>
                        </div>
                    </div>

                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
