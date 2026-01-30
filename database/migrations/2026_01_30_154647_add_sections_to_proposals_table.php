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
        Schema::table('proposals', function (Blueprint $table) {
            $table->string('title')->nullable()->after('problem_statement');
            $table->longText('bab_1')->nullable()->after('title');
            $table->longText('bab_2')->nullable()->after('bab_1');
            $table->longText('bab_3')->nullable()->after('bab_2');
            $table->longText('bab_4')->nullable()->after('bab_3');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('proposals', function (Blueprint $table) {
            $table->dropColumn(['title', 'bab_1', 'bab_2', 'bab_3', 'bab_4']);
        });
    }
};
