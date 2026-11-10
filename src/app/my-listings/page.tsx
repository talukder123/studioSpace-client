
import MyListingCard from "@/components/myListing/myListingCard";

import { auth } from "@/lib/auth";
import { IStudio } from "@/Type/studio";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Camera } from "lucide-react";
import EmptyState from "@/components/emptyState";

const MyListingPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/signin");
    }

    const userEmail = session.user.email;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-listings/${userEmail}`, {
        cache: "no-store",
    });

    const studios: IStudio[] = await res.json();

    return (
        <div className="mx-auto max-w-7xl space-y-5 px-4 py-12">

            {studios.length === 0 ? (
                <EmptyState
                    icon={<Camera size={36} />}
                    title="No Studio Listings Yet"
                    description="You haven't listed any creative spaces yet. Share your workspace with creators and start growing your studio business."
                    actionLabel="Add Your Studio"
                    actionHref="/add-new-studio"
                />
            ) : (
                studios.map((studio) => (
                    <MyListingCard
                        key={studio._id}
                        studio={studio}
                    />
                ))
            )}

        </div>
    );
};

export default MyListingPage;
