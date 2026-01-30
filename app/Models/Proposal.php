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
        'proposal_content',
        'pricing',
        'status',
    ];
}
