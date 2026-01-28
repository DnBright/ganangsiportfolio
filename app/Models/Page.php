<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Page extends Model
{
    protected $fillable = [
        'domain',
        'slug',
        'title',
        'meta_description',
        'meta_keywords',
        'content',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    /**
     * Relationship: A page has many sections
     */
    public function sections(): HasMany
    {
        return $this->hasMany(Section::class)->orderBy('order');
    }

    /**
     * Scope: Filter by domain
     */
    public function scopeForDomain($query, string $domain)
    {
        return $query->where('domain', $domain);
    }

    /**
     * Scope: Only published pages
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    /**
     * Scope: Find by slug and domain
     */
    public function scopeBySlug($query, string $slug, string $domain)
    {
        return $query->where('slug', $slug)->where('domain', $domain);
    }

    /**
     * Boot method to auto-generate slug
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($page) {
            if (empty($page->slug)) {
                $page->slug = Str::slug($page->title);
            }
        });
    }
}
