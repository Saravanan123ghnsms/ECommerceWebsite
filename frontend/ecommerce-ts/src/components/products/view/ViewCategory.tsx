import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { axiosConnection } from "../../../axios/axiosConnection";
import ViewCategoryHeader from "./ViewCategoryHeader";
import ViewCategoryBasicInfo from "./ViewCategoryBasicInfo";
import ViewCategoryMetadataInfo from "./ViewCategoryMetadataInfo";


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
            const result = await axiosConnection.get(GET_CATEGORY_URL, {
                headers: {
                    "Authorization": "Bearer " + token,
                },
                params: {
                    "CategoryId": id
                }
            })
            setCategory(result.data.Category);
        }

        getCategory();
    }, [])

    return (
        <div className='flex flex-col gap-2 p-4 w-full min-h-full bg-white'>
            <ViewCategoryHeader />
            <div className='flex justify-between grow gap-5'>
                <ViewCategoryBasicInfo category={category} />
                <ViewCategoryMetadataInfo category={category} />
            </div>
        </div>
    )
}

export default ViewCategory