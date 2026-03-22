import React, { useState } from 'react'
import UserProfileImage from '../../../assets/user-profile-template.jpg'
import { FaCameraRetro } from "react-icons/fa";
import Button from '../../common/Button';
import FormSubmitButton from '../../common/FormSubmitButton';
import { axiosConnection } from '../../../axios/axiosConnection';
import { useNavigate } from 'react-router';
import { FaAngleDoubleLeft } from "react-icons/fa";
import VendorHeader from './VendorHeader';

const CreateVendor = () => {

    const CREATE_USER_URL = "/api/user/register";

    const navigate = useNavigate();

    const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>, id: string | undefined) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const image = formData.get("image") as File | null;

        if (!image || image.size === 0) {
            formData.delete("image");
        }

        console.log(Object.fromEntries(formData))

        const token = localStorage.getItem("token");
        if (!token) {
            console.log("Bearer Token is missing...")
        }
        try {
            const mainURL = CREATE_USER_URL;
            const result = await axiosConnection.post(mainURL, formData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
            })
            console.log(result);
            navigate("/admin/vendor");

        }
        catch (e) {
            console.log(e);
        }
    }

    const [userProfileImage, setUserProfileImage] = useState<any>();

    return (
        <div className='bg-stone-100 min-h-full flex flex-col'>
            <VendorHeader />
            <form className='pt-2 px-5 flex flex-col gap-5' onSubmit={(e) => { handleCreateUser(e, undefined) }}>
                <div className='relative bg-[url(UserProfileImage)] flex justify-center h-50 bg-cover rounded'
                    style={{ backgroundImage: `url(${UserProfileImage})` }}
                >
                    <div className='flex justify-center items-center
                     h-35 w-35 rounded-full bg-white absolute -bottom-13 border-blue-700 border-2 bg-cover bg-center' style={{ backgroundImage: `url(${userProfileImage})` }}>
                        <div>Profile</div>
                        <label className='absolute right-0 bottom-4 bg-blue-200  rounded-full cursor-pointer' htmlFor="profile-image">
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
                <div className='bg-white grid grid-cols-2 gap-10 p-10 mt-12'>
                    <input required type='text' placeholder='Name' name='name' className='border p-3 rounded' />
                    <input
                        type="tel"
                        placeholder="Mobile Number"
                        name="mobileNumber"
                        maxLength={10}
                        pattern="[0-9]{10}"
                        required
                        className="border p-3 rounded"
                    />
                    <input required type='email' placeholder='Email' name='email' className='border p-3 rounded' />
                    <input required type='text' placeholder='Password' name='password' className='border p-3 rounded' />
                    <select required name='status' className="border py-2 pl-4 pr-10 rounded">
                        <option value={"Active"}>Active</option>
                        <option value={"In Active"}>InActive</option>
                    </select>
                    <select required name='role' className="border py-2 pl-4 pr-10 rounded">
                        <option value={"customer"}>Customer</option>
                        <option value={"admin"}>Admin</option>
                        <option value={"seller"}>Seller</option>
                    </select>
                </div>
                <div className='flex justify-around mt-5'>
                    <FormSubmitButton title='Submit' />
                </div>
            </form>
        </div>
    )
}

export default CreateVendor