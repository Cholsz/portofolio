import { useEffect, useState } from 'react';
import { ArrowDown, Download, Github } from 'lucide-react';

type Profile = {
    nama: string;
    headline: string | null;
    deskripsi: string | null;
    foto: string | null;
};

type Props = {
    profile: Profile | null;
};

export default function Hero({ profile }: Props) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <style>{`
                @keyframes floatLaravel {
                    0%, 100% {
                        transform: translateY(0) rotate(-2deg);
                    }
                    50% {
                        transform: translateY(-14px) rotate(2deg);
                    }
                }

                @keyframes floatReact {
                    0%, 100% {
                        transform: translateY(0) rotate(2deg);
                    }
                    50% {
                        transform: translateY(12px) rotate(-2deg);
                    }
                }

                @keyframes floatTailwind {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                    }
                    50% {
                        transform: translateY(-10px) translateX(6px);
                    }
                }
            `}</style>

            <section
                id="home"
                className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24"
            >
                {/* Background Glow */}
                <div className="absolute left-1/4 top-1/4 -z-10 h-72 w-72 rounded-full bg-blue-600/15 blur-[120px]" />
                <div className="absolute bottom-0 right-0 -z-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[130px]" />

                <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-2">

                    {/* LEFT */}
                    <div
                        className={`text-center transition-all duration-1000 ease-out lg:text-left ${
                            visible
                                ? 'translate-y-0 opacity-100'
                                : 'translate-y-8 opacity-0'
                        }`}
                    >
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-md">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
                            Available for new opportunities
                        </div>

                        <p className="mb-3 text-lg font-medium text-blue-400">
                            Hello, I'm
                        </p>

                        <h1 className="text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
                            {profile?.nama || 'Chols'}
                            <span className="text-blue-500">.</span>
                        </h1>

                        <h2 className="mt-4 text-2xl font-semibold text-slate-300 sm:text-3xl">
                            {profile?.headline || 'Junior Web Developer'}
                        </h2>

                        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-400 lg:mx-0">
                            {profile?.deskripsi ||
                                'Fresh Graduate Teknik Informatika yang tertarik pada Web Development, UI/UX Design, dan Machine Learning. Saya senang membangun aplikasi yang fungsional, modern, dan nyaman digunakan.'}
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                            <a
                                href="/cv/CV-Chols.pdf"
                                target="_blank"
                                rel="noreferrer"
                                className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-1 hover:bg-blue-500 hover:shadow-blue-500/30"
                            >
                                Download CV
                                <Download
                                    size={18}
                                    className="transition-transform group-hover:translate-y-0.5"
                                />
                            </a>

                            <a
                                href="https://github.com/Cholsz"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-slate-200 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-blue-500/10"
                            >
                                <Github size={18} />
                                GitHub
                            </a>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div
                        className={`relative mx-auto flex h-[400px] w-full max-w-md items-center justify-center transition-all duration-1000 ease-out ${
                            visible
                                ? 'translate-y-0 opacity-100'
                                : 'translate-y-10 opacity-0'
                        }`}
                        style={{ transitionDelay: '250ms' }}
                    >
                        {/* Glow */}
                        <div className="absolute h-72 w-72 rounded-full bg-blue-600/20 blur-[80px]" />

                        {/* Outer Ring */}
                        <div className="absolute h-80 w-80 animate-pulse rounded-full border border-blue-500/10" />

                        {/* Profile Circle */}
                        <div className="relative flex h-72 w-72 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-2xl shadow-blue-900/20 backdrop-blur-xl transition duration-500 hover:scale-105">
                            <div className="flex h-60 w-60 items-center justify-center overflow-hidden rounded-full border border-blue-500/20 bg-slate-900 shadow-inner shadow-blue-500/10">
                                {profile?.foto ? (
                                    <img
                                        src={`/storage/${profile.foto}`}
                                        alt={profile.nama}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="text-7xl font-bold text-blue-500">
                                        {(profile?.nama || 'C')
                                            .charAt(0)
                                            .toUpperCase()}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Floating Web Development */}
                        <div
                            className="absolute left-0 top-10 rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm font-medium text-slate-300 shadow-xl shadow-blue-500/5 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
                            style={{
                                animation: 'floatLaravel 4s ease-in-out infinite',
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-blue-400">&lt;/&gt;</span>
                                Web Dev
                            </div>
                        </div>

                        {/* Floating UI/UX */}
                        <div
                            className="absolute bottom-10 right-0 rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm font-medium text-slate-300 shadow-xl shadow-blue-500/5 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
                            style={{
                                animation: 'floatReact 4.5s ease-in-out infinite',
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-cyan-400">✦</span>
                                UI/UX
                            </div>
                        </div>

                        {/* Floating Machine Learning */}
                        <div
                            className="absolute right-8 top-2 rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-xs font-medium text-slate-400 shadow-xl shadow-blue-500/5 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
                            style={{
                                animation: 'floatTailwind 3.8s ease-in-out infinite',
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-blue-400">◉</span>
                                ML
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <a
                    href="#about"
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 transition hover:text-blue-400"
                    aria-label="Scroll to About"
                >
                    <ArrowDown className="animate-bounce" />
                </a>
            </section>
        </>
    );
}