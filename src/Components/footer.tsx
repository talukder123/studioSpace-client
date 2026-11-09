
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/studioSpace.png";

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    const categories = [
        { name: "Photo Studios", value: "Photo Studio" },
        { name: "Film Stages", value: "Film Stage" },
        { name: "Podcast Rooms", value: "Podcast Lounge" },
        { name: "Music Suites", value: "Music Suite" },
        { name: "Art Workshops", value: "Workshop" },
    ];

    return (
        <footer className="bg-[#171717] text-white">
            <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 md:px-8">

                {/* Main Footer */}
                <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div className="space-y-5">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="relative h-10 w-10">
                                <Image
                                    src={logo}
                                    alt="StudioSpace Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <span className="text-2xl font-bold">
                                Studio<span className="text-[#F97316]">Space</span>
                            </span>
                        </Link>

                        <p className="max-w-xs text-sm leading-7 text-gray-400">
                            Your creative journey starts here. Discover,
                            connect, and book inspiring spaces to bring
                            your ideas to life.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#F97316]"
                            >
                                <FaFacebookF size={17} />
                            </a>

                            <a
                                href="#"
                                aria-label="Instagram"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#F97316]"
                            >
                                <FaInstagram size={19} />
                            </a>

                            <a
                                href="#"
                                aria-label="X"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#F97316]"
                            >
                                <FaXTwitter size={17} />
                            </a>

                            <a
                                href="#"
                                aria-label="LinkedIn"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#F97316]"
                            >
                                <FaLinkedinIn size={17} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-5 text-lg font-semibold">
                            Quick Links
                        </h3>

                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>
                                <Link href="/" className="transition hover:text-[#F97316]">
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link href="/explore-studios" className="transition hover:text-[#F97316]">
                                    Explore Studios
                                </Link>
                            </li>

                            <li>
                                <Link href="/#how-it-works" className="transition hover:text-[#F97316]">
                                    How It Works
                                </Link>
                            </li>

                            <li>
                                <Link href="/#about" className="transition hover:text-[#F97316]">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Studio Categories */}
                    <div>
                        <h3 className="mb-5 text-lg font-semibold">
                            Popular Categories
                        </h3>

                        <ul className="space-y-3 text-sm text-gray-400">
                            {categories.map((category) => (
                                <li key={category.value}>
                                    <Link
                                        href={`/explore-studios?category=${encodeURIComponent(category.value)}`}
                                        className="transition hover:text-[#F97316]"
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="mb-5 text-lg font-semibold">
                            Stay Inspired
                        </h3>

                        <p className="mb-5 text-sm leading-7 text-gray-400">
                            Get creative space updates, inspiration, and
                            exclusive offers delivered to your inbox.
                        </p>

                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                aria-label="Email address"
                                className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-[#F97316]"
                            />

                            <button
                                type="button"
                                className="w-full rounded-lg bg-[#F97316] py-3 font-semibold text-white transition hover:bg-[#EA580C]"
                            >
                                Subscribe Now
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Footer */}
                <div className="flex flex-col items-center justify-between gap-4 pt-7 md:flex-row">

                    <p className="text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} StudioSpace. All rights reserved.
                    </p>

                    <p className="text-sm text-gray-500">
                        Made for creators, by creativity.
                    </p>

                </div>

            </div>
        </footer>
    );
};

export default Footer;
