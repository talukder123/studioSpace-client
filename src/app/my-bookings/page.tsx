import MyBookingCard from '@/components/myBookings/myBookingCard';
import { auth } from '@/lib/auth';
import { ImyBooking } from '@/Type/myBooking';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const MyBookingPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/signin");
    }

    const user = session?.user;

    const res = await fetch(`http://localhost:8000/my-bookings?email=${user?.email}`)
    const data = await res.json()

    const pendingCount = data.filter(
        (booking: ImyBooking) => booking.status === "Pending"
    ).length;

    return (
        <div>
            {/* Page Heading */}
            <div className="mx-auto max-w-7xl px-4 pt-10 pb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    My Bookings
                </h1>

                <p className="mt-2 max-w-2xl text-gray-500 dark:text-gray-400">
                    Keep track of your studio reservations, manage your bookings,
                    and stay updated on your upcoming creative sessions.
                </p>
                <p className="mt-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {pendingCount === 0 ? (
                        "You currently have no pending studio bookings."
                    ) : (
                        <>
                            You have{" "}
                            <span className="font-bold text-orange-500">
                                {pendingCount} pending {pendingCount === 1 ? "booking" : "bookings"}
                            </span>{" "}
                            awaiting confirmation.
                        </>
                    )}
                </p>
            </div>

            {/* Booking Cards */}
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-5 lg:grid-cols-3">
                {data.map((booking: ImyBooking) => (
                    <MyBookingCard key={booking._id} booking={booking} />
                ))}
            </div>

            {/* Closing Message */}
            <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Make Every Creative Session Count
                </h2>

                <p className="mx-auto mt-3 max-w-2xl text-gray-500 dark:text-gray-400">
                    Great work begins in the right space. Stay organized, manage
                    your reservations, and focus on bringing your creative ideas to life.
                </p>
            </div>
        </div>
    );
};

export default MyBookingPage;