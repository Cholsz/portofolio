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

        /*
        |--------------------------------------------------------------------------
        | Foto Profile
        |--------------------------------------------------------------------------
        */
        if ($request->hasFile('foto')) {
            if ($profile?->foto) {
                Storage::disk('supabase')->delete($profile->foto);
            }

            $file = $request->file('foto');
            $path = 'profile/' . uniqid() . '.' . $file->getClientOriginalExtension();

            $stream = fopen($file->getRealPath(), 'r');

            Storage::disk('supabase')->writeStream($path, $stream);

            fclose($stream);

            $validated['foto'] = $path;
        }

        /*
        |--------------------------------------------------------------------------
        | Foto About
        |--------------------------------------------------------------------------
        */
        if ($request->hasFile('foto_about')) {
            if ($profile?->foto_about) {
                Storage::disk('supabase')->delete($profile->foto_about);
            }

            $file = $request->file('foto_about');
            $path = 'profile/about/' . uniqid() . '.' . $file->getClientOriginalExtension();

            $stream = fopen($file->getRealPath(), 'r');

            Storage::disk('supabase')->writeStream($path, $stream);

            fclose($stream);

            $validated['foto_about'] = $path;
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