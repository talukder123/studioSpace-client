
export default function HomeLoading() {
    return (
        <main className="animate-pulse">
            {/* Banner Skeleton */}
            <section className="mx-auto max-w-7xl px-4 py-10">
                <div className="h-[380px] rounded-2xl bg-gray-200 dark:bg-zinc-800" />
            </section>

            {/* Featured Studios Skeleton */}
            <section className="mx-auto max-w-7xl px-4 py-16">
                <div className="mx-auto mb-10 max-w-sm space-y-3 text-center">
                    <div className="mx-auto h-8 w-64 rounded-lg bg-gray-200 dark:bg-zinc-800" />
                    <div className="mx-auto h-4 w-80 max-w-full rounded bg-gray-200 dark:bg-zinc-800" />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="overflow-hidden rounded-2xl border border-gray-200 dark:border-zinc-700">
                            <div className="h-56 bg-gray-200 dark:bg-zinc-800" />
                            <div className="space-y-4 p-5">
                                <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-zinc-800" />
                                <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-zinc-800" />
                                <div className="h-5 w-1/3 rounded bg-gray-200 dark:bg-zinc-800" />
                                <div className="h-10 rounded-lg bg-gray-200 dark:bg-zinc-800" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Browse Categories Skeleton */}
            <section className="mx-auto max-w-7xl px-4 py-16">
                <div className="mx-auto mb-10 h-8 w-72 max-w-full rounded-lg bg-gray-200 dark:bg-zinc-800" />

                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="flex flex-col items-center gap-4 rounded-xl border border-gray-200 p-7 dark:border-zinc-700">
                            <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-zinc-800" />
                            <div className="h-4 w-28 rounded bg-gray-200 dark:bg-zinc-800" />
                        </div>
                    ))}
                </div>
            </section>

            {/* How Booking Works Skeleton */}
            <section className="mx-auto max-w-7xl px-4 py-16">
                <div className="mx-auto mb-10 h-8 w-64 max-w-full rounded-lg bg-gray-200 dark:bg-zinc-800" />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="space-y-4 rounded-xl border border-gray-200 p-6 dark:border-zinc-700">
                            <div className="h-14 w-14 rounded-full bg-gray-200 dark:bg-zinc-800" />
                            <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-zinc-800" />
                            <div className="h-4 w-full rounded bg-gray-200 dark:bg-zinc-800" />
                            <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-zinc-800" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Creator Support Skeleton */}
            <section className="mx-auto max-w-7xl px-4 py-16">
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                    <div className="h-64 rounded-2xl bg-gray-200 dark:bg-zinc-800" />
                    <div className="space-y-5">
                        <div className="h-8 w-3/4 rounded-lg bg-gray-200 dark:bg-zinc-800" />
                        <div className="h-4 w-full rounded bg-gray-200 dark:bg-zinc-800" />
                        <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-zinc-800" />
                        <div className="h-11 w-36 rounded-lg bg-gray-200 dark:bg-zinc-800" />
                    </div>
                </div>
            </section>
        </main>
    );
}
