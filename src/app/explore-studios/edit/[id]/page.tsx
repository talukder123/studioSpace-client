interface Props {
    params: Promise<{
        id: string;
    }>;
}



const UpdateStudioPage = async({params}:Props) => {
    const {id} = await params

    console.log(id);

    return (
        <div>
            
        </div>
    );
};

export default UpdateStudioPage;