
import { useEffect, useState } from 'react';
import { Code2, Palette, BrainCircuit } from 'lucide-react';

type Profile = {
    nama: string;
    headline: string | null;
    deskripsi: string | null;
    foto_about: string | null;
    gpa: string | null;
};

type Props = {
    profile: Profile | null;
    projectCount: number;
    certificateCount: number;
    awardCount: number;
};

const focusAreas = [
    {
        title: 'Web Development',
        description:
            'Membangun aplikasi web yang fungsional, responsif, dan mudah digunakan.',
        icon: Code2,
    },
    {
        title: 'UI/UX Design',
        description:
            'Merancang antarmuka yang sederhana, modern, dan nyaman bagi pengguna.',
        icon: Palette,
    },
    {
        title: 'Machine Learning',
        description:
            'Mengembangkan solusi machine learning untuk kebutuhan klasifikasi dan analisis data.',
        icon: BrainCircuit,
    },
];

export default function About({
    profile,
    projectCount,
    certificateCount,
    awardCount,
}: Props) {
    const stats = [
        {
            value: profile?.gpa || '—',
            label: 'GPA Score',
        },
        {
            value: `${projectCount}+`,
            label: 'Engineering Projects',
        },
        {
            value: `${certificateCount}+`,
            label: 'Certificates',
        },
        {
            value: `${awardCount}+`,
            label: 'Awards & Honors',
        },
    ];

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 150);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="about" className="relative px-6 py-28">
            {/* Background Glow */}
            <div className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 rounded-full bg-blue-600/5 blur-[120px]" />

            <div className="relative mx-auto max-w-6xl">
                {/* Heading */}
                <div
                    className={`transition-all duration-700 ease-out ${
                        visible
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-8 opacity-0'
                    }`}
                >
                    <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
                        About Me
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                        Professional Summary
                    </h2>
                </div>

                {/* Main Content */}
                <div className="mt-14 grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
                    {/* Profile */}
                    <div
                        className={`flex justify-center transition-all duration-700 ease-out lg:justify-start ${
                            visible
                                ? 'translate-y-0 opacity-100'
                                : 'translate-y-10 opacity-0'
                        }`}
                        style={{ transitionDelay: '150ms' }}
                    >
                        <div className="relative">
                            {/* Glow */}
                            <div className="absolute inset-0 scale-90 rounded-full bg-blue-500/20 blur-3xl" />

                            {/* Image */}
                            <div className="relative h-72 w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-blue-500/10 sm:h-80">
                                {profile?.foto_about ? (
                                    <img
                                        src={
                                            profile.foto_about
                                                ? `https://untydpqfqpyvheljrcym.storage.supabase.co/storage/v1/object/public/portofolio/${profile.foto_about}`
                                                : undefined
                                        }
                                        alt={`Foto ${profile.nama}`}
                                        className="h-full w-full rounded-xl object-cover transition duration-500 hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center rounded-xl bg-slate-900 text-7xl font-bold text-blue-500">
                                        {(profile?.nama || 'C')
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>
                                )}
                            </div>

                            {/* Decorative Circle */}
                            <div className="absolute -inset-3 -z-10 rounded-full border border-blue-500/10" />
                            <div className="absolute -inset-7 -z-10 rounded-full border border-white/5" />
                        </div>
                    </div>

                    {/* Text */}
                    <div
                        className={`transition-all duration-700 ease-out ${
                            visible
                                ? 'translate-y-0 opacity-100'
                                : 'translate-y-10 opacity-0'
                        }`}
                        style={{ transitionDelay: '250ms' }}
                    >
                        <h3 className="text-2xl font-semibold text-white">
                            {profile?.headline || 'Junior Web Developer'}
                        </h3>

                        <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
                            {profile?.deskripsi ||
                                'Saya merupakan fresh graduate Teknik Informatika yang memiliki ketertarikan pada pengembangan aplikasi web, desain antarmuka, dan machine learning.'}
                        </p>

                        <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                            Saya terbiasa menggunakan Laravel, React,
                            JavaScript, Tailwind CSS, Python, dan beberapa
                            teknologi pendukung lainnya. Saya senang mempelajari
                            teknologi baru dan membangun solusi yang dapat
                            memberikan pengalaman pengguna yang baik.
                        </p>

                        {/* Stats */}
                        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {stats.map((stat, index) => (
                                <div
                                    key={stat.label}
                                    className={`rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all duration-700 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-blue-500/5 ${
                                        visible
                                            ? 'translate-y-0 opacity-100'
                                            : 'translate-y-6 opacity-0'
                                    }`}
                                    style={{
                                        transitionDelay: `${400 + index * 100}ms`,
                                    }}
                                >
                                    <p className="text-xl font-bold text-blue-400">
                                        {stat.value}
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Focus Areas */}
                <div className="mt-24">
                    <div
                        className={`transition-all duration-700 ease-out ${
                            visible
                                ? 'translate-y-0 opacity-100'
                                : 'translate-y-8 opacity-0'
                        }`}
                        style={{ transitionDelay: '500ms' }}
                    >
                        <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
                            Focus Areas
                        </p>

                        <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                            Area yang saya fokuskan
                        </h3>
                    </div>

                    <div className="mt-8 grid gap-5 md:grid-cols-3">
                        {focusAreas.map((area, index) => {
                            const Icon = area.icon;

                            return (
                                <article
                                    key={area.title}
                                    className={`group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-700 ease-out hover:-translate-y-2 hover:border-blue-500/30 hover:bg-blue-500/5 hover:shadow-[0_20px_50px_rgba(59,130,246,0.08)] ${
                                        visible
                                            ? 'translate-y-0 opacity-100'
                                            : 'translate-y-8 opacity-0'
                                    }`}
                                    style={{
                                        transitionDelay: `${600 + index * 120}ms`,
                                    }}
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 transition duration-300 group-hover:scale-110">
                                        <Icon size={22} />
                                    </div>

                                    <h4 className="mt-5 text-lg font-semibold text-white">
                                        {area.title}
                                    </h4>

                                    <p className="mt-3 text-sm leading-6 text-slate-400">
                                        {area.description}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

