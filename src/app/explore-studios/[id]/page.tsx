
import React from 'react';

const StudioDetailPage = async({params}) => {
    const {id} = await params

    const res = await fetch(`http://localhost:8000/studio/${id}`)
    const data = await res.json()
    console.log(data);

    console.log(id);
    return (
        <div>

        </div>
    );
};

export default StudioDetailPage;