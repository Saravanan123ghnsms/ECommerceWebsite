
import { useContext } from "react";
import { FaCaretRight } from "react-icons/fa6";
import { CreateProductContext } from "../../../context/CreateProductProvider";

const ProductGeneralInfo = () => {

    const context = useContext(CreateProductContext);
    if (context === null) {
        throw new Error("Create Category Context is missing...");
    }

    const { isShow, setIsShow, category, isEditCategory, setCategory, categoryList, product, setProduct } = context;

    const selectedCategory = categoryList.find(category => category._id === product.category._id);

    // const categ

    return (
        <div data-div="general-info" className='bg-white rounded-xl'>
            <div className='flex justify-between items-center p-6'>
                <div>
                    <div data-div="title" className='text-xl font-black'>General Information</div>
                    <div data-div="desc">To add a product general info</div>
                </div>
                <div>
                    <FaCaretRight className={`${isShow.generalInfo ? "rotate-90" : "rotate-0"} transition-all duration-300 text-3xl p-1 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200`} onClick={() => setIsShow({ ...isShow, generalInfo: !isShow.generalInfo })} />
                </div>
            </div>
            <div data-div="info" className={`grid grid-cols-2 gap-8 transition-all duration-500 overflow-hidden ${isShow.generalInfo ? "max-h-96 px-8" : "max-h-0 px-8"}`}>
                <input required type='text' placeholder='Name' name='name' className='border p-3 rounded'
                    value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
                <select required name="category" className="border py-2 pl-4 pr-10 rounded" value={`${product.category.name}`} onChange={(e) => setProduct({ ...product, category: { ...category, _id: e.target.value, name: e.target.name }})} >
                    <option value="" disabled>select category </option>
                    {
                        categoryList.map((category) => (
                            <option value={category._id}>{category.name}</option>
                        ))
                    }
                </select>
                <input required type='text' placeholder='Description' name='description' className='border p-3 rounded' value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
                <input required type='number' placeholder='Stock' name='stock' className='border p-3 rounded' value={product.stock ? product.stock : ""} onChange={(e) => setProduct({ ...product, stock: Number(e.target.value) })} />
                <select required name='isActive' className="border py-2 pl-4 pr-10 rounded" value={`${product.isActive}`} onChange={(e) => setProduct({ ...product, isActive: e.target.value === "Active" ? true : false })}>
                    <option value={"true"}>Active</option>
                    <option value={"false"}>InActive</option>
                </select>
            </div>
        </div >
    )
}

export default ProductGeneralInfo