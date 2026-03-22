import React, { useState } from 'react'
import { FaWindowClose } from 'react-icons/fa'

type userType = {
    _id: string,
    name: string,
    mobileNumber?: string
    email: string,
    status?: string,
    address?: string,
    role: string,
    password?: string,
    createdAt: string,
    updatedAt: string
}

type viewVendorType = {
    isViewUserNotification: boolean,
    setIsViewUserNotification: React.Dispatch<React.SetStateAction<boolean>>
    viewUser: userType | null,
}

const ViewVendor = ({ isViewUserNotification, setIsViewUserNotification, viewUser }: viewVendorType) => {

    return (
        <div className={`${!isViewUserNotification
            ? "opacity-0 scale-80 pointer-events-none"
            : "opacity-100 scale-100 pointer-events-auto"
            } absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 bg-stone-100 p-10 flex flex-col gap-5 rounded`}>

            <div className='flex justify-between'>
                <h1 className='text-center text-yellow-600 text text-lg font-bold'>Vendor Details</h1>
                <FaWindowClose className='text-xl text-red-600 cursor-pointer' onClick={() => { setIsViewUserNotification(false) }} />
            </div>
            <div className='flex flex-col'>
                <label className='text-xs translate-2 w-fit px-2 inventoryLabelBgColor text-gray-500'>Name</label>
                <input type='text' required placeholder='Name' name='name' className='border p-3 rounded w-100 bg-gray-100 text-gray-500' disabled value={viewUser?.name}
                />
            </div>

            <div className='flex flex-col'>
                <label className='text-xs translate-2 w-fit px-2 inventoryLabelBgColor text-gray-600'>Email</label>
                <input type='text' required placeholder='current stock' name='name' className='border p-3 rounded w-100 bg-gray-100 text-gray-600' disabled value={viewUser?.email}
                />
            </div>

            <div className='flex flex-col'>
                <label className='text-xs translate-2 w-fit px-2 inventoryLabelBgColor text-gray-600'>Mobile Number</label>
                <input type='text' required placeholder='Item Sold' name='name' className='border p-3 rounded w-100 bg-gray-100 text-gray-600' disabled value={viewUser?.mobileNumber}
                />
            </div>

            <div className='flex flex-col'>
                <label className='text-xs translate-2 w-fit px-2 inventoryLabelBgColor text-gray-600'>Status</label>
                <input type='text' required placeholder='total stock' name='name' className='border p-3 rounded w-100 bg-gray-100 text-gray-600' disabled value={viewUser?.status}
                />
            </div>
            <div className='flex flex-col'>
                <label className='text-xs translate-2 w-fit px-2 inventoryLabelBgColor text-gray-600'>Role</label>
                <input type='text' required placeholder='total stock' name='name' className='border p-3 rounded w-100 bg-gray-100 text-gray-600' disabled value={viewUser?.role}
                />
            </div>
        </div>
    )
}

export default ViewVendor