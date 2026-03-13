type productType = {
    _id?: string,
    name: string,
    description: string,
    originalPrice: number | null,
    finalPrice: number | null,
    discount: number | null,
    stock: number | null,
    // stockResponse:
    imageUrl: string,
    isActive: boolean
    category: categoryType,
    // productCategoryName?:string
}

type metadataType = {
    _id?: string,
    title: string,
    values: string[],
    selectedValue?: string
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
    isActive: boolean,
    masterCategory: masterCategoryType
    metadata: metadataType[]
}

type ViewProductBasicInfoProp = {
    product: productType | undefined
}

const ViewProductBasicInfo = ({ product }: ViewProductBasicInfoProp) => {
    return (
        <div className="flex flex-col items-center customColor w-full rounded gap-2 customBorder border-stone-500">
            <div className="w-[95%] h-[55%] bg-white mt-5 rounded overflow-hidden">
                <img src={product?.imageUrl} alt={product?.name} className="h-full w-full object-cover" />
            </div>
            <div className="w-[95%] flex flex-col grow justify-center gap-3">
                <div className="flex flex-col gap-1">
                    <label className="text-gray-900">Name</label>
                    <input type="text" readOnly value={product?.name} className="w-full border p-2 text-gray-600 rounded" />
                </div>
                <div className="flex flex-col gap-1">
                    <label>Status</label>
                    <input type="text" readOnly value={product?.isActive ? "Active" : "InActive"} className="w-full border p-2  text-gray-600 rounded" />
                </div>
                <div className="flex flex-col gap-1">
                    <label>Description</label>
                    <textarea readOnly value={product?.description} className="w-full border p-2  text-gray-600 rounded" />
                </div>
            </div>
        </div>
    )
}

export default ViewProductBasicInfo