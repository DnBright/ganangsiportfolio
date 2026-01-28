<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DetectDomain
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $host = $request->getHost();
        
        // Detect domain type
        $domain = 'agency'; // default
        
        if (str_contains($host, 'lpk.')) {
            $domain = 'lpk';
        } elseif (str_contains($host, 'admin.')) {
            $domain = 'admin';
        }
        
        // Share domain info with all views
        view()->share('currentDomain', $domain);
        
        // Set in config for easy access
        config(['app.current_domain' => $domain]);
        
        return $next($request);
    }
}
