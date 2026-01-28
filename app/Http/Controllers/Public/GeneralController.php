<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use App\Models\Section;
use App\Models\Lead;
use Illuminate\Http\Request;

class GeneralController extends Controller
{
    /**
     * Display the general homepage
     */
    public function index()
    {
        $sections = Section::forDomain('general')
            ->active()
            ->ordered()
            ->get();

        $featuredPortfolios = Portfolio::forDomain('general')
            ->featured()
            ->ordered()
            ->limit(6)
            ->get();

        return view('general.index', compact('sections', 'featuredPortfolios'));
    }

    /**
     * Display the about page
     */
    public function about()
    {
        $sections = Section::forDomain('general')
            ->ofType('about')
            ->active()
            ->ordered()
            ->get();

        return view('general.about', compact('sections'));
    }

    /**
     * Display services page
     */
    public function services()
    {
        $sections = Section::forDomain('general')
            ->ofType('services')
            ->active()
            ->ordered()
            ->get();

        return view('general.services', compact('sections'));
    }

    /**
     * Display portfolio page
     */
    public function portfolio()
    {
        $portfolios = Portfolio::forDomain('general')
            ->ordered()
            ->paginate(12);

        $categories = Portfolio::forDomain('general')
            ->distinct()
            ->pluck('category')
            ->filter();

        return view('general.portfolio', compact('portfolios', 'categories'));
    }

    /**
     * Display contact page
     */
    public function contact()
    {
        return view('general.contact');
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
            'domain' => 'general',
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'company' => $validated['company'] ?? null,
            'message' => $validated['message'],
            'source' => 'general_contact_form',
            'status' => 'new',
        ]);

        return redirect()->route('general.contact')
            ->with('success', 'Thank you for contacting us! We will get back to you soon.');
    }
}
