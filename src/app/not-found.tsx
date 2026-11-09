
import Link from "next/link";
import { Home, Compass, ArrowLeft } from "lucide-react";

const NotFound = () => {
    return (
        <main className="flex min-h-[80vh] items-center justify-center px-4 py-16">
            <div className="mx-auto w-full max-w-xl text-center">

                {/* 404 Illustration */}
                <div className="relative mx-auto mb-8 flex h-48 w-48 items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-orange-500/10 blur-2xl" />
                    <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/5">
                        <span className="text-7xl font-extrabold tracking-tighter text-orange-500">
                            404
                        </span>
                    </div>
                    <span className="absolute right-2 top-5 h-4 w-4 rounded-full bg-orange-500/70" />
                    <span className="absolute bottom-5 left-1 h-3 w-3 rounded-full bg-orange-400/50" />
                </div>

                {/* Message */}
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
                    Page Not Found
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                    Oops! This space is empty.
                </h1>

                <p className="mx-auto mt-4 max-w-md text-base leading-7 text-gray-500 dark:text-gray-400">
                    The page you&apos;re looking for might have been moved,
                    removed, or doesn&apos;t exist. Let&apos;s get you back to
                    discovering creative spaces.
                </p>

                {/* Navigation Links */}
                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600 sm:w-auto"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>

                    <Link
                        href="/explore-studios"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:-translate-y-0.5 hover:border-orange-500 hover:text-orange-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-200 dark:hover:border-orange-500 dark:hover:text-orange-500 sm:w-auto"
                    >
                        <Compass size={18} />
                        Explore Studios
                    </Link>
                </div>

                <div className="mt-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-orange-500"
                    >
                        <ArrowLeft size={15} />
                        Return to previous experience
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default NotFound;
