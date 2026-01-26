import { useState } from "react";
import { FaCaretRight } from "react-icons/fa6";
import { ImUpload } from "react-icons/im";

const CategoryImageInfo = () => {
    const [categoryImage, setCategoryImage] = useState<any>();

    return (
        <div data-div="general-info" className='bg-white rounded-xl p-6'>
            <div className='flex justify-between items-center px-4'>
                <div>
                    <div data-div="title" className='text-xl font-black'>Upload Category Image</div>
                    <div data-div="desc">To upload a caegory image</div>
                </div>
                <div>
                    <FaCaretRight className='text-3xl p-1 cursor-pointer rounded-full hover:bg-gray-100' />
                </div>
            </div>
            <div data-div="info" className='p-10 flex justify-center'>
                <label htmlFor='category-image' className='h-80 w-full border border-dotted rounded bg-stone-50  cursor-pointer flex flex-col gap-2 justify-center items-center'>
                    <div>
                        <ImUpload className='text-4xl' />
                    </div>
                    <div>
                        Upload a category image. Supported formats: JPG, PNG, GIF
                    </div>
                    <img src={categoryImage}></img>
                </label>

                <input id='category-image' type='file' accept="image/*" className='hidden' onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        setCategoryImage(URL.createObjectURL(file))
                    }
                }} />
            </div>
        </div>
    )
}

export default CategoryImageInfo