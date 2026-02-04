<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
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
        'proposal_file',
        'screenshot_file',
        'execution_notes',
        'executed_at',
        'project_status',
        'admin_in_charge',
        'company_target_id',
    ];

    protected $casts = [
        'executed_at' => 'datetime',
    ];
}
