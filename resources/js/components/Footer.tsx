import { ArrowUp } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-white/10 px-4 py-8 sm:px-6">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="text-center text-sm text-slate-500 sm:text-left">
                    © {currentYear} Chols. All rights reserved.
                </p>

                <a
                    href="#home"
                    className="group flex items-center gap-2 text-sm text-slate-400 transition hover:text-blue-400"
                >
                    Kembali ke atas
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition group-hover:border-blue-500/30 group-hover:bg-blue-500/10">
                        <ArrowUp
                            size={15}
                            className="transition-transform group-hover:-translate-y-0.5"
                        />
                    </span>
                </a>
            </div>
        </footer>
    );
}