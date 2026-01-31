import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { axiosConnection } from "../../../axios/axiosConnection";

const ViewCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    type metadataType = {
        _id: number,
        title: string,
        values: string[]
    }

    type masterCategoryType = {
        _id: string,
        name: string,
        description: string,
        isActive: boolean
    }

    type categoryType = {
        _id: string,
        name: string,
        description: string,
        imageUrl: string,
        isActive: string,
        masterCategory: masterCategoryType
        metadata: metadataType[]
    }

    const [category, setCategory] = useState<categoryType>();

    useEffect(() => {
        const GET_CATEGORY_URL = "/api/category/getCategory";
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("Bearer Token is missing...")
            return;
        }
        const getCategory = async () => {
            console.log("id=>>>" + id)
            const result = await axiosConnection.get(GET_CATEGORY_URL, { CategoryId: id }, {
                headers: {
                    "Authorization": "Bearer " + token
                },
            })
        }
        getCategory();
    })

    return (
        <div className='flex flex-col gap-4 px-8 py-4 w-full min-h-full bg-stone-100'>
            <div className='flex grow flex-col gap-5'>
                {category?.name}
            </div>


        </div>
    )
}

export default ViewCategory