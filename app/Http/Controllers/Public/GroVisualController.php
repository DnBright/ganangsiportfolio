<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GroVisualController extends Controller
{
    /**
     * Display the Gro Visual landing page
     */
    public function index()
    {
        return view('Gro Visual.landing');
    }
}
