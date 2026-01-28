@extends('layouts.app')
@section('content')
<div class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-6">
            <h2 class="font-semibold text-3xl">Portfolio Management</h2>
            <a href="{{ route('admin.portfolios.create') }}" class="bg-blue-500 text-white px-4 py-2 rounded-md">Add Portfolio</a>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
            <p>Portfolio management interface - Create, edit, and manage portfolio items here.</p>
        </div>
    </div>
</div>
@endsection
