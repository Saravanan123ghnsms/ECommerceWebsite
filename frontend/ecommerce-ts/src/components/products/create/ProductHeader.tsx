import { useContext } from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import { CreateProductContext } from "../../../context/CreateProductProvider";

const ProductHeader = () => {

    const navigate = useNavigate();

    const context = useContext(CreateProductContext);
    if (context === null) {
        throw new Error("Create Category Context is missing...");
    }

    const { isProductPreview, setIsProductPreview, setIsShow } = context;

    return (
        <div data-div="" className={`p-2 flex gap-2 justify-between items-center ${isProductPreview && "brightness-50 pointer-events-none"}`}>
            <div className="flex gap-2">
                <FaAngleDoubleLeft className='text-2xl cursor-pointer' onClick={() => navigate("/admin/product-list")} />
                <div>All Products</div>
            </div>
            <button className="bg-orange-400 px-5 py-2 rounded cursor-pointer" onClick={() => {
                setIsShow({ generalInfo: false, imageInfo: false, metadataInfo: false, priceInfo: false })
                setTimeout(()=>{setIsProductPreview(pre => !pre);},300)
            }
            }>Preview</button>
        </div>

    )
}

export default ProductHeader