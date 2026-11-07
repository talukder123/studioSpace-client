import Image from 'next/image';
import React from 'react';
import logo from '@/assets/studioSpace.png'
import Link from 'next/link';

const Navbar = () => {
    return (
        <div>
            <div className="w-full bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="h-20 flex items-center justify-between">

                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 relative">
                                <Image
                                    src={logo}
                                    alt="StudioSpace Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">
                                Studio<span className="text-orange-500">Space</span>
                            </span>
                        </div>

                        {/* Navigation Links */}
                        <nav className="hidden md:flex items-center gap-8">
                            <Link href="/" className="text-orange-500 font-semibold">
                                Home
                            </Link>
                            <Link href="/explore-studios" className="text-gray-600 hover:text-orange-500 transition">
                                Explore Studios
                            </Link>
                            <Link href="/add-new-studio" className="text-gray-600 hover:text-orange-500 transition">
                                Temp add
                            </Link>
                            <a href="#how-it-works" className="text-gray-600 hover:text-orange-500 transition">
                                How It Works
                            </a>
                            <a href="#about" className="text-gray-600 hover:text-orange-500 transition">
                                About Us
                            </a>
                        </nav>

                        {/* Unauthenticated Actions */}
                        <div className="flex items-center gap-3">
                            <a
                                href="/signin"
                                className="px-5 py-2.5 text-gray-700 font-semibold hover:text-orange-500 transition"
                            >
                                Login
                            </a>
                            <Link
                                href="/signup"
                                className="px-5 py-2.5 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
                            >
                                Register
                            </Link>
                        </div>

                        {/* Authorized Actions -- */}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;