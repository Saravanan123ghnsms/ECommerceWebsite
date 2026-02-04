import { useContext, useEffect, useState } from 'react';

import { CreateCategoryContext } from '../../../context/CreateCategoryProvider';
import CategoryFooter from './CategoryFooter';
import CategoryGeneralInfo from './CategoryGeneralInfo';
import CategoryHeader from './CategoryHeader';
import CategoryImageInfo from './CategoryImageInfo';
import CategoryMetadataInfo from './CategoryMetadataInfo';
import { axiosConnection } from '../../../axios/axiosConnection';
import { useNavigate, useParams } from 'react-router';

const CreateCategory = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const context = useContext(CreateCategoryContext);
    if (context === null) {
        throw new Error("Create Category Context is missing...");
    }

    const { handleCreateCategory, setIsEditCategory, setCategory, setIsShow, category } = context;

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
            setIsEditCategory(true);
            setIsShow({
                generalInfo: true,
                imageInfo: true,
                metadataInfo: true
            })
        }
        if (id !== null)
            getCategory();
    }, [])

    return (
        <form className='flex flex-col gap-4 p-4 w-full min-h-full bg-stone-100' onSubmit={(e) => handleCreateCategory(e, category._id)}>
            <CategoryHeader />
            <div className='flex flex-col flex-1 gap-4'>
                <CategoryGeneralInfo />
                <CategoryImageInfo />
                <CategoryMetadataInfo />
            </div>
            <CategoryFooter />
        </form>
    )
}

export default CreateCategory