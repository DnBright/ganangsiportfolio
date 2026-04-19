<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Models\CampaignLog;
use App\Services\GeminiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CampaignController extends Controller
{
    protected $gemini;

    public function __construct(GeminiService $gemini)
    {
        $this->gemini = $gemini;
    }

    public function index()
    {
        return response()->json(Campaign::withCount(['logs as success_count' => function ($query) {
            $query->where('status', 'success');
        }, 'logs as failed_count' => function ($query) {
            $query->where('status', 'failed');
        }])->latest()->get());
    }

    public function generateCaptionsPreview(Request $request)
    {
        $request->validate([
            'post_link' => 'required|url',
            'target_category' => 'required|string',
        ]);

        $captions = $this->gemini->generateCaptions($request->post_link, $request->target_category);

        return response()->json([
            'captions' => $captions
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'post_link' => 'required|url',
            'target_category' => 'required|string',
            'target_groups' => 'required|array|min:1',
            'target_groups.*' => 'required|string',
            'daily_limit' => 'required|integer|min:1',
            'sessions_count' => 'required|integer|min:1|max:24',
            'delay_minutes' => 'required|integer|min:1',
            'settings' => 'nullable|array',
        ]);

        $campaign = Campaign::create($validated);

        return response()->json($campaign, 201);
    }

    public function updateStatus(Request $request, Campaign $campaign)
    {
        $request->validate([
            'status' => 'required|in:running,paused,stopped,completed'
        ]);

        $campaign->update(['status' => $request->status]);

        return response()->json($campaign);
    }

    public function getLogs(Campaign $campaign)
    {
        return response()->json($campaign->logs()->latest()->limit(50)->get());
    }

    public function destroy(Campaign $campaign)
    {
        $campaign->delete();
        return response()->json(['message' => 'Campaign deleted successfully']);
    }
}
