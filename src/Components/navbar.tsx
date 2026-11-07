'use client';

import Image from 'next/image';

import logo from '@/assets/studioSpace.png'
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';


import { Button } from "@/components/ui/button";


import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from './ui/separator';
import { Building2, CalendarDays, LayoutDashboard, LogOut, PlusCircle } from 'lucide-react';


const handleLogout = () => {
    authClient.signOut()
}



const Navbar = () => {


    const menuItemClass =
        "flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm font-medium transition-all hover:bg-orange-500/10 hover:text-orange-600";


    const { data: session } = authClient.useSession()
    const user = session?.user;

    console.log(user);
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

                        {
                            user ? <Popover>
                                <PopoverTrigger render={<Avatar>
                                    <AvatarImage src={user?.image as string} />
                                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                                </Avatar>}>
                                    Open Popover
                                </PopoverTrigger>
                                <PopoverContent
                                    align="end"
                                    sideOffset={12}
                                    className="w-64 rounded-2xl border border-white/20
    bg-white/75 p-3 shadow-xl shadow-black/5
    backdrop-blur-2xl dark:border-white/10
    dark:bg-zinc-950/75"
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

                                        <Link href="/dashboard" className={menuItemClass}>
                                            <LayoutDashboard size={17} />
                                            <span>Dashboard</span>
                                        </Link>

                                        <Link href="/add-studio" className={menuItemClass}>
                                            <PlusCircle size={17} />
                                            <span>Add New Studio</span>
                                        </Link>

                                        <Link href="/my-listings" className={menuItemClass}>
                                            <Building2 size={17} />
                                            <span>My Studio Listings</span>
                                        </Link>

                                        <Link href="/my-bookings" className={menuItemClass}>
                                            <CalendarDays size={17} />
                                            <span>My Bookings</span>
                                        </Link>

                                    </div>

                                    <Separator className="my-1 bg-black/10 dark:bg-white/10" />

                                    <Button
                                        variant="ghost"
                                        onClick={handleLogout}
                                        className="w-full justify-start gap-2 rounded-xl
        text-red-500 hover:bg-red-500/10 hover:text-red-600"
                                    >
                                        <LogOut size={17} />
                                        Logout
                                    </Button>
                                </PopoverContent>
                            </Popover>
                                :
                                <>
                                    <div className="flex items-center gap-3">
                                        <Link
                                            href="/signin"
                                            className="px-5 py-2.5 text-gray-700 font-semibold hover:text-orange-500 transition"
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
                                </>
                        }





                        {/* Authorized Actions -- */}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;