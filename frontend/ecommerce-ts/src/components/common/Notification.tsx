import { useContext } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { CreateCategoryContext } from "../../context/CreateCategoryProvider";

const Notification = () => {
  const context = useContext(CreateCategoryContext);
  if (context === null) {
    throw new Error("Create Category Context is missing...");
  }

  const { categoryMetadataNotification, setCategoryMetadataNotification } = context;

  return (
    <div data-div="notification" className='flex absolute text-black top-1 z-10 right-0 gap-2 shadow-[1px_1px_5px_0px_grey] bg-gray-50'>
      <div className="flex relative">
        <div className='px-3 py-3'>
          <div className='font-semibold'>{categoryMetadataNotification.title}</div>
          <div>{categoryMetadataNotification.message}</div>
        </div>
        <div data-div="notifi-logo" className='flex justify-center items-center pr-3'>
          <IoIosCloseCircle style={{ fill: "red", fontSize: "1.5rem" }} />
        </div>
        <div className={`absolute bottom-0 transition-all max-w-0 duration-1000 ${categoryMetadataNotification.isShow && "max-w-50"} h-0.5 bg-red-600`}></div>
      </div>
    </div >
  )
}

export default Notification