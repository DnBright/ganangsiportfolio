<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Section;
use App\Models\Lead;
use Illuminate\Http\Request;

class AgencyController extends Controller
{
    /**
     * Display the Agency homepage
     */
    public function index()
    {
        $sections = Section::forDomain('agency')
            ->active()
            ->ordered()
            ->get();

        return view('agency.index', compact('sections'));
    }

    /**
     * Display programs page
     */
    public function programs()
    {
        $sections = Section::forDomain('agency')
            ->ofType('services')
            ->active()
            ->ordered()
            ->get();

        return view('agency.programs', compact('sections'));
    }

    /**
     * Display contact/registration page
     */
    public function contact()
    {
        return view('agency.contact');
    }

    /**
     * Store contact/registration form submission
     */
    public function storeContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string|max:2000',
        ]);

        Lead::create([
            'domain' => 'agency',
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'message' => $validated['message'],
            'source' => 'agency_contact_form',
            'status' => 'new',
        ]);

        return redirect()->route('agency.contact')
            ->with('success', 'Terima kasih! Kami akan segera menghubungi Anda.');
    }
}
