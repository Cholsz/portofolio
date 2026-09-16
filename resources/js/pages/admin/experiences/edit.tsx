import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

type Experience = {
    id: number;
    type: 'organisasi' | 'pelatihan' | 'pencapaian';
    judul: string;
    institusi: string | null;
    deskripsi: string | null;
    tanggal_mulai: string | null;
    tanggal_selesai: string | null;
    gambar: string | null;
    urutan: number;
    status: boolean;
};

type Props = {
    experience: Experience;
};

export default function Edit({ experience }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        type: experience.type,
        judul: experience.judul,
        institusi: experience.institusi ?? '',
        deskripsi: experience.deskripsi ?? '',
        tanggal_mulai: experience.tanggal_mulai ?? '',
        tanggal_selesai: experience.tanggal_selesai ?? '',
        gambar: null as File | null,
        urutan: experience.urutan,
        status: experience.status,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(`/admin/experiences/${experience.id}`, {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Edit Experience" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/experiences"
                        className="rounded-xl border border-sidebar-border p-2 transition hover:bg-muted"
                    >
                        <ArrowLeft size={18} />
                    </Link>

                    <div>
                        <h1 className="text-2xl font-bold">
                            Edit Experience
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Perbarui informasi experience.
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={submit}
                    className="max-w-3xl space-y-6 rounded-2xl border border-sidebar-border bg-background p-6"
                >
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Jenis
                        </label>

                        <select
                            value={data.type}
                            onChange={(e) =>
                                setData(
                                    'type',
                                    e.target.value as
                                        | 'organisasi'
                                        | 'pelatihan'
                                        | 'pencapaian',
                                )
                            }
                            className="w-full rounded-xl border border-sidebar-border bg-background px-4 py-3 outline-none focus:border-blue-500"
                        >
                            <option value="organisasi">
                                Organisasi
                            </option>
                            <option value="pelatihan">
                                Pelatihan
                            </option>
                            <option value="pencapaian">
                                Pencapaian
                            </option>
                        </select>

                        {errors.type && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.type}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Judul
                        </label>

                        <input
                            type="text"
                            value={data.judul}
                            onChange={(e) =>
                                setData('judul', e.target.value)
                            }
                            className="w-full rounded-xl border border-sidebar-border bg-background px-4 py-3 outline-none focus:border-blue-500"
                        />

                        {errors.judul && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.judul}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Institusi / Organisasi
                        </label>

                        <input
                            type="text"
                            value={data.institusi}
                            onChange={(e) =>
                                setData('institusi', e.target.value)
                            }
                            className="w-full rounded-xl border border-sidebar-border bg-background px-4 py-3 outline-none focus:border-blue-500"
                        />
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
                        />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Bulan Mulai
                            </label>

                            <input
                                type="month"
                                value={data.tanggal_mulai}
                                onChange={(e) =>
                                    setData('tanggal_mulai', e.target.value)
                                }
                                className="w-full rounded-xl border border-sidebar-border bg-background px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Bulan Selesai
                            </label>

                            <input
                                type="month"
                                value={data.tanggal_selesai}
                                onChange={(e) =>
                                    setData('tanggal_selesai', e.target.value)
                                }
                                className="w-full rounded-xl border border-sidebar-border bg-background px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Gambar / Sertifikat
                        </label>

                        {experience.gambar && (
                            <p className="mb-2 text-xs text-muted-foreground">
                                Gambar saat ini sudah tersimpan. Pilih file
                                baru jika ingin menggantinya.
                            </p>
                        )}

                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,application/pdf"
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
                            href="/admin/experiences"
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
                                : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}