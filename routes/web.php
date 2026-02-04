<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Public\GeneralController;
use App\Http\Controllers\Public\AgencyController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\LeadController;
use App\Http\Controllers\Admin\PortfolioController;
use App\Http\Controllers\ProposalController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// -----------------------------------------------------------------------------
// Global Auth Routes (Accessible from any domain)
// -----------------------------------------------------------------------------
require __DIR__.'/auth.php';

// -----------------------------------------------------------------------------
// 1. Main Domain: thedarkandbright.com (General)
// -----------------------------------------------------------------------------
Route::domain('thedarkandbright.com')->group(function () {
    // General public routes
    Route::get('/', [GeneralController::class, 'index'])->name('general.home');
    Route::get('/about', [GeneralController::class, 'about'])->name('general.about');
    Route::get('/services', [GeneralController::class, 'services'])->name('general.services');
    Route::get('/solutions', [GeneralController::class, 'solutions'])->name('general.solutions');
    Route::get('/portfolio', [GeneralController::class, 'portfolio'])->name('general.portfolio');
    Route::get('/contact', [GeneralController::class, 'contact'])->name('general.contact');
    Route::post('/contact', [GeneralController::class, 'storeContact'])->name('general.contact.store');
    
    // Analytics tracking (Public)
    Route::post('/analytics/increment', [\App\Http\Controllers\AnalyticsController::class, 'increment'])->name('analytics.increment');

    // Authenticated user routes
    Route::middleware('auth')->group(function () {
        Route::get('/dashboard', function () {
            // If admin, redirect to admin home instead of user dashboard if they end up here
            if (auth()->user()->role === 'admin') {
                return redirect()->route('admin.dashboard');
            }
            return view('dashboard');
        })->middleware('verified')->name('dashboard');

        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});

// -----------------------------------------------------------------------------
// 2. Agency Domain: agency.thedarkandbright.com (LPK Target)
// -----------------------------------------------------------------------------
Route::domain('agency.thedarkandbright.com')->group(function () {
    Route::get('/', [AgencyController::class, 'index'])->name('agency.home');
    Route::get('/programs', [AgencyController::class, 'programs'])->name('agency.programs');
    Route::get('/contact', [AgencyController::class, 'contact'])->name('agency.contact');
    Route::post('/contact', [AgencyController::class, 'storeContact'])->name('agency.contact.store');
});

// -----------------------------------------------------------------------------
// 3. Admin Domain: admin.thedarkandbright.com
// -----------------------------------------------------------------------------
Route::domain('admin.thedarkandbright.com')->middleware(['auth', 'role:admin'])->group(function () {
    // Dashboard
    Route::get('/', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('admin.home');

    // Pages Management
    Route::resource('pages', PageController::class)->names([
        'index' => 'admin.pages.index',
        'create' => 'admin.pages.create',
        'store' => 'admin.pages.store',
        'edit' => 'admin.pages.edit',
        'update' => 'admin.pages.update',
        'destroy' => 'admin.pages.destroy',
    ]);

    // Leads Management
    Route::get('/leads', [LeadController::class, 'index'])->name('admin.leads.index');
    Route::get('/leads/{lead}', [LeadController::class, 'show'])->name('admin.leads.show');
    Route::patch('/leads/{lead}/status', [LeadController::class, 'updateStatus'])->name('admin.leads.updateStatus');
    Route::delete('/leads/{lead}', [LeadController::class, 'destroy'])->name('admin.leads.destroy');

    // Portfolio Management
    Route::resource('portfolios', PortfolioController::class)->names([
        'index' => 'admin.portfolios.index',
        'create' => 'admin.portfolios.create',
        'store' => 'admin.portfolios.store',
        'edit' => 'admin.portfolios.edit',
        'update' => 'admin.portfolios.update',
        'destroy' => 'admin.portfolios.destroy',
    ]);

    // Proposal Management
    Route::get('/proposals', [ProposalController::class, 'index'])->name('admin.proposals.index');
    Route::post('/proposals', [ProposalController::class, 'store'])->name('admin.proposals.store');
    Route::post('/proposals/generate-draft', [ProposalController::class, 'generateDraft'])->name('admin.proposals.generate');
    Route::patch('/proposals/{proposal}', [ProposalController::class, 'update'])->name('admin.proposals.update');
    Route::get('/proposals/{proposal}/print', [ProposalController::class, 'webPrint'])->name('admin.proposals.print');
    Route::get('/proposals/{proposal}/export', [ProposalController::class, 'exportPdf'])->name('admin.proposals.export');
    Route::delete('/proposals/{proposal}', [ProposalController::class, 'destroy'])->name('admin.proposals.destroy');

    // Company Target Management
    Route::resource('company-targets', \App\Http\Controllers\Admin\CompanyTargetController::class)->names([
        'index' => 'admin.targets.index',
        'store' => 'admin.targets.store',
        'update' => 'admin.targets.update',
        'destroy' => 'admin.targets.destroy',
    ])->except(['create', 'edit', 'show']);

    // Productivity Calendar
    Route::get('/productivity', [\App\Http\Controllers\Admin\ProductivityController::class, 'index'])->name('admin.productivity.index');
    Route::get('/productivity/data', [\App\Http\Controllers\Admin\ProductivityController::class, 'getData'])->name('admin.productivity.data');
    Route::get('/productivity/details', [\App\Http\Controllers\Admin\ProductivityController::class, 'getDailyDetails'])->name('admin.productivity.details');
    Route::post('/productivity/log', [\App\Http\Controllers\Admin\ProductivityController::class, 'storeLog'])->name('admin.productivity.log');

    // Projects Management
    Route::get('/projects', [\App\Http\Controllers\ProjectController::class, 'index'])->name('admin.projects.index');
    Route::post('/projects', [\App\Http\Controllers\ProjectController::class, 'store'])->name('admin.projects.store');
    Route::patch('/projects/{project}', [\App\Http\Controllers\ProjectController::class, 'update'])->name('admin.projects.update');
    Route::delete('/projects/{project}', [\App\Http\Controllers\ProjectController::class, 'destroy'])->name('admin.projects.destroy');

    // Analytics Data (Admin Only)
    Route::get('/analytics/stats', [\App\Http\Controllers\AnalyticsController::class, 'getStats'])->name('admin.analytics.stats');


    // Temporary Migration & DB Fix Route
    Route::get('/run-migrations', function () {
        try {
            // 1. Clear Caches
            \Illuminate\Support\Facades\Artisan::call('config:clear');
            \Illuminate\Support\Facades\Artisan::call('cache:clear');
            
            // 2. Run Migrations
            \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
            
            // 3. Failsafe: Create table manually if still missing (for shared hosting issues)
            if (!\Illuminate\Support\Facades\Schema::hasTable('proposals')) {
                \Illuminate\Support\Facades\DB::statement("
                    CREATE TABLE IF NOT EXISTS proposals (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        client_name VARCHAR(255) NOT NULL,
                        industry VARCHAR(255) NULL,
                        target_website VARCHAR(255) NULL,
                        problem_statement TEXT NULL,
                        title VARCHAR(255) NULL,
                        bab_1 LONGTEXT NULL,
                        bab_2 LONGTEXT NULL,
                        bab_3 LONGTEXT NULL,
                        bab_4 LONGTEXT NULL,
                        pricing VARCHAR(255) NULL,
                        status VARCHAR(50) DEFAULT 'Draft',
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
                ");
            }

            // 4. Verify Table Existence
            $tableExists = \Illuminate\Support\Facades\Schema::hasTable('proposals');
            $databaseName = \Illuminate\Support\Facades\DB::connection()->getDatabaseName();
            $driver = \Illuminate\Support\Facades\DB::connection()->getDriverName();
            $host = config('database.connections.' . $driver . '.host') ?? 'N/A';

            return response()->json([
                'status' => 'success',
                'env_check' => [
                    'connection' => $driver,
                    'database' => $databaseName,
                    'host' => $host,
                ],
                'proposals_table_exists' => $tableExists,
                'message' => $tableExists ? 'Database is READY.' : 'Table missing after all attempts!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'connection_info' => [
                    'database' => env('DB_DATABASE'),
                    'host' => env('DB_HOST'),
                ],
                'message' => $e->getMessage()
            ], 500);
        }
    });

    Route::get('/run-gemini-debug', function () {
        $apiKey = config('services.gemini.key');
        if (!$apiKey) return "API Key is MISSING in backend config.";

        $modelsToTest = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
        $results = [];

        // 1. Test specific models
        foreach (['v1', 'v1beta'] as $version) {
            foreach ($modelsToTest as $model) {
                $url = "https://generativelanguage.googleapis.com/$version/models/$model:generateContent?key=$apiKey";
                try {
                    $response = \Illuminate\Support\Facades\Http::post($url, [
                        'contents' => [['parts' => [['text' => 'Hi']]]]
                    ]);
                    $results["$version-$model"] = $response->successful() ? 'SUCCESS' : 'FAILED: ' . ($response->json()['error']['message'] ?? 'Unknown');
                } catch (\Exception $e) {
                    $results["$version-$model"] = 'EXCEPTION: ' . $e->getMessage();
                }
            }
        }

        // 2. List all available models to see what the key actually has access to
        $listModels = [];
        try {
            $listResponse = \Illuminate\Support\Facades\Http::get("https://generativelanguage.googleapis.com/v1beta/models?key=$apiKey");
            $listModels = $listResponse->json()['models'] ?? 'Empty or Error: ' . ($listResponse->json()['error']['message'] ?? 'Unknown');
        } catch (\Exception $e) {
            $listModels = 'EXCEPTION: ' . $e->getMessage();
        }

        return response()->json([
            'api_key_last_4' => substr($apiKey, -4),
            'results' => $results,
            'actually_available_models' => $listModels
        ]);
    });

    // Validasi PDF Library Route
    Route::get('/debug-pdf', function() {
        $checks = [
            'class_exists' => class_exists('Barryvdh\\DomPDF\\ServiceProvider'),
            'service_bound' => app()->bound('dompdf.wrapper'),
            'vendor_folder' => is_dir(base_path('vendor/barryvdh')),
            'dompdf_folder' => is_dir(base_path('vendor/barryvdh/laravel-dompdf')),
            'config_exists' => file_exists(config_path('dompdf.php')),
        ];

        try {
            $pdf = app('dompdf.wrapper');
            $checks['instantiation'] = 'Success';
        } catch (\Throwable $e) {
            $checks['instantiation'] = 'Failed: ' . $e->getMessage();
        }

        return response()->json($checks);
    });
});

// -----------------------------------------------------------------------------
// Localhost Fallback (for local development without hosts configuration)
// -----------------------------------------------------------------------------
Route::get('/', function () {
    return view('welcome', [
        'message' => 'Multi-Domain Laravel Agency Platform',
        'domains' => [
            'thedarkandbright.com:8000' => 'Agency Website',
            'lpk.thedarkandbright.com:8000' => 'LPK Landing Page',
            'admin.thedarkandbright.com:8000' => 'Admin Dashboard',
        ]
    ]);
});
