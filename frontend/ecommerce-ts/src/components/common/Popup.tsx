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

type popupType = {
  heading: string,
  message: string,
  categoryId?: string,
  deleteCategory?: categoryType | null
  setIsDeleteNotification?: React.Dispatch<React.SetStateAction<boolean>>,
  handleDeleteCategory?: (id: string | undefined) => Promise<void>
}

const Popup = ({ heading, message, setIsDeleteNotification, deleteCategory, handleDeleteCategory }: popupType) => {
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
        <button className='bg-red-600 px-4 py-1 rounded cursor-pointer' onClick={() => handleDeleteCategory?.(deleteCategory?._id)}>Delete</button>
      </div>

    </div >
  )
}

export default Popup