import { useEffect, useState } from 'react';
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useNavigate } from 'react-router';
import { axiosConnection } from '../../../axios/axiosConnection';
import Button from '../../common/Button';
import Popup from '../../common/Popup';
import EditVendor from './EditVendor';


const VendorList = () => {

    const DELETE_USER_URL = "/api/user/deleteUser";
    const GET_ALL_USER_URL = "/api/user/getAllUser?role=seller";

    const navigate = useNavigate();

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

    const [userList, setUserList] = useState<userType[]>([]);

    const [isDeleteNotification, setIsDeleteNotification] = useState(false);

    const [isEditUserNotification, setIsEditUserNotification] = useState(false);

    const [editUser, setEditUser] = useState<userType | null>(null);

    const [deleteUser, setDeleteUser] = useState<userType | null>(null);

    const getUserList = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("Bearer Token is missing...")
            return;
        }
        try {
            const result = await axiosConnection.get(GET_ALL_USER_URL, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            setUserList(result.data.result)
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getUserList();
    }, [isEditUserNotification])

    const handleDeleteUser = async (id: string | undefined) => {
        if (!id) {
            console.log("user id is null..")
            return;
        }
        const token = localStorage.getItem("token");
        console.log(token)
        if (!token) {
            console.log("Bearer Token is missing...")
            return;
        }
        try {
            const result = await axiosConnection.post(DELETE_USER_URL, {}, {
                headers: {
                    "Authorization": "Bearer " + token
                },
                params: {
                    userId: id
                }
            })
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setIsDeleteNotification(false);
            getUserList();
            setDeleteUser(null);
        }
    }


    return (
        <div className={`${isDeleteNotification || isEditUserNotification ? "bg-black/52" : "bg-stone-100"} relative flex flex-col gap-4 px-5 w-full min-h-full max-h-full  overflow-hidden`}>
            <div className={`${!isDeleteNotification ? "opacity-0 scale-80" : "opacity-100 scale-100"} absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transition-all duration-300`}>
                <Popup heading="Delete User?" message={`Are you sure you want to delete this '${deleteUser?.name}'`} setIsDeleteNotification={setIsDeleteNotification} handleDelete={handleDeleteUser} deleteId={deleteUser?._id} />
            </div>
            <div className={`${!isEditUserNotification ? "max-w-0" : 'max-w-200 w-120'} absolute max-h-full  overflow-auto bg-stone-100 right-0 z-40 border-black duration-200 ease-linear`}>
                <EditVendor editUser={editUser} setEditUser={setEditUser} setIsEditUserNotification={setIsEditUserNotification} />
            </div>
            <div className={`relative flex grow flex-col p-3 min-h-full ${(isDeleteNotification || isEditUserNotification) && "brightness-50 pointer-events-none"}`}>
                <div className='flex  bg-stone-100 justify-end sticky top-0 right-0 p-5 z-10'>
                    <Button title='Create Vendor' type='list-create-category' onClick={() => navigate("/admin/vendor-create")} />
                </div>
                <div className='relative flex flex-col grow bg-white rounded-md mb-2 min-h-full border'>
                    <div className='font-semibold p-5 w-full grid gap-2 grid-cols-[100px_200px_250px_200px_1fr_1fr] rounded-tr-md rounded-tl-md bg-gray-300 overflow-hidden sticky top-21 right-0 z-10'>
                        <div><input type='checkbox' className='scale-150' /></div>
                        <div>Name</div>
                        <div>Email</div>
                        <div>Mobile Number</div>
                        <div>Status</div>
                        <div>Action</div>
                    </div>
                    {
                        userList.length > 0 ?
                            <div className='max-h-full overflow-auto'>
                                {
                                    userList.map((item, index) => (
                                        <div>
                                            <div className={`p-5 w-full grid items-center gap-2 grid-cols-[100px_200px_250px_200px_1fr_1fr] ${index % 2 == 1 && "bg-gray-100"}`}>
                                                <div><input type='checkbox' className='scale-150' /></div>
                                                <div className='flex gap-2 items-center'>
                                                    <div className=''><img src={item.name} className='h-8 w-10 object-cover rounded' /></div>
                                                    <div>{item.name}</div>
                                                </div>
                                                <div>{item.email ? item.email : "-"}</div>
                                                <div>{item.mobileNumber ? item.mobileNumber : "-"}</div>
                                                <div>{item.status ? item.status : "-"}</div>
                                                <div className="flex justify-start gap-8 text-2xl">
                                                    {/* <LuView className="cursor-pointer" /> */}
                                                    <HiOutlineViewfinderCircle className='cursor-pointer bg-gray-200 text-gray-700' onClick={() => navigate(`/admin/product-view/${item._id}`)} />
                                                    <MdEditSquare className="cursor-pointer bg-gray-200 text-blue-400" onClick={() => {
                                                        setIsEditUserNotification(!isEditUserNotification);
                                                        setEditUser(item)
                                                    }
                                                    } />
                                                    <RiDeleteBin7Fill className="cursor-pointer  bg-gray-200 text-red-400" onClick={() => {
                                                        setIsDeleteNotification(true);
                                                        setDeleteUser(item)
                                                    }} />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            :
                            // Currently, No category are available...
                            <div className='flex justify-center items-center grow '>Currently, No Vendors are available...</div>
                    }
                </div>
            </div>

        </div>
    )
}

export default VendorList 