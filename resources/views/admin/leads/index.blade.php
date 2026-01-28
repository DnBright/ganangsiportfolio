@extends('layouts.app')

@section('content')
<div class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-6">
            <h2 class="font-semibold text-3xl text-gray-800 leading-tight">Leads Management</h2>
        </div>

        <!-- Filters -->
        <div class="bg-white p-4 rounded-lg shadow mb-6">
            <form method="GET" action="{{ route('admin.leads.index') }}" class="flex gap-4">
                <select name="domain" class="border-gray-300 rounded-md">
                    <option value="">All Domains</option>
                    <option value="general" {{ request('domain') === 'general' ? 'selected' : '' }}>Agency</option>
                    <option value="general" {{ request('domain') === 'general' ? 'selected' : '' }}>LPK</option>
                </select>
                <select name="status" class="border-gray-300 rounded-md">
                    <option value="">All Status</option>
                    <option value="new" {{ request('status') === 'new' ? 'selected' : '' }}>New</option>
                    <option value="contacted" {{ request('status') === 'contacted' ? 'selected' : '' }}>Contacted</option>
                    <option value="qualified" {{ request('status') === 'qualified' ? 'selected' : '' }}>Qualified</option>
                    <option value="converted" {{ request('status') === 'converted' ? 'selected' : '' }}>Converted</option>
                    <option value="lost" {{ request('status') === 'lost' ? 'selected' : '' }}>Lost</option>
                </select>
                <input type="text" name="search" placeholder="Search..." value="{{ request('search') }}" class="border-gray-300 rounded-md">
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Filter</button>
            </form>
        </div>

        <!-- Leads Table -->
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            @if($leads->count() > 0)
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Domain</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @foreach($leads as $lead)
                    <tr>
                        <td class="px-6 py-4">{{ $lead->name }}</td>
                        <td class="px-6 py-4">{{ $lead->email }}</td>
                        <td class="px-6 py-4">{{ $lead->phone ?? '-' }}</td>
                        <td class="px-6 py-4">
                            <span class="px-2 py-1 text-xs rounded-full {{ $lead->domain === 'general' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800' }}">
                                {{ ucfirst($lead->domain) }}
                            </span>
                        </td>
                        <td class="px-6 py-4">
                            <span class="px-2 py-1 text-xs rounded-full {{ $lead->status === 'new' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800' }}">
                                {{ ucfirst($lead->status) }}
                            </span>
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-500">{{ $lead->created_at->format('M d, Y') }}</td>
                        <td class="px-6 py-4">
                            <a href="{{ route('admin.leads.show', $lead) }}" class="text-blue-600 hover:text-blue-800">View</a>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
            <div class="p-4">{{ $leads->links() }}</div>
            @else
            <div class="p-6 text-center text-gray-500">No leads found.</div>
            @endif
        </div>
    </div>
</div>
@endsection
