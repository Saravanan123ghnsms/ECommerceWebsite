

import { FaCaretRight } from "react-icons/fa6";
import CreateMetadata from './CreateMetadata';
import ListAllMetadata from './ListAllMetadata';
import { useContext, useState } from "react";
import { CreateCategoryContext } from "../../../context/CreateCategoryProvider";
import EditMetadata from "./EditMetadata";
import Notification from "../../common/Notification";

const CategoryMetadataInfo = () => {

    const context = useContext(CreateCategoryContext);
    if (context === null) {
        throw new Error("Create Category Context is missing...");
    }

    const { isShow, setIsShow, metadata, metadataAction, setMetadataAction, categoryMetadataNotification, setCategoryMetadataNotification } = context;

    return (
        <div data-div="general-info" className='bg-white rounded-xl'>

            <div className='flex justify-between items-center p-6'>
                <div>
                    <div data-div="title" className='text-xl font-black'>Metadata Information</div>
                    <div data-div="desc">To add a metadata info</div>
                </div>
                <div>
                    <FaCaretRight className={`${isShow.metadataInfo ? "rotate-90" : "rotate-0"} transition-all duration-300 text-3xl p-1 cursor-pointer rounded-full  bg-gray-100 hover:bg-gray-200`} onClick={() => setIsShow({ ...isShow, metadataInfo: !isShow.metadataInfo })} />
                </div>
            </div>

            <div className={`flex flex-col gap-8 overflow-hidden transition-all duration-500 ${isShow.metadataInfo ? "max-h-200 px-10" : "max-h-0 px-10"}`}>

                <div className={`flex gap-8 text-gray-500 relative`}>
                    <div className={`cursor-pointer flex justify-center relative p-0.5 ${metadataAction === 'List' && "text-blue-950 font-semibold"}`} onClick={() => setMetadataAction("List")}>
                        <div className="">List</div>
                        <div className={`absolute top-7 w-0 min-h-0.5 transition-all duration-500 ${metadataAction === 'List' && "w-full bg-blue-950"}`}></div>
                    </div>

                    <div className={`cursor-pointer flex justify-center relative p-0.5 ${metadataAction === 'Create' && "text-blue-950 font-semibold"}`} onClick={() => setMetadataAction("Create")}>
                        <div className="">Create</div>
                        <div className={`absolute top-7 w-0 min-h-0.5 transition-all duration-700 ${metadataAction === 'Create' && "w-full bg-blue-950"}`}></div>
                    </div>

                    <div className={`cursor-pointer flex justify-center relative p-0.5 ${metadataAction === 'Edit' && "text-blue-950 font-semibold"}`} onClick={() => setMetadataAction("Edit")}>
                        <div className="">Edit</div>
                        <div className={`absolute top-7 w-0 min-h-0.5 transition-all duration-700 ${metadataAction === 'Edit' && "w-full bg-blue-950"}`}></div>
                    </div>
                    {
                        categoryMetadataNotification.isShow &&
                        <Notification />
                    }
                </div>

                <div data-div="add-metadata" className='bg-stone-50 flex flex-col justify-center border p-2 rounded'>
                    {
                        metadataAction === 'List' ?
                            <ListAllMetadata />
                            : metadataAction === 'Create' ?
                                <CreateMetadata />
                                :
                                <EditMetadata />

                    }
                </div>

            </div>

        </div >
    )
}

export default CategoryMetadataInfo