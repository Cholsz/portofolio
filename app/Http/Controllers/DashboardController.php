<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Certificate;
use App\Models\Experience;
use App\Models\Project;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'projects' => Project::count(),
            'categories' => Category::count(),
            'experiences' => Experience::count(),
            'certificates' => Certificate::count(),
        ];

        return Inertia::render('dashboard', [
            'stats' => $stats,
        ]);
    }
}