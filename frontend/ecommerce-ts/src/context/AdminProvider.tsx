import { createContext, useState, type ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { RiDashboardFill } from "react-icons/ri";
import { TbCategoryFilled } from "react-icons/tb";
import { IoIosShirt } from "react-icons/io";
import { HiShoppingBag } from "react-icons/hi2";
import { MdAddToPhotos, MdInventory2 } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaUserShield, FaUserTie } from 'react-icons/fa6';

type adminProvierType = {
    children: ReactNode
}

type sidebarOperationType = {
    // id: number,
    name: string,
    isClicked: false,
}

type sideBarType = {
    id: number,
    name: string,
    category: string,
    logo: IconType,
    operations: sidebarOperationType[],
    isEnabled: boolean,
    isClicked: boolean
}

const sidebarCategoryType: string[] = ["General", "Users", "Others"];

type initialAdminContext = {
    sidebarCategoryType: string[],
    sideBarDetails: sideBarType[],
    setSideBarDetails: React.Dispatch<React.SetStateAction<sideBarType[]>>,
    onSideBarClick: (id: number) => void
}

export const AdminContext = createContext<initialAdminContext | null>(null);

const AdminProvider = ({ children }: adminProvierType) => {



    const initialSideBarDetails: sideBarType[] = [
        {
            id: 1,
            name: "DashBoard",
            category: "General",
            logo: RiDashboardFill,
            isEnabled: true,
            isClicked: true,
            operations: [],
        },
        {
            id: 2,
            name: "Category",
            logo: TbCategoryFilled,
            category: "General",
            isEnabled: true,
            isClicked: false,
            operations: [
                {
                    name: "List",
                    isClicked: false
                },
                {
                    name: "Create",
                    isClicked: false
                }
            ],
        },
        {
            id: 3,
            name: "Product",
            logo: IoIosShirt,
            category: "General",
            isEnabled: true,
            isClicked: false,
            operations: [
                {
                    name: "List",
                    isClicked: false
                },
                {
                    name: "Create",
                    isClicked: false
                }
            ],
        },
        {
            id: 4,
            name: "Orders",
            logo: HiShoppingBag,
            category: "General",
            isEnabled: true,
            isClicked: false,
            operations: [
                {
                    name: "List",
                    isClicked: false
                },
                {
                    name: "Create",
                    isClicked: false
                }
            ],
        },
        {
            id: 5,
            name: "Inventory",
            logo: MdInventory2,
            category: "General",
            isEnabled: true,
            isClicked: false,
            operations: [],
        },
        {
            id: 6,
            name: "Customer",
            logo: FaUser,
            category: "Users",
            isEnabled: true,
            isClicked: false,
            operations: [],
        },
        {
            id: 7,
            name: "Vendor",
            logo: FaUserTie,
            category: "Users",
            isEnabled: true,
            isClicked: false,
            operations: [],
        },
        {
            id: 8,
            name: "Admin",
            logo: FaUserShield,
            category: "Users",
            isEnabled: true,
            isClicked: false,
            operations: [],
        },
        {
            id: 9,
            name: "MasterCategory",
            logo: MdAddToPhotos,
            category: "Others",
            isEnabled: true,
            isClicked: false,
            operations: [
            ],
        },

    ]

    const [sideBarDetails, setSideBarDetails] = useState<sideBarType[]>(initialSideBarDetails);

    const onSideBarClick = (id: number) => {
        const tempSideBar: sideBarType[] = sideBarDetails.map(bar => {
            return bar.id === id ? { ...bar, isClicked: !bar.isClicked } : { ...bar, isClicked: false }
        })
        setSideBarDetails(tempSideBar);
    }

    return (
        <AdminContext.Provider value={
            {
                sidebarCategoryType,
                sideBarDetails,
                setSideBarDetails,
                onSideBarClick
            }
        }>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminProvider