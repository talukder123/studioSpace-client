
export default function MyBookingsLoading() {
    return (
        <div className="animate-pulse">
            {/* Page Heading */}
            <div className="mx-auto max-w-7xl px-4 pt-10 pb-6">
                <div className="h-9 w-64 rounded-lg bg-gray-200 dark:bg-zinc-800" />

                <div className="mt-3 h-4 w-full max-w-2xl rounded bg-gray-200 dark:bg-zinc-800" />
                <div className="mt-2 h-4 w-3/4 max-w-xl rounded bg-gray-200 dark:bg-zinc-800" />

                {/* Pending Booking Message */}
                <div className="mt-4 h-4 w-72 max-w-full rounded bg-gray-200 dark:bg-zinc-800" />
            </div>

            {/* Booking Cards */}
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-5 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div
                        key={item}
                        className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
                    >
                        {/* Studio Image */}
                        <div className="h-52 w-full bg-gray-200 dark:bg-zinc-800" />

                        {/* Booking Information */}
                        <div className="space-y-4 p-5">
                            <div className="flex items-center justify-between gap-3">
                                <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-zinc-800" />
                                <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-zinc-800" />
                            </div>

                            <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-zinc-800" />
                            <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-zinc-800" />
                            <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-zinc-800" />

                            <div className="h-10 w-full rounded-lg bg-gray-200 dark:bg-zinc-800" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Closing Message */}
            <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 text-center">
                <div className="mx-auto h-8 w-96 max-w-full rounded-lg bg-gray-200 dark:bg-zinc-800" />

                <div className="mx-auto mt-4 h-4 w-full max-w-2xl rounded bg-gray-200 dark:bg-zinc-800" />

                <div className="mx-auto mt-2 h-4 w-4/5 max-w-xl rounded bg-gray-200 dark:bg-zinc-800" />
            </div>
        </div>
    );
}
