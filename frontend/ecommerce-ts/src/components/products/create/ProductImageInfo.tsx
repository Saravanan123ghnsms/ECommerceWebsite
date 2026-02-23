import { useContext, useEffect, useState } from "react";
import { FaCaretRight } from "react-icons/fa6";
import { ImUpload } from "react-icons/im";
import { CreateCategoryContext } from "../../../context/CreateCategoryProvider";
import { CreateProductContext } from "../../../context/CreateProductProvider";

const ProductImageInfo = () => {
    // const [categoryImage, setCategoryImage] = useState<any>(null);



    const context = useContext(CreateProductContext);
    if (context === null) {
        throw new Error("Create Category Context is missing...");
    }

    const { isShow, setIsShow, category, isEditCategory, product, productImage, setProductImage } = context;

    useEffect(() => {
        setProductImage(product.imageUrl);
    }, [product])

    return (
        <div data-div="general-info" className='bg-white rounded-xl'>
            <div className='flex justify-between items-center p-6'>
                <div>
                    <div data-div="title" className='text-xl font-black'>Upload Product Image</div>
                    <div data-div="desc">To upload a product image</div>
                </div>
                <div>
                    <FaCaretRight className={`${isShow.imageInfo ? "rotate-90" : "rotate-0"} transition-all duration-300 text-3xl p-1 cursor-pointer rounded-full  bg-gray-100 hover:bg-gray-200`} onClick={() => setIsShow({ ...isShow, imageInfo: !isShow.imageInfo })} />
                </div>
            </div>
            <div data-div="info" className={`flex justify-center overflow-hidden transition-all duration-500 ${isShow.imageInfo ? "max-h-96 px-12" : "max-h-0 px-12"}`}>
                <label htmlFor='category-image' className='h-80 w-full border border-dotted rounded bg-stone-50  cursor-pointer flex flex-col gap-2 justify-center items-center bg-cover bg-blend-overlay bg-center' style={{
                    backgroundImage: `url(${productImage})`, backgroundColor: "rgba(255,255,255,.5)"
                }}>
                    <div>
                        <ImUpload className='text-4xl' />
                    </div>
                    <div>
                        Upload a category image. Supported formats: JPG, PNG, GIF
                    </div>
                    {/* <img src={categoryImage}></img> */}
                </label>

                <input required={!isEditCategory}   // ✅ key line
                    id='category-image' type='file' accept="image/*" name="image" className='absolute w-0 h-0 opacity-0' onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            setProductImage(URL.createObjectURL(file))
                        }
                    }} />
            </div>
        </div >
    )
}

export default ProductImageInfo