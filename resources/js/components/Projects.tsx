
import { useEffect, useState } from 'react';
import { ArrowUpRight, Github, X } from 'lucide-react';

type ProjectItem = {
    id: number;
    judul: string;
    deskripsi: string | null;
    gambar: string | null;
    gambar_url: string | null;
    teknologi: string | null;
    github_url: string | null;
    demo_url: string | null;
};

type Props = {
    projects: ProjectItem[];
};

const SUPABASE_STORAGE_URL =
    'https://untydpqfqpyvheljrcym.storage.supabase.co/storage/v1/object/public/portofolio';

export default function Projects({ projects }: Props) {
    const [visible, setVisible] = useState(false);
    const [selectedProject, setSelectedProject] =
        useState<ProjectItem | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    const getImageUrl = (project: ProjectItem) => {
        if (project.gambar_url) {
            return project.gambar_url;
        }

        if (!project.gambar) {
            return null;
        }

        if (project.gambar.startsWith('http')) {
            return project.gambar;
        }

        return `${SUPABASE_STORAGE_URL}/${project.gambar}`;
    };

    return (
        <>
            <section
                id="projects"
                className="relative scroll-mt-24 px-4 py-28 sm:px-6"
            >
                <div className="mx-auto max-w-6xl">
                    {/* Header */}
                    <div
                        className={`transition-all duration-700 ${
                            visible
                                ? 'translate-y-0 opacity-100'
                                : 'translate-y-8 opacity-0'
                        }`}
                    >
                        <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
                            Selected Work
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                            Featured Projects
                        </h2>

                        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                            Beberapa project yang saya kerjakan untuk
                            mengembangkan kemampuan dalam web development,
                            UI/UX, dan machine learning.
                        </p>
                    </div>

                    {/* Project Cards */}
                    <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project, index) => {
                            const technologies = project.teknologi
                                ? project.teknologi
                                      .split(',')
                                      .map((item) => item.trim())
                                      .filter(Boolean)
                                : [];

                            const imageUrl = getImageUrl(project);

                            return (
                                <article
                                    key={project.id}
                                    className={`group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-700 hover:-translate-y-2 hover:border-blue-500/30 hover:bg-white/[0.06] hover:shadow-[0_25px_60px_rgba(59,130,246,0.12)] ${
                                        visible
                                            ? 'translate-y-0 opacity-100'
                                            : 'translate-y-10 opacity-0'
                                    }`}
                                    style={{
                                        transitionDelay: `${350 + index * 120}ms`,
                                    }}
                                >
                                    {/* Image */}
                                    <div className="relative aspect-video overflow-hidden bg-slate-900">
                                        {imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                alt={project.judul}
                                                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-sm text-slate-500">
                                                No Image
                                            </div>
                                        )}

                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                                        <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-950/70 text-xs font-semibold text-white backdrop-blur-md">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 sm:p-6">
                                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-400">
                                            Project
                                        </p>

                                        <h3 className="mt-2 text-xl font-semibold text-white">
                                            {project.judul}
                                        </h3>

                                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
                                            {project.deskripsi || '-'}
                                        </p>

                                        {/* Technologies */}
                                        {technologies.length > 0 && (
                                            <div className="mt-5 flex flex-wrap gap-2">
                                                {technologies
                                                    .slice(0, 4)
                                                    .map((technology) => (
                                                        <span
                                                            key={technology}
                                                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                                                        >
                                                            {technology}
                                                        </span>
                                                    ))}
                                            </div>
                                        )}

                                        {/* View Project */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSelectedProject(project)
                                            }
                                            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition hover:text-blue-300"
                                        >
                                            View Project
                                            <ArrowUpRight
                                                size={16}
                                                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            />
                                        </button>
                                    </div>

                                    <div className="h-px w-0 bg-blue-500 transition-all duration-500 group-hover:w-full" />
                                </article>
                            );
                        })}
                    </div>

                    {/* Empty State */}
                    {projects.length === 0 && (
                        <div className="mt-14 rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
                            <p className="text-sm text-slate-500">
                                Belum ada project yang ditampilkan.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Project Detail Modal */}
            {selectedProject && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-6"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {/* Close */}
                        <button
                            type="button"
                            onClick={() => setSelectedProject(null)}
                            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-slate-400 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
                            aria-label="Close project"
                        >
                            <X size={20} />
                        </button>

                        <div className="overflow-y-auto">
                            {/* Image */}
                            {getImageUrl(selectedProject) && (
                                <div className="relative overflow-hidden bg-slate-900">
                                    <img
                                        src={getImageUrl(selectedProject)!}
                                        alt={selectedProject.judul}
                                        className="max-h-[50vh] w-full object-cover"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                                </div>
                            )}

                            {/* Detail */}
                            <div className="p-6 sm:p-8">
                                <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-400">
                                    Project Details
                                </p>

                                <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                                    {selectedProject.judul}
                                </h3>

                                {/* Description */}
                                <div className="mt-7">
                                    <p className="text-sm font-medium text-white">
                                        About this project
                                    </p>

                                    <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-400 sm:text-base">
                                        {selectedProject.deskripsi || '-'}
                                    </p>
                                </div>

                                {/* Technologies */}
                                {selectedProject.teknologi && (
                                    <div className="mt-7">
                                        <p className="text-sm font-medium text-white">
                                            Technologies
                                        </p>

                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {selectedProject.teknologi
                                                .split(',')
                                                .map((item) => item.trim())
                                                .filter(Boolean)
                                                .map((technology) => (
                                                    <span
                                                        key={technology}
                                                        className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-300"
                                                    >
                                                        {technology}
                                                    </span>
                                                ))}
                                        </div>
                                    </div>
                                )}

                                {/* Links */}
                                <div className="mt-8 flex flex-wrap gap-3">
                                    {selectedProject.demo_url && (
                                        <a
                                            href={selectedProject.demo_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
                                        >
                                            Live Demo
                                            <ArrowUpRight size={16} />
                                        </a>
                                    )}

                                    {selectedProject.github_url && (
                                        <a
                                            href={selectedProject.github_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                                        >
                                            <Github size={16} />
                                            GitHub
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

