
import React from "react";
import Link from "next/link";
import {
    Camera,
    Film,
    Mic,
    Music,
    Palette,
} from "lucide-react";

const categories = [
    {
        name: "Photo Studios",
        value: "Photo Studio",
        icon: Camera,
    },
    {
        name: "Film Stages",
        value: "Film Stage",
        icon: Film,
    },
    {
        name: "Podcast Rooms",
        value: "Podcast Lounge",
        icon: Mic,
    },
    {
        name: "Music Suites",
        value: "Music Suite",
        icon: Music,
    },
    {
        name: "Art Workshops",
        value: "Workshop",
        icon: Palette,
    },
];

const BrowseCategories = () => {
    return (
        <section className="py-16">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Browse by Studio Categories
                    </h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Explore creative spaces that match your needs.
                    </p>
                </div>

                {/* Category Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
                    {categories.map((category) => {
                        const Icon = category.icon;

                        return (
                            <Link
                                key={category.value}
                                href={`/explore-studios?category=${encodeURIComponent(category.value)}`}
                                className="group flex flex-col items-center gap-4 border border-gray-200 bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-500 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white dark:bg-orange-950">
                                    <Icon size={28} />
                                </div>

                                <h3 className="font-semibold text-gray-800 transition group-hover:text-orange-500 dark:text-white">
                                    {category.name}
                                </h3>
                            </Link>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default BrowseCategories;
