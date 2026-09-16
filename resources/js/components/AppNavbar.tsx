import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Contact', href: '#contact' },
];

export default function AppNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);

            const sections = navItems
                .map((item) => document.querySelector(item.href))
                .filter(Boolean);

            let currentSection = 'home';

            sections.forEach((section) => {
                if (!section) return;

                const rect = section.getBoundingClientRect();

                if (rect.top <= 150) {
                    currentSection = section.id;
                }
            });

            setActiveSection(currentSection);
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNavClick = () => {
        setMobileOpen(false);
    };

    return (
        <header
            className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
                scrolled
                    ? 'border-b border-white/10 bg-slate-950/80 backdrop-blur-xl'
                    : 'bg-transparent'
            }`}
        >
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">

                {/* Logo */}
                <a
                    href="#home"
                    onClick={handleNavClick}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xl font-bold tracking-tight text-white shadow-lg shadow-blue-500/5 backdrop-blur-md transition hover:border-blue-500/30 hover:bg-white/10"
                >
                    Chols<span className="text-blue-500">.</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden items-center gap-1 lg:flex">
                    {navItems.map((item) => {
                        const sectionId = item.href.replace('#', '');
                        const isActive = activeSection === sectionId;

                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                className={`relative rounded-lg px-3 py-2 text-sm transition-all duration-300 ${
                                    isActive
                                        ? 'text-blue-400'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                {item.name}

                                <span
                                    className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-blue-500 transition-all duration-300 ${
                                        isActive
                                            ? 'w-5 opacity-100'
                                            : 'w-0 opacity-0'
                                    }`}
                                />
                            </a>
                        );
                    })}
                </div>

                {/* Contact Button Desktop */}
                <a
                    href="#contact"
                    className="hidden rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 lg:block"
                >
                    Let's Talk
                </a>

                {/* Mobile Button */}
                <button
                    type="button"
                    onClick={() => setMobileOpen((prev) => !prev)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white lg:hidden"
                    aria-label={
                        mobileOpen
                            ? 'Close navigation'
                            : 'Open navigation'
                    }
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`overflow-hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
                    mobileOpen
                        ? 'max-h-[620px] opacity-100'
                        : 'max-h-0 opacity-0'
                }`}
            >
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
                    <div className="flex flex-col gap-1">
                        {navItems.map((item) => {
                            const sectionId = item.href.replace('#', '');
                            const isActive = activeSection === sectionId;

                            return (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={handleNavClick}
                                    className={`rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                                        isActive
                                            ? 'bg-blue-500/10 text-blue-400'
                                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    {item.name}
                                </a>
                            );
                        })}

                        {/* Mobile Let's Talk */}
                        <a
                            href="#contact"
                            onClick={handleNavClick}
                            className="mt-2 flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-500"
                        >
                            Let's Talk
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}