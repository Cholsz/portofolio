<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CertificateController extends Controller
{
    public function index()
    {
        $certificates = Certificate::orderBy('urutan')
            ->orderByDesc('created_at')
            ->get()
            ->map(function ($certificate) {
                $certificate->gambar_url = $certificate->gambar
                    ? 'https://untydpqfqpyvheljrcym.storage.supabase.co/storage/v1/object/public/portofolio/' . $certificate->gambar
                    : null;

                return $certificate;
            });

        return Inertia::render('admin/certificates/index', [
            'certificates' => $certificates,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/certificates/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => ['required', 'string', 'max:255'],
            'institusi' => ['nullable', 'string', 'max:255'],
            'tahun' => ['nullable', 'string', 'max:20'],
            'deskripsi' => ['nullable', 'string'],
            'gambar' => [
                'nullable',
                'file',
                'mimes:jpg,jpeg,png,webp,pdf',
                'max:10000',
            ],
            'link' => ['nullable', 'url', 'max:255'],
            'urutan' => ['nullable', 'integer', 'min:0'],
            'status' => ['nullable', 'boolean'],
        ]);

        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');
            $path = 'certificates/' . $file->hashName();

            $stream = fopen($file->getRealPath(), 'r');

            Storage::disk('supabase')->writeStream($path, $stream);

            fclose($stream);

            $validated['gambar'] = $path;
        }

        $validated['urutan'] = $validated['urutan'] ?? 0;
        $validated['status'] = $request->boolean('status', true);

        Certificate::create($validated);

        return redirect()
            ->route('admin.certificates.index')
            ->with('success', 'Certificate berhasil ditambahkan.');
    }

    public function edit(Certificate $certificate)
    {
        return Inertia::render('admin/certificates/edit', [
            'certificate' => $certificate,
        ]);
    }

    public function update(Request $request, Certificate $certificate)
    {
        $validated = $request->validate([
            'judul' => ['required', 'string', 'max:255'],
            'institusi' => ['nullable', 'string', 'max:255'],
            'tahun' => ['nullable', 'string', 'max:20'],
            'deskripsi' => ['nullable', 'string'],
            'gambar' => [
                'nullable',
                'file',
                'mimes:jpg,jpeg,png,webp,pdf',
                'max:10000',
            ],
            'link' => ['nullable', 'url', 'max:255'],
            'urutan' => ['nullable', 'integer', 'min:0'],
            'status' => ['nullable', 'boolean'],
        ]);

        if ($request->hasFile('gambar')) {
            if ($certificate->gambar) {
                Storage::disk('supabase')->delete($certificate->gambar);
            }

            $file = $request->file('gambar');
            $path = 'certificates/' . $file->hashName();

            $stream = fopen($file->getRealPath(), 'r');

            Storage::disk('supabase')->writeStream($path, $stream);

            fclose($stream);

            $validated['gambar'] = $path;
        }

        $validated['urutan'] = $validated['urutan'] ?? 0;
        $validated['status'] = $request->boolean('status', false);

        $certificate->update($validated);

        return redirect()
            ->route('admin.certificates.index')
            ->with('success', 'Certificate berhasil diperbarui.');
    }

    public function destroy(Certificate $certificate)
    {
        if ($certificate->gambar) {
            Storage::disk('supabase')->delete($certificate->gambar);
        }

        $certificate->delete();

        return redirect()
            ->route('admin.certificates.index')
            ->with('success', 'Certificate berhasil dihapus.');
    }
}