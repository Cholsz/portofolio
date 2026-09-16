import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        status: true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/admin/categories');
    };

    return (
        <>
            <Head title="Tambah Kategori" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/categories"
                        className="rounded-xl border border-sidebar-border p-2 transition hover:bg-muted"
                    >
                        <ArrowLeft size={18} />
                    </Link>

                    <div>
                        <h1 className="text-2xl font-bold">
                            Tambah Kategori
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Tambahkan kategori untuk project portfolio.
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={submit}
                    className="max-w-xl space-y-6 rounded-2xl border border-sidebar-border bg-background p-6"
                >
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Nama Kategori
                        </label>

                        <input
                            type="text"
                            value={data.nama}
                            onChange={(e) =>
                                setData('nama', e.target.value)
                            }
                            placeholder="Contoh: Web Development"
                            className="w-full rounded-xl border border-sidebar-border bg-background px-4 py-3 outline-none focus:border-blue-500"
                        />

                        {errors.nama && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.nama}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={data.status}
                            onChange={(e) =>
                                setData('status', e.target.checked)
                            }
                            className="h-4 w-4"
                        />

                        <label className="text-sm font-medium">
                            Kategori aktif
                        </label>
                    </div>

                    <div className="flex justify-end gap-3 border-t border-sidebar-border pt-6">
                        <Link
                            href="/admin/categories"
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
                                : 'Simpan Kategori'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}