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
            $table->longText('executive_summary')->nullable()->after('title');
            $table->longText('problem_analysis')->nullable()->after('executive_summary');
            $table->longText('project_objectives')->nullable()->after('problem_analysis');
            $table->longText('solutions')->nullable()->after('project_objectives');
            $table->longText('scope_of_work')->nullable()->after('solutions');
            $table->longText('system_walkthrough')->nullable()->after('scope_of_work');
            $table->longText('timeline')->nullable()->after('system_walkthrough');
            $table->longText('roi_impact')->nullable()->after('timeline');
            $table->longText('value_add')->nullable()->after('roi_impact');
            $table->longText('closing_cta')->nullable()->after('value_add');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('proposals', function (Blueprint $table) {
            $table->dropColumn([
                'executive_summary',
                'problem_analysis',
                'project_objectives',
                'solutions',
                'scope_of_work',
                'system_walkthrough',
                'timeline',
                'roi_impact',
                'value_add',
                'closing_cta'
            ]);
        });
    }
};
