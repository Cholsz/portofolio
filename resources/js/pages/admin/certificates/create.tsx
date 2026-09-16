import { FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Upload } from 'lucide-react';

export default function CertificateCreate() {
    const { data, setData, post, processing, errors } = useForm({
        judul: '',
        institusi: '',
        tahun: '',
        deskripsi: '',
        gambar: null as File | null,
        link: '',
        urutan: '0',
        status: true,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        post('/admin/certificates', {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Tambah Certificate" />

            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/certificates"
                        className="rounded-lg border p-2 transition hover:bg-muted"
                    >
                        <ArrowLeft size={18} />
                    </Link>

                    <div>
                        <h1 className="text-2xl font-semibold">
                            Tambah Certificate
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Tambahkan sertifikat atau pelatihan baru.
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-3xl space-y-6 rounded-xl border bg-card p-6"
                >
                    {/* Judul */}
                    <div>
                        <label
                            htmlFor="judul"
                            className="text-sm font-medium"
                        >
                            Judul Certificate
                        </label>

                        <input
                            id="judul"
                            type="text"
                            value={data.judul}
                            onChange={(e) =>
                                setData('judul', e.target.value)
                            }
                            className="mt-2 w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                            placeholder="Contoh: Laravel Web Development"
                        />

                        {errors.judul && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.judul}
                            </p>
                        )}
                    </div>

                    {/* Institusi */}
                    <div>
                        <label
                            htmlFor="institusi"
                            className="text-sm font-medium"
                        >
                            Institusi
                        </label>

                        <input
                            id="institusi"
                            type="text"
                            value={data.institusi}
                            onChange={(e) =>
                                setData('institusi', e.target.value)
                            }
                            className="mt-2 w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                            placeholder="Contoh: Dicoding Indonesia"
                        />

                        {errors.institusi && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.institusi}
                            </p>
                        )}
                    </div>

                    {/* Tahun */}
                    <div>
                        <label
                            htmlFor="tahun"
                            className="text-sm font-medium"
                        >
                            Tahun
                        </label>

                        <input
                            id="tahun"
                            type="text"
                            value={data.tahun}
                            onChange={(e) =>
                                setData('tahun', e.target.value)
                            }
                            className="mt-2 w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                            placeholder="Contoh: 2026"
                        />

                        {errors.tahun && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.tahun}
                            </p>
                        )}
                    </div>

                    {/* Deskripsi */}
                    <div>
                        <label
                            htmlFor="deskripsi"
                            className="text-sm font-medium"
                        >
                            Deskripsi
                        </label>

                        <textarea
                            id="deskripsi"
                            rows={5}
                            value={data.deskripsi}
                            onChange={(e) =>
                                setData('deskripsi', e.target.value)
                            }
                            className="mt-2 w-full resize-none rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:border-blue-500"
                            placeholder="Deskripsi singkat tentang certificate..."
                        />

                        {errors.deskripsi && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.deskripsi}
                            </p>
                        )}
                    </div>

                    {/* Gambar / PDF */}
                    <div>
                        <label
                            htmlFor="gambar"
                            className="text-sm font-medium"
                        >
                            Gambar / PDF Certificate
                        </label>

                        <label
                            htmlFor="gambar"
                            className="mt-2 flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-3 text-sm transition hover:bg-muted"
                        >
                            <Upload size={17} />
                            Pilih Gambar / PDF
                        </label>

                        <input
                            id="gambar"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) =>
                                setData(
                                    'gambar',
                                    e.target.files?.[0] ?? null,
                                )
                            }
                            className="hidden"
                        />

                        <p className="mt-2 text-xs text-muted-foreground">
                            Format: JPG, JPEG, PNG, WEBP, atau PDF. Maksimal 5 MB.
                        </p>

                        {errors.gambar && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.gambar}
                            </p>
                        )}
                    </div>

                    {/* Link */}
                    <div>
                        <label
                            htmlFor="link"
                            className="text-sm font-medium"
                        >
                            Link Certificate
                        </label>

                        <input
                            id="link"
                            type="url"
                            value={data.link}
                            onChange={(e) =>
                                setData('link', e.target.value)
                            }
                            className="mt-2 w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                            placeholder="https://..."
                        />

                        {errors.link && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.link}
                            </p>
                        )}
                    </div>

                    {/* Urutan */}
                    <div>
                        <label
                            htmlFor="urutan"
                            className="text-sm font-medium"
                        >
                            Urutan
                        </label>

                        <input
                            id="urutan"
                            type="number"
                            min="0"
                            value={data.urutan}
                            onChange={(e) =>
                                setData('urutan', e.target.value)
                            }
                            className="mt-2 w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                        />

                        {errors.urutan && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.urutan}
                            </p>
                        )}
                    </div>

                    {/* Status */}
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={data.status}
                            onChange={(e) =>
                                setData('status', e.target.checked)
                            }
                            className="h-4 w-4"
                        />

                        <span className="text-sm font-medium">
                            Tampilkan di portfolio
                        </span>
                    </label>

                    {/* Submit */}
                    <div className="flex justify-end gap-3">
                        <Link
                            href="/admin/certificates"
                            className="rounded-lg border px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
                        >
                            Batal
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing
                                ? 'Menyimpan...'
                                : 'Simpan Certificate'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}