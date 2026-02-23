
import { useContext, useEffect } from "react";
import { FaCaretRight } from "react-icons/fa6";
import { CreateProductContext } from "../../../context/CreateProductProvider";

const ProductPriceInfo = () => {

    const context = useContext(CreateProductContext);
    if (context === null) {
        throw new Error("Create Category Context is missing...");
    }

    const { isShow, setIsShow, category, isEditCategory, setCategory, product, setProduct } = context;

    useEffect(() => {
        const calculateDiscountPrice = () => {
            if (product.originalPrice && product.discount) {
                if (product.originalPrice > 0 && product.discount > 0) {
                    const discountAmount =
                        (product.originalPrice * product.discount) / 100;

                    setProduct((prev) => ({
                        ...prev,
                        finalPrice: product.originalPrice && product.originalPrice - discountAmount
                    }));
                }
                console.log("hi")
            }
        };

        calculateDiscountPrice();
    }, [product.originalPrice, product.discount])

    return (
        <div data-div="general-info" className='bg-white rounded-xl'>
            <div className='flex justify-between items-center p-6'>
                <div>
                    <div data-div="title" className='text-xl font-black'>Product Price Information</div>
                    <div data-div="desc">To add a product price info</div>
                </div>
                <div>
                    <FaCaretRight className={`${isShow.priceInfo ? "rotate-90" : "rotate-0"} transition-all duration-300 text-3xl p-1 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200`} onClick={() => setIsShow({ ...isShow, priceInfo: !isShow.priceInfo })} />
                </div>
            </div>
            <div data-div="info" className={`grid grid-cols-2 gap-8 transition-all duration-500 overflow-hidden ${isShow.priceInfo ? "max-h-96 px-8" : "max-h-0 px-8"}`}>
                <input required type='number' placeholder='Original Price' name='originalPrice' className='border p-3 rounded'
                    value={product.originalPrice ? product.originalPrice : ""} onChange={(e) => setProduct({ ...product, originalPrice: Number(e.target.value) })} />

                <input required type='number' placeholder='Discount Percentage' name='discount' className='border p-3 rounded'
                    value={product.discount ? product.discount : ""} onChange={(e) => setProduct({ ...product, discount: Number(e.target.value) })} />

                <input required disabled type='number' placeholder='Final Price' name='discountPrice' className='border p-3 rounded'
                    value={product.finalPrice ? product.finalPrice : ""} onChange={(e) => setProduct({ ...product, finalPrice: Number(e.target.value) })} />
            </div>
        </div >
    )
}

export default ProductPriceInfo