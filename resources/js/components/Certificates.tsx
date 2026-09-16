
import { useState } from 'react';
import { Award, ExternalLink, X } from 'lucide-react';

type Certificate = {
    id: number;
    judul: string;
    institusi: string | null;
    tahun: string | null;
    deskripsi: string | null;
    gambar: string | null;
    gambar_url: string | null;
    link: string | null;
};

type Props = {
    certificates: Certificate[];
};

export default function Certificates({ certificates }: Props) {
    const [selectedCertificate, setSelectedCertificate] =
        useState<Certificate | null>(null);

    const getFileUrl = (certificate: Certificate) => {
        if (certificate.gambar_url) {
            return certificate.gambar_url;
        }

        if (!certificate.gambar) {
            return null;
        }

        if (certificate.gambar.startsWith('http')) {
            return certificate.gambar;
        }

        return `https://untydpqfqpyvheljrcym.storage.supabase.co/storage/v1/object/public/portofolio/${certificate.gambar}`;
    };

    return (
        <>
            <section
                id="certificates"
                className="scroll-mt-24 px-4 py-24 sm:px-6"
            >
                <div className="mx-auto max-w-6xl">
                    {/* Header */}
                    <div className="mb-12">
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
                            Certificates
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                            Certifications & Achievements
                        </h2>

                        <p className="mt-4 max-w-2xl text-slate-400">
                            Beberapa sertifikat dan pencapaian yang telah saya
                            peroleh selama proses belajar dan pengembangan
                            diri.
                        </p>
                    </div>

                    {/* Certificates */}
                    {certificates.length > 0 ? (
                        <div className="grid gap-5 md:grid-cols-2">
                            {certificates.map((certificate) => (
                                <div
                                    key={certificate.id}
                                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.05]"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                                            <Award size={22} />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-semibold text-white">
                                                {certificate.judul}
                                            </h3>

                                            {certificate.institusi && (
                                                <p className="mt-1 text-sm text-blue-400">
                                                    {certificate.institusi}
                                                </p>
                                            )}

                                            {certificate.tahun && (
                                                <p className="mt-1 text-xs text-slate-500">
                                                    {certificate.tahun}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {certificate.deskripsi && (
                                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-400">
                                            {certificate.deskripsi}
                                        </p>
                                    )}

                                    <div className="mt-6 flex flex-wrap gap-3">
                                        {certificate.gambar && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedCertificate(
                                                        certificate,
                                                    )
                                                }
                                                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
                                            >
                                                Show Certificate
                                            </button>
                                        )}

                                        {certificate.link && (
                                            <a
                                                href={certificate.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white"
                                            >
                                                View Link
                                                <ExternalLink size={15} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
                            <p className="text-sm text-slate-500">
                                Belum ada sertifikat yang ditampilkan.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Certificate Modal */}
            {selectedCertificate?.gambar && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedCertificate(null)}
                >
                    <div
                        className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                            <div className="min-w-0 pr-4">
                                <h3 className="truncate font-semibold text-white">
                                    {selectedCertificate.judul}
                                </h3>

                                {selectedCertificate.institusi && (
                                    <p className="mt-1 text-xs text-slate-500">
                                        {selectedCertificate.institusi}
                                    </p>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedCertificate(null)
                                }
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
                                aria-label="Close certificate"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Preview */}
                        <div className="max-h-[calc(90vh-73px)] overflow-auto bg-black/20 p-4">
                            {selectedCertificate.gambar
                                .toLowerCase()
                                .endsWith('.pdf') ? (
                                <iframe
                                    src={getFileUrl(selectedCertificate) ?? ''}
                                    className="h-[600px] w-full"
                                    title={selectedCertificate.judul}
                                />
                            ) : (
                                <img
                                    src={getFileUrl(selectedCertificate) ?? ''}
                                    alt={selectedCertificate.judul}
                                    className="mx-auto max-h-[75vh] w-auto rounded-xl object-contain"
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

