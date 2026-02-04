<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\AnalyticsStat;

class AnalyticsController extends Controller
{
    /**
     * Increment a specific analytics key.
     */
    public function increment(Request $request)
    {
        $validated = $request->validate([
            'key' => 'required|string|max:255',
        ]);

        $stat = AnalyticsStat::firstOrCreate(
            ['key' => $validated['key']],
            ['value' => 0]
        );

        $stat->increment('value');

        return response()->json([
            'status' => 'success',
            'key' => $stat->key,
            'value' => $stat->value
        ]);
    }

    /**
     * Get all analytics statistics.
     */
    public function getStats()
    {
        $stats = AnalyticsStat::all()->pluck('value', 'key');
        
        return response()->json($stats);
    }
}
