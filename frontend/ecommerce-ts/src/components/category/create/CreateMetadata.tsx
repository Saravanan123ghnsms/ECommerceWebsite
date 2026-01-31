import { useContext } from 'react';
import { FaPlusSquare } from "react-icons/fa";
import { FaSquareMinus } from "react-icons/fa6";
import { CreateCategoryContext } from '../../../context/CreateCategoryProvider';
import Button from '../../common/Button';

const CreateMetadata = () => {
    const context = useContext(CreateCategoryContext);
    if (context === null) {
        throw new Error("Create Category Context is missing...");
    }

    const { metadataTitle, setMetadataTitle, initialValueCount, setInitialValueCount, metadataValues, setMetadataValues, handleAddMetaData } = context;

    return (
        <div>
            <div className='text-center text-lg font-black'>Add Metadata</div>
            <div className="p-5 flex flex-col items-center gap-y-7">
                <div className='flex flex-col gap-3 w-1/2'>
                    <label>Add Title</label>
                    <input
                        type="text"
                        placeholder="Add Title"
                        className="border w-full p-2"
                        value={metadataTitle}
                        onChange={(e) => setMetadataTitle(e.target.value)}
                    />
                </div>

                <div className='flex flex-col w-1/2'>
                    <div className='flex justify-between' >
                        <label>Add Value</label>
                        <FaPlusSquare className="text-3xl cursor-pointer text-green-600" onClick={() => setMetadataValues(pre => [...pre, ""])} />
                    </div>
                    {metadataValues.map((i, index) => (
                        <div key={index} className="flex items-center w-full pt-3 gap-2">
                            <input
                                type="text"
                                placeholder="Add Values"
                                className="border w-full p-2 flex"
                                value={i}
                                onChange={(e) => {
                                    const updateList = [...metadataValues];
                                    updateList[index] = e.target.value;
                                    setMetadataValues(updateList);
                                }}
                            />

                            <FaSquareMinus className='text-3xl text-red-500 cursor-pointer' onClick={() => {
                                setMetadataValues(metadataValues.filter((_, i) => i !== index))
                            }} />

                        </div>
                    ))}
                </div>
            </div>
            <div className='text-center'>
                <Button title='save' onClick={(e) => handleAddMetaData(e)} />
            </div>
        </div>
    )
}

export default CreateMetadata