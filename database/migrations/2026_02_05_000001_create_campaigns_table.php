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
        Schema::create('campaigns', function (Blueprint $blueprint) {
            $blueprint->id();
            $blueprint->string('name');
            $blueprint->string('post_link');
            $blueprint->string('target_category');
            $blueprint->integer('daily_limit')->default(50);
            $blueprint->integer('sessions_count')->default(2);
            $blueprint->integer('delay_minutes')->default(15);
            $blueprint->enum('status', ['running', 'paused', 'stopped', 'completed'])->default('paused');
            $blueprint->json('settings')->nullable();
            $blueprint->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campaigns');
    }
};
