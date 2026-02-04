import { useContext } from 'react';
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { CreateCategoryContext } from '../../../context/CreateCategoryProvider';

const ListAllMetadata = () => {

    const context = useContext(CreateCategoryContext);
    if (context === null) {
        throw new Error("Create Category Context is missing...");
    }

    const { metadata, setEditMetadataName, setMetadataAction, category } = context;

    return (
        <div className='text-center p-2'>
            <div className="grid grid-cols-[50px_250px_1fr_200px] gap-20 bg-gray-300 p-4 rounded-lg font-bold">
                <div className="flex justify-center">
                    <input type="checkbox" className="scale-150 cursor-pointer" />
                </div>
                <div>Title</div>
                <div className='flex'>Values</div>
                <div className="text-center">Actions</div>
            </div>
            {
                category.metadata.length ?
                    <div className="flex flex-col mt-0">
                        {category.metadata.map((data, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-[50px_250px_1fr_200px] gap-20 bg-white p-4 mt-4 rounded-lg items-center shadow-sm"
                            >
                                <div className="flex justify-center">
                                    <input type="checkbox" className="scale-150 cursor-pointer" />
                                </div>

                                <div>{data.title}</div>

                                <div className="flex  flex-wrap gap-2">
                                    {data.values.map((value, i) => (
                                        <span key={i} className="bg-gray-200 px-2 py-1 rounded">
                                            {value}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex justify-center gap-7 text-2xl">
                                    {/* <LuView className="cursor-pointer" /> */}
                                    <MdEditSquare className="cursor-pointer" onClick={() => {
                                        setEditMetadataName(data.title);
                                        setMetadataAction("Edit");
                                        // console.log(index + 1)
                                    }} />
                                    <RiDeleteBin7Fill className="cursor-pointer" />
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <div className='p-8'>Currently no metadata's are available ...</div>
            }

        </div>
    )
}

export default ListAllMetadata