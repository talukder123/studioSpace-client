
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IStudio } from "@/Type/studio";
import { MapPin, Star } from "lucide-react";

const FeaturedStudios = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-studios`);
    const data: IStudio[] = await res.json();

    return (
        <section className="py-16">
            <div className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section Heading */}
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Featured Studios
                    </h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Discover our latest creative spaces.
                    </p>
                </div>

                {/* Studio Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((studio) => (
                        <div
                            key={studio._id}
                            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
                        >
                            {/* Studio Image */}
                            <div className="relative h-56 w-full">
                                <Image
                                    src={studio.imageUrl}
                                    alt={studio.title}
                                    fill
                                    className="object-cover"
                                />

                                {/* Glossy Category Badge */}
                                <span className="absolute left-4 top-4 rounded-full border border-white/40 bg-orange-500/75 px-4 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                                    {studio.category}
                                </span>
                            </div>

                            {/* Studio Details */}
                            <div className="space-y-4 p-5">

                                {/* Title and Rating */}
                                <div className="flex items-start justify-between gap-3">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                        {studio.title}
                                    </h3>

                                    <span className="flex shrink-0 items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-600 dark:bg-orange-950">
                                        <Star size={14} fill="currentColor" />
                                        {studio.rating ?? "N/A"}
                                    </span>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                    <MapPin size={17} />
                                    <span>{studio.location}</span>
                                </div>

                                {/* Hourly Rate */}
                                <p className="text-xl font-bold text-orange-500">
                                    ${studio.hourlyRate} / hr
                                </p>

                                {/* View Details Button */}
                                <Link
                                    href={`/explore-studios/${studio._id}`}
                                    className="block w-full rounded-lg bg-orange-500 py-3 text-center font-semibold text-white transition hover:bg-orange-600"
                                >
                                    View Details
                                </Link>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FeaturedStudios;
