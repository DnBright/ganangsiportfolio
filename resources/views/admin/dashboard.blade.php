@extends('layouts.app')

@section('content')
<div class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <h2 class="font-semibold text-3xl text-gray-800 leading-tight mb-6">Admin Dashboard</h2>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <div class="text-gray-600 text-sm">Total Leads</div>
                <div class="text-3xl font-bold text-gray-900">{{ $totalLeads }}</div>
                <div class="text-sm text-gray-500 mt-2">
                    <span class="text-blue-600">{{ $newLeads }}</span> new
                </div>
            </div>

            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <div class="text-gray-600 text-sm">Agency Leads</div>
                <div class="text-3xl font-bold text-gray-900">{{ $agencyLeads }}</div>
            </div>

            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <div class="text-gray-600 text-sm">LPK Leads</div>
                <div class="text-3xl font-bold text-gray-900">{{ $lpkLeads }}</div>
            </div>

            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <div class="text-gray-600 text-sm">Total Portfolios</div>
                <div class="text-3xl font-bold text-gray-900">{{ $totalPortfolios }}</div>
                <div class="text-sm text-gray-500 mt-2">
                    <span class="text-yellow-600">{{ $featuredPortfolios }}</span> featured
                </div>
            </div>
        </div>

        <!-- Recent Leads -->
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold">Recent Leads</h3>
                <a href="{{ route('admin.leads.index') }}" class="text-blue-600 hover:text-blue-800">View All</a>
            </div>

            @if($recentLeads->count() > 0)
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Domain</th>
                            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        @foreach($recentLeads as $lead)
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap">{{ $lead->name }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{{ $lead->email }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    {{ $lead->domain === 'agency' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800' }}">
                                    {{ ucfirst($lead->domain) }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    {{ $lead->status === 'new' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800' }}">
                                    {{ ucfirst($lead->status) }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ $lead->created_at->diffForHumans() }}
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            @else
            <p class="text-gray-500">No leads yet.</p>
            @endif
        </div>

        <!-- Quick Actions -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="{{ route('admin.leads.index') }}" class="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg text-center">
                <div class="text-2xl font-bold">Manage Leads</div>
                <div class="text-sm mt-2">View and manage all leads</div>
            </a>
            <a href="{{ route('admin.portfolios.index') }}" class="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-lg text-center">
                <div class="text-2xl font-bold">Manage Portfolio</div>
                <div class="text-sm mt-2">Add and edit portfolio items</div>
            </a>
            <a href="{{ route('admin.pages.index') }}" class="bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg text-center">
                <div class="text-2xl font-bold">Manage Pages</div>
                <div class="text-sm mt-2">Edit website content</div>
            </a>
        </div>
    </div>
</div>
@endsection
