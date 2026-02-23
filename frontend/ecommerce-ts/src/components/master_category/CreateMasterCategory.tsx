import React, { useEffect, useState } from 'react'
import Button from '../common/Button'
import { axiosConnection } from '../../axios/axiosConnection'

type metadataActionType = "List" | "Create";

type CreateMasterCategoryType = {
    setMasterCategoryAction: React.Dispatch<React.SetStateAction<metadataActionType>>,
    editMasterCategoryId: string | null
}

const CreateMasterCategory = ({ setMasterCategoryAction, editMasterCategoryId }: CreateMasterCategoryType) => {

    const CREATE_MASTER_CATEGORY_URL = "/api/mastercategory/addMasterCategory";

    const GET_MASTER_CATEGORY_URL = "api/mastercategory/getMasterCategory";

    useEffect(() => {
        const getMasterCategory = async () => {
            const token = localStorage.getItem("token");
            console.log(token)
            if (!token) {
                console.log("Bearer Token is missing...")
                return;
            }
            try {
                const result = await axiosConnection.get(GET_MASTER_CATEGORY_URL, {
                    headers: {
                        "Authorization": "Bearer " + token
                    },
                    params: {
                        masterCategoryId: editMasterCategoryId
                    }
                })
                setMasterCategory(result.data.masterCategory);
            }
            catch (e) {
                console.log(e)
            }
        }

        if (editMasterCategoryId !== null) {
            getMasterCategory();
            console.log("=====>", masterCategory)
        }

    }, [])

    type masterCategoryType = {
        _id?: string,
        name: string,
        description: string,
        isActive: boolean
    }

    const initialMasterCategory: masterCategoryType = {
        _id: "",
        name: "",
        description: "",
        isActive: true
    }

    const [masterCategory, setMasterCategory] = useState(initialMasterCategory)

    const handleCreateMasterCategory = async (e: React.FormEvent<HTMLFormElement>, id?: string | null) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("Bearer Token is missing...")
            return;
        }

        if (id !== null) {
            try {
                const result = await axiosConnection.post(CREATE_MASTER_CATEGORY_URL,
                    {
                        name: masterCategory.name,
                        description: masterCategory.description,
                        isActive: masterCategory.isActive
                    },
                    {
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    })
                setMasterCategoryAction("List")
            }
            catch (e) {
                console.log(e)
            }
        }
        else {

        }
    }

    return (
        <div className='min-h-full w-full flex justify-center items-center'>
            <form className='h-full w-full flex flex-col gap-8 justify-center items-center p-8 border rounded' onSubmit={
                (e) => handleCreateMasterCategory(e, editMasterCategoryId)
            }>
                <div className='text-center font-black text-xl'>create new master category</div>
                <div className='flex flex-col gap-8 h-1/2 w-1/2'>
                    <input type='text' required placeholder='Name' name='name' className='border p-3 rounded'
                        value={masterCategory.name} onChange={(e) => setMasterCategory({ ...masterCategory, name: e.target.value })} />
                    <select required name='isActive' className="border p-3 rounded" value={`${masterCategory.isActive}`} onChange={(e) => setMasterCategory({ ...masterCategory, isActive: e.target.value === "Active" ? true : false })}>
                        <option disabled selected>Select Status</option>
                        <option value={"true"}>Active</option>
                        <option value={"false"}>InActive</option>
                    </select>
                    <textarea required rows={5} cols={30} placeholder='Add Description...' name='name' className='border p-3 rounded'
                        value={masterCategory.description} onChange={(e) => setMasterCategory({ ...masterCategory, description: e.target.value })} />
                </div>
                <Button title='create category' />

            </form>
        </div>
    )
}

export default CreateMasterCategory