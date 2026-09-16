import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';

type Category = {
    id: number;
    nama: string;
    status: boolean;
};

type Props = {
    categories: Category[];
};

export default function Index({ categories }: Props) {
    return (
        <>
            <Head title="Categories" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Categories</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Kelola kategori project portfolio.
                        </p>
                    </div>

                    <Link
                        href="/admin/categories/create"
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
                    >
                        <Plus size={18} />
                        Tambah Kategori
                    </Link>
                </div>

                <div className="overflow-hidden rounded-2xl border border-sidebar-border bg-background">
                    <table className="w-full text-sm">
                        <thead className="border-b border-sidebar-border">
                            <tr className="text-left">
                                <th className="px-5 py-4">Nama Kategori</th>
                                <th className="px-5 py-4">Status</th>
                                <th className="px-5 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {categories.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="px-5 py-10 text-center text-muted-foreground"
                                    >
                                        Belum ada kategori.
                                    </td>
                                </tr>
                            ) : (
                                categories.map((category) => (
                                    <tr
                                        key={category.id}
                                        className="border-b border-sidebar-border last:border-0"
                                    >
                                        <td className="px-5 py-4 font-medium">
                                            {category.nama}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                    category.status
                                                        ? 'bg-green-500/10 text-green-500'
                                                        : 'bg-red-500/10 text-red-500'
                                                }`}
                                            >
                                                {category.status
                                                    ? 'Aktif'
                                                    : 'Nonaktif'}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/categories/${category.id}/edit`}
                                                    className="rounded-lg border border-sidebar-border p-2 transition hover:bg-muted"
                                                >
                                                    <Pencil size={16} />
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (
                                                            confirm(
                                                                `Yakin ingin menghapus kategori "${category.nama}"?`,
                                                            )
                                                        ) {
                                                            router.delete(`/admin/categories/${category.id}`);
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
        </>
    );
}