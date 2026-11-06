import Link from "next/link";
import Image from "next/image";
import logo from '@/assets/studioSpace.png'

import { FaFacebookF, FaInstagram, FaLinkedinIn, } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


const Footer = () => {
    return (
        <div>
            <footer className="bg-[#171717] text-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-8">

                    {/* Main Footer */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">

                        {/* Brand */}
                        <div className="space-y-5">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="relative w-10 h-10">
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

                            <p className="text-gray-400 text-sm leading-7 max-w-xs">
                                Your creative journey starts here. Discover,
                                connect, and book inspiring spaces to bring
                                your ideas to life.
                            </p>

                            <div className="flex items-center gap-3">
                                <a
                                    href="#"
                                    aria-label="Facebook"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#F97316] transition"
                                >
                                    <FaFacebookF size={17} />
                                </a>

                                <a
                                    href="#"
                                    aria-label="Instagram"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#F97316] transition"
                                >
                                    <FaInstagram size={19} />
                                </a>

                                <a
                                    href="#"
                                    aria-label="X"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#F97316] transition"
                                >
                                    <FaXTwitter size={17} />
                                </a>

                                <a
                                    href="#"
                                    aria-label="LinkedIn"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#F97316] transition"
                                >
                                    <FaLinkedinIn size={17} />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-semibold mb-5">
                                Quick Links
                            </h3>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><Link href="/" className="hover:text-[#F97316] transition">Home</Link></li>
                                <li><Link href="/studios" className="hover:text-[#F97316] transition">Explore Studios</Link></li>
                                <li><Link href="/how-it-works" className="hover:text-[#F97316] transition">How It Works</Link></li>
                                <li><Link href="/about" className="hover:text-[#F97316] transition">About Us</Link></li>
                            </ul>
                        </div>

                        {/* Studio Categories */}
                        <div>
                            <h3 className="text-lg font-semibold mb-5">
                                Popular Categories
                            </h3>
                            <ul className="space-y-3 text-sm text-gray-400">
                                {[
                                    "Photo Studios",
                                    "Sound Stages",
                                    "Podcast Rooms",
                                    "Music Suites",
                                    "Art Workshops",
                                ].map((category) => (
                                    <li key={category}>
                                        <Link
                                            href={`/studios?category=${encodeURIComponent(category)}`}
                                            className="hover:text-[#F97316] transition"
                                        >
                                            {category}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="text-lg font-semibold mb-5">
                                Stay Inspired
                            </h3>
                            <p className="text-sm text-gray-400 leading-7 mb-5">
                                Get creative space updates, inspiration, and
                                exclusive offers delivered to your inbox.
                            </p>

                            <form className="flex flex-col gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-[#F97316] transition"
                                />
                                <button
                                    type="button"
                                    className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold py-3 rounded-lg transition"
                                >
                                    Subscribe Now
                                </button>
                            </form>
                        </div>

                    </div>

                    {/* Bottom Footer */}
                    <div className="border-t border-white/10 pt-7 flex flex-col md:flex-row items-center justify-between gap-4">

                        <p className="text-sm text-gray-500 text-center">
                            © 2026 StudioSpace. All rights reserved.
                        </p>

                        <div className="flex items-center gap-6 text-sm text-gray-400">
                            <Link href="/terms" className="hover:text-[#F97316] transition">
                                Terms & Conditions
                            </Link>
                            <Link href="/privacy" className="hover:text-[#F97316] transition">
                                Privacy Policy
                            </Link>
                        </div>

                    </div>

                </div>
            </footer>
        </div>
    );
};

export default Footer;