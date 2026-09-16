
import { Head, Link, router } from '@inertiajs/react';
import {
    Plus,
    Pencil,
    Trash2,
    Award,
    ExternalLink,
} from 'lucide-react';

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
    certificates: Certificate[];
};

const SUPABASE_STORAGE_URL =
    'https://untydpqfqpyvheljrcym.storage.supabase.co/storage/v1/object/public/portofolio';

export default function CertificateIndex({ certificates }: Props) {
    const handleDelete = (id: number) => {
        if (!confirm('Yakin ingin menghapus certificate ini?')) {
            return;
        }

        router.delete(`/admin/certificates/${id}`);
    };

    const getFileUrl = (path: string | null) => {
        if (!path) return null;

        return `${SUPABASE_STORAGE_URL}/${path}`;
    };

    const getPdfPreviewUrl = (fileUrl: string) => {
        return `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(
            fileUrl,
        )}`;
    };

    return (
        <>
            <Head title="Certificates" />

            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Certificates
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Kelola sertifikat dan pelatihan yang ditampilkan
                            pada portfolio.
                        </p>
                    </div>

                    <Link
                        href="/admin/certificates/create"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
                    >
                        <Plus size={17} />
                        Tambah Certificate
                    </Link>
                </div>

                {/* List */}
                <div className="overflow-hidden rounded-xl border bg-card">
                    {certificates.length === 0 ? (
                        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                            <Award
                                size={42}
                                className="text-muted-foreground"
                            />

                            <h2 className="mt-4 text-lg font-semibold">
                                Belum ada certificate
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Tambahkan certificate pertama kamu.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {certificates.map((certificate) => {
                                const fileUrl = getFileUrl(
                                    certificate.gambar,
                                );

                                const isPdf =
                                    certificate.gambar
                                        ?.toLowerCase()
                                        .endsWith('.pdf') ?? false;

                                return (
                                    <div
                                        key={certificate.id}
                                        className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        {/* Info */}
                                        <div className="flex items-start gap-4">
                                            {/* Preview */}
                                            {fileUrl ? (
                                                <a
                                                    href={fileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group relative h-24 w-20 shrink-0 overflow-hidden rounded-lg border bg-white"
                                                    title="Buka sertifikat"
                                                >
                                                    {isPdf ? (
                                                        <iframe
                                                            src={getPdfPreviewUrl(
                                                                fileUrl,
                                                            )}
                                                            title={
                                                                certificate.judul
                                                            }
                                                            className="pointer-events-none absolute left-0 top-0 h-[600px] w-[500px] border-0"
                                                        />
                                                    ) : (
                                                        <img
                                                            src={fileUrl}
                                                            alt={
                                                                certificate.judul
                                                            }
                                                            className="h-full w-full object-cover"
                                                        />
                                                    )}

                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100">
                                                        <ExternalLink
                                                            size={18}
                                                            className="text-white"
                                                        />
                                                    </div>
                                                </a>
                                            ) : (
                                                <div className="flex h-24 w-20 shrink-0 items-center justify-center rounded-lg border bg-muted">
                                                    <Award
                                                        size={28}
                                                        className="text-muted-foreground"
                                                    />
                                                </div>
                                            )}

                                            {/* Detail */}
                                            <div className="min-w-0">
                                                <h3 className="font-medium">
                                                    {certificate.judul}
                                                </h3>

                                                <p className="text-sm text-muted-foreground">
                                                    {certificate.institusi ||
                                                        'Tanpa institusi'}

                                                    {certificate.tahun &&
                                                        ` • ${certificate.tahun}`}
                                                </p>

                                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                                    <span
                                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                            certificate.status
                                                                ? 'bg-green-500/10 text-green-500'
                                                                : 'bg-red-500/10 text-red-500'
                                                        }`}
                                                    >
                                                        {certificate.status
                                                            ? 'Aktif'
                                                            : 'Nonaktif'}
                                                    </span>

                                                    {fileUrl && (
                                                        <a
                                                            href={fileUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground"
                                                        >
                                                            <ExternalLink
                                                                size={13}
                                                            />
                                                            Lihat file
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/admin/certificates/${certificate.id}/edit`}
                                                className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition hover:bg-muted"
                                            >
                                                <Pencil size={15} />
                                                Edit
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(
                                                        certificate.id,
                                                    )
                                                }
                                                className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-sm text-red-500 transition hover:bg-red-500/10"
                                            >
                                                <Trash2 size={15} />
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

