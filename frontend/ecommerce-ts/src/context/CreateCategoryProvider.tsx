import { createContext, use, useState, type ReactNode } from 'react';
import { axiosConnection } from '../axios/axiosConnection';
import { useNavigate } from 'react-router';

type metadataType = {
    id: number,
    title: string,
    values: string[]
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
    metadataInfo: boolean
}

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
    handleCreateCategory: (e: React.FormEvent<HTMLFormElement>) => void,
    isShow: isShowType,
    setIsShow: React.Dispatch<React.SetStateAction<isShowType>>,
    editMetadataIndex: number,
    setEditMetadataIndex: React.Dispatch<React.SetStateAction<number>>,
    categoryMetadataNotification: categoryMetadataNotification,
    setCategoryMetadataNotification: React.Dispatch<React.SetStateAction<categoryMetadataNotification>>

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

const CreateCategoryProvider = ({ children }: createCategoryProviderType) => {

    const navigate = useNavigate()

    const CREATE_CATEGORY_URL = "/api/category/addCategory";

    const [metadata, setMetaData] = useState<metadataType[]>([]);

    const [initialValueCount, setInitialValueCount] = useState(1);

    const [metadataTitle, setMetadataTitle] = useState("");

    const [metadataValues, setMetadataValues] = useState<string[]>([""]);

    const [editMetadataIndex, setEditMetadataIndex] = useState(1);

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
        e.preventDefault();
        const newMetaData: metadataType = {
            id: metadata.length > 0 ? metadata[metadata.length - 1].id + 1 : 1,
            title: metadataTitle,
            values: metadataValues
        }
        setMetaData([...metadata, newMetaData]);
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

    const handleCreateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append("masterCategory", "697a474718220aaea25b45bf")
        const modifiedMetadata = metadata.map((item) => {
            return { title: item.title, values: item.values }
        })
        formData.append("metadata", JSON.stringify(modifiedMetadata));
        console.log(Object.fromEntries(formData))

        const token = localStorage.getItem("token");
        if (!token) {
            console.log("Bearer Token is missing...")
        }
        try {
            const result = await axiosConnection.post(CREATE_CATEGORY_URL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + token
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
            editMetadataIndex,
            setEditMetadataIndex,
            categoryMetadataNotification,
            setCategoryMetadataNotification
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