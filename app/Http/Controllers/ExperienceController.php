<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    public function index(Request $request)
    {
        $query = Experience::query();

        if ($request->filled('type') && $request->type !== 'semua') {
            $query->where('type', $request->type);
        }

        $experiences = $query
            ->orderBy('urutan')
            ->orderByDesc('tanggal_mulai')
            ->get()
            ->map(function ($experience) {
                $experience->gambar_url = $experience->gambar
                ? 'https://untydpqfqpyvheljrcym.storage.supabase.co/storage/v1/object/public/portofolio/' . $experience->gambar
                : null;

            return $experience;
        });

        return Inertia::render('admin/experiences/index', [
            'experiences' => $experiences,
            'filter' => $request->type ?? 'semua',
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/experiences/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => [
                'required',
                'in:organisasi,pelatihan,pencapaian',
            ],
            'judul' => ['required', 'string', 'max:255'],
            'institusi' => ['nullable', 'string', 'max:255'],
            'deskripsi' => ['nullable', 'string'],
            'tanggal_mulai' => ['nullable', 'date_format:Y-m'],
            'tanggal_selesai' => [
                'nullable',
                'date_format:Y-m',
                'after_or_equal:tanggal_mulai',
            ],
            'gambar' => [
                'nullable',
                'file',
                'mimes:jpg,jpeg,png,webp,pdf',
                'max:10240',
            ],
            'urutan' => ['nullable', 'integer', 'min:0'],
            'status' => ['nullable', 'boolean'],
        ]);

        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');
            $path = 'experiences/' . $file->hashName();

            $stream = fopen($file->getRealPath(), 'r');

            Storage::disk('supabase')->writeStream($path, $stream);

            fclose($stream);

            $validated['gambar'] = $path;
        }

        $validated['status'] = $request->boolean('status', true);
        $validated['urutan'] = $validated['urutan'] ?? 0;

        Experience::create($validated);

        return redirect()
            ->route('admin.experiences.index')
            ->with('success', 'Experience berhasil ditambahkan.');
    }

    public function edit(Experience $experience)
    {
        return Inertia::render('admin/experiences/edit', [
            'experience' => $experience,
        ]);
    }

    public function update(Request $request, Experience $experience)
    {
        $validated = $request->validate([
            'type' => [
                'required',
                'in:organisasi,pelatihan,pencapaian',
            ],
            'judul' => ['required', 'string', 'max:255'],
            'institusi' => ['nullable', 'string', 'max:255'],
            'deskripsi' => ['nullable', 'string'],
            'tanggal_mulai' => ['nullable', 'date_format:Y-m'],
            'tanggal_selesai' => [
                'nullable',
                'date_format:Y-m',
                'after_or_equal:tanggal_mulai',
            ],
            'gambar' => [
                'nullable',
                'file',
                'mimes:jpg,jpeg,png,webp,pdf',
                'max:10240',
            ],
            'urutan' => ['nullable', 'integer', 'min:0'],
            'status' => ['nullable', 'boolean'],
        ]);

        if ($request->hasFile('gambar')) {
            if ($experience->gambar) {
                Storage::disk('supabase')->delete($experience->gambar);
            }

            $file = $request->file('gambar');
            $path = 'experiences/' . $file->hashName();

            $stream = fopen($file->getRealPath(), 'r');

            Storage::disk('supabase')->writeStream($path, $stream);

            fclose($stream);

            $validated['gambar'] = $path;
        }

        $validated['status'] = $request->boolean('status', false);
        $validated['urutan'] = $validated['urutan'] ?? 0;

        $experience->update($validated);

        return redirect()
            ->route('admin.experiences.index')
            ->with('success', 'Experience berhasil diperbarui.');
    }

    public function destroy(Experience $experience)
    {
        if ($experience->gambar) {
            Storage::disk('supabase')->delete($experience->gambar);
        }

        $experience->delete();

        return redirect()
            ->route('admin.experiences.index')
            ->with('success', 'Experience berhasil dihapus.');
    }
}