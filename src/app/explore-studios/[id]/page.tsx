import Image from "next/image";
import { notFound } from "next/navigation";

import BookWorkspaceButton from "@/components/exploreStudios/bookWorkspaceButton";
import { IStudio } from "@/Type/studio";

// Sample reviews shown for every studio (the API does not return reviews yet).
const reviews = [
    {
        id: 1,
        name: "Ayesha Rahman",
        rating: 5,
        comment:
            "Amazing space with plenty of natural light. Booking was smooth and the host responded quickly.",
    },
    {
        id: 2,
        name: "Tanvir Hasan",
        rating: 4,
        comment:
            "Great studio for our podcast session. Everything was clean and exactly as shown in the photos.",
    },
    {
        id: 3,
        name: "Sadia Islam",
        rating: 5,
        comment:
            "Spacious, well maintained and easy to reach. We will definitely book this studio again.",
    },
];

type StudioDetailPageProps = {
    params: Promise<{ id: string }>;
};

const StudioDetailPage = async ({ params }: StudioDetailPageProps) => {
    const { id } = await params;

    const res = await fetch(`http://localhost:8000/studio/${id}`);

    // The API answers unknown IDs with an HTML error page, so guard the parse.
    let studio: IStudio | null = null;
    if (res.ok) {
        try {
            studio = await res.json();
        } catch {
            studio = null;
        }
    }

    if (!studio?.title) {
        notFound();
    }

    return (
        <main className="flex-1 bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
                <div className="grid gap-8 lg:grid-cols-3">

                    {/* Main content */}
                    <div className="space-y-6 lg:col-span-2">

                        {/* Gallery */}
                        <div className="relative h-64 overflow-hidden rounded-2xl border border-border bg-card shadow-sm sm:h-96">
                            <Image
                                src={studio.imageUrl}
                                alt={studio.title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 66vw"
                                className="object-cover"
                            />

                            {/* Category Badge */}
                            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-orange-600 shadow-sm">
                                {studio.category}
                            </span>

                            {/* Rating Badge */}
                            <div className="absolute right-4 top-4 flex items-center gap-1 rounded-lg bg-white/95 px-2.5 py-1.5 text-sm font-semibold text-amber-600 shadow-sm">
                                <span aria-hidden>★</span>
                                <span>{studio.rating ?? "New"}</span>
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                {studio.title}
                            </h1>
                            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                                {studio.category} <span aria-hidden>•</span> {studio.location}
                            </p>
                        </div>

                        {/* Overview */}
                        <section
                            aria-label="Overview"
                            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6"
                        >
                            <h2 className="text-base font-semibold text-card-foreground">
                                Overview
                            </h2>
                            <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                {studio.overview}
                            </p>
                        </section>

                        {/* Studio Details */}
                        <section
                            aria-label="Studio details"
                            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6"
                        >
                            <h2 className="text-base font-semibold text-card-foreground">
                                Studio Details
                            </h2>

                            <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-lg border border-border bg-background p-4">
                                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        Hourly Rate
                                    </dt>
                                    <dd className="mt-1 text-xl font-bold text-[#F97316]">
                                        ${studio.hourlyRate}
                                        <span className="ml-1 text-xs font-medium text-muted-foreground">
                                            / hour
                                        </span>
                                    </dd>
                                </div>

                                <div className="rounded-lg border border-border bg-background p-4">
                                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        Security Deposit
                                    </dt>
                                    <dd className="mt-1 text-xl font-bold text-foreground">
                                        ${studio.securityDeposit}
                                    </dd>
                                </div>

                                <div className="rounded-lg border border-border bg-background p-4">
                                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        Capacity
                                    </dt>
                                    <dd className="mt-1 text-xl font-bold text-foreground">
                                        {studio.maxCapacity}
                                        <span className="ml-1 text-xs font-medium text-muted-foreground">
                                            people
                                        </span>
                                    </dd>
                                </div>

                                <div className="rounded-lg border border-border bg-background p-4">
                                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        Location
                                    </dt>
                                    <dd className="mt-1 text-sm font-semibold leading-6 text-foreground">
                                        {studio.location}
                                    </dd>
                                </div>
                            </dl>
                        </section>

                        {/* Amenities */}
                        <section
                            aria-label="Amenities"
                            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6"
                        >
                            <h2 className="text-base font-semibold text-card-foreground">
                                Amenities
                            </h2>

                            {studio.amenities.length > 0 ? (
                                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {studio.amenities.map((amenity) => (
                                        <li
                                            key={amenity}
                                            className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-medium text-foreground"
                                        >
                                            <span
                                                aria-hidden
                                                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F97316]/10 text-[#F97316]"
                                            >
                                                ✓
                                            </span>
                                            {amenity}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mt-4 text-sm text-muted-foreground">
                                    No amenities listed yet.
                                </p>
                            )}
                        </section>

                        {/* Reviews */}
                        <section
                            aria-label="Reviews"
                            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <h2 className="text-base font-semibold text-card-foreground">
                                    Reviews
                                </h2>
                                <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-600">
                                    ★ {studio.rating ?? "New"}
                                </span>
                            </div>

                            <div className="mt-4 space-y-4">
                                {reviews.map((review) => (
                                    <article
                                        key={review.id}
                                        className="rounded-lg border border-border bg-background p-4"
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <p className="text-sm font-semibold text-foreground">
                                                {review.name}
                                            </p>
                                            <span
                                                aria-label={`${review.rating} out of 5 stars`}
                                                className="text-sm font-semibold text-amber-600"
                                            >
                                                {"★".repeat(review.rating)}
                                                <span className="text-amber-200">
                                                    {"★".repeat(5 - review.rating)}
                                                </span>
                                            </span>
                                        </div>
                                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                            {review.comment}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">

                        {/* Booking Card */}
                        <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
                            <p className="text-sm text-muted-foreground">Hourly Rate</p>
                            <p className="mt-1 text-3xl font-bold text-[#F97316]">
                                ${studio.hourlyRate}
                                <span className="ml-1 text-sm font-medium text-muted-foreground">
                                    / hour
                                </span>
                            </p>

                            <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                                <div className="flex justify-between gap-3">
                                    <span className="text-muted-foreground">Security deposit</span>
                                    <span className="font-semibold text-foreground">
                                        ${studio.securityDeposit}
                                    </span>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <span className="text-muted-foreground">Capacity</span>
                                    <span className="font-semibold text-foreground">
                                        {studio.maxCapacity} people
                                    </span>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <span className="shrink-0 text-muted-foreground">Location</span>
                                    <span className="text-right font-semibold text-foreground">
                                        {studio.location}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-5">
                                <BookWorkspaceButton
                                studioId={studio._id}
                                    studioTitle={studio.title}
                                    category={studio.category}
                                    location={studio.location}
                                    hourlyRate={studio.hourlyRate}
                                    securityDeposit={studio.securityDeposit}
                                />
                            </div>
                        </div>

                        {/* Host Card */}
                        <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
                            <h2 className="text-base font-semibold text-card-foreground">
                                Hosted by
                            </h2>

                            <div className="mt-4 flex items-center gap-3">
                                <div
                                    aria-hidden
                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F97316]/10 text-sm font-bold text-[#F97316]"
                                >
                                    {studio.owner.name.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-foreground">
                                        {studio.owner.name}
                                    </p>
                                    <a
                                        href={`mailto:${studio.owner.email}`}
                                        className="truncate text-sm text-muted-foreground transition-colors hover:text-[#F97316]"
                                    >
                                        {studio.owner.email}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default StudioDetailPage;
