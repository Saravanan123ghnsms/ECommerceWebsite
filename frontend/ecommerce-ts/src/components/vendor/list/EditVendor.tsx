import React, { useState } from 'react'
import UserProfileImage from '../../../assets/user-profile-template.jpg'
import { FaCameraRetro } from "react-icons/fa";
import Button from '../../common/Button';
import FormSubmitButton from '../../common/FormSubmitButton';
import { axiosConnection } from '../../../axios/axiosConnection';
import { useNavigate } from 'react-router';
import { IoClose } from "react-icons/io5";

type userType = {
    _id: string,
    name: string,
    mobileNumber?: string
    email: string,
    status?: string,
    address?: string,
    role: string,
    createdAt: string,
    updatedAt: string
}

type editVendorType = {
    setIsEditUserNotification: React.Dispatch<React.SetStateAction<boolean>>,
    editUser: userType | null,
    setEditUser: React.Dispatch<React.SetStateAction<userType | null>>
}

const EditVendor = ({ setIsEditUserNotification, editUser, setEditUser }: editVendorType) => {

    const UPDATE_USER_URL = "/api/user/updateUser";

    const navigate = useNavigate();

    const handleEditUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const image = formData.get("image") as File | null;

        if (!image || image.size === 0) {
            formData.delete("image");
        }

        if (editUser?._id) {
            formData.append("id", editUser._id);
        }

        console.log(Object.fromEntries(formData))

        const token = localStorage.getItem("token");
        if (!token) {
            console.log("Bearer Token is missing...")
        }
        try {
            const mainURL = UPDATE_USER_URL;
            const result = await axiosConnection.post(mainURL, formData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
            })
            console.log(result);
            setIsEditUserNotification(pre => !pre)
            // location.reload()

        }
        catch (e) {
            console.log(e);
        }
    }

    const [userProfileImage, setUserProfileImage] = useState<any>();

    return (
        <div className='bg-stone-100 min-h-full'>
            <div className='flex justify-start p-5 font-black text-center relative'>
                <div className='text-lg'>Edit User</div>
                <IoClose className='size-7 text-red-500 absolute right-5 top-4 font-bold cursor-pointer'
                    onClick={() => setIsEditUserNotification(pre => !pre)}
                />
            </div>
            <form className='px-5 flex flex-col gap-2' onSubmit={(e) => { handleEditUser(e) }}>
                <div className='relative bg-[url(UserProfileImage)] flex justify-center h-30 bg-cover rounded'
                    style={{ backgroundImage: `url(${UserProfileImage})` }}
                >
                    <div className='flex justify-center items-center
                     h-30 w-30 rounded-full bg-white absolute -bottom-13 border-blue-700 border-2 bg-cover bg-center' style={{ backgroundImage: `url(${userProfileImage})` }}>
                        <div>Profile</div>
                        <label className='absolute right-0 bottom-4 bg-blue-200 rounded-full cursor-pointer' htmlFor="profile-image">
                            <FaCameraRetro className='p-2 size-9' />
                        </label>
                    </div>
                    <input   // ✅ key line
                        id='profile-image' type='file' accept="image/*" name="image" className='absolute w-0 h-0 opacity-0' onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setUserProfileImage(URL.createObjectURL(file))
                            }
                        }} />
                </div>
                <div className='bg-white grid grid-cols-1 gap-5 p-10 mt-12'>
                    <input required type='text' placeholder='Name' name='name' value={editUser?.name}
                        onChange={(e) =>
                            setEditUser((prev) =>
                                prev ? { ...prev, name: e.target.value } : prev
                            )
                        }
                        className='border p-3 rounded' />
                    <input
                        type="tel"
                        placeholder="Mobile Number"
                        name="mobileNumber"
                        maxLength={10}
                        pattern="[0-9]{10}"
                        required
                        className="border p-3 rounded"
                        value={editUser?.mobileNumber}
                        onChange={(e) =>
                            setEditUser((prev) =>
                                prev ? { ...prev, mobileNumber: e.target.value } : prev
                            )
                        }
                    />
                    <input required type='email' placeholder='Email' name='email' className='border p-3 rounded'
                        value={editUser?.email}
                        onChange={(e) =>
                            setEditUser((prev) =>
                                prev ? { ...prev, email: e.target.value } : prev
                            )
                        }
                    />
                    <input required type='text' placeholder='Password' name='password' className='border p-3 rounded' />
                    <select required name='status' className="border py-2 pl-4 pr-10 rounded" value={editUser?.status}
                        onChange={(e) =>
                            setEditUser((prev) =>
                                prev ? { ...prev, status: e.target.value } : prev
                            )
                        }
                    >
                        <option value={"Active"}>Active</option>
                        <option value={"In Active"}>InActive</option>
                    </select>
                    <select required name='role' className="border py-2 pl-4 pr-10 rounded"
                        value={editUser?.role}
                        onChange={(e) =>
                            setEditUser((prev) =>
                                prev ? { ...prev, role: e.target.value } : prev
                            )
                        }
                    >
                        <option value={"customer"}>Customer</option>
                        <option value={"admin"}>Admin</option>
                        <option value={"seller"}>Seller</option>
                    </select>
                </div>
                <div className='flex justify-around'>
                    <FormSubmitButton title='Submit' />
                </div>
            </form>
        </div>
    )
}

export default EditVendor