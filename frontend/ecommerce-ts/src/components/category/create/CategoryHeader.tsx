import { FaCaretLeft } from "react-icons/fa";

const CategoryHeader = () => {
    return (
        <div data-div="" className='p-4 flex gap-2'>
            <FaCaretLeft className='text-2xl cursor-pointer' />
            <div>All Products</div>
        </div>

    )
}

export default CategoryHeader