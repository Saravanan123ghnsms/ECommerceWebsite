import { createContext, useState, type ReactNode } from 'react';
import { axiosConnection } from '../axios/axiosConnection';
import { useNavigate } from 'react-router';

// type metadataType = {
//     id: number,
//     title: string,
//     values: string[]
// }

type productType = {
    _id?:string,
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

type categoryMetadataNotification = {
    isShow: boolean;
    title: string;
    message: string;
}

type metadataActionType = "Create" | "Edit" | "List";

type isShowType = {
    generalInfo: boolean,
    imageInfo: boolean,
    metadataInfo: boolean,
    priceInfo: boolean
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

type categoryAction = "create" | "edit";

type initialCreateCategoryContext = {
    metadata: metadataType[],
    setMetaData: React.Dispatch<React.SetStateAction<metadataType[]>>,
    initialValueCount: number,
    setInitialValueCount: React.Dispatch<React.SetStateAction<number>>,
    metadataTitle: string,
    setMetadataTitle: React.Dispatch<React.SetStateAction<string>>,
    metadataValues: string[],
    setMetadataValues: React.Dispatch<React.SetStateAction<string[]>>
    // handleAddMetaData: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id?: number) => void,
    metadataAction: metadataActionType,
    setMetadataAction: React.Dispatch<React.SetStateAction<metadataActionType>>,
    // handleCreateCategory: (e: React.FormEvent<HTMLFormElement>, id?: string) => void,
    isShow: isShowType,
    setIsShow: React.Dispatch<React.SetStateAction<isShowType>>,
    editMetadataName: string,
    setEditMetadataName: React.Dispatch<React.SetStateAction<string>>,
    categoryMetadataNotification: categoryMetadataNotification,
    setCategoryMetadataNotification: React.Dispatch<React.SetStateAction<categoryMetadataNotification>>,
    isEditCategory: boolean,
    setIsEditCategory: React.Dispatch<React.SetStateAction<boolean>>,
    category: categoryType,
    setCategory: React.Dispatch<React.SetStateAction<categoryType>>,

    // products 
    categoryList: categoryType[],
    setCategoryList: React.Dispatch<React.SetStateAction<categoryType[]>>,
    product: productType,
    setProduct: React.Dispatch<React.SetStateAction<productType>>,
    isProductPreview: boolean,
    setIsProductPreview: React.Dispatch<React.SetStateAction<boolean>>
    productImage: any,
    setProductImage: React.Dispatch<any>,
    handleCreateProduct: (e: React.FormEvent<HTMLFormElement>, id: string | undefined) => Promise<void>,
    isEditProduct: boolean,
    setIsEditProduct: React.Dispatch<React.SetStateAction<boolean>>


    // isDeleteNotification: boolean,
    // setIsDeleteNotification: React.Dispatch<React.SetStateAction<boolean>>


    //     editMetaDataTitle: string | undefined,
    //     setEditMetadataTitle: React.Dispatch<React.SetStateAction<string | undefined>>,
    //     editMetadataValues: string[] | undefined,
    //     seteditMetadataValues: React.Dispatch<React.SetStateAction<string[] | undefined>>
    // }
}



export const CreateProductContext = createContext<initialCreateCategoryContext | null>(null);

type createCategoryProviderType = {
    children: ReactNode
}

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

const defaultProduct: productType = {
    _id:"",
    name: "",
    description: "",
    originalPrice: null,
    finalPrice: null,
    discount: null,
    stock: null,
    imageUrl: "",
    isActive: true,
    category: defaultCategory,
    // productCategoryName:""
}

const CreateProductProvider = ({ children }: createCategoryProviderType) => {

    const navigate = useNavigate()

    const CREATE_CATEGORY_URL = "/api/category/addCategory";
    const UPDATE_CATEGORY_URL = "/api/category/updateCategory";

    const CREATE_PRODUCT_URL = "/api/product/addProduct";
    const UPDATE_PRODUCT_URL = "/api/product/updateProductByID";

    const [isEditCategory, setIsEditCategory] = useState(false);

    const [category, setCategory] = useState<categoryType>(defaultCategory);

    // const [category, setCategory] = useState<categoryType>();

    const [metadata, setMetaData] = useState<metadataType[]>([]);

    const [initialValueCount, setInitialValueCount] = useState(1);

    const [metadataTitle, setMetadataTitle] = useState("");

    const [metadataValues, setMetadataValues] = useState<string[]>([""]);

    const [editMetadataName, setEditMetadataName] = useState("");

    const [metadataAction, setMetadataAction] = useState<metadataActionType>("List");


    //products 
    const [categoryList, setCategoryList] = useState<categoryType[]>([]);

    const [product, setProduct] = useState<productType>(defaultProduct);

    const [isProductPreview, setIsProductPreview] = useState(false);

    const [productImage, setProductImage] = useState<any>("");

    const [isEditProduct, setIsEditProduct] = useState(false);




    const [isShow, setIsShow] = useState<isShowType>({
        generalInfo: false,
        imageInfo: false,
        metadataInfo: false,
        priceInfo: false
    });

    const [categoryMetadataNotification, setCategoryMetadataNotification] = useState<categoryMetadataNotification>({
        isShow: false,
        title: '',
        message: ''
    });
    // Product

    const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>, id: string | undefined) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const image = formData.get("image") as File | null;

        if (!image || image.size === 0) {
            formData.delete("image");
        }

        // formData.append("stock", "10")

        console.log(Object.fromEntries(formData))

        const token = localStorage.getItem("token");
        if (!token) {
            console.log("Bearer Token is missing...")
        }
        try {
            const mainURL = isEditProduct ? UPDATE_PRODUCT_URL : CREATE_PRODUCT_URL
            const result = await axiosConnection.post(mainURL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + token
                },
                params: {
                    "productId": id
                }
            })
            console.log(result);
            navigate("/admin/product-list");

        }
        catch (e) {
            console.log(e);
        }

    }

    return (
        <CreateProductContext.Provider value={{
            isEditCategory,
            setIsEditCategory,
            metadata,
            setMetaData,
            initialValueCount,
            setInitialValueCount,
            metadataTitle,
            setMetadataTitle,
            metadataValues,
            setMetadataValues,
            metadataAction,
            setMetadataAction,
            isShow,
            setIsShow,
            editMetadataName,
            setEditMetadataName,
            categoryMetadataNotification,
            setCategoryMetadataNotification,
            category,
            setCategory,

            //products
            categoryList,
            setCategoryList,
            product,
            setProduct,
            isProductPreview,
            setIsProductPreview,
            productImage,
            setProductImage,
            handleCreateProduct,
            isEditProduct,
            setIsEditProduct



            // editMetaDataTitle,
            // setEditMetadataTitle,
            // editMetadataValues,
            // seteditMetadataValues
        }}>
            {children}
        </CreateProductContext.Provider>
    )
}

export default CreateProductProvider