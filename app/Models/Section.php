<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Section extends Model
{
    protected $fillable = [
        'page_id',
        'domain',
        'section_type',
        'title',
        'content',
        'order',
        'is_active',
    ];

    protected $casts = [
        'content' => 'array',
        'is_active' => 'boolean',
    ];

    /**
     * Relationship: A section belongs to a page
     */
    public function page(): BelongsTo
    {
        return $this->belongsTo(Page::class);
    }

    /**
     * Scope: Filter by domain
     */
    public function scopeForDomain($query, string $domain)
    {
        return $query->where('domain', $domain);
    }

    /**
     * Scope: Filter by section type
     */
    public function scopeOfType($query, string $type)
    {
        return $query->where('section_type', $type);
    }

    /**
     * Scope: Only active sections
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope: Order by order field
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }
}
