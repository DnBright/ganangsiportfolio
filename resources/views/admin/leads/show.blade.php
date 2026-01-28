@extends('layouts.app')

@section('content')
<div class="py-12">
    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
        <div class="mb-6">
            <a href="{{ route('admin.leads.index') }}" class="text-blue-600 hover:text-blue-800">&larr; Back to Leads</a>
        </div>

        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h2 class="text-2xl font-bold mb-6">Lead Details</h2>

            @if(session('success'))
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{{ session('success') }}</div>
            @endif

            <div class="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label class="font-semibold text-gray-700">Name:</label>
                    <p>{{ $lead->name }}</p>
                </div>
                <div>
                    <label class="font-semibold text-gray-700">Email:</label>
                    <p>{{ $lead->email }}</p>
                </div>
                <div>
                    <label class="font-semibold text-gray-700">Phone:</label>
                    <p>{{ $lead->phone ?? '-' }}</p>
                </div>
                <div>
                    <label class="font-semibold text-gray-700">Company:</label>
                    <p>{{ $lead->company ?? '-' }}</p>
                </div>
                <div>
                    <label class="font-semibold text-gray-700">Domain:</label>
                    <p><span class="px-2 py-1 text-xs rounded-full {{ $lead->domain === 'general' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800' }}">{{ ucfirst($lead->domain) }}</span></p>
                </div>
                <div>
                    <label class="font-semibold text-gray-700">Source:</label>
                    <p>{{ $lead->source ?? '-' }}</p>
                </div>
                <div>
                    <label class="font-semibold text-gray-700">Created:</label>
                    <p>{{ $lead->created_at->format('M d, Y H:i') }}</p>
                </div>
            </div>

            <div class="mb-6">
                <label class="font-semibold text-gray-700">Message:</label>
                <p class="mt-2 p-4 bg-gray-50 rounded">{{ $lead->message }}</p>
            </div>

            <div class="border-t pt-6">
                <h3 class="font-semibold text-lg mb-4">Update Status</h3>
                <form action="{{ route('admin.leads.updateStatus', $lead) }}" method="POST" class="flex gap-4">
                    @csrf
                    @method('PATCH')
                    <select name="status" class="border-gray-300 rounded-md">
                        <option value="new" {{ $lead->status === 'new' ? 'selected' : '' }}>New</option>
                        <option value="contacted" {{ $lead->status === 'contacted' ? 'selected' : '' }}>Contacted</option>
                        <option value="qualified" {{ $lead->status === 'qualified' ? 'selected' : '' }}>Qualified</option>
                        <option value="converted" {{ $lead->status === 'converted' ? 'selected' : '' }}>Converted</option>
                        <option value="lost" {{ $lead->status === 'lost' ? 'selected' : '' }}>Lost</option>
                    </select>
                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Update Status</button>
                </form>
            </div>

            <div class="border-t pt-6 mt-6">
                <form action="{{ route('admin.leads.destroy', $lead) }}" method="POST" onsubmit="return confirm('Are you sure?');">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="bg-red-500 text-white px-4 py-2 rounded-md">Delete Lead</button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
