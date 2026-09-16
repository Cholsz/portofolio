import { Head } from '@inertiajs/react';
import {
    BriefcaseBusiness,
    FolderKanban,
    GraduationCap,
    Award,
} from 'lucide-react';

import { dashboard } from '@/routes';

type DashboardProps = {
    stats: {
        projects: number;
        categories: number;
        experiences: number;
        certificates: number;
    };
};

export default function Dashboard({ stats }: DashboardProps) {
    const dashboardStats = [
        {
            title: 'Projects',
            value: stats.projects,
            description: 'Project yang telah dibuat',
            icon: FolderKanban,
        },
        {
            title: 'Experience',
            value: stats.experiences,
            description: 'Organisasi, pelatihan & pencapaian',
            icon: BriefcaseBusiness,
        },
        {
            title: 'Certificates',
            value: stats.certificates,
            description: 'Sertifikat & pelatihan',
            icon: Award,
        },
        {
            title: 'Categories',
            value: stats.categories,
            description: 'Kategori project',
            icon: GraduationCap,
        },
    ];

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        Dashboard
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Kelola dan pantau portfolio kamu dari sini.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {dashboardStats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.title}
                                className="rounded-2xl border border-sidebar-border bg-background p-5 transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            {stat.title}
                                        </p>

                                        <p className="mt-2 text-3xl font-bold">
                                            {stat.value}
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
                                        <Icon size={20} />
                                    </div>
                                </div>

                                <p className="mt-4 text-xs text-muted-foreground">
                                    {stat.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Welcome */}
                <div className="rounded-2xl border border-sidebar-border bg-background p-6">
                    <div className="max-w-2xl">
                        <p className="text-sm font-medium text-blue-500">
                            Portfolio Admin
                        </p>

                        <h2 className="mt-2 text-xl font-semibold">
                            Selamat datang kembali 👋
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                            Gunakan halaman admin untuk mengelola konten
                            portfolio seperti project, pengalaman,
                            sertifikat, kategori, dan informasi profil.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};