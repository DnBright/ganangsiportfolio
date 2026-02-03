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
        Schema::create('productivity_logs', function (Blueprint $table) {
            $table->id();
            $table->string('admin_name'); // 'Ganang', 'Ipancok', 'Beseren'
            $table->date('log_date');
            $table->text('focus_of_day')->nullable();
            $table->text('blockers')->nullable();
            $table->text('next_day_plan')->nullable();
            $table->timestamps();

            // Ensure one log per admin per day
            $table->unique(['admin_name', 'log_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productivity_logs');
    }
};
