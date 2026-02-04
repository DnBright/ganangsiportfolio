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
        $today = Carbon::today();

        // 1. Get Project Execution Counts (Quantitative)
        // Group by Date and Admin Name
        $executions = \App\Models\Project::select(
            DB::raw('DATE(executed_at) as date'),
            'admin_in_charge as admin',
            DB::raw('count(*) as count')
        )
        ->whereBetween('executed_at', [$startOfMonth, $endOfMonth])
        ->groupBy('date', 'admin')
        ->get();

        // 2. Get Productivity Logs (Qualitative)
        $logs = ProductivityLog::whereBetween('log_date', [$startOfMonth, $endOfMonth])->get();

        // 3. Structure Data for Calendar
        $calendarData = [];
        $admins = ['Ganang', 'Ipancok', 'Beseren'];
        
        // Populate Executions
        foreach ($executions as $exe) {
            $date = $exe->date;
            $admin = $exe->admin;
            if (!in_array($admin, $admins)) continue;

            if (!isset($calendarData[$date])) $calendarData[$date] = [];
            if (!isset($calendarData[$date][$admin])) $calendarData[$date][$admin] = ['count' => 0, 'log' => null];

            $calendarData[$date][$admin]['count'] = $exe->count;
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
            'month_stats' => $this->calculateMonthStats($executions, $admins)
        ]);
    }

    private function calculateMonthStats($executions, $admins) {
        $stats = [];
        foreach($admins as $admin) {
            $stats[$admin] = [
                'total_executions' => 0,
                'target_days_met' => 0, // >= 2
            ];
        }

        foreach($executions as $exe) {
            if (isset($stats[$exe->admin])) {
                $stats[$exe->admin]['total_executions'] += $exe->count;
                if ($exe->count >= 2) {
                    $stats[$exe->admin]['target_days_met']++;
                }
            }
        }
        return $stats;
    }

    public function getDailyDetails(Request $request) {
        $date = $request->input('date');
        
        $projects = \App\Models\Project::whereDate('executed_at', $date)
                                ->orderBy('executed_at', 'desc')
                                ->get()
                                ->groupBy('admin_in_charge');
                                
        return response()->json($projects);
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
