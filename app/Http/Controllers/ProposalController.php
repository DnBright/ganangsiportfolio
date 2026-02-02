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

    public function exportPdf(Proposal $proposal)
    {
        try {
            // 1. Diagnosis: Check if class exists
            if (!class_exists('Barryvdh\\DomPDF\\ServiceProvider')) {
                throw new \Exception('Class Barryvdh\DomPDF\ServiceProvider not found. Vendor dependency missing.');
            }

            // 2. Diagnosis: Check if service is bound
            if (!app()->bound('dompdf.wrapper')) {
                // Try manual binding if missing
                if (class_exists('Barryvdh\\DomPDF\\ServiceProvider')) {
                    app()->register('Barryvdh\\DomPDF\\ServiceProvider');
                } else {
                    throw new \Exception('Service dompdf.wrapper not bound and provider missing.');
                }
            }
            
            // 3. Execution
            $pdf = app('dompdf.wrapper');
            $pdf->loadView('proposals.print', compact('proposal'));
            
            $pdf->setPaper('a4', 'portrait');
            $pdf->setOptions([
                'isRemoteEnabled' => true, 
                'isHtml5ParserEnabled' => true,
                'defaultFont' => 'sans-serif'
            ]);

            return $pdf->stream($proposal->client_name . ' - Proposal.pdf');

        } catch (\Throwable $e) {
            Log::error('PDF Export Critical Error: ' . $e->getMessage());
            Log::error($e->getTraceAsString());
            
            return response()->json([
                'status' => 'critical_error',
                'message' => 'Gagal membuat PDF. Server Error.',
                'debug_info' => [
                    'message' => $e->getMessage(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'provider_exists' => class_exists('Barryvdh\\DomPDF\\ServiceProvider'),
                    'vendor_path' => base_path('vendor/barryvdh/laravel-dompdf'),
                    'is_vendor_dir_exist' => is_dir(base_path('vendor/barryvdh/laravel-dompdf'))
                ]
            ], 200); // Return 200 to ensure user sees the JSON, not a browser 500 page
        }
    }

    public function destroy(Proposal $proposal)
    {
        $proposal->delete();

        return response()->json([
            'message' => 'Proposal deleted successfully'
        ]);
    }
}
