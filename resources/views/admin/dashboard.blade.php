@extends('layouts.app')

@section('content')
<div style="background: red; color: white; padding: 10px; text-align: center; font-weight: bold; font-family: sans-serif;">⚠️ SERVER CONNECTED v2.3 - IF YOU SEE THIS, PHP IS UPDATED ⚠️</div>
<div id="admin-dashboard-root" data-stats="{{ json_encode([
    'totalLeads' => $totalLeads,
    'newLeads' => $newLeads,
    'totalPortfolios' => $totalPortfolios,
    'featuredPortfolios' => $featuredPortfolios,
    'recentLeads' => $recentLeads
]) }}"></div>
@endsection
