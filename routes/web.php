<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Public\AgencyController;
use App\Http\Controllers\Public\LpkController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\LeadController;
use App\Http\Controllers\Admin\PortfolioController;
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
// 1. Agency Domain: thedarkandbright.com
// -----------------------------------------------------------------------------
Route::domain('thedarkandbright.com')->group(function () {
    // Agency public routes
    Route::get('/', [AgencyController::class, 'index'])->name('agency.home');
    Route::get('/about', [AgencyController::class, 'about'])->name('agency.about');
    Route::get('/services', [AgencyController::class, 'services'])->name('agency.services');
    Route::get('/portfolio', [AgencyController::class, 'portfolio'])->name('agency.portfolio');
    Route::get('/contact', [AgencyController::class, 'contact'])->name('agency.contact');
    Route::post('/contact', [AgencyController::class, 'storeContact'])->name('agency.contact.store');

    // Auth routes (login, register, etc.)
    require __DIR__.'/auth.php';

    // Authenticated user routes
    Route::middleware('auth')->group(function () {
        Route::get('/dashboard', function () {
            return view('dashboard');
        })->middleware('verified')->name('dashboard');

        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});

// -----------------------------------------------------------------------------
// 2. LPK Domain: lpk.thedarkandbright.com
// -----------------------------------------------------------------------------
Route::domain('lpk.thedarkandbright.com')->group(function () {
    Route::get('/', [LpkController::class, 'index'])->name('lpk.home');
    Route::get('/programs', [LpkController::class, 'programs'])->name('lpk.programs');
    Route::get('/contact', [LpkController::class, 'contact'])->name('lpk.contact');
    Route::post('/contact', [LpkController::class, 'storeContact'])->name('lpk.contact.store');
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
