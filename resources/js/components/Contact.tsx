import { FormEvent, useEffect, useState } from 'react';
import {
    Mail,
    MapPin,
    Github,
    Linkedin,
    Send,
    CheckCircle,
} from 'lucide-react';

export default function Contact() {
    const [visible, setVisible] = useState(false);
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setSending(true);
        setSuccess(false);
        setErrors({});

        const form = event.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch('/contact', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'X-CSRF-TOKEN':
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute('content') ?? '',
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 422) {
                    setErrors(data.errors ?? {});
                } else {
                    setErrors({
                        general: ['Terjadi kesalahan. Silakan coba lagi.'],
                    });
                }

                return;
            }

            form.reset();
            setSuccess(true);
        } catch {
            setErrors({
                general: ['Gagal mengirim pesan. Silakan coba lagi.'],
            });
        } finally {
            setSending(false);
        }
    };

    return (
        <section
            id="contact"
            className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-28"
        >
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" />

            <div className="relative mx-auto max-w-5xl">
                <div
                    className={`rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-700 sm:p-12 ${
                        visible
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-8 opacity-0'
                    }`}
                >
                    <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                        {/* Left */}
                        <div>
                            <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
                                Contact
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                                Mari terhubung
                            </h2>

                            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                                Jika kamu memiliki project, peluang kerja,
                                atau sekadar ingin berdiskusi tentang teknologi,
                                jangan ragu untuk menghubungi saya.
                            </p>

                            <form
                                onSubmit={handleSubmit}
                                className="mt-8 space-y-4"
                            >
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nama"
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500/50 focus:bg-white/[0.07]"
                                />

                                {errors.name && (
                                    <p className="text-xs text-red-400">
                                        {errors.name[0]}
                                    </p>
                                )}

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500/50 focus:bg-white/[0.07]"
                                />

                                {errors.email && (
                                    <p className="text-xs text-red-400">
                                        {errors.email[0]}
                                    </p>
                                )}

                                <textarea
                                    name="message"
                                    placeholder="Pesan"
                                    rows={5}
                                    required
                                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500/50 focus:bg-white/[0.07]"
                                />

                                {errors.message && (
                                    <p className="text-xs text-red-400">
                                        {errors.message[0]}
                                    </p>
                                )}

                                {errors.general && (
                                    <p className="text-sm text-red-400">
                                        {errors.general[0]}
                                    </p>
                                )}

                                {success && (
                                    <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
                                        <CheckCircle size={17} />
                                        Pesan berhasil dikirim.
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Send size={17} />
                                    {sending
                                        ? 'Mengirim...'
                                        : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        {/* Right */}
                        <div className="space-y-5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-blue-400">
                                    <Mail size={18} />
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-wider text-slate-500">
                                        Email
                                    </p>
                                    <p className="mt-1 break-all text-sm text-slate-200">
                                        ardhi18122003@gmail.com
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-blue-400">
                                    <MapPin size={18} />
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-wider text-slate-500">
                                        Location
                                    </p>
                                    <p className="mt-1 text-sm text-slate-200">
                                        Indonesia
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <a
                                    href="https://github.com/Cholsz"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
                                    aria-label="GitHub"
                                >
                                    <Github size={18} />
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/ardhiansyahh"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}