import { Head, Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

type Project = {
    id: number;
    judul: string;
    category: {
        id: number;
        nama: string;
    } | null;
    status: boolean;
};

type Props = {
    projects: Project[];
};

export default function Index({ projects }: Props) {
    return (
        <>
            <Head title="Projects" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Projects</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Kelola project portfolio kamu.
                        </p>
                    </div>

                    <Link
                        href="/admin/projects/create"
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
                    >
                        <Plus size={18} />
                        Tambah Project
                    </Link>
                </div>

                <div className="overflow-hidden rounded-2xl border border-sidebar-border bg-background">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b border-sidebar-border">
                                <tr className="text-left">
                                    <th className="px-5 py-4">Project</th>
                                    <th className="px-5 py-4">Kategori</th>
                                    <th className="px-5 py-4">Status</th>
                                    <th className="px-5 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {projects.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-5 py-10 text-center text-muted-foreground"
                                        >
                                            Belum ada project.
                                        </td>
                                    </tr>
                                ) : (
                                    projects.map((project) => (
                                        <tr
                                            key={project.id}
                                            className="border-b border-sidebar-border last:border-0"
                                        >
                                            <td className="px-5 py-4 font-medium">
                                                {project.judul}
                                            </td>

                                            <td className="px-5 py-4 text-muted-foreground">
                                                {project.category?.nama || '-'}
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                        project.status
                                                            ? 'bg-green-500/10 text-green-500'
                                                            : 'bg-red-500/10 text-red-500'
                                                    }`}
                                                >
                                                    {project.status
                                                        ? 'Aktif'
                                                        : 'Nonaktif'}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/admin/projects/${project.id}/edit`}
                                                        className="rounded-lg border border-sidebar-border p-2 transition hover:bg-muted"
                                                    >
                                                        <Pencil size={16} />
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (
                                                                confirm(
                                                                    `Yakin ingin menghapus project "${project.judul}"?`,
                                                                )
                                                            ) {
                                                                router.delete(`/admin/projects/${project.id}`);
                                                            }
                                                        }}
                                                        className="rounded-lg border border-sidebar-border p-2 text-red-500 transition hover:bg-red-500/10"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}