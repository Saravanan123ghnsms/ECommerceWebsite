import { useEffect, useState } from 'react';
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useNavigate } from 'react-router';
import { axiosConnection } from '../../../axios/axiosConnection';
import Button from '../../common/Button';
import Popup from '../../common/Popup';


const ProductList = () => {

    const DELETE_PRODUCT_URL = "/api/product/deleteProductByID";
    const GET_ALL_PRODUCT_URL = "/api/product/getAllProducts";

    const navigate = useNavigate();

    type stock = {
        _id: string,
        totalStock: number,
        currentStock: number,
        itemSold: number,
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
        isActive: boolean
        category: categoryType
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

    const [isDeleteNotification, setIsDeleteNotification] = useState(false);

    const [deleteProduct, setDeleteProduct] = useState<productType | null>(null);

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

    const handleDeleteProduct = async (id: string | undefined) => {
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
            const result = await axiosConnection.post(DELETE_PRODUCT_URL, {}, {
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
            setIsDeleteNotification(false);
            getProductList();
            setDeleteProduct(null);
        }
    }


    return (
        <div className={`${isDeleteNotification ? "bg-black/52" : "bg-stone-100"} relative flex flex-col gap-4 px-5 w-full min-h-full max-h-full  overflow-hidden`}>
            <div className={`${!isDeleteNotification ? "opacity-0 scale-80" : "opacity-100 scale-100"} absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transition-all duration-300`}>
                <Popup heading="Delete Product?" message={`Are you sure you want to delete this '${deleteProduct?.name}'`} setIsDeleteNotification={setIsDeleteNotification} deleteProduct={deleteProduct} handleDelete={handleDeleteProduct} deleteId={deleteProduct?._id} />
            </div>
            <div className={`relative flex grow flex-col p-3 min-h-full ${isDeleteNotification && "brightness-50 pointer-events-none"}`}>
                <div className='flex  bg-stone-100 justify-end sticky top-0 right-0 p-5 z-10'>
                    <Button title='Add Product' type='list-create-category' onClick={() => navigate("/admin/product-create")} />
                </div>
                <div className='relative flex flex-col grow bg-white rounded-md mb-2 min-h-full border'>
                    <div className='font-semibold p-5 w-full grid gap-2 grid-cols-[100px_300px_1fr_1fr_1fr_1fr] rounded-tr-md rounded-tl-md bg-gray-300 overflow-hidden sticky top-21 right-0 z-10'>
                        <div><input type='checkbox' className='scale-150' /></div>
                        <div>Product Name</div>
                        <div>Category</div>
                        <div>Stock</div>
                        <div>Price</div>
                        <div>Action</div>
                    </div>
                    {
                        product.length > 0 ?
                            <div className='max-h-full overflow-auto'>
                                {
                                    product.map((item, index) => (
                                        <div>
                                            <div className={`p-5 w-full grid items-center gap-2 grid-cols-[100px_300px_1fr_1fr_1fr_1fr] ${index % 2 == 1 && "bg-gray-100"}`}>
                                                <div><input type='checkbox' className='scale-150' /></div>
                                                <div className='flex gap-2 items-center'>
                                                    <div className=''><img src={item.imageUrl} className='h-8 w-10 object-cover rounded' /></div>
                                                    <div>{item.name}</div>
                                                </div>
                                                <div>{item.category?.name}</div>
                                                <div>{item.stock?.totalStock ? item.stock?.totalStock : "-"}</div>
                                                <div>&#8377; {item.finalPrice}</div>
                                                <div className="flex justify-start gap-8 text-2xl">
                                                    {/* <LuView className="cursor-pointer" /> */}
                                                    <HiOutlineViewfinderCircle className='cursor-pointer bg-gray-200 text-gray-700' onClick={() => navigate(`/admin/category-view/${item._id}`)} />
                                                    <MdEditSquare className="cursor-pointer bg-gray-200 text-blue-400" onClick={() => navigate(`/admin/product-edit/${item._id}`)} />
                                                    <RiDeleteBin7Fill className="cursor-pointer  bg-gray-200 text-red-400" onClick={() => {
                                                        setIsDeleteNotification(true);
                                                        setDeleteProduct(item)
                                                    }} />
                                                </div>
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