import MyListingCard from "@/components/myListing/myListingCard";
import { auth } from "@/lib/auth";
import { IStudio } from "@/Type/studio";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


const MyListingPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/signin");
    }

    const userEmail = session?.user?.email;

    const res = await fetch(`http://localhost:8000/my-listings/${userEmail}`, {
        cache: "no-store",
    })

    const studios = await res.json();


    return (
        <div className="space-y-5 p-20">
            {studios.map((studio: IStudio) => (
                <MyListingCard key={studio._id} studio={studio}/>
            ))}
        </div>
    );
};

export default MyListingPage;