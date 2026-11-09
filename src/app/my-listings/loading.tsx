
export default function MyListingsLoading() {
    return (
        <div className="mx-auto max-w-7xl animate-pulse space-y-5 px-4 py-10">
            {/* Page Heading */}
            <div className="space-y-3 pb-4">
                <div className="h-9 w-64 rounded-lg bg-gray-200 dark:bg-zinc-800" />
                <div className="h-4 w-96 max-w-full rounded bg-gray-200 dark:bg-zinc-800" />
            </div>

            {/* Listing Cards */}
            {[1, 2, 3].map((item) => (
                <div
                    key={item}
                    className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm sm:flex-row dark:border-zinc-700 dark:bg-zinc-900"
                >
                    {/* Studio Image */}
                    <div className="h-56 w-full shrink-0 bg-gray-200 sm:h-52 sm:w-64 dark:bg-zinc-800" />

                    {/* Studio Information */}
                    <div className="flex-1 space-y-4 p-5">
                        <div className="flex items-center justify-between gap-4">
                            <div className="h-6 w-2/3 rounded bg-gray-200 dark:bg-zinc-800" />
                            <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-zinc-800" />
                        </div>

                        <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-zinc-800" />
                        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-zinc-800" />
                        <div className="h-5 w-1/3 rounded bg-gray-200 dark:bg-zinc-800" />

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            <div className="h-10 w-28 rounded-lg bg-gray-200 dark:bg-zinc-800" />
                            <div className="h-10 w-28 rounded-lg bg-gray-200 dark:bg-zinc-800" />
                        </div>
                    </div>
                </div>
            ))}

            {/* Closing Space */}
            <div className="h-10" />
        </div>
    );
}
