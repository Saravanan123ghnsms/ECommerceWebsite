type metadataType = {
    _id: number,
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
    isActive: string,
    masterCategory: masterCategoryType
    metadata: metadataType[]
}

type ViewCategoryBasicInfoProp = {
    category: categoryType | undefined
}

const ViewCategoryBasicInfo = ({ category }: ViewCategoryBasicInfoProp) => {
    return (
        <div className="flex flex-col items-center customColor w-full rounded gap-2 customBorder border-stone-500">
            <div className="w-[95%] h-[55%] bg-white mt-5 rounded overflow-hidden">
                <img src={category?.imageUrl} alt={category?.name} className="h-full w-full object-cover" />
            </div>
            <div className="w-[95%] flex flex-col grow justify-center gap-3">
                <div className="flex flex-col gap-1">
                    <label className="text-gray-900">Name</label>
                    <input type="text" readOnly value={category?.name} className="w-full border p-2 text-gray-600 rounded" />
                </div>
                <div className="flex flex-col gap-1">
                    <label>Status</label>
                    <input type="text" readOnly value={category?.isActive ? "Active" : "InActive"} className="w-full border p-2  text-gray-600 rounded" />
                </div>
                <div className="flex flex-col gap-1">
                    <label>Description</label>
                    <textarea readOnly value={category?.description} className="w-full border p-2  text-gray-600 rounded" />
                </div>
            </div>
        </div>
    )
}

export default ViewCategoryBasicInfo