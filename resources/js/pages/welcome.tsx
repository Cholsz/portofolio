import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

import AppNavbar from '@/components/AppNavbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Certificates from '@/components/Certificates';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

type CertificateItem = {
    id: number;
    judul: string;
    institusi: string | null;
    tahun: string | null;
    deskripsi: string | null;
    gambar: string | null;
    link: string | null;
};

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

type ProjectItem = {
    id: number;
    judul: string;
    deskripsi: string | null;
    gambar: string | null;
    teknologi: string | null;
    github_url: string | null;
    demo_url: string | null;
};

type ExperienceItem = {
    id: number;
    type: 'organisasi' | 'pelatihan' | 'pencapaian';
    judul: string;
    institusi: string | null;
    deskripsi: string | null;
    tanggal_mulai: string | null;
    tanggal_selesai: string | null;
};

type Props = {
    profile: Profile | null;
    projects: ProjectItem[];
    experiences: ExperienceItem[];
    certificates: CertificateItem[];
    projectCount: number;
    certificateCount: number;
    awardCount: number;
};

export default function Welcome({
    profile,
    projects,
    experiences,
    certificates,
    projectCount,
    certificateCount,
    awardCount,
}: Props) {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        });
    }, []);

    return (
        <>
            <Head title="Portfolio" />

            <div className="min-h-screen bg-slate-950 text-white">
                <AppNavbar />

                <main>
                    <Hero profile={profile} />
                    <About
                        profile={profile}
                        projectCount={projectCount}
                        certificateCount={certificateCount}
                        awardCount={awardCount}
                    />
                    <Skills />
                    <Projects projects={projects} />
                    <Experience experiences={experiences} />
                    <Education />
                    <Certificates certificates={certificates} />
                    <Contact />
                    <Footer />
                </main>
            </div>
        </>
    );
}