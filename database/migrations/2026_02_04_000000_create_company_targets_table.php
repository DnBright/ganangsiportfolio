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
        Schema::create('company_targets', function (Blueprint $table) {
            $table->id();
            $table->string('company_name');
            $table->string('industry')->nullable();
            $table->string('contact_person')->nullable();
            $table->string('project_type')->nullable(); // Landing, Website, Dashboard, Sistem
            $table->string('proposal_status')->default('Draft'); // Draft, Sent, Revised, Approved
            $table->string('proposal_final')->nullable(); // Path to file
            $table->string('admin_in_charge')->nullable(); // Ganang, Ipancok, Beseren
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_targets');
    }
};
