import StudioCard from "@/components/exploreStudios/studioCard";
import { IStudio } from "@/Type/studio";


const ExploreStudiosPage = async () => {

    const res = await fetch("http://localhost:8000/studios");
    const data = await res.json()

    console.log(data);

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.map((studio:IStudio) => (
        <StudioCard key={studio._id} studio={studio} />
      ))}
    </div>
    );
};

export default ExploreStudiosPage;