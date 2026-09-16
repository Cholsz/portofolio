import { useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';

const educations = [
    {
        year: '2022 — 2026',
        school: 'Universitas Teknologi AKBA Makassar',
        major: 'S1 - Teknik Informatika',
        description:'',
    },
    {
        year: '2019 — 2022',
        school: 'SMK Mutiara Ilmu Makassar',
        major: 'Sekolah Menengah Kejuruan',
        description: '',
    },
    {
        year: '2016 — 2019',
        school: 'SMPN 6 Moncongloe',
        major: 'Sekolah Menengah Pertama',
        description: '',
    },
    {
        year: '2010 — 2016',
        school: 'SDN 70 Manjalling',
        major: 'Sekolah Dasar',
        description: '',
    },
];

export default function Education() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="education" className="relative px-4 py-24 sm:px-6 sm:py-28">
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
                        Education
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                        Pendidikan
                    </h2>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                        Perjalanan pendidikan yang menjadi dasar dalam
                        pengembangan kemampuan saya di bidang teknologi.
                    </p>
                </div>

                {/* Education List */}
                <div className="relative mt-14">
                    <div className="absolute left-2 top-0 hidden h-full w-px bg-white/10 sm:block" />

                    <div className="space-y-10">
                        {educations.map((education, index) => (
                            <article
                                key={education.school}
                                className={`relative pl-0 transition-all duration-700 ease-out sm:pl-12 ${
                                    visible
                                        ? 'translate-y-0 opacity-100'
                                        : 'translate-y-8 opacity-0'
                                }`}
                                style={{
                                    transitionDelay: `${350 + index * 120}ms`,
                                }}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-0 top-1 hidden h-4 w-4 rounded-full border-2 border-blue-400 bg-slate-950 shadow-[0_0_15px_rgba(59,130,246,0.4)] sm:block" />

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-blue-400">
                                            {education.year}
                                        </p>

                                        <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">
                                            {education.school}
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-300">
                                            {education.major}
                                        </p>

                                        {education.description && (
                                            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                                                {education.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="hidden text-slate-600 sm:block">
                                        <GraduationCap size={24} />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}