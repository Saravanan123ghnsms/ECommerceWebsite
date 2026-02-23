import React, { useEffect, useState } from 'react';
import { MdEditSquare } from 'react-icons/md';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router';
import { axiosConnection } from '../../axios/axiosConnection';
import Popup from '../common/Popup';

type metadataActionType = "List" | "Create";

type MasterCategoryListType = {
    setMasterCategoryAction: React.Dispatch<React.SetStateAction<metadataActionType>>,
    setEditMasterCategoryId: React.Dispatch<React.SetStateAction<string | null>>
}

const MasterCategoryList = ({ setMasterCategoryAction, setEditMasterCategoryId }: MasterCategoryListType) => {

    const CREATE_MASTER_CATEGORY_URL = "/api/category/addCategory";

    const GET_ALL_MASTER_CATEGORY_URL = "api/mastercategory/getAllMasterCategory";

    const DELETE_MASTER_CATEGORY_URL = "/api/mastercategory/deleteMasterCategory";

    const navigate = useNavigate();

    type masterCategoryType = {
        _id: string,
        name: string,
        description: string,
        isActive: boolean
    }

    const [masterCategory, setMasterCategory] = useState<masterCategoryType[]>([])

    // const [category, setCategory] = useState<categoryType[]>([]);

    const [isDeleteNotification, setIsDeleteNotification] = useState(false);

    const [deleteMasterCategory, setDeleteMasterCategory] = useState<masterCategoryType | null>(null);

    useEffect(() => {
        getMasterCategoryList();
    }, [])

    const getMasterCategoryList = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("Bearer Token is missing...")
            return;
        }
        try {
            const result = await axiosConnection.get(GET_ALL_MASTER_CATEGORY_URL, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            setMasterCategory(result.data.result)
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleDeleteMasterCategory = async (id: string | undefined) => {
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
            const result = await axiosConnection.post(DELETE_MASTER_CATEGORY_URL, {}, {
                headers: {
                    "Authorization": "Bearer " + token
                },
                params: {
                    masterCategoryId: id
                }
            })
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setIsDeleteNotification(false);
            getMasterCategoryList();
            setDeleteMasterCategory(null);
        }
    }

    return (
        <div className={`${isDeleteNotification ? "bg-black/52" : "bg-stone-100"} relative flex flex-col gap-4 w-full min-h-full max-h-full  overflow-hidden`}>
            <div className={`${!isDeleteNotification ? "opacity-0 scale-80" : "opacity-100 scale-100"} absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transition-all duration-300`}>
                <Popup heading="Delete Master Category?" message={`Are you sure you want to delete this '${deleteMasterCategory?.name}'`} setIsDeleteNotification={setIsDeleteNotification} deleteId={deleteMasterCategory?._id} deleteMasterCategory={deleteMasterCategory} handleDelete={handleDeleteMasterCategory} />
            </div>
            <div className={`relative flex grow flex-col min-h-full min-w-full ${isDeleteNotification && "brightness-50 pointer-events-none"}`}>
                <div className='relative flex flex-col grow bg-white rounded-md mb-2 min-h-full border'>
                    <div className='font-semibold p-5 w-full grid gap-2 grid-cols-[100px_200px_350px_1fr_1fr] rounded-tr-md rounded-tl-md bg-gray-300 overflow-hidden sticky right-0 z-10'>
                        <div><input type='checkbox' className='scale-150' /></div>
                        <div>Title</div>
                        <div>Description</div>
                        <div>Status</div>
                        <div>Action</div>
                    </div>
                    {
                        masterCategory.length > 0 ?
                            <div className='max-h-full overflow-auto'>
                                {
                                    masterCategory.map((item, index) => (
                                        <div>
                                            <div className={`p-5 w-full grid items-center gap-2 grid-cols-[100px_200px_350px_1fr_1fr] ${index % 2 == 0 && "bg-gray-100"}`}>
                                                <div><input type='checkbox' className='scale-150' /></div>
                                                <div>{item.name}</div>
                                                <div>{item.description}</div>
                                                <div>{item.isActive ? "Active" : "In Active"}</div>
                                                <div className="flex justify-start gap-8 text-2xl">
                                                    {/* <LuView className="cursor-pointer" /> */}

                                                    <MdEditSquare className="cursor-pointer bg-gray-200 text-blue-400" onClick={() => {
                                                        setMasterCategoryAction("Create");
                                                        setEditMasterCategoryId(item._id)
                                                    }
                                                    } />
                                                    <RiDeleteBin7Fill className="cursor-pointer  bg-gray-200 text-red-400" onClick={() => {
                                                        setIsDeleteNotification(true);
                                                        setDeleteMasterCategory(item)
                                                    }} />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            :
                            // Currently, No category are available...
                            <div className='flex justify-center items-center grow '>Currently, No master category details are available...</div>
                    }
                </div>
            </div>

        </div>
    )
}

export default MasterCategoryList