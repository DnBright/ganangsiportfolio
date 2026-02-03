<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanyTarget;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CompanyTargetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(CompanyTarget::latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'region' => 'nullable|string|max:255',
            'industry' => 'nullable|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'whatsapp_contact' => 'nullable|string|max:20',
            'social_media' => 'nullable|string|max:255',
            'project_type' => 'nullable|string|max:255',
            'proposal_status' => 'required|string|max:50',
            'proposal_final' => 'nullable|file|mimes:pdf,doc,docx,zip|max:10240', // Max 10MB
            'admin_in_charge' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('proposal_final')) {
            $path = $request->file('proposal_final')->store('proposals/final', 'public');
            $validated['proposal_final'] = Storage::url($path);
        }

        $target = CompanyTarget::create($validated);

        return response()->json($target, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CompanyTarget $companyTarget)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'region' => 'nullable|string|max:255',
            'industry' => 'nullable|string|max:255',
            'contact_person' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'whatsapp_contact' => 'nullable|string|max:20',
            'social_media' => 'nullable|string|max:255',
            'project_type' => 'nullable|string|max:255',
            'proposal_status' => 'required|string|max:50',
            'proposal_final' => 'nullable|file|mimes:pdf,doc,docx,zip|max:10240',
            'admin_in_charge' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('proposal_final')) {
            // Delete old file if exists
            if ($companyTarget->proposal_final) {
                $oldPath = str_replace('/storage/', '', $companyTarget->proposal_final);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('proposal_final')->store('proposals/final', 'public');
            $validated['proposal_final'] = Storage::url($path);
        }

        $companyTarget->update($validated);

        return response()->json($companyTarget);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CompanyTarget $companyTarget)
    {
        if ($companyTarget->proposal_final) {
            $oldPath = str_replace('/storage/', '', $companyTarget->proposal_final);
            Storage::disk('public')->delete($oldPath);
        }

        $companyTarget->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
