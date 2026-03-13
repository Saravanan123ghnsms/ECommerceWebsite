import { FaAngleDoubleLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

const ViewProductHeader = () => {

    const navigate = useNavigate();

    return (
        <div data-div="" className='flex gap-2'>
            <FaAngleDoubleLeft className='text-2xl cursor-pointer' onClick={() => navigate("/admin/product-list")} />
            <div>All Products</div>
        </div>
    )
}

export default ViewProductHeader