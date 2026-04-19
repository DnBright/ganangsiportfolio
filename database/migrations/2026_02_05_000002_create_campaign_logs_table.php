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
        Schema::create('campaign_logs', function (Blueprint $blueprint) {
            $blueprint->id();
            $blueprint->foreignId('campaign_id')->constrained()->onDelete('cascade');
            $blueprint->enum('status', ['success', 'failed']);
            $blueprint->string('group_name')->nullable();
            $blueprint->text('caption_used')->nullable();
            $blueprint->text('error_message')->nullable();
            $blueprint->timestamp('executed_at')->useCurrent();
            $blueprint->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campaign_logs');
    }
};
