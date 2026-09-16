<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'type',
        'judul',
        'institusi',
        'deskripsi',
        'tanggal_mulai',
        'tanggal_selesai',
        'gambar',
        'urutan',
        'status',
    ];

    protected $casts = [
        'urutan' => 'integer',
        'status' => 'boolean',
    ];
}