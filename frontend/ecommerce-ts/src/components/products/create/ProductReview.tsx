import React, { useContext } from 'react'
import { CreateProductContext } from '../../../context/CreateProductProvider';
import { AiFillCloseSquare } from "react-icons/ai";

const ProductReview = () => {
    const context = useContext(CreateProductContext);
    if (context === null) {
        throw new Error("Create Category Context is missing...");
    }

    const { product, isProductPreview, setIsProductPreview, productImage, categoryList } = context;

    const selectedCategory = categoryList.find(category => category.name === product?.category.name)

    return (
        <div className={`transition-all duration-300 rounded z-20 bg-white h-fit p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isProductPreview ? "opacity-100" : "opacity-0"}`}>
            <div className='relative flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <img src={productImage||undefined} alt='product Image' className='h-70 w-100 bg-red-100' />
                    <div>
                        <span className='font-black'>{product.name}</span>
                        {
                            product?.category.name.trim().length > 0 &&
                            <span>&nbsp; &nbsp;({product?.category.name})</span>
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    {
                        selectedCategory &&
                        <div>
                            {
                                selectedCategory.metadata.map(data => (
                                    <div className='flex gap-4'>
                                        <div>{data.title}</div>
                                        <div className='flex gap-2'>
                                            {
                                                data.values.map((val) => (
                                                    <div className='bg-gray-400 px-3 py-.5 rounded'>
                                                        {val}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    }
                </div>
                {/* <div className='absolute top-0 right-0'> */}
                <AiFillCloseSquare className='absolute top-0 right-0 text-2xl text-red-500 cursor-pointer' onClick={() => setIsProductPreview(pre => !pre)} />
                {/* </div> */}
            </div>
        </div >
    )
}

export default ProductReview