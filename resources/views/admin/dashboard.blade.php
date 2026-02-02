@extends('layouts.app')

@section('content')
<div id="admin-dashboard-root" data-stats="{{ json_encode([
    'totalLeads' => $totalLeads,
    'newLeads' => $newLeads,
    'totalPortfolios' => $totalPortfolios,
    'featuredPortfolios' => $featuredPortfolios,
    'recentLeads' => $recentLeads,
    'userName' => $userName
]) }}"></div>
@endsection
