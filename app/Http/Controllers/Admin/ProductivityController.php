<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanyTarget;
use App\Models\ProductivityLog;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductivityController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Productivity/Calendar');
    }

    public function getData(Request $request)
    {
        $month = $request->input('month', Carbon::now()->format('Y-m'));
        $startOfMonth = Carbon::parse($month)->startOfMonth();
        $endOfMonth = Carbon::parse($month)->endOfMonth();

        // 1. Get Proposal Counts (Quantitative)
        // Group by Date and Admin Name
        // Note: admin_in_charge in company_targets matches admin_name in logs
        $proposals = CompanyTarget::select(
            DB::raw('DATE(created_at) as date'),
            'admin_in_charge as admin',
            DB::raw('count(*) as count')
        )
        ->whereBetween('created_at', [$startOfMonth, $endOfMonth])
        ->groupBy('date', 'admin')
        ->get();

        // 2. Get Productivity Logs (Qualitative)
        $logs = ProductivityLog::whereBetween('log_date', [$startOfMonth, $endOfMonth])->get();

        // 3. Structure Data for Calendar
        // Structure: { "2024-02-01": { "Ganang": { count: 5, log: {...} }, ... } }
        $calendarData = [];

        // Initialize calendar skeleton with admins
        $admins = ['Ganang', 'Ipancok', 'Beseren'];
        
        // Populate Proposals
        foreach ($proposals as $prop) {
            $date = $prop->date;
            $admin = $prop->admin;
            if (!in_array($admin, $admins)) continue; // Skip unknown admins if any

            if (!isset($calendarData[$date])) $calendarData[$date] = [];
            if (!isset($calendarData[$date][$admin])) $calendarData[$date][$admin] = ['count' => 0, 'log' => null];

            $calendarData[$date][$admin]['count'] = $prop->count;
        }

        // Populate Logs
        foreach ($logs as $log) {
            $date = $log->log_date;
            $admin = $log->admin_name;
             if (!in_array($admin, $admins)) continue;

            if (!isset($calendarData[$date])) $calendarData[$date] = [];
            if (!isset($calendarData[$date][$admin])) $calendarData[$date][$admin] = ['count' => 0, 'log' => null];

            $calendarData[$date][$admin]['log'] = $log;
        }
        
        // Also fetch individual proposals for detail view if requested? 
        // Or client can filter from main list. 
        // For now, let's return just the stats and logs. 
        // Client might need list of proposals for a specific day/admin in modal.
        // Let's create a separate endpoint for daily details or just fetch IDs here? 
        // For the requested "6 proposals per day" calendar, stats are enough for the main view.

        return response()->json([
            'calendar' => $calendarData,
            'admins' => $admins,
            'month_stats' => $this->calculateMonthStats($proposals, $admins)
        ]);
    }

    private function calculateMonthStats($proposals, $admins) {
        $stats = [];
        foreach($admins as $admin) {
            $stats[$admin] = [
                'total_proposals' => 0,
                'target_days_met' => 0, // >= 2
            ];
        }

        foreach($proposals as $prop) {
            if (isset($stats[$prop->admin])) {
                $stats[$prop->admin]['total_proposals'] += $prop->count;
                if ($prop->count >= 2) {
                    $stats[$prop->admin]['target_days_met']++;
                }
            }
        }
        return $stats;
    }

    public function getDailyDetails(Request $request) {
        $date = $request->input('date');
        
        $proposals = CompanyTarget::whereDate('created_at', $date)
                                ->orderBy('created_at', 'desc')
                                ->get()
                                ->groupBy('admin_in_charge');
                                
        return response()->json($proposals);
    }

    public function storeLog(Request $request)
    {
        $validated = $request->validate([
            'admin_name' => 'required|string',
            'log_date' => 'required|date',
            'focus_of_day' => 'nullable|string',
            'blockers' => 'nullable|string',
            'next_day_plan' => 'nullable|string',
        ]);

        $log = ProductivityLog::updateOrCreate(
            [
                'admin_name' => $validated['admin_name'],
                'log_date' => $validated['log_date']
            ],
            [
                'focus_of_day' => $validated['focus_of_day'],
                'blockers' => $validated['blockers'],
                'next_day_plan' => $validated['next_day_plan']
            ]
        );

        return response()->json($log);
    }
}
