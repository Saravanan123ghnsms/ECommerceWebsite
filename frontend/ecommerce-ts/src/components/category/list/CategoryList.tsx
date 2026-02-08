import { useEffect, useState } from 'react';
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useNavigate } from 'react-router';
import { axiosConnection } from '../../../axios/axiosConnection';
import Button from '../../common/Button';
import Popup from '../../common/Popup';


const CategoryList = () => {

    const DELETE_CATEGORY_URL = "/api/category/deleteCategory";
    const GET_ALL_CATEGORY_URL = "/api/category/getAllCategory";

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

    const [isDeleteNotification, setIsDeleteNotification] = useState(false);

    const [deleteCategory, setDeleteCategory] = useState<categoryType | null>(null);

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

    useEffect(() => {
        getCategoryList();
    }, [])

    const handleDeleteCategory = async (id: string | undefined) => {
        if (!id) {
            console.log("category id is null..")
            return;
        }
        const token = localStorage.getItem("token");
        console.log(token)
        if (!token) {
            console.log("Bearer Token is missing...")
            return;
        }
        try {
            const result = await axiosConnection.post(DELETE_CATEGORY_URL, {}, {
                headers: {
                    "Authorization": "Bearer " + token
                },
                params: {
                    CategoryId: id
                }
            })
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setIsDeleteNotification(false);
            getCategoryList();
            setDeleteCategory(null);
        }
    }


    return (
        <div className={`${isDeleteNotification ? "bg-black/52" : "bg-stone-100"} relative flex flex-col gap-4 px-5 w-full min-h-full max-h-full  overflow-hidden`}>
            <div className={`${!isDeleteNotification ? "opacity-0 scale-80" : "opacity-100 scale-100"} absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transition-all duration-300`}>
                <Popup heading="Delete Category?" message={`Are you sure you want to delete this '${deleteCategory?.name}'`} setIsDeleteNotification={setIsDeleteNotification} deleteCategory={deleteCategory} handleDeleteCategory={handleDeleteCategory} />
            </div>
            <div className={`relative flex grow flex-col p-3 min-h-full ${isDeleteNotification && "brightness-50 pointer-events-none"}`}>
                <div className='flex  bg-stone-100 justify-end sticky top-0 right-0 p-5 z-10'>
                    <Button title='Add Category' type='list-create-category' onClick={() => navigate("/admin/category-create")} />
                </div>
                <div className='relative flex flex-col grow bg-white rounded-md mb-2 min-h-full border'>
                    <div className='font-semibold p-5 w-full grid gap-2 grid-cols-[100px_300px_1fr_1fr_1fr_1fr] rounded-tr-md rounded-tl-md bg-gray-300 overflow-hidden sticky top-21 right-0 z-10'>
                        <div><input type='checkbox' className='scale-150' /></div>
                        <div>Title</div>
                        <div>Status</div>
                        <div>Product Stock</div>
                        <div>Master Category</div>
                        <div>Action</div>
                    </div>
                    {
                        category.length > 0 ?
                            <div className='max-h-full overflow-auto'>
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
                                                    <RiDeleteBin7Fill className="cursor-pointer  bg-gray-200 text-red-400" onClick={() => {
                                                        setIsDeleteNotification(true);
                                                        setDeleteCategory(item)
                                                    }} />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            :
                            // Currently, No category are available...
                            <div className='flex justify-center items-center grow '>Currently, No category are available...</div>
                    }
                </div>
            </div>

        </div>
    )
}

export default CategoryList