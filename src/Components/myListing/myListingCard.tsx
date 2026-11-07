"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, Pencil, Trash2, Clock } from "lucide-react";
import { IStudio } from "@/Type/studio";

interface MyListingCardProps {
    studio: IStudio;
}

const MyListingCard = ({ studio }: MyListingCardProps) => {

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this studio?"
        );

        if (!confirmed) return;

        const res = await fetch(
            `http://localhost:8000/delete-studio/${studio._id}`,
            {
                method: "DELETE",
            }
        );

        if (res.ok) {
            // Show success toast
        }
    };


    return (
        <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg sm:flex-row">

    {/* Studio Image */}
    <div className="relative h-56 w-full shrink-0 overflow-hidden sm:h-auto sm:w-64 lg:w-72">
        <Image
            src={studio.imageUrl}
            alt={studio.title}
            fill
            sizes="(max-width: 640px) 100vw, 288px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-orange-600 shadow-sm">
            {studio.category}
        </span>
    </div>

    {/* Studio Information */}
    <div className="flex flex-1 flex-col justify-between gap-5 p-5 sm:p-6">

        <div className="space-y-4">

            {/* Title & Location */}
            <div>
                <h3 className="text-xl font-bold text-gray-900">
                    {studio.title}
                </h3>

                <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin size={16} className="shrink-0 text-orange-500" />
                    {studio.location}
                </p>
            </div>

            {/* Price & Capacity */}
            <div className="flex flex-wrap items-center gap-6">
                <div>
                    <p className="text-xs text-gray-500">Hourly Rate</p>
                    <p className="mt-1 text-lg font-bold text-orange-600">
                        ${studio.hourlyRate}
                        <span className="text-xs font-normal text-gray-500"> /hr</span>
                    </p>
                </div>

                <div>
                    <p className="text-xs text-gray-500">Max Capacity</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                        <Users size={16} className="text-gray-500" />
                        {studio.maxCapacity} Guests
                    </p>
                </div>

                <div>
                    <p className="text-xs text-gray-500">Security Deposit</p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                        ${studio.securityDeposit}
                    </p>
                </div>
            </div>

            {/* Amenities */}
            <div>
                <p className="mb-2 text-xs font-semibold text-gray-500">
                    AMENITIES
                </p>

                <div className="flex flex-wrap gap-2">
                    {studio.amenities.slice(0, 4).map((amenity: string) => (
                        <span
                            key={amenity}
                            className="rounded-md bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700"
                        >
                            {amenity}
                        </span>
                    ))}

                    {studio.amenities.length > 4 && (
                        <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                            +{studio.amenities.length - 4} more
                        </span>
                    )}
                </div>
            </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-4">

            <Link
                href={`/studios/edit/${studio._id}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-orange-500 px-4 py-2.5 text-sm font-semibold text-orange-600 transition hover:bg-orange-50 sm:flex-none sm:min-w-28"
            >
                <Pencil size={16} />
                Edit Studio
            </Link>

            <button
                onClick={handleDelete}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 sm:flex-none sm:min-w-28"
            >
                <Trash2 size={16} />
                Delete
            </button>

        </div>

    </div>
</div>
    );
};

export default MyListingCard;