import { useContext } from 'react';
import { CreateProductContext } from '../../../context/CreateProductProvider';
import FormSubmitButton from '../../common/FormSubmitButton';

const ProductFooter = () => {

    const context = useContext(CreateProductContext);
    if (context === null) {
        throw new Error("Create Category Context is missing...");
    }

    const { isEditCategory, handleCreateProduct, category } = context;

    return (
        <div className='flex p-5 justify-around'>
            <div>save</div>
            <FormSubmitButton title={`${isEditCategory ? "Edit product" : "create product"}`} />

        </div>

    )
}

export default ProductFooter