
"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface EmptyStateProps {
    icon: ReactNode;
    title: string;
    description: string;
    actionLabel: string;
    actionHref?: string;
    onAction?: () => void;
}

const EmptyState = ({
    icon,
    title,
    description,
    actionLabel,
    actionHref,
    onAction,
}: EmptyStateProps) => {

    return (
        <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50/70 px-6 py-12 text-center dark:border-gray-700 dark:bg-gray-900/40">

            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-orange-500 dark:bg-orange-500/10">
                {icon}
            </div>

            <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                {title}
            </h2>

            <p className="mb-6 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
                {description}
            </p>

            {actionHref ? (
                <Link
                    href={actionHref}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#F97316] px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                    {actionLabel}
                    <ArrowRight size={17} />
                </Link>
            ) : (
                <button
                    onClick={onAction}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#F97316] px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                    {actionLabel}
                    <ArrowRight size={17} />
                </button>
            )}

        </div>
    );
};

export default EmptyState;