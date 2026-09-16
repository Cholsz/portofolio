
import { Head, Link, router } from '@inertiajs/react';
import {
    FileText,
    Pencil,
    Plus,
    Trash2,
} from 'lucide-react';

type Experience = {
    id: number;
    type: 'organisasi' | 'pelatihan' | 'pencapaian';
    judul: string;
    institusi: string | null;
    deskripsi?: string | null;
    tanggal_mulai: string | null;
    tanggal_selesai: string | null;
    gambar?: string | null;
    gambar_url?: string | null;
    status: boolean;
};

type Props = {
    experiences: Experience[];
    filter: 'semua' | 'organisasi' | 'pelatihan' | 'pencapaian';
};

export default function Index({ experiences, filter }: Props) {
    const formatDate = (date: string | null) => {
        if (!date) return '-';

        return new Date(date + '-01').toLocaleDateString('id-ID', {
            month: 'short',
            year: 'numeric',
        });
    };

    const typeLabel = (type: Experience['type']) => {
        return {
            organisasi: 'Organisasi',
            pelatihan: 'Pelatihan',
            pencapaian: 'Pencapaian',
        }[type];
    };

    const typeStyle = (type: Experience['type']) => {
        return {
            organisasi: 'bg-blue-500/10 text-blue-500',
            pelatihan: 'bg-purple-500/10 text-purple-500',
            pencapaian: 'bg-yellow-500/10 text-yellow-500',
        }[type];
    };

    const isPdf = (url: string) => {
        return url.toLowerCase().endsWith('.pdf');
    };

    const handleFilter = (type: string) => {
        router.get(
            '/admin/experiences',
            type === 'semua' ? {} : { type },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <>
            <Head title="Experience" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">

                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Experience
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Kelola organisasi, pelatihan, dan pencapaian.
                        </p>
                    </div>

                    <Link
                        href="/admin/experiences/create"
                        className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
                    >
                        <Plus size={18} />
                        Tambah Experience
                    </Link>
                </div>

                {/* Filter */}
                <div className="flex flex-wrap gap-2">
                    {[
                        { value: 'semua', label: 'Semua' },
                        { value: 'organisasi', label: 'Organisasi' },
                        { value: 'pelatihan', label: 'Pelatihan' },
                        { value: 'pencapaian', label: 'Pencapaian' },
                    ].map((item) => (
                        <button
                            key={item.value}
                            type="button"
                            onClick={() => handleFilter(item.value)}
                            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                                filter === item.value
                                    ? 'bg-blue-600 text-white'
                                    : 'border border-sidebar-border bg-background hover:bg-muted'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Cards */}
                {experiences.length === 0 ? (
                    <div className="rounded-2xl border border-sidebar-border bg-background px-5 py-12 text-center">
                        <p className="text-sm text-muted-foreground">
                            Belum ada experience untuk kategori ini.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                        {experiences.map((experience) => (
                            <div
                                key={experience.id}
                                className="flex flex-col overflow-hidden rounded-2xl border border-sidebar-border bg-background transition hover:shadow-md"
                            >
                                {/* Preview */}
                                {experience.gambar_url && (
                                    <div className="h-48 overflow-hidden border-b border-sidebar-border bg-muted">
                                        {isPdf(experience.gambar_url) ? (
                                            <div className="flex h-full flex-col items-center justify-center gap-3">
                                                <FileText
                                                    size={48}
                                                    className="text-red-500"
                                                />

                                                <div className="text-center">
                                                    <p className="text-sm font-semibold">
                                                        Dokumen PDF
                                                    </p>

                                                    <a
                                                        href={
                                                            experience.gambar_url
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="mt-1 inline-block text-xs text-blue-500 hover:underline"
                                                    >
                                                        Lihat PDF
                                                    </a>
                                                </div>
                                            </div>
                                        ) : (
                                            <img
                                                src={experience.gambar_url}
                                                alt={experience.judul}
                                                className="h-full w-full object-cover"
                                            />
                                        )}
                                    </div>
                                )}

                                {/* Content */}
                                <div className="flex flex-1 flex-col p-5">
                                    {/* Badge */}
                                    <div className="mb-3 flex items-center justify-between gap-3">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${typeStyle(
                                                experience.type,
                                            )}`}
                                        >
                                            {typeLabel(experience.type)}
                                        </span>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                experience.status
                                                    ? 'bg-green-500/10 text-green-500'
                                                    : 'bg-red-500/10 text-red-500'
                                            }`}
                                        >
                                            {experience.status
                                                ? 'Aktif'
                                                : 'Nonaktif'}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-lg font-semibold">
                                        {experience.judul}
                                    </h2>

                                    {/* Institution */}
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {experience.institusi || '-'}
                                    </p>

                                    {/* Period */}
                                    <p className="mt-3 text-sm text-muted-foreground">
                                        {formatDate(
                                            experience.tanggal_mulai,
                                        )}{' '}
                                        -{' '}
                                        {formatDate(
                                            experience.tanggal_selesai,
                                        )}
                                    </p>

                                    {/* Description */}
                                    {experience.deskripsi && (
                                        <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                                            {experience.deskripsi}
                                        </p>
                                    )}

                                    {/* Actions */}
                                    <div className="mt-auto flex justify-end gap-2 pt-5">
                                        <Link
                                            href={`/admin/experiences/${experience.id}/edit`}
                                            className="rounded-lg border border-sidebar-border p-2 transition hover:bg-muted"
                                        >
                                            <Pencil size={16} />
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (
                                                    confirm(
                                                        `Yakin ingin menghapus "${experience.judul}"?`,
                                                    )
                                                ) {
                                                    router.delete(
                                                        `/admin/experiences/${experience.id}`,
                                                    );
                                                }
                                            }}
                                            className="rounded-lg border border-sidebar-border p-2 text-red-500 transition hover:bg-red-500/10"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

