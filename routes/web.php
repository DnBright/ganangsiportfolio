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
    Route::delete('/proposals/{proposal}', [ProposalController::class, 'destroy'])->name('admin.proposals.destroy');

    // Temporary Migration & DB Fix Route
    Route::get('/run-migrations', function () {
        try {
            // 1. Clear Caches
            \Illuminate\Support\Facades\Artisan::call('config:clear');
            \Illuminate\Support\Facades\Artisan::call('cache:clear');
            
            // 2. Run Migrations
            \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
            $migrateOutput = \Illuminate\Support\Facades\Artisan::output();

            // 3. Verify Table Existence
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
                'migration_output' => $migrateOutput,
                'message' => $tableExists ? 'Database is READY.' : 'Table missing after migration!'
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

        $models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
        $results = [];

        foreach (['v1', 'v1beta'] as $version) {
            foreach ($models as $model) {
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

        return response()->json([
            'api_key_last_4' => substr($apiKey, -4),
            'results' => $results
        ]);
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
