<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\CompanyTarget;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('executed_at', 'desc')->get();
        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_target_id' => 'required|exists:company_targets,id',
            'proposal_file' => 'nullable|file|mimes:pdf|max:10240',
            'screenshot_file' => 'nullable|file|mimes:jpg,jpeg,png|max:5120',
            'execution_notes' => 'nullable|string',
        ]);

        // Get the company target data
        $companyTarget = CompanyTarget::findOrFail($validated['company_target_id']);

        // Handle file uploads
        $proposalPath = null;
        $screenshotPath = null;

        if ($request->hasFile('proposal_file')) {
            $proposalPath = $request->file('proposal_file')->store('projects/proposals', 'public');
        }

        if ($request->hasFile('screenshot_file')) {
            $screenshotPath = $request->file('screenshot_file')->store('projects/screenshots', 'public');
        }

        // Create project from company target data
        $project = Project::create([
            'company_name' => $companyTarget->company_name,
            'region' => $companyTarget->region,
            'industry' => $companyTarget->industry,
            'contact_person' => $companyTarget->contact_person,
            'email' => $companyTarget->email,
            'whatsapp_contact' => $companyTarget->whatsapp_contact,
            'social_media' => $companyTarget->social_media,
            'project_type' => $companyTarget->project_type,
            'proposal_file' => $proposalPath ? Storage::url($proposalPath) : null,
            'screenshot_file' => $screenshotPath ? Storage::url($screenshotPath) : null,
            'execution_notes' => $validated['execution_notes'] ?? null,
            'executed_at' => now(),
            'project_status' => 'In Progress',
            'admin_in_charge' => $companyTarget->admin_in_charge,
            'company_target_id' => $companyTarget->id,
        ]);

        // Delete the company target after moving to projects
        $companyTarget->delete();

        // Log to Productivity System
        $this->logToProductivity($companyTarget->admin_in_charge, $companyTarget->company_name);

        return response()->json([
            'message' => 'Project created successfully and company target removed',
            'project' => $project
        ], 201);
    }

    /**
     * Log project execution to productivity system
     */
    private function logToProductivity($adminName, $companyName)
    {
        try {
            $today = now()->format('Y-m-d');
            
            // Check if there's already a log for today
            $log = \App\Models\ProductivityLog::firstOrCreate(
                [
                    'admin_name' => $adminName,
                    'log_date' => $today
                ],
                [
                    'focus_of_day' => '',
                    'blockers' => '',
                    'next_day_plan' => ''
                ]
            );

            // Append project execution to focus_of_day
            $currentFocus = $log->focus_of_day ?? '';
            $newEntry = "✅ Project Executed: {$companyName}";
            
            if (empty($currentFocus)) {
                $updatedFocus = $newEntry;
            } else {
                $updatedFocus = $currentFocus . "\n" . $newEntry;
            }

            $log->update(['focus_of_day' => $updatedFocus]);
        } catch (\Exception $e) {
            // Silent fail - don't break project creation if logging fails
            \Log::error('Failed to log to productivity: ' . $e->getMessage());
        }
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'project_status' => 'nullable|string',
            'execution_notes' => 'nullable|string',
        ]);

        $project->update($validated);

        return response()->json([
            'message' => 'Project updated successfully',
            'project' => $project
        ]);
    }

    public function destroy(Project $project)
    {
        // Delete associated files
        if ($project->proposal_file) {
            $path = str_replace('/storage/', '', $project->proposal_file);
            Storage::disk('public')->delete($path);
        }

        if ($project->screenshot_file) {
            $path = str_replace('/storage/', '', $project->screenshot_file);
            Storage::disk('public')->delete($path);
        }

        $project->delete();

        return response()->json(['message' => 'Project deleted successfully']);
    }
}
