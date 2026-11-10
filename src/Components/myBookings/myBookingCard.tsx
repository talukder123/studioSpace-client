
"use client";

import { ImyBooking } from "@/Type/myBooking";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

type MBKProps = {
    booking: ImyBooking;
};

const MyBookingCard = ({ booking }: MBKProps) => {

    const statusStyle = {
        Pending: "bg-amber-100 text-amber-700",
        Confirmed: "bg-green-100 text-green-700",
        Completed: "bg-blue-100 text-blue-700",
        Cancelled: "bg-red-100 text-red-700",
    };

    const [status, setStatus] = useState(booking.status);

    const handleCancelBooking = async () => {
        try {
            const res = await fetch(`http://localhost:8000/cancel-booking/${booking._id}`, {
                method: "PATCH",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            setStatus("Cancelled");
            toast.success(data.message);

        } catch (error) {
            console.error(error);
            toast.error("Failed to cancel booking!");
        }
    };

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-gray-200/70 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            {/* Image */}
            <div className="relative h-44 overflow-hidden">
                <Image
                    src={booking.imageUrl}
                    alt={booking.studioTitle}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <span className="absolute bottom-3 left-4 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                    {booking.category}
                </span>
            </div>

            {/* Content */}
            <div className="space-y-4 p-4">

                {/* Title & Price */}
                <div>
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="truncate text-lg font-bold text-gray-900 dark:text-white">
                            {booking.studioTitle}
                        </h2>

                        <p className="shrink-0 text-base font-bold text-orange-500">
                            ${booking.hourlyRate}
                            <span className="text-xs font-medium text-gray-400">/hr</span>
                        </p>
                    </div>

                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                        <MapPin size={14} className="shrink-0 text-orange-500" />
                        {booking.location}
                    </p>
                </div>

                {/* Booking Schedule */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-gray-100 dark:border-zinc-700 bg-gray-50/70 dark:bg-zinc-800 p-3">
                        <p className="flex items-center gap-1.5 text-xs text-gray-400">
                            <CalendarDays size={14} />
                            Booking Date
                        </p>
                        <p className="mt-1.5 text-sm font-semibold text-gray-800 dark:text-gray-200">
                            {booking.bookingDate}
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-100 dark:border-zinc-700 bg-gray-50/70 dark:bg-zinc-800 p-3">
                        <p className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Clock size={14} />
                            Schedule
                        </p>
                        <p className="mt-1.5 text-sm font-semibold text-gray-800 dark:text-gray-200">
                            {booking.fromTime} - {booking.toTime}
                        </p>
                    </div>
                </div>

                {/* Security Deposit & Status */}
                <div className="grid grid-cols-2 gap-3">

                    <div className="rounded-xl border border-orange-100 dark:border-orange-500/20 bg-orange-50/60 dark:bg-orange-500/10 px-3 py-3">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Security Deposit</p>
                        <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
                            {booking.securityDeposit !== null
                                ? `$${booking.securityDeposit}`
                                : "N/A"}
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-100 dark:border-zinc-700 bg-gray-50/70 dark:bg-zinc-800 px-3 py-3 text-right">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Booking Status</p>
                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[status]}`}
                        >
                            {status}
                        </span>
                    </div>

                </div>

                {/* Footer */}
                <div className="flex items-center justify-between gap-3 border-t border-gray-100 dark:border-zinc-700 pt-3">
                    <div className="min-w-0">
                        <p className="text-xs text-gray-400">Booked By</p>
                        <p className="truncate text-sm font-semibold text-gray-800 dark:text-gray-200">
                            {booking.userName}
                        </p>
                    </div>

                    {status === "Pending" && (
                        <button
                            type="button"
                            onClick={handleCancelBooking}
                            className="shrink-0 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                        >
                            Cancel Booking
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default MyBookingCard;
