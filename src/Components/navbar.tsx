
'use client';

import Image from 'next/image';
import logo from '@/assets/studioSpace.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu } from "lucide-react";

import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover";

import { Separator } from './ui/separator';
import {
    Building2,
    CalendarDays,
    LayoutDashboard,
    LogOut,
    PlusCircle,
} from 'lucide-react';

import { useEffect, useState } from 'react';


const handleLogout = () => {
    authClient.signOut();
};


const Navbar = () => {

    const [open, setOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    const pathname = usePathname();

    const menuItemClass =
        "flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm font-medium transition-all hover:bg-orange-500/10 hover:text-orange-600";

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const { setTheme } = useTheme();


    // Detect active homepage section
    useEffect(() => {
        if (pathname !== "/") return;

        const sections = document.querySelectorAll(
            "#how-it-works, #about"
        );

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio - a.intersectionRatio
                    );

                if (visibleSections.length > 0) {
                    setActiveSection(visibleSections[0].target.id);
                }
            },
            {
                threshold: [0.2, 0.5, 0.8],
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [pathname]);


    const activeClass = "text-orange-500 font-semibold";

    const inactiveClass =
        "text-gray-600 dark:text-gray-300 hover:text-orange-500 transition";


    return (
        <header className="sticky top-0 z-50 w-full">

            <div className="w-full bg-white dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-800">

                <div className="max-w-7xl mx-auto px-4 md:px-8">

                    <div className="h-16 flex items-center justify-between">

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 shrink-0">

                            <div className="w-9 h-9 relative">
                                <Image
                                    src={logo}
                                    alt="StudioSpace Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                                Studio<span className="text-orange-500">Space</span>
                            </span>

                        </Link>


                        {/* Mobile Navigation - Only Home & Explore */}
                        <nav className="flex md:hidden items-center gap-3 sm:gap-5">

                            <Link
                                href="/"
                                onClick={() => setActiveSection("home")}
                                className={`text-sm ${pathname === "/" && activeSection === "home"
                                    ? activeClass
                                    : inactiveClass
                                    }`}
                            >
                                Home
                            </Link>

                            <Link
                                href="/explore-studios"
                                className={`text-sm ${pathname.startsWith("/explore-studios")
                                    ? activeClass
                                    : inactiveClass
                                    }`}
                            >
                                Explore
                            </Link>

                        </nav>


                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-8">

                            <Link
                                href="/"
                                onClick={() => setActiveSection("home")}
                                className={
                                    pathname === "/" && activeSection === "home"
                                        ? activeClass
                                        : inactiveClass
                                }
                            >
                                Home
                            </Link>

                            <Link
                                href="/explore-studios"
                                className={
                                    pathname.startsWith("/explore-studios")
                                        ? activeClass
                                        : inactiveClass
                                }
                            >
                                Explore Studios
                            </Link>

                            <Link
                                href="/#how-it-works"
                                onClick={() => setActiveSection("how-it-works")}
                                className={
                                    pathname === "/" && activeSection === "how-it-works"
                                        ? activeClass
                                        : inactiveClass
                                }
                            >
                                How It Works
                            </Link>

                            <Link
                                href="/#about"
                                onClick={() => setActiveSection("about")}
                                className={
                                    pathname === "/" && activeSection === "about"
                                        ? activeClass
                                        : inactiveClass
                                }
                            >
                                About Us
                            </Link>

                        </nav>


                        {/* User Actions */}
                        <div className="flex items-center gap-2 sm:gap-3 shrink-0">

                            {/* Theme Toggle */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                    const isDark =
                                        document.documentElement.classList.contains("dark");

                                    setTheme(isDark ? "light" : "dark");
                                }}
                            >
                                <Sun className="hidden dark:block" size={20} />
                                <Moon className="block dark:hidden" size={20} />
                            </Button>


                            {user ? (

                                /* Authenticated - Profile Avatar */
                                <Popover open={open} onOpenChange={setOpen}>

                                    <PopoverTrigger render={
                                        <button
                                            type="button"
                                            className="rounded-full"
                                        >
                                            <Avatar>
                                                <AvatarImage src={user?.image as string} />
                                                <AvatarFallback>
                                                    {user?.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </button>
                                    }>
                                        Open Popover
                                    </PopoverTrigger>

                                    <PopoverContent
                                        align="end"
                                        sideOffset={12}
                                        className="w-64 rounded-2xl border border-white/20 bg-white/75 p-3 shadow-xl shadow-black/5 backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-950/75"
                                    >

                                        {/* User Info */}
                                        <PopoverHeader className="px-2 py-2">

                                            <PopoverTitle className="text-sm font-semibold">
                                                {session?.user.name}
                                            </PopoverTitle>

                                            <PopoverDescription className="text-xs">
                                                {session?.user.email}
                                            </PopoverDescription>

                                        </PopoverHeader>

                                        <Separator className="my-1 bg-black/10 dark:bg-white/10" />


                                        {/* Menu */}
                                        <div className="space-y-1">

                                            <Link
                                                href="/explore-studios"
                                                className={menuItemClass}
                                                onClick={() => setOpen(false)}
                                            >
                                                <LayoutDashboard size={17} />
                                                <span>Dashboard</span>
                                            </Link>

                                            <Link
                                                href="/add-new-studio"
                                                className={menuItemClass}
                                                onClick={() => setOpen(false)}
                                            >
                                                <PlusCircle size={17} />
                                                <span>Add New Studio</span>
                                            </Link>

                                            <Link
                                                href="/my-listings"
                                                className={menuItemClass}
                                                onClick={() => setOpen(false)}
                                            >
                                                <Building2 size={17} />
                                                <span>My Studio Listings</span>
                                            </Link>

                                            <Link
                                                href="/my-bookings"
                                                className={menuItemClass}
                                                onClick={() => setOpen(false)}
                                            >
                                                <CalendarDays size={17} />
                                                <span>My Bookings</span>
                                            </Link>

                                        </div>

                                        <Separator className="my-1 bg-black/10 dark:bg-white/10" />

                                        <Button
                                            variant="ghost"
                                            onClick={() => {
                                                setOpen(false);
                                                handleLogout();
                                            }}
                                            className="w-full justify-start gap-2 rounded-xl text-red-500 hover:bg-red-500/10 hover:text-red-600"
                                        >
                                            <LogOut size={17} />
                                            Logout
                                        </Button>

                                    </PopoverContent>

                                </Popover>

                            ) : (

                                <>
                                    {/* Desktop Login & Register */}
                                    <div className="hidden md:flex items-center gap-3">

                                        <Link
                                            href="/signin"
                                            className="px-5 py-2.5 text-gray-700 dark:text-gray-200 font-semibold hover:text-orange-500 transition"
                                        >
                                            Login
                                        </Link>

                                        <Link
                                            href="/signup"
                                            className="px-5 py-2.5 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
                                        >
                                            Register
                                        </Link>

                                    </div>


                                    {/* Mobile Hamburger Menu */}
                                    <div className="md:hidden">

                                        <Popover
                                            open={mobileMenuOpen}
                                            onOpenChange={setMobileMenuOpen}
                                        >

                                            <PopoverTrigger render={
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    aria-label="Open menu"
                                                >
                                                    <Menu size={23} />
                                                </Button>
                                            }>
                                                Open Menu
                                            </PopoverTrigger>

                                            <PopoverContent
                                                align="end"
                                                sideOffset={12}
                                                className="w-48 rounded-xl p-3 dark:bg-zinc-950"
                                            >

                                                <div className="flex flex-col gap-2">

                                                    <Link
                                                        href="/signin"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className="w-full rounded-lg border border-orange-500 px-4 py-2.5 text-center text-sm font-semibold text-orange-600 transition hover:bg-orange-50 dark:hover:bg-orange-500/10"
                                                    >
                                                        Login
                                                    </Link>

                                                    <Link
                                                        href="/signup"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className="w-full rounded-lg bg-orange-500 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-orange-600"
                                                    >
                                                        Register
                                                    </Link>

                                                </div>

                                            </PopoverContent>

                                        </Popover>

                                    </div>

                                </>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </header>
    );
};

export default Navbar;
