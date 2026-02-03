<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyTarget extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'region',
        'industry',
        'contact_person',
        'email',
        'whatsapp_contact',
        'social_media',
        'project_type',
        'proposal_status',
        'proposal_final',
        'admin_in_charge',
    ];
}
