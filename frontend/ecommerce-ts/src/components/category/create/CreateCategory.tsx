import React, { useState } from 'react'

import Button from '../../common/Button';


// import { LuView } from "react-icons/lu";

import CategoryHeader from './CategoryHeader';
import CategoryGeneralInfo from './CategoryGeneralInfo';
import CategoryImageInfo from './CategoryImageInfo';
import CategoryMetadataInfo from './CategoryMetadataInfo';
import CategoryFooter from './CategoryFooter';
import CreateCategoryProvider from '../../../context/CreateCategoryProvider';

const CreateCategory = () => {



    return (
        <CreateCategoryProvider >
            <form className='flex flex-col gap-4 p-4 w-full min-h-full bg-stone-100'>
                <CategoryHeader />
                <div className='flex flex-col flex-1 gap-4'>
                    <CategoryGeneralInfo />
                    <CategoryImageInfo />
                    <CategoryMetadataInfo />
                </div>
                <CategoryFooter />
            </form>
        </CreateCategoryProvider>
    )
}

export default CreateCategory