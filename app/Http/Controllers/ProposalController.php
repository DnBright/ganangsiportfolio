<?php

namespace App\Http\Controllers;

use App\Models\Proposal;
use Illuminate\Http\Request;

class ProposalController extends Controller
{
    public function index()
    {
        return response()->json(Proposal::latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'industry' => 'nullable|string|max:255',
            'target_website' => 'nullable|string|max:255',
            'problem_statement' => 'nullable|string',
            'proposal_content' => 'nullable|string',
            'pricing' => 'nullable|string|max:255',
            'status' => 'nullable|string|in:Draft,Sent,Approved,Rejected',
        ]);

        $proposal = Proposal::create($validated);

        return response()->json([
            'message' => 'Proposal saved successfully',
            'proposal' => $proposal
        ]);
    }

    public function update(Request $request, Proposal $proposal)
    {
        $validated = $request->validate([
            'client_name' => 'sometimes|required|string|max:255',
            'industry' => 'nullable|string|max:255',
            'target_website' => 'nullable|string|max:255',
            'problem_statement' => 'nullable|string',
            'proposal_content' => 'nullable|string',
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
