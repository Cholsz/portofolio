import { FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Upload } from 'lucide-react';

type Certificate = {
    id: number;
    judul: string;
    institusi: string | null;
    tahun: string | null;
    deskripsi: string | null;
    gambar: string | null;
    link: string | null;
    urutan: number;
    status: boolean;
};

type Props = {
    certificate: Certificate;
};

export default function CertificateEdit({ certificate }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        judul: certificate.judul ?? '',
        institusi: certificate.institusi ?? '',
        tahun: certificate.tahun ?? '',
        deskripsi: certificate.deskripsi ?? '',
        gambar: null as File | null,
        link: certificate.link ?? '',
        urutan: String(certificate.urutan ?? 0),
        status: certificate.status,
        _method: 'PUT',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        post(`/admin/certificates/${certificate.id}`, {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Edit Certificate" />

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
                            Edit Certificate
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Perbarui informasi certificate.
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

                        {certificate.gambar && (
                            <div className="mt-3">
                                {certificate.gambar.toLowerCase().endsWith('.pdf') ? (
                                    <a
                                        href={`/storage/${certificate.gambar}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 rounded-lg border px-4 py-3 text-sm transition hover:bg-muted"
                                    >
                                        Lihat PDF Certificate
                                    </a>
                                ) : (
                                    <img
                                        src={`/storage/${certificate.gambar}`}
                                        alt={certificate.judul}
                                        className="h-40 w-64 rounded-lg border object-cover"
                                    />
                                )}
                            </div>
                        )}

                        <label
                            htmlFor="gambar"
                            className="mt-3 flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-3 text-sm transition hover:bg-muted"
                        >
                            <Upload size={17} />
                            Ganti Gambar / PDF
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
                                : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}