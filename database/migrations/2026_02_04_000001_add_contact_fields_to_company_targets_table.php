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
        Schema::table('company_targets', function (Blueprint $table) {
            $table->string('email')->nullable()->after('contact_person');
            $table->string('whatsapp_contact')->nullable()->after('email');
            $table->string('social_media')->nullable()->after('whatsapp_contact');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('company_targets', function (Blueprint $table) {
            $table->dropColumn(['email', 'whatsapp_contact', 'social_media']);
        });
    }
};
