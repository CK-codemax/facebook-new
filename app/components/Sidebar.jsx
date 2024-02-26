import { FaUserFriends } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { IoIosBookmark, IoIosStar } from "react-icons/io";
import { GoClock } from "react-icons/go";
import { FaShop } from "react-icons/fa6";
import { PiVideoFill } from "react-icons/pi";
import { IoChevronDownOutline } from "react-icons/io5";
import SidebarRow from "./SidebarRow";


export default function Sidebar() {
  return (
  <div className="hidden sm:inline-flex">
      <div className="p-2 pt-4 max-w-[600px] border-2 border-black xl:min-w-[300px]">
       <SidebarRow Icon={FaUserFriends} title={'friends'}/> 
       <SidebarRow Icon={MdGroups} title={'groups'}/> 
       <SidebarRow Icon={GoClock} title={'memories'}/> 
       <SidebarRow Icon={IoIosBookmark} title={'bookmarks'}/> 
       <SidebarRow Icon={FaShop} title={'marketplace'}/> 
       <SidebarRow Icon={PiVideoFill} title={'watch'}/> 
       <SidebarRow Icon={IoIosStar} title={'events'}/> 
       <SidebarRow Icon={IoChevronDownOutline} title={'see more'}/> 
    </div>
  </div>
  )
}
