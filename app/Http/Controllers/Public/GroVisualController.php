<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class GroVisualController extends Controller
{
    /**
     * Display the Gro Visual landing page
     */
    public function index()
    {
        $portfolioPath = public_path('images/gro-visual/portfolio');
        $portfolioImages = [];

        if (File::exists($portfolioPath)) {
            $files = File::files($portfolioPath);
            foreach ($files as $file) {
                // Only include common image extensions
                if (in_array(strtolower($file->getExtension()), ['jpg', 'jpeg', 'png', 'svg', 'webp'])) {
                    $portfolioImages[] = $file->getFilename();
                }
            }
        }

        // Sort alphabetically to maintain order
        sort($portfolioImages);

        return view('Gro Visual.landing', compact('portfolioImages'));
    }
}
