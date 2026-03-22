import { useState } from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

const VendorHeader = () => {

    const navigate = useNavigate();

    return (
        <div data-div="" className='p-4 flex gap-2'>
            <FaAngleDoubleLeft className='text-2xl cursor-pointer' onClick={() => navigate("/admin/vendor")} />
            <div>All Vendor</div>
        </div>

    )
}

export default VendorHeader