import { createContext, use, useState, type ReactNode } from 'react';

type metadataType = {
    id: number,
    title: string,
    values: string[]
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
    setEditMetadataIndex: React.Dispatch<React.SetStateAction<number>>
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

    const handleAddMetaData = (e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();

        const newMetaData: metadataType = {
            id: metadata.length > 0 ? metadata[metadata.length - 1].id + 1 : 1,
            title: metadataTitle,
            values: metadataValues
        }
        setMetaData([...metadata, newMetaData]);
        setMetadataAction("List");
        setMetadataTitle("");
        setMetadataValues([""]);
        setInitialValueCount(1);
    }

    const handleCreateCategory = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        // const newMetadata = {}
        formData.append("metadata", JSON.stringify(metadata)    );



        console.log(Object.fromEntries(formData))
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
            setEditMetadataIndex
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