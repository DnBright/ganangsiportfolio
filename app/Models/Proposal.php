<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proposal extends Model
{
    protected $fillable = [
        'client_name',
        'industry',
        'target_website',
        'problem_statement',
        'title',
        'executive_summary',
        'problem_analysis',
        'project_objectives',
        'solutions',
        'scope_of_work',
        'system_walkthrough',
        'timeline',
        'roi_impact',
        'value_add',
        'closing_cta',
        'investment',
        'pricing',
        'status',
    ];
}
