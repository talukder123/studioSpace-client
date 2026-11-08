import EditStudioForm from "@/components/editStudioInfo/editStudioForm";


interface Props {
    params: Promise<{
        id: string;
    }>;
}



const UpdateStudioPage = async ({ params }: Props) => {
    const { id } = await params

    const response = await fetch(`http://localhost:8000/studio/${id}`);
    const studio = await response.json();


    console.log("studio data for update -->",studio);
    
    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-10">
            <EditStudioForm studio={studio}></EditStudioForm>
        </div>
    );
};

export default UpdateStudioPage;