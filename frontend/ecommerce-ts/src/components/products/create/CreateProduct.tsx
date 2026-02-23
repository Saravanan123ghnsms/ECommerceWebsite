import { useContext, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router';
import { axiosConnection } from '../../../axios/axiosConnection';
import { CreateProductContext } from '../../../context/CreateProductProvider';
import ProductFooter from './ProductFooter';
import ProductGeneralInfo from './ProductGeneralInfo';
import ProductHeader from './ProductHeader';
import ProductImageInfo from './ProductImageInfo';
import ProductMetadataInfo from './ProductMetadataInfo';
import ProductPriceInfo from './ProductPriceInfo';
import ProductReview from './ProductReview';

const CreateProduct = () => {


    type stock = {
        _id: string,
        totalStock: number,
        currentStock: number,
        itemSold: number,
    }

    type metadataType = {
        _id?: string,
        title: string,
        values: string[],
        selectedValue?: string
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
        isActive: boolean,
        masterCategory: masterCategoryType
        metadata: metadataType[]
    }

    const GET_ALL_CATEGORY_URL = "/api/category/getAllCategory";

    const { id } = useParams();
    const navigate = useNavigate();

    const context = useContext(CreateProductContext);
    if (context === null) {
        throw new Error("Create Category Context is missing...");
    }

    const { handleCreateProduct, setCategory, setIsShow, category, categoryList, setCategoryList, isProductPreview, product, setProduct, isEditProduct, setIsEditProduct, setProductImage } = context;

    useEffect(() => {
        const GET_CATEGORY_URL = "/api/product/getProductByID";
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("Bearer Token is missing...")
            return;
        }
        const getProduct = async () => {
            console.log("id=>>>" + id)
            const result = await axiosConnection.get(GET_CATEGORY_URL, {
                headers: {
                    "Authorization": "Bearer " + token,
                },
                params: {
                    "productId": id
                }
            })
            setProduct(result.data.product);
            setIsEditProduct(true);
            if (result.data.product.imageUrl !== null) {
                setProductImage(result.data.product.imageUrl)
            }
            else {
                setProductImage(null)
            }

            if (result.data.product.stock) {
                setProduct(prev => ({
                    ...prev,
                    stock: result.data.product.stock.totalStock
                }));
            }


            if (result.data.product.category === null) {
                const defaultCategory: categoryType = {
                    _id: "",
                    name: "",
                    description: "",
                    imageUrl: "",
                    isActive: true,
                    masterCategory: {
                        _id: "",
                        name: "Fashion",
                        description: "",
                        isActive: true
                    },
                    metadata: [],
                };

                setProduct(prev => ({
                    ...prev,
                    category: defaultCategory
                }));
            }
            else {
                setProductImage(null)
            }
            setIsShow({
                generalInfo: true,
                imageInfo: true,
                metadataInfo: true,
                priceInfo: true
            })
        }
        if (id !== null)
            getProduct();
    }, [])

    useEffect(() => {
        getCategoryList();
    }, [])

    const getCategoryList = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("Bearer Token is missing...")
            return;
        }
        try {
            const result = await axiosConnection.get(GET_ALL_CATEGORY_URL, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            setCategoryList(result.data.AllCategory)
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <form className={`${isProductPreview ? "bg-black/52" : "bg-stone-100"} relative flex flex-col gap-4 p-4 w-full min-h-full`} onSubmit={(e) => handleCreateProduct(e, product._id)}>
            <ProductReview />
            <ProductHeader />
            <div className={`flex flex-1 gap-4 ${isProductPreview && "brightness-50 pointer-events-none"}`}>
                <div className='flex flex-col flex-1 gap-4'>
                    <ProductImageInfo />
                    <ProductGeneralInfo />
                    <ProductMetadataInfo />
                    <ProductPriceInfo />
                </div>
                {/* <CategoryMetadataInfo /> */}
            </div>
            <ProductFooter />
        </form>
    )
}

export default CreateProduct