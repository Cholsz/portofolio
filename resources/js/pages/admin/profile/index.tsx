import { FormEvent, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { UserRound, Upload } from 'lucide-react';

type Profile = {
    id: number;
    nama: string;
    headline: string | null;
    deskripsi: string | null;
    foto: string | null;
    foto_about: string | null;
    gpa: string | null;
    project_count: string | null;
    certificate_count: string | null;
    award_count: string | null;
};

type Props = {
    profile: Profile | null;
};

export default function ProfilePage({ profile }: Props) {
    const [preview, setPreview] = useState<string | null>(
        profile?.foto ? `/storage/${profile.foto}` : null,
    );

    const [aboutPreview, setAboutPreview] = useState<string | null>(
        profile?.foto_about ? `/storage/${profile.foto_about}` : null,
    );

    const { data, setData, put, processing, errors } = useForm({
        nama: profile?.nama ?? '',
        headline: profile?.headline ?? '',
        deskripsi: profile?.deskripsi ?? '',
        foto: null as File | null,
        foto_about: null as File | null,
        gpa: profile?.gpa ?? '',
        project_count: profile?.project_count ?? '',
        certificate_count: profile?.certificate_count ?? '',
        award_count: profile?.award_count ?? '',
        
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        put('/admin/profile', {
            forceFormData: true,
        });
    };

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setData('foto', file);
        setPreview(URL.createObjectURL(file));
    };
    const handleAboutImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setData('foto_about', file);
        setAboutPreview(URL.createObjectURL(file));
    };

    return (
    <>
        <Head title="Profile" />

        <div className="flex flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Profile
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Kelola informasi profile dan foto yang ditampilkan
                        pada portfolio.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-3xl space-y-6 rounded-xl border bg-card p-6"
                >
                    {/* Foto */}
                    <div>
                        <label className="text-sm font-medium">
                            Foto Profile
                        </label>

                        <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                            <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border bg-muted">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Preview profile"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <UserRound
                                        size={42}
                                        className="text-muted-foreground"
                                    />
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="foto"
                                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
                                >
                                    <Upload size={16} />
                                    Pilih Foto
                                </label>

                                <input
                                    id="foto"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />

                                <p className="mt-2 text-xs text-muted-foreground">
                                    Maksimal 5 MB.
                                </p>

                                {errors.foto && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.foto}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Foto About */}
                    <div>
                        <label className="text-sm font-medium">
                            Foto About
                        </label>

                        <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                            <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border bg-muted">
                                {aboutPreview ? (
                                    <img
                                        src={aboutPreview}
                                        alt="Preview foto about"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <UserRound
                                        size={42}
                                        className="text-muted-foreground"
                                    />
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="foto_about"
                                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
                                >
                                    <Upload size={16} />
                                    Pilih Foto About
                                </label>

                                <input
                                    id="foto_about"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAboutImageChange}
                                    className="hidden"
                                />

                                <p className="mt-2 text-xs text-muted-foreground">
                                    Maksimal 5 MB.
                                </p>

                                {errors.foto_about && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.foto_about}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                   {/* Stats */}
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="gpa"
                                className="text-sm font-medium"
                            >
                                GPA Score
                            </label>

                            <input
                                id="gpa"
                                type="number"
                                step="0.01"
                                min="0"
                                max="4"
                                value={data.gpa}
                                onChange={(e) => setData('gpa', e.target.value)}
                                className="mt-2 w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                                placeholder="Contoh: 3.75"
                            />

                            {errors.gpa && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.gpa}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="project_count"
                                className="text-sm font-medium"
                            >
                                Jumlah Project
                            </label>

                            <input
                                id="project_count"
                                type="number"
                                min="0"
                                value={data.project_count}
                                onChange={(e) => setData('project_count', e.target.value)}
                                className="mt-2 w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                                placeholder="Contoh: 3"
                            />

                            {errors.project_count && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.project_count}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="certificate_count"
                                className="text-sm font-medium"
                            >
                                Jumlah Sertifikat
                            </label>

                            <input
                                id="certificate_count"
                                type="number"
                                min="0"
                                value={data.certificate_count}
                                onChange={(e) => setData('certificate_count', e.target.value)}
                                className="mt-2 w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                                placeholder="Contoh: 5"
                            />

                            {errors.certificate_count && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.certificate_count}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="award_count"
                                className="text-sm font-medium"
                            >
                                Jumlah Penghargaan
                            </label>

                            <input
                                id="award_count"
                                type="number"
                                min="0"
                                value={data.award_count}
                                onChange={(e) => setData('award_count', e.target.value)}
                                className="mt-2 w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                                placeholder="Contoh: 2"
                            />

                            {errors.award_count && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.award_count}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Nama */}
                    <div>
                        <label
                            htmlFor="nama"
                            className="text-sm font-medium"
                        >
                            Nama
                        </label>

                        <input
                            id="nama"
                            type="text"
                            value={data.nama}
                            onChange={(e) =>
                                setData('nama', e.target.value)
                            }
                            className="mt-2 w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                            placeholder="Nama kamu"
                        />

                        {errors.nama && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.nama}
                            </p>
                        )}
                    </div>

                    {/* Headline */}
                    <div>
                        <label
                            htmlFor="headline"
                            className="text-sm font-medium"
                        >
                            Headline
                        </label>

                        <input
                            id="headline"
                            type="text"
                            value={data.headline}
                            onChange={(e) =>
                                setData('headline', e.target.value)
                            }
                            className="mt-2 w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                            placeholder="Junior Web Developer"
                        />

                        {errors.headline && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.headline}
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
                            value={data.deskripsi}
                            onChange={(e) =>
                                setData('deskripsi', e.target.value)
                            }
                            rows={5}
                            className="mt-2 w-full resize-none rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:border-blue-500"
                            placeholder="Deskripsi singkat tentang diri kamu..."
                        />

                        {errors.deskripsi && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.deskripsi}
                            </p>
                        )}
                    </div>

                    

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Profile'}
                    </button>
                </form>
                   </div>
    </>
);
}