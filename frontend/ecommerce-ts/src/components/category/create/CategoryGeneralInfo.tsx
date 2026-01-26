
import { FaCaretRight } from "react-icons/fa6";

const CategoryGeneralInfo = () => {
    return (
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
    )
}

export default CategoryGeneralInfo