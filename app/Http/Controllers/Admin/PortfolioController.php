<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PortfolioController extends Controller
{
    /**
     * Display a listing of portfolios
     */
    public function index()
    {
        $portfolios = Portfolio::ordered()->paginate(20);
        return view('admin.portfolios.index', compact('portfolios'));
    }

    /**
     * Show the form for creating a new portfolio
     */
    public function create()
    {
        return view('admin.portfolios.create');
    }

    /**
     * Store a newly created portfolio
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'domain' => 'required|in:agency,lpk,both',
            'title' => 'required|string|max:255',
            'client_name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'project_url' => 'nullable|url',
            'category' => 'nullable|string|max:100',
            'is_featured' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('portfolios', 'public');
        }

        // Generate slug
        $validated['slug'] = Str::slug($validated['title']);

        Portfolio::create($validated);

        return redirect()->route('admin.portfolios.index')
            ->with('success', 'Portfolio created successfully.');
    }

    /**
     * Show the form for editing the specified portfolio
     */
    public function edit(Portfolio $portfolio)
    {
        return view('admin.portfolios.edit', compact('portfolio'));
    }

    /**
     * Update the specified portfolio
     */
    public function update(Request $request, Portfolio $portfolio)
    {
        $validated = $request->validate([
            'domain' => 'required|in:agency,lpk,both',
            'title' => 'required|string|max:255',
            'client_name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'project_url' => 'nullable|url',
            'category' => 'nullable|string|max:100',
            'is_featured' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('portfolios', 'public');
        }

        // Update slug if title changed
        if ($validated['title'] !== $portfolio->title) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $portfolio->update($validated);

        return redirect()->route('admin.portfolios.index')
            ->with('success', 'Portfolio updated successfully.');
    }

    /**
     * Remove the specified portfolio
     */
    public function destroy(Portfolio $portfolio)
    {
        $portfolio->delete();

        return redirect()->route('admin.portfolios.index')
            ->with('success', 'Portfolio deleted successfully.');
    }
}
