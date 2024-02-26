'use client'

import { cloneElement, createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { FaUserFriends } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { IoIosBookmark, IoIosStar } from "react-icons/io";
import { GoClock } from "react-icons/go";
import { FaShop } from "react-icons/fa6";
import { PiVideoFill } from "react-icons/pi";
import { IoChevronDownOutline } from "react-icons/io5";

import SidebarRow from "./SidebarRow";


const SideBarModalContext = createContext();

function SideBarModal({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen((open) => !open);

  return (
    <SideBarModalContext.Provider value={{closeModal, openModal, isOpen }}>
     {children}
    </SideBarModalContext.Provider>
  );
  }

  function Open({children}) {
  const { openModal } = useContext(SideBarModalContext);

  return cloneElement(children, {onClick : () => openModal()})
}


function Window(){
    const { closeModal, isOpen } = useContext(SideBarModalContext);
    const sideBarRef = useRef()

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
       setMounted(true)
 
       return () => setMounted(false)
    }, [])

   
    
   useEffect(
     function(){
     function handleClick(e){
       if(sideBarRef.current && !sideBarRef.current.contains(e.target)){
         closeModal()
       }
     }

     document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
     },
     [closeModal]
  )

         if(!mounted)return
         return createPortal(<>
        {isOpen && (<div className="sm:hidden w-full bg-[rgba(255, 255, 255, 0.1)] z-30 h-screen fixed top-0 left-0"/>
                )}  
           <div className={`sm:hidden h-screen w-[80%] fixed z-30 top-0 left-0  ${isOpen ? 'translate-x-0' : '-translate-x-[100%]' } transition-all duration-500 linear origin-left`}>
          
         
             <div  ref={sideBarRef} className="p-2 pt-4 w-full h-full bg-white flex flex-col space-y-3 border-2 border-black">
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
           </>,
           document.body
         )
      
    
}

SideBarModal.Open = Open;
SideBarModal.Window = Window;


export default SideBarModal


