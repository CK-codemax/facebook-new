'use client'
import { GoHomeFill } from "react-icons/go";
import { LuUsers } from "react-icons/lu";
import { PiVideo } from "react-icons/pi";
import { CgMenuGridO } from "react-icons/cg";
import { FaBell, FaFacebookMessenger } from "react-icons/fa";
import { IoMenuOutline } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import { CiSearch, CiShop } from "react-icons/ci";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import Image from "next/image";
import HeaderIcon from "./HeaderIcon";
import SideBarModal from "./SideBarModal";
import WidgetsModal from "./WidgetsModal";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Header() {
   
  const { data : session } =  useSession()
  return (
    <header className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
        {/*left*/}
        <div className="flex items-center">
            <Image className='w-[40px] h-[40px] rounded-full' src='https://links.papareact.com/5me' width={40} height={40} alt="facebook-logo" />
            <div className="ml-2 hidden md:flex rounded-full border py-1 px-2 bg-gray-100 border-gray-500  items-center">
                <CiSearch className="text-[24px] text-gray-600"/>
                <input className="outline-none hidden lg:inline-flex ml-2 flex-shrink placeholder:text-gray-500 bg-transparent border-none" type='text' placeholder="Search Facebook" />
            </div>
            <CiSearch className="text-[20px] ml-2 text-gray-600 sm:hidden"/>
            <SideBarModal>
               <SideBarModal.Open>
                 <IoMenuOutline className='text-[20px] ml-2 text-gray-600 sm:hidden' />
               </SideBarModal.Open>

               <SideBarModal.Window />
            </SideBarModal>
        </div>

        {/*center*/}
         <div className="flex justify-center flex-grow">
            <div className="p-2 flex mx-auto space-x-2 xl:space-x-6">
                <HeaderIcon active Icon={GoHomeFill} />
                <HeaderIcon Icon={LuUsers} />
                <HeaderIcon Icon={PiVideo} />
                <HeaderIcon Icon={CiShop} />
                <HeaderIcon Icon={MdGroups} />


            </div>
         </div>
        {/*right*/}

        <div className="flex items-center sm:space-x-2 justify-end">
           
            <p className="font-semibold hidden sm:inline-flex pr-3 whitespace-nowrap">
              {session?.user?.name}
            </p>
            <CgMenuGridO className="reactIcon" />
            <FaFacebookMessenger className="reactIcon" />
            <FaBell className="reactIcon" />
          
             {/*Profile pic*/}
             <WidgetsModal>
                 <WidgetsModal.Open>
                    <IoChevronDownCircleOutline className='text-[20px] mr-2 text-gray-600'  />
                 </WidgetsModal.Open>

                 <WidgetsModal.Window />

             </WidgetsModal>
        
             <Image onClick={() => signOut()} className="rounded-full cursor-pointer object-cover w-[44px] h-[44px]" src={session?.user?.image} alt="profile-image" width={40} height={40} placeholder="blur" blurDataURL="/facebook-user.png"/>



        </div>

    </header>
  )
}
