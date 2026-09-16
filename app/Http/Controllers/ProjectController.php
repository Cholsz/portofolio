<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with('category')
            ->orderBy('urutan')
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('admin/projects/index', [
            'projects' => $projects,
        ]);
    }

    public function create()
    {
        $categories = \App\Models\Category::where('status', true)
            ->orderBy('nama')
            ->get();

        return Inertia::render('admin/projects/create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
        {
            $validated = $request->validate([
        'judul' => ['required', 'string', 'max:255'],
        'category_id' => ['required', 'exists:categories,id'],
        'deskripsi' => ['nullable', 'string'],
        'gambar' => ['nullable', 'image', 'max:2048'],
        'teknologi' => ['nullable', 'string'],
        'github_url' => ['nullable', 'url', 'max:255'],
        'demo_url' => ['nullable', 'url', 'max:255'],
        'urutan' => ['nullable', 'integer', 'min:0'],
        'status' => ['nullable', 'boolean'],
    ]);

        $validated['slug'] = Str::slug($validated['judul']);

        if ($request->hasFile('gambar')) {
            $validated['gambar'] = $request->file('gambar')
                ->store('projects', 'public');
        }

        $validated['status'] = $request->boolean('status', true);
        $validated['urutan'] = $validated['urutan'] ?? 0;

        Project::create($validated);

        return redirect()
            ->route('admin.projects.index')
            ->with('success', 'Project berhasil ditambahkan.');
    }

    public function edit(Project $project)
    {
        $categories = \App\Models\Category::where('status', true)
            ->orderBy('nama')
            ->get();

        return Inertia::render('admin/projects/edit', [
            'project' => $project,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'judul' => ['required', 'string', 'max:255'],
            'category_id' => ['required', 'exists:categories,id'],
            'deskripsi' => ['nullable', 'string'],
            'gambar' => ['nullable', 'image', 'max:2048'],
            'teknologi' => ['nullable', 'string'],
            'github_url' => ['nullable', 'url', 'max:255'],
            'demo_url' => ['nullable', 'url', 'max:255'],
            'urutan' => ['nullable', 'integer', 'min:0'],
            'status' => ['nullable', 'boolean'],
        ]);

        $validated['slug'] = Str::slug($validated['judul']);

        if ($request->hasFile('gambar')) {
            if ($project->gambar) {
                Storage::disk('public')->delete($project->gambar);
            }

            $validated['gambar'] = $request->file('gambar')
                ->store('projects', 'public');
        }

        $validated['status'] = $request->boolean('status', false);
        $validated['urutan'] = $validated['urutan'] ?? 0;

        $project->update($validated);

        return redirect()
            ->route('admin.projects.index')
            ->with('success', 'Project berhasil diperbarui.');
    }

    public function destroy(Project $project)
    {
        if ($project->gambar) {
            Storage::disk('public')->delete($project->gambar);
        }

        $project->delete();

        return redirect()
            ->route('admin.projects.index')
            ->with('success', 'Project berhasil dihapus.');
    }
}