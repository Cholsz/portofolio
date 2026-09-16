
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

type Category = {
    id: number;
    nama: string;
};

type Props = {
    categories: Category[];
};

export default function Create({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        judul: '',
        category_id: '',
        deskripsi: '',
        gambar: null as File | null,
        teknologi: '',
        github_url: '',
        demo_url: '',
        urutan: 0,
        status: true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/admin/projects', {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Tambah Project" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/projects"
                        className="rounded-xl border border-sidebar-border p-2 transition hover:bg-muted"
                    >
                        <ArrowLeft size={18} />
                    </Link>

                    <div>
                        <h1 className="text-2xl font-bold">
                            Tambah Project
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Tambahkan project baru ke portfolio.
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={submit}
                    className="max-w-3xl space-y-6 rounded-2xl border border-sidebar-border bg-background p-6"
                >
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Judul Project
                        </label>

                        <input
                            type="text"
                            value={data.judul}
                            onChange={(e) =>
                                setData('judul', e.target.value)
                            }
                            className="w-full rounded-xl border border-sidebar-border bg-background px-4 py-3 outline-none focus:border-blue-500"
                            placeholder="Contoh: Sistem Kasir"
                        />

                        {errors.judul && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.judul}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Kategori
                        </label>

                        <select
                            value={data.category_id}
                            onChange={(e) =>
                                setData('category_id', e.target.value)
                            }
                            className="w-full rounded-xl border border-sidebar-border bg-background px-4 py-3 outline-none focus:border-blue-500"
                        >
                            <option value="">Pilih kategori</option>

                            {categories.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.nama}
                                </option>
                            ))}
                        </select>

                        {errors.category_id && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.category_id}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Deskripsi
                        </label>

                        <textarea
                            value={data.deskripsi}
                            onChange={(e) =>
                                setData('deskripsi', e.target.value)
                            }
                            rows={5}
                            className="w-full rounded-xl border border-sidebar-border bg-background px-4 py-3 outline-none focus:border-blue-500"
                            placeholder="Jelaskan project kamu..."
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Gambar Project
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setData(
                                    'gambar',
                                    e.target.files?.[0] ?? null,
                                )
                            }
                            className="w-full rounded-xl border border-sidebar-border p-3 text-sm"
                        />

                        {errors.gambar && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.gambar}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Teknologi
                        </label>

                        <textarea
                            value={data.teknologi}
                            onChange={(e) =>
                                setData('teknologi', e.target.value)
                            }
                            rows={3}
                            className="w-full rounded-xl border border-sidebar-border bg-background px-4 py-3 outline-none focus:border-blue-500"
                            placeholder="Laravel, React, Tailwind CSS, MySQL"
                        />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                GitHub URL
                            </label>

                            <input
                                type="url"
                                value={data.github_url}
                                onChange={(e) =>
                                    setData('github_url', e.target.value)
                                }
                                className="w-full rounded-xl border border-sidebar-border bg-background px-4 py-3 outline-none focus:border-blue-500"
                                placeholder="https://github.com/..."
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Demo URL
                            </label>

                            <input
                                type="url"
                                value={data.demo_url}
                                onChange={(e) =>
                                    setData('demo_url', e.target.value)
                                }
                                className="w-full rounded-xl border border-sidebar-border bg-background px-4 py-3 outline-none focus:border-blue-500"
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Urutan
                            </label>

                            <input
                                type="number"
                                min="0"
                                value={data.urutan}
                                onChange={(e) =>
                                    setData(
                                        'urutan',
                                        Number(e.target.value),
                                    )
                                }
                                className="w-full rounded-xl border border-sidebar-border bg-background px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex items-center gap-3 pt-8">
                            <input
                                type="checkbox"
                                checked={data.status}
                                onChange={(e) =>
                                    setData('status', e.target.checked)
                                }
                                className="h-4 w-4"
                            />

                            <label className="text-sm font-medium">
                                Tampilkan di portfolio
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 border-t border-sidebar-border pt-6">
                        <Link
                            href="/admin/projects"
                            className="rounded-xl border border-sidebar-border px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
                        >
                            Batal
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
                        >
                            <Save size={17} />
                            {processing
                                ? 'Menyimpan...'
                                : 'Simpan Project'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

