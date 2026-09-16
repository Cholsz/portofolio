<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        $profile = Profile::first();

        return Inertia::render('admin/profile/index', [
            'profile' => $profile,
        ]);
    }

    public function update(Request $request)
    {
        $profile = Profile::first();

        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'headline' => ['nullable', 'string', 'max:255'],
            'deskripsi' => ['nullable', 'string'],

            'foto' => ['nullable', 'image', 'max:5120'],
            'foto_about' => ['nullable', 'image', 'max:5120'],

            'gpa' => ['nullable', 'numeric', 'min:0', 'max:4'],
            'project_count' => ['nullable', 'integer', 'min:0'],
            'certificate_count' => ['nullable', 'integer', 'min:0'],
            'award_count' => ['nullable', 'integer', 'min:0'],
        ]);

        if ($request->hasFile('foto')) {
            if ($profile?->foto) {
                Storage::disk('public')->delete($profile->foto);
            }

            $validated['foto'] = $request->file('foto')
                ->store('profile', 'public');
        }

        if ($request->hasFile('foto_about')) {
            if ($profile?->foto_about) {
                Storage::disk('public')->delete($profile->foto_about);
            }

            $validated['foto_about'] = $request->file('foto_about')
                ->store('profile/about', 'public');
        }

        if ($profile) {
            $profile->update($validated);
        } else {
            Profile::create($validated);
        }

        return redirect()
            ->route('admin.profile.index')
            ->with('success', 'Profile berhasil diperbarui.');
    }
}