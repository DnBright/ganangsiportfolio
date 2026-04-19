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
    public function index(Request $request)
    {
        $portfolios = Portfolio::ordered()->get();
        
        if ($request->wantsJson()) {
            return response()->json($portfolios);
        }
        
        return view('admin.portfolios.index', compact('portfolios'));
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
        $validated['is_featured'] = $request->boolean('is_featured');

        $portfolio = Portfolio::create($validated);

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Portfolio created successfully', 'portfolio' => $portfolio]);
        }

        return redirect()->route('admin.portfolios.index')
            ->with('success', 'Portfolio created successfully.');
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
            // Delete old image if exists
            if ($portfolio->image) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($portfolio->image);
            }
            $validated['image'] = $request->file('image')->store('portfolios', 'public');
        }

        // Update slug if title changed
        if ($validated['title'] !== $portfolio->title) {
            $validated['slug'] = Str::slug($validated['title']);
        }
        
        $validated['is_featured'] = $request->boolean('is_featured');

        $portfolio->update($validated);

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Portfolio updated successfully', 'portfolio' => $portfolio]);
        }

        return redirect()->route('admin.portfolios.index')
            ->with('success', 'Portfolio updated successfully.');
    }

    /**
     * Remove the specified portfolio
     */
    public function destroy(Request $request, Portfolio $portfolio)
    {
        if ($portfolio->image) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($portfolio->image);
        }
        
        $portfolio->delete();

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Portfolio deleted successfully']);
        }

        return redirect()->route('admin.portfolios.index')
            ->with('success', 'Portfolio deleted successfully.');
    }
}
