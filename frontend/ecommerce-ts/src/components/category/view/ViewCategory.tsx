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
    })

    return (
        <div className='flex flex-col gap-4 p-5 w-full min-h-full bg-white'>
            <div className='flex justify-between grow gap-5'>
                <div className="flex flex-col items-center customColor w-full rounded gap-2 customBorder border-stone-500">
                    <div className="w-[95%] h-[55%] bg-purple-300 mt-5 rounded overflow-hidden">
                        <img src={category?.imageUrl} alt={category?.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="w-[95%] flex flex-col grow justify-center gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-900">Name</label>
                            <input type="text" readOnly value={category?.name} className="w-full border p-2 text-gray-600 rounded" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label>Status</label>
                            <input type="text" readOnly value={category?.isActive ? "Active" : "InActive"} className="w-full border p-2  text-gray-600 rounded" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label>Description</label>
                            <textarea readOnly value={category?.description} className="w-full border p-2  text-gray-600 rounded" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-8">
                    <div>
                        <div className="customColor w-fit px-4 py-1 font-black rounded-tl-sm rounded-tr-sm">Master Category</div>
                        <div className="flex flex-col gap-6 customColor p-4 rounded-r-sm rounded-bl-sm">
                            <div className="flex flex-col gap-1">
                                <label>Name</label>
                                <input type="text" readOnly value={category?.masterCategory.name} className="w-full border p-2  text-gray-600 rounded" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label>Status</label>
                                <input type="text" readOnly value={category?.masterCategory.isActive ? "Active" : "InActive"} className="w-full border p-2  text-gray-600 rounded" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label>Description</label>
                                <textarea readOnly value={category?.description} className="w-full border p-2  text-gray-600 rounded" />
                            </div>
                        </div>
                    </div>
                    <div className="rounded flex flex-col gap-5">
                        <div>
                            <div className="customColor w-fit px-4 py-1 font-black rounded-tl-sm rounded-tr-sm">
                                Metadata
                            </div>
                            <div className="customColor p-4 flex flex-col gap-4 rounded-r-sm rounded-bl-sm">
                                {
                                    category?.metadata.map(metadata => (
                                        <div className="flex flex-col gap-1">
                                            <div>
                                                {metadata.title}
                                            </div>
                                            <div className="flex gap-5">
                                                {
                                                    metadata.values.map(val => (
                                                        <div className="bg-gray-300 px-2 py-1 rounded">
                                                            {val}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ViewCategory