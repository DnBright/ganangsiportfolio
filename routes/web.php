<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Lpk\HomeController as LpkHomeController;
use App\Http\Controllers\Main\HomeController as MainHomeController;

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
// 1. Admin Subdomain: admin.thedarkandbright.com
// -----------------------------------------------------------------------------
Route::domain('admin.thedarkandbright.com')->group(function () {
    // Public admin routes (e.g. login) could be here if specific
    
    // Protected Admin Routes
    Route::middleware(['auth', 'role:admin'])->group(function () {
        Route::get('/', [AdminDashboardController::class, 'index'])->name('admin.home');
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
        // Add other admin routes here
    });
});

// -----------------------------------------------------------------------------
// 2. LPK Subdomain (General Pasar): lpk.thedarkandbright.com
// -----------------------------------------------------------------------------
Route::domain('lpk.thedarkandbright.com')->group(function () {
    Route::get('/', [LpkHomeController::class, 'index'])->name('lpk.home');
});

// -----------------------------------------------------------------------------
// 3. Main Domain (LPK Target Pasar): thedarkandbright.com
// -----------------------------------------------------------------------------
Route::domain('thedarkandbright.com')->group(function () {
    // Existing Landing Page
    Route::get('/', function () {
        return view('index');
    })->name('main.home');

    // Existing User Dashboard
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    // Profile Routes
    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    // Sensei Dashboard (assuming it belongs to main domain for now, or could be moved)
    Route::middleware(['auth', 'role:sensei'])->group(function () {
        Route::get('/sensei/dashboard', function () {
            return view('sensei.dashboard');
        })->name('sensei.dashboard');
    });
});

// -----------------------------------------------------------------------------
// Global Fallback / Auth
// -----------------------------------------------------------------------------
// Auth routes are registered globally so they work on all domains (or usually Main)
// If you want /login to only work on main, move this into the main group.
require __DIR__.'/auth.php';

// Fallback for localhost testing without configured hosts (Optional)
Route::get('/', function () {
    return view('index'); // Default to main view or show instructions
});
