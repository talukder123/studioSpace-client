"use client";

import { useState } from "react";
import { toast } from "react-toastify";

type BookWorkspaceButtonProps = {
    studioTitle: string;
    hourlyRate: number;
};

const inputClass =
    "h-11 w-full rounded-lg border border-input bg-background px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-[#F97316] focus-visible:ring-2 focus-visible:ring-[#F97316]/20";

const BookWorkspaceButton = ({ studioTitle, hourlyRate }: BookWorkspaceButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleConfirm = () => {
        setIsOpen(false);
        toast.success("Your booking request has been sent to the host!");
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="w-full rounded-lg bg-[#F97316] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#EA580C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/40"
            >
                Book Workspace Now
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setIsOpen(false)}
                    role="presentation"
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Book workspace"
                        onClick={(event) => event.stopPropagation()}
                        className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-bold text-card-foreground">
                                    Book Workspace
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">{studioTitle}</p>
                            </div>
                            <button
                                type="button"
                                aria-label="Close booking modal"
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mt-5 space-y-4">
                            <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3 text-sm">
                                <span className="text-muted-foreground">Hourly rate</span>
                                <span className="font-semibold text-foreground">
                                    ${hourlyRate} / hour
                                </span>
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="booking-date"
                                    className="text-sm font-medium text-foreground"
                                >
                                    Date
                                </label>
                                <input
                                    id="booking-date"
                                    type="date"
                                    className={inputClass}
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="booking-hours"
                                    className="text-sm font-medium text-foreground"
                                >
                                    Number of hours
                                </label>
                                <input
                                    id="booking-hours"
                                    type="number"
                                    min={1}
                                    placeholder="e.g. 3"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="flex-1 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirm}
                                className="flex-1 rounded-lg bg-[#F97316] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#EA580C]"
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
