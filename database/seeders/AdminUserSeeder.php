<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Lead;
use App\Models\Portfolio;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin',
            'email' => 'admin@thedarkandbright.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Create sample leads
        Lead::create([
            'domain' => 'general',
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '+1234567890',
            'company' => 'Tech Corp',
            'message' => 'Interested in web development services.',
            'source' => 'general_contact_form',
            'status' => 'new',
        ]);

        Lead::create([
            'domain' => 'agency',
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'phone' => '+0987654321',
            'message' => 'Ingin mendaftar program web development.',
            'source' => 'agency_contact_form',
            'status' => 'new',
        ]);

        // Create sample portfolios
        Portfolio::create([
            'domain' => 'general',
            'title' => 'E-Commerce Platform',
            'slug' => 'e-commerce-platform',
            'client_name' => 'ShopNow Inc',
            'description' => 'A modern e-commerce platform built with Laravel and Vue.js',
            'category' => 'Web Development',
            'is_featured' => true,
            'order' => 1,
        ]);

        Portfolio::create([
            'domain' => 'general',
            'title' => 'Corporate Website',
            'slug' => 'corporate-website',
            'client_name' => 'Business Solutions Ltd',
            'description' => 'Professional corporate website with CMS integration',
            'category' => 'Web Design',
            'is_featured' => true,
            'order' => 2,
        ]);

        Portfolio::create([
            'domain' => 'both',
            'title' => 'Learning Management System',
            'slug' => 'learning-management-system',
            'client_name' => 'EduTech Academy',
            'description' => 'Complete LMS for online courses and training',
            'category' => 'Web Application',
            'is_featured' => false,
            'order' => 3,
        ]);
    }
}
