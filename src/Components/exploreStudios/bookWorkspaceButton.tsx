
"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

type BookWorkspaceButtonProps = {
    studioId: string;
    studioTitle: string;
    category: string;
    location: string;
    hourlyRate: number;
    securityDeposit: number | null;
    imageUrl: string;
    isBooked: boolean,
};

const BookWorkspaceButton = ({
    studioId,
    studioTitle,
    category,
    location,
    hourlyRate,
    securityDeposit,
    imageUrl,
    isBooked,
}: BookWorkspaceButtonProps) => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [isOpen, setIsOpen] = useState(false);

    const [bookingDate, setBookingDate] = useState("");
    const [fromTime, setFromTime] = useState("");
    const [toTime, setToTime] = useState("");

    const handleConfirm = async () => {
        if (!user?.email) {
            toast.error("Please login to book a studio.");
            return;
        }

        if (!bookingDate || !fromTime || !toTime) {
            toast.error("Please complete the booking schedule.");
            return;
        }

        const bookingData = {
            studioTitle,
            category,
            location,
            hourlyRate,
            securityDeposit,
            userName: user.name,
            userEmail: user.email,
            imageUrl,
            bookingDate,
            fromTime,
            toTime,
        };

        try {
            const res = await fetch(
                `http://localhost:8000/book-studio/${studioId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bookingData),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Booking failed!");
                return;
            }

            toast.success("Studio booked successfully!");
            setIsOpen(false);

            setBookingDate("");
            setFromTime("");
            setToTime("");
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.error(error);
        }
    };

    return (
        <>
            <button
                type="button"
                disabled={isBooked}
                onClick={() => setIsOpen(true)}
                className={`w-full rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 ${isBooked
                        ? "cursor-not-allowed bg-gray-300 text-gray-500"
                        : "bg-[#F97316] text-white shadow-lg shadow-orange-500/20 hover:bg-[#EA580C] hover:shadow-orange-500/30"
                    }`}
            >
                {isBooked ? "Already Booked" : "Book Workspace Now"}
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                    role="presentation"
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Book workspace"
                        onClick={(event) => event.stopPropagation()}
                        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-border px-6 py-5 sm:px-8">
                            <div>
                                <h2 className="text-xl font-bold text-card-foreground">
                                    Book Workspace
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Complete the information below to book your studio.
                                </p>
                            </div>

                            <button
                                type="button"
                                aria-label="Close booking modal"
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 sm:gap-8 sm:p-8">

                            {/* Left Side - Studio Information */}
                            <div className="space-y-5">
                                <div>
                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#F97316]">
                                        Workspace Details
                                    </span>

                                    <h3 className="mt-2 text-lg font-bold text-foreground">
                                        Studio Information
                                    </h3>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Review the workspace details before booking.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-border bg-background p-5">
                                    <div className="mb-5">
                                        <span className="text-xs text-muted-foreground">
                                            Studio Name
                                        </span>

                                        <h4 className="mt-1 text-base font-bold text-foreground">
                                            {studioTitle}
                                        </h4>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-sm text-muted-foreground">
                                                Category
                                            </span>

                                            <span className="rounded-full bg-[#F97316]/10 px-3 py-1 text-xs font-semibold text-[#F97316]">
                                                {category}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-sm text-muted-foreground">
                                                Location
                                            </span>

                                            <span className="text-right text-sm font-medium text-foreground">
                                                {location}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-sm text-muted-foreground">
                                                Hourly Rate
                                            </span>

                                            <span className="text-sm font-semibold text-[#F97316]">
                                                ${hourlyRate} / hour
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-sm text-muted-foreground">
                                                Security Deposit
                                            </span>

                                            <span className="text-sm font-medium text-foreground">
                                                {securityDeposit !== null
                                                    ? `$${securityDeposit}`
                                                    : "N/A"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-5 rounded-lg bg-[#F97316]/5 p-4">
                                        <p className="text-xs leading-relaxed text-muted-foreground">
                                            Please review the studio details carefully
                                            before confirming your booking request.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - User & Booking Information */}
                            <div className="space-y-5">
                                <div>
                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#F97316]">
                                        Reservation Details
                                    </span>

                                    <h3 className="mt-2 text-lg font-bold text-foreground">
                                        Your Information
                                    </h3>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Your account and preferred booking schedule.
                                    </p>
                                </div>

                                {/* User Information */}
                                <div className="rounded-xl border border-border bg-background p-5">
                                    <h4 className="mb-4 text-sm font-semibold text-foreground">
                                        Account Information
                                    </h4>

                                    {isPending ? (
                                        <p className="text-sm text-muted-foreground">
                                            Loading user information...
                                        </p>
                                    ) : user ? (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-xs text-muted-foreground">
                                                    Full Name
                                                </label>

                                                <p className="mt-1 text-sm font-medium text-foreground">
                                                    {user.name}
                                                </p>
                                            </div>

                                            <div>
                                                <label className="text-xs text-muted-foreground">
                                                    Email Address
                                                </label>

                                                <p className="mt-1 break-all text-sm font-medium text-foreground">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-red-500">
                                            Please sign in to book this studio.
                                        </p>
                                    )}
                                </div>

                                {/* Booking Information */}
                                <div className="rounded-xl border border-border bg-background p-5">
                                    <h4 className="mb-4 text-sm font-semibold text-foreground">
                                        Booking Schedule
                                    </h4>

                                    <div className="space-y-4">
                                        {/* Date */}
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="booking-date"
                                                className="text-sm font-medium text-foreground"
                                            >
                                                Booking Date
                                            </label>

                                            <input
                                                id="booking-date"
                                                type="date"
                                                value={bookingDate}
                                                onChange={(e) => setBookingDate(e.target.value)}
                                                min={new Date().toLocaleDateString("en-CA")}
                                                className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-[#F97316] focus-visible:ring-2 focus-visible:ring-[#F97316]/20"
                                            />
                                        </div>

                                        {/* From & To Time */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-2">
                                                <label
                                                    htmlFor="from-time"
                                                    className="text-sm font-medium text-foreground"
                                                >
                                                    From Time
                                                </label>

                                                <input
                                                    id="from-time"
                                                    type="time"
                                                    value={fromTime}
                                                    onChange={(e) => setFromTime(e.target.value)}
                                                    className="h-11 w-full rounded-lg border border-input bg-card px-2 text-sm text-foreground outline-none transition-colors focus-visible:border-[#F97316] focus-visible:ring-2 focus-visible:ring-[#F97316]/20"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label
                                                    htmlFor="to-time"
                                                    className="text-sm font-medium text-foreground"
                                                >
                                                    To Time
                                                </label>

                                                <input
                                                    id="to-time"
                                                    type="time"
                                                    value={toTime}
                                                    onChange={(e) => setToTime(e.target.value)}
                                                    min={fromTime || undefined}
                                                    className="h-11 w-full rounded-lg border border-input bg-card px-2 text-sm text-foreground outline-none transition-colors focus-visible:border-[#F97316] focus-visible:ring-2 focus-visible:ring-[#F97316]/20"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex flex-col-reverse gap-3 border-t border-border bg-muted/20 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleConfirm}
                                className="rounded-lg bg-[#F97316] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#EA580C]"
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BookWorkspaceButton;
