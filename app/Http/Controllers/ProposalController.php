<?php

namespace App\Http\Controllers;

use App\Models\Proposal;
use App\Services\GeminiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProposalController extends Controller
{
    protected $gemini;

    public function __construct(GeminiService $gemini)
    {
        $this->gemini = $gemini;
    }

    public function index()
    {
        return response()->json(Proposal::latest()->get());
    }

    public function generateDraft(Request $request)
    {
        Log::info('--- PROPOSAL GENERATION START ---');
        Log::info('Full Request:', $request->all());
        Log::info('Client Name:', [$request->input('client_name')]);
        
        $clientName = $request->input('client_name') ?: $request->input('clientName') ?: 'Klien';
        
        $data = [
            'client_name' => $clientName,
            'industry' => $request->input('industry', 'General'),
            'target_website' => $request->input('target_website', ''),
            'problem_statement' => $request->input('client_problem', $request->input('problem_statement', 'Standard business optimization')),
            'project_type' => $request->input('project_type', 'Website Bisnis'),
            'total_value' => $request->input('total_value', 0),
            'contract_duration' => $request->input('contract_duration', 6),
            'project_scale' => $request->input('project_scale', 'medium'),
            'deadline' => $request->input('deadline', '14 Hari'),
        ];

        $draft = $this->gemini->generateProposal($data);
        Log::info('Draft generated keys:', is_array($draft) ? array_keys($draft) : ['not an array']);
        if (isset($draft['executive_summary'])) {
             Log::info('Executive Summary Preview:', [substr($draft['executive_summary'], 0, 100)]);
        }

        return response()->json([
            'draft' => $draft
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'client_name' => 'required|string|max:255',
                'industry' => 'nullable|string|max:255',
                'target_website' => 'nullable|string|max:255',
                'problem_statement' => 'nullable|string',
                'title' => 'nullable|string|max:255',
                'executive_summary' => 'nullable|string',
                'problem_analysis' => 'nullable|string',
                'project_objectives' => 'nullable|string',
                'solutions' => 'nullable|string',
                'scope_of_work' => 'nullable|string',
                'system_walkthrough' => 'nullable|string',
                'timeline' => 'nullable|string',
                'roi_impact' => 'nullable|string',
                'value_add' => 'nullable|string',
                'closing_cta' => 'nullable|string',
                'pricing' => 'nullable|string|max:255',
                'status' => 'nullable|string|in:Draft,Sent,Approved,Rejected',
            ]);

            $proposal = Proposal::create($validated);

            return response()->json([
                'message' => 'Proposal saved successfully',
                'proposal' => $proposal
            ]);
        } catch (\Exception $e) {
            Log::error('Proposal Store Failure: ' . $e->getMessage(), [
                'request' => $request->all()
            ]);
            
            return response()->json([
                'message' => 'Gagal menyimpan ke database: ' . $e->getMessage(),
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, Proposal $proposal)
    {
        $validated = $request->validate([
            'client_name' => 'sometimes|required|string|max:255',
            'industry' => 'nullable|string|max:255',
            'target_website' => 'nullable|string|max:255',
            'problem_statement' => 'nullable|string',
            'title' => 'nullable|string|max:255',
            'executive_summary' => 'nullable|string',
            'problem_analysis' => 'nullable|string',
            'project_objectives' => 'nullable|string',
            'solutions' => 'nullable|string',
            'scope_of_work' => 'nullable|string',
            'system_walkthrough' => 'nullable|string',
            'timeline' => 'nullable|string',
            'roi_impact' => 'nullable|string',
            'value_add' => 'nullable|string',
            'closing_cta' => 'nullable|string',
            'pricing' => 'nullable|string|max:255',
            'status' => 'nullable|string|in:Draft,Sent,Approved,Rejected',
        ]);

        $proposal->update($validated);

        return response()->json([
            'message' => 'Proposal updated successfully',
            'proposal' => $proposal
        ]);
    }

    public function destroy(Proposal $proposal)
    {
        $proposal->delete();

        return response()->json([
            'message' => 'Proposal deleted successfully'
        ]);
    }
}
