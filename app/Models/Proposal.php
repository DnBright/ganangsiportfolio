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
        'bab_1',
        'bab_2',
        'bab_3',
        'bab_4',
        'pricing',
        'status',
    ];
}
