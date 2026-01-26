import { createContext, useState, type ReactNode } from 'react';

type metadataType = {
    title: string,
    values: string[]
}

type metadataActionType = "Create" | "Edit" | "List";

type initialCreateCategoryContext = {
    metadata: metadataType[],
    setMetaData: React.Dispatch<React.SetStateAction<metadataType[]>>,
    initialValueCount: number,
    setInitialValueCount: React.Dispatch<React.SetStateAction<number>>,
    metadataTitle: string,
    setMetadataTitle: React.Dispatch<React.SetStateAction<string>>,
    metadataValues: string[],
    setMetadataValues: React.Dispatch<React.SetStateAction<string[]>>
    handleAddMetaData: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    metadataAction: metadataActionType,
    setMetadataAction: React.Dispatch<React.SetStateAction<metadataActionType>>
}

export const CreateCategoryContext = createContext<initialCreateCategoryContext | null>(null);

type createCategoryProviderType = {
    children: ReactNode
}

const CreateCategoryProvider = ({ children }: createCategoryProviderType) => {



    const [metadata, setMetaData] = useState<metadataType[]>([]);

    const [initialValueCount, setInitialValueCount] = useState(1);

    const [metadataTitle, setMetadataTitle] = useState("");

    const [metadataValues, setMetadataValues] = useState<string[]>([]);

    const handleAddMetaData = (e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();
        const newMetaData: metadataType = {
            title: metadataTitle,
            values: metadataValues
        }

        setMetaData([...metadata, newMetaData]);

        setMetadataAction("List");

        console.log(newMetaData);
    }

    const [metadataAction, setMetadataAction] = useState<metadataActionType>("List");

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
            setMetadataAction
        }}>
            {children}
        </CreateCategoryContext.Provider>
    )
}

export default CreateCategoryProvider