<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductivityLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'admin_name',
        'log_date',
        'focus_of_day',
        'blockers',
        'next_day_plan'
    ];
}
