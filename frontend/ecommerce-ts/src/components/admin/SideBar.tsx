import { useContext } from "react";
import { AdminContext } from "../../context/AdminProvider";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router";

const SideBar = () => {
    const context = useContext(AdminContext);
    const navigate = useNavigate();
    if (context === null) {
        throw new Error("Login Context is missing...");
    }
    const { sideBarDetails, setSideBarDetails, sidebarCategoryType, onSideBarClick } = context;

    return (
        <div data-div="sidebar">
            {
                sidebarCategoryType.map(type => (
                    <div className="py-2">
                        <div data-div="sidebarType" className="text-sm py-2 px-8 ">
                            {type}
                        </div>
                        {sideBarDetails.map(bar => (
                            bar.category === type &&
                            <div data-div="sideBarIcon" className="flex flex-col p-2 my-2">
                                <div className={`flex justify-between items-center gap-6 px-8 ${bar.isClicked && "border-l-3 border-l-cyan-300"} cursor-pointer hover:text-gray-50`} onClick={() => onSideBarClick(bar.id)}>
                                    <div className="flex gap-3">
                                        <bar.logo className={`text-xl ${bar.isClicked && "text-cyan-300"}`} />
                                        <div className={`${bar.isClicked && "text-gray-50"}`}>{bar.name}</div>
                                    </div>
                                    <div>
                                        {bar.operations.length !== 0 &&
                                            <FaAngleDown />
                                        }
                                    </div>
                                </div>
                                <div className={`flex flex-col ps-17 overflow-hidden transition-all duration-800
        ${bar.isClicked ? "max-h-96" : "max-h-0"}`}>
                                    {
                                        bar.operations.map((item) => (
                                            <div className="pt-4 text-sm transition-all duration-200 hover:translate-x-0.5 hover:text-gray-50 cursor-pointer" onClick={() => navigate(`${bar.name.toLowerCase()}-${item.name.toLowerCase()}`)}>
                                                {item.name}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))}
                    </div>

                ))
            }
        </div>

    )
}

export default SideBar