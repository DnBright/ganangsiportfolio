<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\AnalyticsStat;
use App\Models\AnalyticsLog;

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

        // Update persistent counter
        $stat = AnalyticsStat::firstOrCreate(
            ['key' => $validated['key']],
            ['value' => 0]
        );
        $stat->increment('value');

        // Create timestamped log
        AnalyticsLog::create(['key' => $validated['key']]);

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

    /**
     * Get yearly statistics grouped by month.
     */
    public function getYearlyStats(Request $request)
    {
        $year = $request->query('year', date('Y'));
        
        $logs = AnalyticsLog::whereYear('created_at', $year)
            ->selectRaw('strftime("%m", created_at) as month, key, count(*) as total')
            ->groupBy('month', 'key')
            ->get();

        $formatted = [];
        for ($i = 1; $i <= 12; $i++) {
            $month = str_pad($i, 2, '0', STR_PAD_LEFT);
            $formatted[$month] = [
                'total_visits' => 0,
                'click_saitama' => 0,
                'click_kursus_jepang' => 0,
                'click_ayaka' => 0,
                'click_akab' => 0
            ];
        }

        foreach ($logs as $log) {
            if (isset($formatted[$log->month])) {
                $formatted[$log->month][$log->key] = (int)$log->total;
            }
        }

        return response()->json($formatted);
    }
}
