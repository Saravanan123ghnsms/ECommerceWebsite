import { useState } from "react"
import MasterCategoryList from "./MasterCategoryList";
import CreateMasterCategory from "./CreateMasterCategory";

const MasterCategoryMainPage = () => {

    type metadataActionType = "List" | "Create";

    const [masterCategoryAction, setMasterCategoryAction] = useState<metadataActionType>("List");

    const [editMasterCategoryId, setEditMasterCategoryId] = useState<string | null>(null);

    return (
        <div className="flex flex-col gap-5 p-10 min-h-full bg-stone-100">

            <div className={`flex gap-8 text-gray-500 relative`}>
                <div className={`cursor-pointer flex justify-center relative p-0.5 ${masterCategoryAction === 'List' && "text-blue-950 font-semibold"}`} onClick={() => setMasterCategoryAction("List")}>
                    <div className="">List</div>
                    <div className={`absolute top-7 w-0 min-h-0.5 transition-all duration-500 ${masterCategoryAction === 'List' && "w-full bg-blue-950"}`}></div>
                </div>

                <div className={`cursor-pointer flex justify-center relative p-0.5 ${masterCategoryAction === 'Create' && "text-blue-950 font-semibold"}`} onClick={() => setMasterCategoryAction("Create")}>
                    <div className="">Create</div>
                    <div className={`absolute top-7 w-0 min-h-0.5 transition-all duration-700 ${masterCategoryAction === 'Create' && "w-full bg-blue-950"}`}></div>
                </div>
                {/* {
                    categoryMetadataNotification.isShow &&
                    <Notification />
                } */}
            </div>

            <div data-div="add-metadata" className='bg-stone-50 flex grow'>
                {
                    masterCategoryAction === 'List' ?
                        <MasterCategoryList setMasterCategoryAction={setMasterCategoryAction} setEditMasterCategoryId={setEditMasterCategoryId} />
                        :
                        < CreateMasterCategory setMasterCategoryAction={setMasterCategoryAction} editMasterCategoryId={editMasterCategoryId} />

                }
            </div>

        </div>
    )
}

export default MasterCategoryMainPage