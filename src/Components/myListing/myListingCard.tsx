
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    MapPin,
    Users,
    Pencil,
    Trash2,
    AlertTriangle,
    X,
} from "lucide-react";
import { IStudio } from "@/Type/studio";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

interface MyListingCardProps {
    studio: IStudio;
}


const MyListingCard = ({ studio }: MyListingCardProps) => {

    const router = useRouter();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);


    const handleDelete = async () => {
        try {
            setIsDeleting(true);

            const { data } = await authClient.token();

            if (!data?.token) {
                throw new Error("Please login first.");
            }

            const res = await fetch(
                `http://localhost:8000/delete-studio/${studio._id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    },
                }
            );

            if (!res.ok) {
                throw new Error("Failed to delete studio.");
            }

            toast.success("Studio deleted successfully!");

            setShowDeleteModal(false);
            router.refresh();

        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong!"
            );
        } finally {
            setIsDeleting(false);
        }
    };



    return (
        <>
            <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-lg sm:flex-row">

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
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                {studio.title}
                            </h3>

                            <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                                <MapPin size={16} className="shrink-0 text-orange-500" />
                                {studio.location}
                            </p>
                        </div>

                        {/* Price & Capacity */}
                        <div className="flex flex-wrap items-center gap-6">
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Hourly Rate
                                </p>
                                <p className="mt-1 text-lg font-bold text-orange-600">
                                    ${studio.hourlyRate}
                                    <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                                        {" "} /hr
                                    </span>
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Max Capacity
                                </p>
                                <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    <Users size={16} className="text-gray-500 dark:text-gray-400" />
                                    {studio.maxCapacity} Guests
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Security Deposit
                                </p>
                                <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    ${studio.securityDeposit}
                                </p>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div>
                            <p className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
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
                                    <span className="rounded-md bg-gray-100 dark:bg-zinc-800 px-2.5 py-1 text-xs text-gray-600 dark:text-gray-300">
                                        +{studio.amenities.length - 4} more
                                    </span>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 border-t border-gray-100 dark:border-zinc-700 pt-4">

                        <Link
                            href={`/explore-studios/edit/${studio._id}`}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-orange-500 px-4 py-2.5 text-sm font-semibold text-orange-600 transition hover:bg-orange-50 dark:hover:bg-orange-500/10 sm:flex-none sm:min-w-28"
                        >
                            <Pencil size={16} />
                            Edit Studio
                        </Link>

                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 dark:border-red-500/30 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-500/10 sm:flex-none sm:min-w-28"
                        >
                            <Trash2 size={16} />
                            Delete
                        </button>

                    </div>

                </div>
            </div>


            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    onClick={() => {
                        if (!isDeleting) setShowDeleteModal(false);
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="delete-modal-title"
                        className="relative w-full max-w-md rounded-2xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Close Button */}
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            disabled={isDeleting}
                            className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-zinc-800 dark:hover:text-white disabled:opacity-50"
                        >
                            <X size={20} />
                        </button>

                        {/* Warning Icon */}
                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10">
                            <AlertTriangle
                                size={28}
                                className="text-red-600 dark:text-red-500"
                            />
                        </div>

                        {/* Modal Content */}
                        <h2
                            id="delete-modal-title"
                            className="text-xl font-bold text-gray-900 dark:text-white"
                        >
                            Delete Studio?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-gray-800 dark:text-gray-200">
                                {studio.title}
                            </span>
                            ? This action cannot be undone.
                        </p>

                        {/* Modal Buttons */}
                        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                            <button
                                onClick={() => setShowDeleteModal(false)}
                                disabled={isDeleting}
                                className="rounded-xl border border-gray-200 dark:border-zinc-700 px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 transition hover:bg-gray-100 dark:hover:bg-zinc-800 disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Trash2 size={16} />
                                {isDeleting ? "Deleting..." : "Yes, Delete"}
                            </button>

                        </div>

                    </div>
                </div>
            )}

        </>
    );
};

export default MyListingCard;
