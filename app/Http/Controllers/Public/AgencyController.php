<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use App\Models\Section;
use App\Models\Lead;
use Illuminate\Http\Request;

class AgencyController extends Controller
{
    /**
     * Display the agency homepage
     */
    public function index()
    {
        $sections = Section::forDomain('agency')
            ->active()
            ->ordered()
            ->get();

        $featuredPortfolios = Portfolio::forDomain('agency')
            ->featured()
            ->ordered()
            ->limit(6)
            ->get();

        return view('agency.index', compact('sections', 'featuredPortfolios'));
    }

    /**
     * Display the about page
     */
    public function about()
    {
        $sections = Section::forDomain('agency')
            ->ofType('about')
            ->active()
            ->ordered()
            ->get();

        return view('agency.about', compact('sections'));
    }

    /**
     * Display services page
     */
    public function services()
    {
        $sections = Section::forDomain('agency')
            ->ofType('services')
            ->active()
            ->ordered()
            ->get();

        return view('agency.services', compact('sections'));
    }

    /**
     * Display portfolio page
     */
    public function portfolio()
    {
        $portfolios = Portfolio::forDomain('agency')
            ->ordered()
            ->paginate(12);

        $categories = Portfolio::forDomain('agency')
            ->distinct()
            ->pluck('category')
            ->filter();

        return view('agency.portfolio', compact('portfolios', 'categories'));
    }

    /**
     * Display contact page
     */
    public function contact()
    {
        return view('agency.contact');
    }

    /**
     * Store contact form submission
     */
    public function storeContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'message' => 'required|string|max:2000',
        ]);

        Lead::create([
            'domain' => 'agency',
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'company' => $validated['company'] ?? null,
            'message' => $validated['message'],
            'source' => 'agency_contact_form',
            'status' => 'new',
        ]);

        return redirect()->route('agency.contact')
            ->with('success', 'Thank you for contacting us! We will get back to you soon.');
    }
}
