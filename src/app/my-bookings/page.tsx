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

    return (
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 p-15'>
            {data.map((booking: ImyBooking) => (
                <MyBookingCard key={booking._id} booking={booking}/>
            ))}
        </div>
    );
};

export default MyBookingPage;