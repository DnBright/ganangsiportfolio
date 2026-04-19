<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'post_link',
        'target_category',
        'target_groups',
        'daily_limit',
        'sessions_count',
        'delay_minutes',
        'status',
        'settings',
    ];

    protected $casts = [
        'settings' => 'array',
        'target_groups' => 'array',
    ];

    public function logs()
    {
        return $this->hasMany(CampaignLog::class);
    }
}
