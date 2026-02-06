import { useContext } from 'react';
import FormSubmitButton from '../../common/FormSubmitButton';
import { CreateCategoryContext } from '../../../context/CreateCategoryProvider';

const CategoryFooter = () => {

    const context = useContext(CreateCategoryContext);
    if (context === null) {
        throw new Error("Create Category Context is missing...");
    }

    const { isEditCategory, handleCreateCategory, category } = context;

    return (
        <div className='flex p-5 justify-around'>
            <div>save</div>
            <FormSubmitButton title={`${isEditCategory ? "Edit category" : "create category"}`} />

        </div>

    )
}

export default CategoryFooter