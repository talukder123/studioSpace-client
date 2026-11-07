import { IStudio } from '@/Type/studio';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface StudioCardProps {
    studio: IStudio;
}

const StudioCard = ({ studio }: StudioCardProps) => {
    return (
        <div className="group overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Image */}
            <div className="relative h-56 overflow-hidden">
                <Image
                    src={studio.imageUrl}
                    alt={studio.title}
                    width={1200}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Category Badge */}
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-orange-600 shadow-sm">
                    {studio.category}
                </span>
            </div>

            {/* Content */}
            <div className="space-y-4 p-5">

                {/* Title & Rating */}
                <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-bold text-base-content transition-colors group-hover:text-orange-500">
                        {studio.title}
                    </h2>

                    <div className="flex shrink-0 items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-sm font-semibold text-amber-600">
                        <span>★</span>
                        <span>{studio.rating ?? "New"}</span>
                    </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-base-content/60">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-orange-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>

                    <span>{studio.location}</span>
                </div>

                {/* Divider */}
                <div className="border-t border-base-300" />

                {/* Price & Button */}
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs text-base-content/50">Hourly Rate</p>
                        <p className="text-xl font-bold text-orange-500">
                            ${studio.hourlyRate}
                            <span className="ml-1 text-xs font-medium text-base-content/50">
                                / hour
                            </span>
                        </p>
                    </div>

                    <Link href={`http://localhost:3000/explore-studios/${studio._id}`}>
                    <button className="rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-orange-600 active:scale-95">
                        View Details →
                    </button>
                    </Link>

                </div>

            </div>
        </div>
    );
};

export default StudioCard;