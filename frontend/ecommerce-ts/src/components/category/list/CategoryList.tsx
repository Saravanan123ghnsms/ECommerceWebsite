import { useEffect, useState } from 'react'
import Button from '../../common/Button'
import { axiosConnection } from '../../../axios/axiosConnection';
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { useNavigate } from 'react-router';
import Popup from '../../common/Popup';


const CategoryList = () => {

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

    const [category, setCategory] = useState<categoryType[]>([]);

    useEffect(() => {
        const GET_ALL_CATEGORY_URL = "/api/category/getAllCategory";
        const getCategoryList = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("Bearer Token is missing...")
                return;
            }
            try {
                const result = await axiosConnection.get(GET_ALL_CATEGORY_URL, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })
                setCategory(result.data.AllCategory)
            }
            catch (e) {
                console.log(e)
            }
        }
        getCategoryList();
    }, [])


    return (
        <div className='relative flex flex-col gap-4 px-8 w-full max-h-screen bg-stone-100 overflow-hidden'>
            <div className='relative flex grow flex-col'>
                <div className='flex  bg-stone-100 justify-end sticky top-0 right-0 p-5 z-10'>
                    <Button title='Add Category' type='list-create-category' onClick={() => navigate("/admin/category-create")} />
                </div>
                <div className='relative flex flex-col grow bg-white rounded-md'>
                    <div className='font-semibold p-5 w-full grid gap-2 grid-cols-[100px_300px_1fr_1fr_1fr_1fr] rounded-tr-md rounded-tl-md bg-gray-300 overflow-hidden sticky top-21 right-0 z-10'>
                        <div><input type='checkbox' className='scale-150' /></div>
                        <div>Title</div>
                        <div>Status</div>
                        <div>Product Stock</div>
                        <div>Master Category</div>
                        <div>Action</div>
                    </div>
                    <div>
                        {
                            category.map((item, index) => (
                                <div>
                                    <div className={`p-5 w-full grid items-center gap-2 grid-cols-[100px_300px_1fr_1fr_1fr_1fr] ${index % 2 == 1 && "bg-gray-100"}`}>
                                        <div><input type='checkbox' className='scale-150' /></div>
                                        <div className='flex gap-2 items-center'>
                                            <div className=''><img src={item.imageUrl} className='h-8 w-10 object-cover rounded' /></div>
                                            <div>{item.name}</div>
                                        </div>
                                        <div>{item.isActive ? "Active" : "InActive"}</div>
                                        <div>{0}</div>
                                        <div>{item.masterCategory.name}</div>
                                        <div className="flex justify-start gap-8 text-2xl">
                                            {/* <LuView className="cursor-pointer" /> */}
                                            <HiOutlineViewfinderCircle className='cursor-pointer bg-gray-200 text-gray-700' onClick={() => navigate(`/admin/category-view/${item._id}`)} />
                                            <MdEditSquare className="cursor-pointer bg-gray-200 text-blue-400" onClick={() => navigate(`/admin/category-edit/${item._id}`)} />
                                            <RiDeleteBin7Fill className="cursor-pointer  bg-gray-200 text-red-400" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='absolute z-20 top-1/2'>
                <Popup />
            </div>
        </div>
    )
}

export default CategoryList