
import StudioCard from "@/components/exploreStudios/studioCard";
import { IStudio } from "@/Type/studio";

const ExploreStudiosPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>;
}) => {

    const { category } = await searchParams;

    const url = category
        ? `${process.env.NEXT_PUBLIC_API_URL}/studios?category=${encodeURIComponent(category)}`
        : `${process.env.NEXT_PUBLIC_API_URL}/studios`;

    const res = await fetch(url);
    const data: IStudio[] = await res.json();

    console.log(data);

    return (
        <div>
            <div className="mx-auto max-w-7xl px-4 pt-10 pb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Explore Creative Studios
                </h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Discover and book the perfect creative space to bring your ideas to life.
                </p>
            </div>

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 my-5 md:grid-cols-2 lg:grid-cols-3">
                {data.map((studio) => (
                    <StudioCard key={studio._id} studio={studio} />
                ))}
            </div>

            <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Find Your Space. Create Something Amazing.
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-gray-500 dark:text-gray-400">
                    The right environment can make all the difference. Choose a space
                    that inspires you and bring your next creative vision to life.
                </p>
            </div>
        </div>
    );
};

export default ExploreStudiosPage;
