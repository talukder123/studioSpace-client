import StudioCard from "@/components/exploreStudios/studioCard";
import { IStudio } from "@/Type/studio";


const ExploreStudiosPage = async () => {

    const res = await fetch("http://localhost:8000/studios");
    const data = await res.json()

    console.log(data);

    return (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 my-5 md:grid-cols-2 my-6 lg:grid-cols-3 my-7">
            {data.map((studio: IStudio) => (
                <StudioCard key={studio._id} studio={studio} />
            ))}
        </div>
    );
};

export default ExploreStudiosPage;