<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            
            // Company Information (from company_targets)
            $table->string('company_name');
            $table->string('region')->nullable();
            $table->string('industry')->nullable();
            $table->string('contact_person')->nullable();
            $table->string('email')->nullable();
            $table->string('whatsapp_contact')->nullable();
            $table->string('social_media')->nullable();
            $table->string('project_type')->nullable(); // Website, Landing Page, Dashboard, etc.
            
            // Execution Data
            $table->string('proposal_file')->nullable(); // Uploaded proposal PDF
            $table->string('screenshot_file')->nullable(); // Uploaded screenshot
            $table->text('execution_notes')->nullable(); // Optional notes from admin
            $table->timestamp('executed_at')->nullable(); // When it was executed
            
            // Project Status
            $table->string('project_status')->default('In Progress'); // In Progress, Completed, On Hold, Cancelled
            $table->string('admin_in_charge')->nullable(); // Ganang, Ipancok, Beseren
            
            // Original company_target_id for reference
            $table->unsignedBigInteger('company_target_id')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
