import { createContext, useState, type ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { RiDashboardFill } from "react-icons/ri";
import { TbCategoryFilled } from "react-icons/tb";
import { IoIosShirt } from "react-icons/io";
import { HiShoppingBag } from "react-icons/hi2";
import { MdInventory2 } from "react-icons/md";

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
            id: 6,
            name: "Inventory",
            logo: MdInventory2,
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
            id: 7,
            name: "Customer",
            logo: MdInventory2,
            category: "Users",
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
            id: 8,
            name: "User",
            logo: MdInventory2,
            category: "Users",
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
            id: 9,
            name: "Roles",
            logo: MdInventory2,
            category: "Users",
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
            id: 10,
            name: "MasterCategory",
            logo: MdInventory2,
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