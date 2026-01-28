<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Portfolio extends Model
{
    protected $fillable = [
        'domain',
        'title',
        'slug',
        'client_name',
        'description',
        'image',
        'project_url',
        'category',
        'is_featured',
        'order',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
    ];

    /**
     * Scope: Filter by domain
     */
    public function scopeForDomain($query, string $domain)
    {
        if ($domain === 'both') {
            return $query;
        }
        return $query->where(function ($q) use ($domain) {
            $q->where('domain', $domain)->orWhere('domain', 'both');
        });
    }

    /**
     * Scope: Only featured portfolios
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope: Order by order field
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('created_at', 'desc');
    }

    /**
     * Scope: Filter by category
     */
    public function scopeByCategory($query, string $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Boot method to auto-generate slug
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($portfolio) {
            if (empty($portfolio->slug)) {
                $portfolio->slug = Str::slug($portfolio->title);
            }
        });
    }
}
