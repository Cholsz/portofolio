<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    protected $fillable = [
        'judul',
        'slug',
        'kategori',
        'deskripsi',
        'gambar',
        'teknologi',
        'github_url',
        'demo_url',
        'urutan',
        'status',
        'category_id',
    ];

    protected $casts = [
        'status' => 'boolean',
        'urutan' => 'integer',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}