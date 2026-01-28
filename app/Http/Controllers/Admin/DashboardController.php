<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Models\Portfolio;
use App\Models\Page;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        // Lead statistics
        $totalLeads = Lead::count();
        $agencyLeads = Lead::forDomain('agency')->count();
        $lpkLeads = Lead::forDomain('lpk')->count();
        $newLeads = Lead::new()->count();
        $recentLeads = Lead::latest()->limit(10)->get();

        // Portfolio statistics
        $totalPortfolios = Portfolio::count();
        $featuredPortfolios = Portfolio::featured()->count();

        // Page statistics
        $totalPages = Page::count();
        $publishedPages = Page::published()->count();

        return view('admin.dashboard', compact(
            'totalLeads',
            'agencyLeads',
            'lpkLeads',
            'newLeads',
            'recentLeads',
            'totalPortfolios',
            'featuredPortfolios',
            'totalPages',
            'publishedPages'
        ));
    }
}
