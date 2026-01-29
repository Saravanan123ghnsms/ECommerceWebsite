import { useContext, useState } from 'react';
import { FaPlusSquare } from "react-icons/fa";
import { CreateCategoryContext } from '../../../context/CreateCategoryProvider';
import Button from '../../common/Button';

const EditMetadata = () => {
    const context = useContext(CreateCategoryContext);
    if (context === null) {
        throw new Error("Create Category Context is missing...");
    }

    const { metadata, setMetaData, setMetadataAction, editMetadataIndex } = context;

    const handleEditMetaData = (
    ) => {
        // e.preventDefault();

        const newMetaData = {
            id: editMetadataIndex,
            title: editMetaDataTitle || "",
            values: editMetadataValues || []
        }

        const metadataedit = metadata.map(item => item.id === editMetadataIndex ? newMetaData : item)

        setMetaData(metadataedit);
        setMetadataAction("List");
        // setMetadataTitle("");
    }


    const [editMetaDataTitle, setEditMetadataTitle] = useState(metadata.find(val => val.id === editMetadataIndex)?.title);

    const [editMetadataValues, seteditMetadataValues] = useState(metadata.find(val => val.id === editMetadataIndex)?.values)


    const currentMetadataValues = editMetadataValues || [];
    const currentMetadataTitle = editMetaDataTitle || "";

    const [currentMetadataValueCount, setCurrentMetadataValueCount] = useState(currentMetadataValues.length);

    // setMetadataTitle("");


    return (
        <div>
            <div className='text-center text-lg font-black'>Edit Metadata </div>
            <div className="p-5 flex flex-col items-center gap-y-7">
                <div className='flex flex-col gap-3 w-1/2'>
                    <label>Add Title</label>
                    <input
                        type="text"
                        placeholder="Add Title"
                        className="border w-full p-2"
                        value={currentMetadataTitle}
                        onChange={(e) => setEditMetadataTitle(e.target.value)}
                    />
                </div>

                <div className='flex flex-col w-1/2'>
                    <div className='flex justify-between' >
                        <label>Add Value</label>
                        <FaPlusSquare className="text-3xl cursor-pointer text-green-600" onClick={() => setCurrentMetadataValueCount(pre => pre + 1)} />
                    </div>
                    {[...Array(currentMetadataValueCount).keys()].map((i, index) => (
                        <div key={i} className="flex items-center w-full pt-2">
                            <input
                                type="text"
                                placeholder="Add Values"
                                className="border w-full p-2 flex"
                                value={currentMetadataValues?.[i]}
                                onChange={(e) => {
                                    const updateList = [...currentMetadataValues];
                                    updateList[index] = e.target.value;
                                    seteditMetadataValues(updateList);
                                }}
                            />

                        </div>
                    ))}
                </div>
            </div>
            <div className='text-center'>
                <Button title='save' onClick={() => handleEditMetaData()} />
            </div>
        </div>
    )
}

export default EditMetadata