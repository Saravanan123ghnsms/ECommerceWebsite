import { useContext } from 'react';



// import { LuView } from "react-icons/lu";

import { CreateCategoryContext } from '../../../context/CreateCategoryProvider';
import CategoryFooter from './CategoryFooter';
import CategoryGeneralInfo from './CategoryGeneralInfo';
import CategoryHeader from './CategoryHeader';
import CategoryImageInfo from './CategoryImageInfo';
import CategoryMetadataInfo from './CategoryMetadataInfo';

const CreateCategory = () => {
    const context = useContext(CreateCategoryContext);
    if (context === null) {
        throw new Error("Create Category Context is missing...");
    }

    const { handleCreateCategory } = context;

    return (
        <form className='flex flex-col gap-4 p-4 w-full min-h-full bg-stone-100' onSubmit={(e) => handleCreateCategory(e)}>
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