import React, { useState } from 'react'
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa6";
import Button from '../../common/Button';
import { ImUpload } from "react-icons/im";
import { FaPlusSquare } from "react-icons/fa";

const CreateCategory = () => {

    const [categoryImage, setCategoryImage] = useState<any>();

    type metadataType = {
        title: string,
        description: string,
        values: string[]
    }

    const [metadata, setMetaData] = useState<metadataType[]>([]);


    return (
        <form className='flex flex-col gap-4 p-4 w-full min-h-full bg-stone-100'>

            <div data-div="" className='p-4 flex gap-2'>
                <FaCaretLeft className='text-2xl cursor-pointer' />
                <div>All Products</div>
            </div>


            <div className='flex flex-col flex-1 gap-4'>
                <div data-div="general-info" className='bg-white rounded-xl p-6'>
                    <div className='flex justify-between items-center px-4'>
                        <div>
                            <div data-div="title" className='text-xl font-black'>General Information</div>
                            <div data-div="desc">To add a general info</div>
                        </div>
                        <div>
                            <FaCaretRight className='text-3xl p-1 cursor-pointer rounded-full hover:bg-gray-100' />
                        </div>
                    </div>
                    <div data-div="info" className='p-5 grid grid-cols-2 gap-8'>
                        <input type='text' placeholder='Name' className='border p-3 rounded' />
                        <select required className="border py-2 pl-4 pr-10 rounded">
                            <option value={"Fashion"}>Fashion</option>
                            <option value={"Electronics"}>Electronics</option>
                        </select>
                        <input type='text' placeholder='Description' className='border p-3 rounded' />
                        <select required className="border py-2 pl-4 pr-10 rounded">
                            <option value={"Active"}>Active</option>
                            <option value={"Active"}>InActive</option>
                        </select>
                    </div>
                </div>

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



                <div data-div="general-info" className='bg-white rounded-xl p-6'>
                    <div className='flex justify-between items-center px-4'>
                        <div>
                            <div data-div="title" className='text-xl font-black'>Add Metadata Info</div>
                            <div data-div="desc">To add a metadata info</div>
                        </div>
                        <div>
                            <FaCaretRight className='text-3xl p-1 cursor-pointer rounded-full hover:bg-gray-100' />
                        </div>
                    </div>
                    <div className='px-4 flex justify-between pt-5'>
                        <div>No Metadata Available</div>
                        <FaPlusSquare className='text-3xl cursor-pointer text-green-600'/>
                    </div>
                </div>

            </div>

            <div className='flex p-5 justify-around'>
                <div>save</div>
                <Button title={"create category"} />
            </div>

        </form>
    )
}

export default CreateCategory