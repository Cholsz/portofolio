import { useEffect, useState } from 'react';

type Skill = {
    name: string;
    icon: string;
};

const skills: Skill[] = [
    { name: 'Laravel', icon: 'laravel' },
    { name: 'PHP', icon: 'php' },
    { name: 'React', icon: 'react' },
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'Tailwind CSS', icon: 'tailwindcss' },
    { name: 'Vite', icon: 'vite' },
    { name: 'MySQL', icon: 'mysql' },
    { name: 'Git', icon: 'git' },
    { name: 'GitHub', icon: 'github' },
    { name: 'Figma', icon: 'figma' },
    { name: 'Python', icon: 'python' },
    { name: 'TensorFlow', icon: 'tensorflow' },
    { name: 'Flask', icon: 'flask' },
];

export default function Skills() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="skills" className="px-6 py-28">
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
                        Skills & Tools
                    </p>

                    <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                        Teknologi yang saya gunakan
                    </h2>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                        Teknologi dan tools yang saya gunakan dalam pengembangan
                        aplikasi, desain, dan machine learning.
                    </p>
                </div>

                {/* Skills */}
                <div className="mt-14 flex flex-wrap justify-center gap-4 sm:justify-start">
                    {skills.map((skill, index) => (
                        <div
                            key={skill.name}
                            className={`transition-all duration-700 ease-out ${
                                visible
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-8 opacity-0'
                            }`}
                            style={{
                                transitionDelay: `${200 + index * 80}ms`,
                            }}
                        >
                            <div
                                className="
                                    animate-skill-float
                                    group flex items-center gap-3
                                    rounded-2xl border border-white/10
                                    bg-white/5 px-4 py-3
                                    backdrop-blur-xl
                                    transition-all duration-300
                                    hover:-translate-y-2
                                    hover:border-blue-500/40
                                    hover:bg-blue-500/10
                                    hover:shadow-[0_10px_30px_rgba(59,130,246,0.12)]
                                "
                                style={{
                                    animationDelay: `${index * 0.18}s`,
                                }}
                            >
                                <img
                                    src={`https://cdn.simpleicons.org/${skill.icon}`}
                                    alt={skill.name}
                                    className="h-7 w-7 transition-transform duration-300 group-hover:scale-110"
                                />

                                <span className="text-sm font-medium text-slate-300 transition-colors group-hover:text-white">
                                    {skill.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}