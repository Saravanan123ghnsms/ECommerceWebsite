import { useContext, useEffect, useState } from "react";
import { FaCaretRight } from "react-icons/fa6";
import { ImUpload } from "react-icons/im";
import { CreateCategoryContext } from "../../../context/CreateCategoryProvider";

const CategoryImageInfo = () => {
    const [categoryImage, setCategoryImage] = useState<any>(null);

    const context = useContext(CreateCategoryContext);
    if (context === null) {
        throw new Error("Create Category Context is missing...");
    }

    const { isShow, setIsShow, category } = context;

    useEffect(() => {
        setCategoryImage(category.imageUrl);
    }, [category])

    return (
        <div data-div="general-info" className='bg-white rounded-xl'>
            <div className='flex justify-between items-center p-6'>
                <div>
                    <div data-div="title" className='text-xl font-black'>Upload Category Image</div>
                    <div data-div="desc">To upload a caegory image</div>
                </div>
                <div>
                    <FaCaretRight className={`${isShow.imageInfo ? "rotate-90" : "rotate-0"} transition-all duration-300 text-3xl p-1 cursor-pointer rounded-full  bg-gray-100 hover:bg-gray-200`} onClick={() => setIsShow({ ...isShow, imageInfo: !isShow.imageInfo })} />
                </div>
            </div>
            <div data-div="info" className={`flex justify-center overflow-hidden transition-all duration-500 ${isShow.imageInfo ? "max-h-96 px-12" : "max-h-0 px-12"}`}>
                <label htmlFor='category-image' className='h-80 w-full border border-dotted rounded bg-stone-50  cursor-pointer flex flex-col gap-2 justify-center items-center bg-cover bg-blend-overlay bg-center' style={{
                    backgroundImage: `url(${categoryImage})`, backgroundColor: "rgba(255,255,255,.5)"
                }}>
                    <div>
                        <ImUpload className='text-4xl' />
                    </div>
                    <div>
                        Upload a category image. Supported formats: JPG, PNG, GIF
                    </div>
                    {/* <img src={categoryImage}></img> */}
                </label>

                <input id='category-image' type='file' required accept="image/*" name="image" className='absolute w-0 h-0 opacity-0' onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        setCategoryImage(URL.createObjectURL(file))
                    }
                }} />
            </div>
        </div >
    )
}

export default CategoryImageInfo