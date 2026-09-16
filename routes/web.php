<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ContactController;
use App\Models\Certificate;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $profile = Profile::first();

    $projects = Project::where('status', true)
        ->orderBy('urutan')
        ->orderByDesc('created_at')
        ->get();

    $experiences = Experience::where('status', true)
        ->orderBy('urutan')
        ->orderByDesc('tanggal_mulai')
        ->get();

    $certificates = Certificate::where('status', true)
        ->orderBy('urutan')
        ->orderByDesc('created_at')
        ->get();

    $projectCount = Project::where('status', true)->count();

    $certificateCount = Certificate::where('status', true)->count();

    $awardCount = Experience::where('type', 'pencapaian')
        ->where('status', true)
        ->count();

    return Inertia::render('welcome', [
        'profile' => $profile,
        'projects' => $projects,
        'experiences' => $experiences,
        'certificates' => $certificates,
        'projectCount' => $projectCount,
        'certificateCount' => $certificateCount,
        'awardCount' => $awardCount,
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    // Projects
    Route::resource('admin/projects', ProjectController::class)
        ->except(['show'])
        ->names('admin.projects');

    // Categories
    Route::resource('admin/categories', CategoryController::class)
        ->except(['show'])
        ->names('admin.categories');

    // Experiences
    Route::resource('admin/experiences', ExperienceController::class)
        ->except(['show'])
        ->names('admin.experiences');

    // Profile
    Route::get('admin/profile', [ProfileController::class, 'index'])
        ->name('admin.profile.index');

    Route::put('admin/profile', [ProfileController::class, 'update'])
        ->name('admin.profile.update');

    // Certificates
    Route::resource('admin/certificates', CertificateController::class)
        ->except(['show'])
        ->names('admin.certificates');
});

Route::post('/contact', [ContactController::class, 'send'])
    ->name('contact.send');

require __DIR__.'/settings.php';