import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { axiosConnection } from '../../axios/axiosConnection';
import { FaWindowClose } from "react-icons/fa";


const ProductList = () => {

    const DELETE_PRODUCT_URL = "/api/product/deleteProductByID";
    const REFILL_PRODUCT_URL = "/api/product/refillProductByID";
    const GET_ALL_PRODUCT_URL = "/api/product/getAllProducts";

    const navigate = useNavigate();

    type stock = {
        _id: string,
        totalStock: number,
        currentStock: number,
        itemSold: number,
    }

    type createdByType = {
        name: string
    }

    type productType = {
        _id: string,
        name: string,
        description: string,
        originalPrice: number | null,
        finalPrice: number | null,
        discount: number | null,
        stock: stock | null,
        // stockResposne?:
        imageUrl: string,
        isActive: boolean,
        category: categoryType,
        createdBy?: createdByType
    }

    type metadataType = {
        _id: number,
        title: string,
        values: string[]
    }

    type masterCategoryType = {
        _id: string,
        name: string,
        description: string,
        isActive: boolean
    }

    type categoryType = {
        _id: string,
        name: string,
        description: string,
        imageUrl: string,
        isActive: string,
        masterCategory: masterCategoryType
        metadata: metadataType[]
    }

    const [product, setProduct] = useState<productType[]>([]);

    const [category, setCategory] = useState<categoryType[]>([]);

    const [isRefillNotification, setIsRefillNotification] = useState(false);

    const [refillProduct, setRefillProduct] = useState<productType | null>(null);

    const [currentStock, setCurentStock] = useState<number | null>(null);

    const [refillQuantity, setRefillQuantity] = useState<number>(0);

    useEffect(() => {
        setCurentStock(refillProduct?.stock?.currentStock !== undefined
            ? refillProduct?.stock?.currentStock + refillQuantity : 0)
    }, [refillProduct, refillQuantity])

    const getProductList = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("Bearer Token is missing...")
            return;
        }
        try {
            const result = await axiosConnection.get(GET_ALL_PRODUCT_URL, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            setProduct(result.data.products)
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getProductList();
    }, [])

    const handleRefillProduct = async (id: string | undefined) => {
        if (!id) {
            console.log("product id is null..")
            return;
        }
        const token = localStorage.getItem("token");
        console.log(token)
        if (!token) {
            console.log("Bearer Token is missing...")
            return;
        }
        try {
            const result = await axiosConnection.post(REFILL_PRODUCT_URL, { "refillQuantity": refillQuantity }, {
                headers: {
                    "Authorization": "Bearer " + token
                },
                params: {
                    productId: id
                }
            })
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setIsRefillNotification(false);
            getProductList();
            setRefillQuantity(0)
            setRefillProduct(null);
        }
    }


    return (
        <div className={`${isRefillNotification ? "bg-black/52" : "bg-stone-100"} relative flex flex-col p-6 gap-4 w-full min-h-full max-h-full  overflow-hidden`}>
            <div className={`${!isRefillNotification ? "opacity-0 scale-80" : "opacity-100 scale-100"} absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 bg-white p-10 flex flex-col gap-5 rounded`}>

                <div className='flex justify-between'>
                    <h1 className='text-center text-yellow-600 text text-lg font-bold'>Product Refill</h1>
                    <FaWindowClose className='text-xl text-red-600 cursor-pointer' onClick={() => { setIsRefillNotification(false) }} />
                </div>
                <div className='flex flex-col'>
                    <label className='text-xs translate-2 w-fit px-2 inventoryLabelBgColor text-gray-500'>Product Name</label>
                    <input type='text' required placeholder='Name' name='name' className='border p-3 rounded w-100 bg-gray-100 text-gray-500' disabled value={refillProduct?.name}
                    />
                </div>

                <div className='flex flex-col'>
                    <label className='text-xs translate-2 w-fit px-2 inventoryLabelBgColor text-gray-600'>Total Stock</label>
                    <input type='text' required placeholder='current stock' name='name' className='border p-3 rounded w-100 bg-gray-100 text-gray-600' disabled value={refillProduct?.stock?.totalStock ? refillProduct?.stock?.totalStock : 0}
                    />
                </div>

                <div className='flex flex-col'>
                    <label className='text-xs translate-2 w-fit px-2 inventoryLabelBgColor text-gray-600'>Item Sold</label>
                    <input type='text' required placeholder='Item Sold' name='name' className='border p-3 rounded w-100 bg-gray-100 text-gray-600' disabled value={refillProduct?.stock?.itemSold ? refillProduct?.stock?.itemSold : 0}
                    />
                </div>

                <div className='flex flex-col'>
                    <label className='text-xs translate-2 w-fit px-2 inventoryLabelBgColor text-gray-600'>Current Stock</label>
                    <input type='text' required placeholder='total stock' name='name' className='border p-3 rounded w-100 bg-gray-100 text-gray-600' disabled value={currentStock ? currentStock : 0}
                    />
                </div>

                <div className='flex flex-col'>
                    <label className='text-xs translate-2 w-fit px-2 bg-white'>Refill Quantity</label>
                    <input type='number' required placeholder='Name' name='name' className='border p-3 rounded w-100 ' value={refillQuantity} onChange={(e) => setRefillQuantity(Number(e.target.value))}
                    />
                </div>

                <button className='bg-orange-300 p-2 cursor-pointer rounded' onClick={() => handleRefillProduct(refillProduct?._id)}>Refill</button>


            </div>
            <div className={`relative flex grow flex-col min-h-full ${isRefillNotification && "brightness-50 pointer-events-none"}`}>
                {/* <div className='flex  bg-stone-100 justify-end sticky top-0 right-0 p-5 z-10'>
                    <Button title='Add Product' type='list-create-category' onClick={() => navigate("/admin/product-create")} />
                </div> */}
                <div className='relative flex flex-col grow bg-white rounded-md mb-2 min-h-full border'>
                    <div className='font-semibold p-5 w-full grid gap-2 grid-cols-[100px_250px_1fr_1fr_1fr_1fr_1fr] rounded-tr-md rounded-tl-md bg-gray-300 overflow-hidden sticky top-0 right-0 z-10'>
                        <div><input type='checkbox' className='scale-150' /></div>
                        <div>Product Name</div>
                        <div>Created By</div>
                        <div>Total Stock</div>
                        <div>Current Stock</div>
                        <div>Item Sold</div>
                        <div>Action</div>
                    </div>
                    {
                        product.length > 0 ?
                            <div className='max-h-full overflow-auto'>
                                {
                                    product.map((item, index) => (
                                        <div>
                                            <div className={`p-5 w-full grid items-center gap-2 grid-cols-[100px_250px_1fr_1fr_1fr_1fr_1fr] ${index % 2 == 1 && "bg-gray-100"}`}>
                                                <div><input type='checkbox' className='scale-150' /></div>
                                                <div className='flex gap-2 items-center'>
                                                    <div className=''><img src={item.imageUrl} className='h-8 w-10 object-cover rounded' /></div>
                                                    <div>{item.name}</div>
                                                </div>
                                                <div>{item?.createdBy?.name}</div>
                                                <div>{item.stock?.totalStock ? item.stock?.totalStock : "-"}</div>
                                                <div>{item.stock?.totalStock ? item.stock?.currentStock : "-"}</div>
                                                <div>{item.stock?.totalStock ? item.stock?.itemSold : "-"}</div>
                                                <button className="flex justify-start bg-amber-500 w-fit px-4 py-1 rounded tracking-wide cursor-pointer"
                                                    onClick={() => {
                                                        setIsRefillNotification(true);
                                                        setRefillProduct(item);
                                                    }}
                                                >
                                                    Refill
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            :
                            // Currently, No category are available...
                            <div className='flex justify-center items-center grow '>Currently, No Products are available...</div>
                    }
                </div>
            </div>

        </div>
    )
}

export default ProductList 