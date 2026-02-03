<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyTarget extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'industry',
        'contact_person',
        'project_type',
        'proposal_status',
        'proposal_final',
        'admin_in_charge',
    ];
}
