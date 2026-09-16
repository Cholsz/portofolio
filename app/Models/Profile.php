<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
    'nama',
    'headline',
    'deskripsi',
    'foto',
    'foto_about',
    'gpa',
    'project_count',
    'certificate_count',
    'award_count',
];
}