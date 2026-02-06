import { createContext, use, useState, type ReactNode } from 'react';
import { axiosConnection } from '../axios/axiosConnection';
import { useNavigate } from 'react-router';

// type metadataType = {
//     id: number,
//     title: string,
//     values: string[]
// }

type categoryMetadataNotification = {
    isShow: boolean;
    title: string;
    message: string;
}

type metadataActionType = "Create" | "Edit" | "List";

type isShowType = {
    generalInfo: boolean,
    imageInfo: boolean,
    metadataInfo: boolean
}

type metadataType = {
    _id?: string,
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
    handleAddMetaData: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id?: number) => void,
    metadataAction: metadataActionType,
    setMetadataAction: React.Dispatch<React.SetStateAction<metadataActionType>>,
    handleCreateCategory: (e: React.FormEvent<HTMLFormElement>, id?: string) => void,
    isShow: isShowType,
    setIsShow: React.Dispatch<React.SetStateAction<isShowType>>,
    editMetadataName: string,
    setEditMetadataName: React.Dispatch<React.SetStateAction<string>>,
    categoryMetadataNotification: categoryMetadataNotification,
    setCategoryMetadataNotification: React.Dispatch<React.SetStateAction<categoryMetadataNotification>>,
    isEditCategory: boolean,
    setIsEditCategory: React.Dispatch<React.SetStateAction<boolean>>,
    category: categoryType,
    setCategory: React.Dispatch<React.SetStateAction<categoryType>>


    //     editMetaDataTitle: string | undefined,
    //     setEditMetadataTitle: React.Dispatch<React.SetStateAction<string | undefined>>,
    //     editMetadataValues: string[] | undefined,
    //     seteditMetadataValues: React.Dispatch<React.SetStateAction<string[] | undefined>>
    // }
}

export const CreateCategoryContext = createContext<initialCreateCategoryContext | null>(null);

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

const CreateCategoryProvider = ({ children }: createCategoryProviderType) => {

    const navigate = useNavigate()

    const CREATE_CATEGORY_URL = "/api/category/addCategory";
    const UPDATE_CATEGORY_URL = "/api/category/updateCategory";

    const [isEditCategory, setIsEditCategory] = useState(false);

    const [category, setCategory] = useState<categoryType>(defaultCategory);

    // const [category, setCategory] = useState<categoryType>();

    const [metadata, setMetaData] = useState<metadataType[]>([]);

    const [initialValueCount, setInitialValueCount] = useState(1);

    const [metadataTitle, setMetadataTitle] = useState("");

    const [metadataValues, setMetadataValues] = useState<string[]>([""]);

    const [editMetadataName, setEditMetadataName] = useState("");

    const [metadataAction, setMetadataAction] = useState<metadataActionType>("List");


    const [isShow, setIsShow] = useState<isShowType>({
        generalInfo: false,
        imageInfo: false,
        metadataInfo: false
    });

    const [categoryMetadataNotification, setCategoryMetadataNotification] = useState<categoryMetadataNotification>({
        isShow: false,
        title: '',
        message: ''
    });

    const handleAddMetaData = (e: React.MouseEvent<HTMLButtonElement>
    ) => {
        console.log(":::jsdjhdjfghb")
        e.preventDefault();
        const newMetaData: metadataType = {
            // _id: metadata.length > 0 ? metadata[metadata.length - 1]._id + 1 : 1,
            title: metadataTitle,
            values: metadataValues
        }
        setCategory({ ...category, metadata: [...category.metadata, newMetaData] });
        setCategoryMetadataNotification({
            isShow: true,
            title: "Success",
            message: "Metadata Created Successfully!!!"
        })
        setTimeout(() => {
            setCategoryMetadataNotification({
                isShow: false,
                title: "",
                message: "!!!"
            })
        }, 4000)

        setMetadataAction("List");
        setMetadataTitle("");
        setMetadataValues([""]);
        setInitialValueCount(1);
    }

    const handleCreateCategory = async (e: React.FormEvent<HTMLFormElement>, id: string | undefined) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append("masterCategory", "697a474718220aaea25b45bf")
        const modifiedMetadata = category.metadata.map((item) => {
            return { id: item._id, title: item.title, values: item.values }
        })
        formData.append("metadata", JSON.stringify(modifiedMetadata));
        const image = formData.get("image") as File | null;

        if (!image || image.size === 0) {
            formData.delete("image");
        }

        console.log(Object.fromEntries(formData))

        const token = localStorage.getItem("token");
        if (!token) {
            console.log("Bearer Token is missing...")
        }
        try {
            const mainURL = isEditCategory ? UPDATE_CATEGORY_URL : CREATE_CATEGORY_URL
            const result = await axiosConnection.post(mainURL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + token
                },
                params: {
                    "CategoryId": id
                }
            })
            console.log(result);
            navigate("/admin/category-list");

        }
        catch (e) {
            console.log(e);
        }

    }

    return (
        <CreateCategoryContext.Provider value={{
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
            handleAddMetaData,
            metadataAction,
            setMetadataAction,
            handleCreateCategory,
            isShow,
            setIsShow,
            editMetadataName,
            setEditMetadataName,
            categoryMetadataNotification,
            setCategoryMetadataNotification,
            category,
            setCategory
            // editMetaDataTitle,
            // setEditMetadataTitle,
            // editMetadataValues,
            // seteditMetadataValues
        }}>
            {children}
        </CreateCategoryContext.Provider>
    )
}

export default CreateCategoryProvider