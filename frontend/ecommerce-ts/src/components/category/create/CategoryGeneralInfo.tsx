
import { useContext } from "react";
import { FaCaretRight } from "react-icons/fa6";
import { CreateCategoryContext } from "../../../context/CreateCategoryProvider";

const CategoryGeneralInfo = () => {

    const context = useContext(CreateCategoryContext);
    if (context === null) {
        throw new Error("Create Category Context is missing...");
    }

    const { isShow, setIsShow } = context;

    return (
        <div data-div="general-info" className='bg-white rounded-xl'>
            <div className='flex justify-between items-center p-6'>
                <div>
                    <div data-div="title" className='text-xl font-black'>General Information</div>
                    <div data-div="desc">To add a general info</div>
                </div>
                <div>
                    <FaCaretRight className={`${isShow.generalInfo ? "rotate-90" : "rotate-0"} transition-all duration-300 text-3xl p-1 cursor-pointer rounded-full hover:bg-gray-100`} onClick={() => setIsShow({ ...isShow, generalInfo: !isShow.generalInfo })} />
                </div>
            </div>
            <div data-div="info" className={`grid grid-cols-2 gap-8 transition-all duration-500 overflow-hidden ${isShow.generalInfo ? "max-h-96 px-8" : "max-h-0 px-8"}`}>
                <input type='text' required placeholder='Name' name='categoryName' className='border p-3 rounded' />
                <select name="superCategory" required className="border py-2 pl-4 pr-10 rounded">
                    <option value={"Fashion"}>Fashion</option>
                    <option value={"Electronics"}>Electronics</option>
                </select>
                <input type='text' required placeholder='Description' name='categoryDescription' className='border p-3 rounded' />
                <select required name='status' className="border py-2 pl-4 pr-10 rounded">
                    <option value={"Active"}>Active</option>
                    <option value={"Active"}>InActive</option>
                </select>
            </div>
        </div>
    )
}

export default CategoryGeneralInfo