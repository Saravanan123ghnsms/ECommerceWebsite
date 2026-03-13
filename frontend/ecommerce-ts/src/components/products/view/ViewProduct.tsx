import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { axiosConnection } from "../../../axios/axiosConnection";
import ViewProductBasicInfo from "./ViewProductBasicInfo";
import ViewProductHeader from "./ViewProductHeader";
import ViewProductMetadataInfo from "./ViewProductMetadataInfo";


const ViewProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    type productType = {
        _id?: string,
        name: string,
        description: string,
        originalPrice: number | null,
        finalPrice: number | null,
        discount: number | null,
        stock: number | null,
        // stockResponse:
        imageUrl: string,
        isActive: boolean
        category: categoryType,
        // productCategoryName?:string
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

    const [product, setProduct] = useState<productType>();

    useEffect(() => {
        const GET_PRODUCT_URL = "/api/product/getProductByID";
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("Bearer Token is missing...")
            return;
        }
        const getProduct = async () => {
            console.log("id=>>>" + id)
            const result = await axiosConnection.get(GET_PRODUCT_URL, {
                headers: {
                    "Authorization": "Bearer " + token,
                },
                params: {
                    "productId": id
                }
            })
            setProduct(result.data.product);
        }

        getProduct();
    }, [])

    return (
        <div className='flex flex-col gap-2 p-4 w-full min-h-full bg-white'>
            <ViewProductHeader />
            <div className='flex justify-between grow gap-5'>
                <ViewProductBasicInfo product={product} />
                <ViewProductMetadataInfo product={product} />
            </div>
        </div>
    )
}

export default ViewProduct