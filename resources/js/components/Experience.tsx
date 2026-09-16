
import { useEffect, useState } from 'react';
import {
    Award,
    BookOpen,
    Users,
    X,
    ExternalLink,
} from 'lucide-react';

type ExperienceItem = {
    id: number;
    type: 'organisasi' | 'pelatihan' | 'pencapaian';
    judul: string;
    institusi: string | null;
    deskripsi: string | null;
    tanggal_mulai: string | null;
    tanggal_selesai: string | null;
    gambar: string | null;
    gambar_url: string | null;
};

type Props = {
    experiences: ExperienceItem[];
};

const typeIcons = {
    organisasi: Users,
    pelatihan: BookOpen,
    pencapaian: Award,
};

const typeLabels = {
    organisasi: 'Organisasi',
    pelatihan: 'Pelatihan',
    pencapaian: 'Pencapaian',
};

type FilterType = 'semua' | 'organisasi' | 'pelatihan' | 'pencapaian';

const SUPABASE_STORAGE_URL =
    'https://untydpqfqpyvheljrcym.storage.supabase.co/storage/v1/object/public/portofolio';

export default function Experience({ experiences }: Props) {
    const [visible, setVisible] = useState(false);
    const [activeFilter, setActiveFilter] =
        useState<FilterType>('semua');

    const [selectedExperience, setSelectedExperience] =
        useState<ExperienceItem | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    const filters: { value: FilterType; label: string }[] = [
        { value: 'semua', label: 'Semua' },
        { value: 'organisasi', label: 'Organisasi' },
        { value: 'pelatihan', label: 'Pelatihan' },
        { value: 'pencapaian', label: 'Pencapaian' },
    ];

    const filteredExperiences =
        activeFilter === 'semua'
            ? experiences
            : experiences.filter(
                  (experience) =>
                      experience.type === activeFilter,
              );

    const getFileUrl = (experience: ExperienceItem) => {
        if (experience.gambar_url) {
            return experience.gambar_url;
        }

        if (!experience.gambar) {
            return null;
        }

        if (experience.gambar.startsWith('http')) {
            return experience.gambar;
        }

        return `${SUPABASE_STORAGE_URL}/${experience.gambar}`;
    };

    const isPdf = (gambar: string) => {
        return gambar.toLowerCase().endsWith('.pdf');
    };

    const formatDate = (date: string | null) => {
        if (!date) return '-';

        return new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <>
            <section
                id="experience"
                className="relative px-6 py-28"
            >
                <div className="mx-auto max-w-6xl">
                    {/* Heading */}
                    <div
                        className={`transition-all duration-700 ease-out ${
                            visible
                                ? 'translate-y-0 opacity-100'
                                : 'translate-y-8 opacity-0'
                        }`}
                    >
                        <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
                            Experience
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                            Pengalaman & Pencapaian
                        </h2>

                        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                            Pengalaman organisasi, pelatihan, dan
                            pencapaian yang mendukung perkembangan
                            saya di bidang teknologi.
                        </p>
                    </div>

                    {/* Filter */}
                    <div
                        className={`mt-10 flex flex-wrap gap-3 transition-all duration-700 ease-out ${
                            visible
                                ? 'translate-y-0 opacity-100'
                                : 'translate-y-5 opacity-0'
                        }`}
                    >
                        {filters.map((filter) => {
                            const isActive =
                                activeFilter === filter.value;

                            return (
                                <button
                                    key={filter.value}
                                    type="button"
                                    onClick={() =>
                                        setActiveFilter(filter.value)
                                    }
                                    className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                                        isActive
                                            ? 'border-blue-500/40 bg-blue-500/15 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.12)]'
                                            : 'border-white/10 bg-white/5 text-slate-400 hover:border-blue-500/30 hover:bg-white/[0.08] hover:text-white'
                                    }`}
                                >
                                    {filter.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Cards */}
                    <div className="mt-12">
                        {filteredExperiences.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                {filteredExperiences.map(
                                    (experience, index) => {
                                        const Icon =
                                            typeIcons[experience.type];

                                        const typeLabel =
                                            typeLabels[experience.type];

                                        const year =
                                            experience.tanggal_mulai
                                                ? new Date(
                                                      experience.tanggal_mulai,
                                                  ).getFullYear()
                                                : '-';

                                        return (
                                            <article
                                                key={experience.id}
                                                className={`group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-700 ease-out hover:-translate-y-2 hover:border-blue-500/30 hover:bg-white/[0.07] hover:shadow-[0_20px_50px_rgba(59,130,246,0.08)] ${
                                                    visible
                                                        ? 'translate-y-0 opacity-100'
                                                        : 'translate-y-10 opacity-0'
                                                }`}
                                                style={{
                                                    transitionDelay: `${
                                                        450 + index * 100
                                                    }ms`,
                                                }}
                                            >
                                                {/* Header */}
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                                                        <Icon size={19} />
                                                    </div>

                                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
                                                        {year}
                                                    </span>
                                                </div>

                                                {/* Type */}
                                                <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-blue-400">
                                                    {typeLabel}
                                                </p>

                                                {/* Title */}
                                                <h3 className="mt-3 text-lg font-semibold leading-7 text-white">
                                                    {experience.judul}
                                                </h3>

                                                {/* Institution */}
                                                <p className="mt-2 text-sm font-medium text-slate-300">
                                                    {experience.institusi || '-'}
                                                </p>

                                                {/* Description */}
                                                <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-400">
                                                    {experience.deskripsi || '-'}
                                                </p>

                                                {/* Detail Button */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedExperience(
                                                            experience,
                                                        )
                                                    }
                                                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition hover:text-blue-300"
                                                >
                                                    Lihat Detail
                                                    <ExternalLink size={15} />
                                                </button>

                                                {/* Bottom Line */}
                                                <div className="mt-5 h-px w-0 bg-blue-500 transition-all duration-500 group-hover:w-full" />
                                            </article>
                                        );
                                    },
                                )}
                            </div>
                        ) : (
                            <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-12 text-center backdrop-blur-xl">
                                <p className="text-sm text-slate-400">
                                    Belum ada data untuk kategori ini.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Modal */}
            {selectedExperience && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedExperience(null)}
                >
                    <div
                        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-2xl sm:p-8"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {/* Close */}
                        <button
                            type="button"
                            onClick={() => setSelectedExperience(null)}
                            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
                        >
                            <X size={18} />
                        </button>

                        {/* Type */}
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-400">
                            {typeLabels[selectedExperience.type]}
                        </p>

                        {/* Title */}
                        <h3 className="mt-3 pr-10 text-2xl font-bold text-white sm:text-3xl">
                            {selectedExperience.judul}
                        </h3>

                        {/* Institution */}
                        <p className="mt-2 text-sm font-medium text-slate-300">
                            {selectedExperience.institusi || '-'}
                        </p>

                        {/* Date */}
                        <p className="mt-2 text-sm text-slate-500">
                            {formatDate(
                                selectedExperience.tanggal_mulai,
                            )}

                            {selectedExperience.tanggal_selesai &&
                                ` — ${formatDate(
                                    selectedExperience.tanggal_selesai,
                                )}`}
                        </p>

                        {/* Certificate / Image */}
                        {getFileUrl(selectedExperience) && (
                            <div className="mt-7 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                                {selectedExperience.gambar &&
                                isPdf(selectedExperience.gambar) ? (
                                    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                                            <BookOpen size={28} />
                                        </div>

                                        <h4 className="mt-4 font-semibold text-white">
                                            Dokumen Sertifikat
                                        </h4>

                                        <p className="mt-2 text-sm text-slate-400">
                                            File sertifikat tersedia dalam
                                            format PDF.
                                        </p>

                                        <a
                                            href={getFileUrl(
                                                selectedExperience,
                                            )!}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-400"
                                        >
                                            Buka Sertifikat
                                            <ExternalLink size={15} />
                                        </a>
                                    </div>
                                ) : (
                                    <img
                                        src={getFileUrl(
                                            selectedExperience,
                                        )!}
                                        alt={selectedExperience.judul}
                                        className="max-h-[500px] w-full object-contain"
                                    />
                                )}
                            </div>
                        )}

                        {/* Description */}
                        <div className="mt-7">
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                                Deskripsi
                            </h4>

                            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-400">
                                {selectedExperience.deskripsi || '-'}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
