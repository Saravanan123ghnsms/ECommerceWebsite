import React from 'react'

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

type ViewCategoryMetadataInfoProp = {
    category: categoryType | undefined
}

const ViewCategoryMetadataInfo = ({ category }: ViewCategoryMetadataInfoProp) => {
    return (
        <div className="flex flex-col w-full gap-8">
            <div>
                <div className="customColor w-fit px-4 py-1 font-black rounded-tl-sm rounded-tr-sm">Master Category</div>
                <div className="flex flex-col gap-6 customColor p-4 rounded-r-sm rounded-bl-sm">
                    <div className="flex flex-col gap-1">
                        <label>Name</label>
                        <input type="text" readOnly value={category?.masterCategory.name} className="w-full border p-2  text-gray-600 rounded" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Status</label>
                        <input type="text" readOnly value={category?.masterCategory.isActive ? "Active" : "InActive"} className="w-full border p-2  text-gray-600 rounded" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Description</label>
                        <textarea readOnly value={category?.description} className="w-full border p-2  text-gray-600 rounded" />
                    </div>
                </div>
            </div>
            <div className="rounded flex flex-col gap-5">
                <div>
                    <div className="customColor w-fit px-4 py-1 font-black rounded-tl-sm rounded-tr-sm">
                        Metadata
                    </div>
                    <div className="customColor p-4 flex flex-col gap-4 rounded-r-sm rounded-bl-sm">
                        {
                            category?.metadata.map(metadata => (
                                <div className="flex flex-col gap-1">
                                    <div>
                                        {metadata.title}
                                    </div>
                                    <div className="flex gap-5">
                                        {
                                            metadata.values.map(val => (
                                                <div className="bg-gray-300 px-2 py-1 rounded">
                                                    {val}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewCategoryMetadataInfo