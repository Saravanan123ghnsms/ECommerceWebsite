import { FaOpencart } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaAlignLeft } from "react-icons/fa";

const Header = () => {
    return (
        <div className="flex bg-stone-50 drop-shadow-md z-20">
            <div className="p-5 flex gap-4 w-70 customBgColor text-gray-300">
                <div className="text-3xl">{<FaOpencart />}</div>
                <div className="text-xl">Ecommerce</div>
            </div>
            <div className="p-5 px-2 flex grow justify-between">
                <div className="flex gap-6">
                    <div>
                        <FaAlignLeft className="text-2xl cursor-pointer" />
                    </div>
                    DashBoard
                    <div>
                    </div>

                </div>
                <div className="flex justify-center items-center gap-5 mr-5">
                    <button className="h-8 w-20 border bg-slate-50 rounded cursor-pointer">
                        <div className="flex justify-around p-1">
                            {<BsSearch />}
                            <span className="text-sm">search</span>
                        </div>
                    </button>
                    <div><IoIosNotifications className="text-3xl cursor-pointer" /></div>
                    <div><IoSettings className="text-2xl cursor-pointer" /></div>
                    <div><CgProfile className="text-3xl cursor-pointer" /></div>
                </div>
            </div>
        </div>
    )
}

export default Header;