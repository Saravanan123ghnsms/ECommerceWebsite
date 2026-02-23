import React from 'react'

type metadataType = {
  _id: number,
  title: string,
  values: string[]
}

type stock = {
  _id: string,
  totalStock: number,
  currentStock: number,
  itemSold: number,
}


type productType = {
  _id: string,
  name: string,
  description: string,
  originalPrice: number | null,
  finalPrice: number | null,
  discount: number | null,
  stock: stock | null,
  imageUrl: string,
  isActive: boolean
  category: categoryType
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

type popupType = {
  heading: string,
  message: string,
  deleteId: string|undefined,
  categoryId?: string,
  deleteCategory?: categoryType | null,
  deleteMasterCategory?: masterCategoryType | null,
  deleteProduct?: productType | null,
  setIsDeleteNotification?: React.Dispatch<React.SetStateAction<boolean>>,
  handleDelete?: (id: string | undefined) => Promise<void>
  // handleDeleteMasterCategory?: (id: string | undefined) => Promise<void>
}

const Popup = ({ heading, message, setIsDeleteNotification, deleteCategory, handleDelete, deleteId }: popupType) => {
  return (
    <div className='bg-white rounded flex flex-col gap-4 p-10'>
      <div className='font-semibold'>{heading}</div>
      <div>{message}</div>
      <div data-div="warning" className='bg-red-100 flex'>
        <div className='min-h-full w-0.5 bg-red-500'>  </div>
        <div className='py-2 px-4 flex flex-col gap-2'>
          <div className='text-red-800'>⚠️ Warning</div>
          <div>Once it's gone, it's gone forever.</div>
        </div>
      </div>
      <div className='flex justify-around text-white mt-4'>
        <button className='bg-blue-900 px-4 py-1 rounded cursor-pointer' onClick={() => setIsDeleteNotification?.(false)}> Cancel</button>
        <button className='bg-red-600 px-4 py-1 rounded cursor-pointer' onClick={() => handleDelete?.(deleteId)}>Delete</button>
      </div>

    </div >
  )
}

export default Popup