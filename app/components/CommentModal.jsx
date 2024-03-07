'use client'
import { useSession } from "next-auth/react";
import Image from "next/image";
import { cloneElement, createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BsGlobeEuropeAfrica } from "react-icons/bs";
import { CiFaceSmile, CiLocationOn, CiUser } from "react-icons/ci";
import { GoChevronDown, GoPlus } from "react-icons/go";
import { HiXMark } from "react-icons/hi2";
import { FaComment } from "react-icons/fa";
import { AiOutlinePicture } from "react-icons/ai";
import { FaEllipsis } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";

const CommentContext = createContext();

function CommentModal({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <CommentContext.Provider value={{closeModal, openModal, isOpen }}>
      {children}
    </CommentContext.Provider>
  );
  }

  function Open({children}) {
  const { openModal } = useContext(CommentContext);

  return cloneElement(children, {onClick : () => openModal()})
}

function Window({message, setMessage, handleSetComments}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
     setMounted(true)

     return () => setMounted(false)
  }, [])

  

  const sendPost = () => {
    closeModal()
    handleSetComments()
  }

  const { closeModal, isOpen } = useContext(CommentContext);
  const {data : session} = useSession()
  const windowRef = useRef()
 
  useEffect(
    function(){
    function handleClick(e){
      if(windowRef.current && !windowRef.current.contains(e.target)){
        closeModal()
      }
    }

    document.addEventListener('click', handleClick, true)

   return () => document.removeEventListener('click', handleClick, true)
    },
    [closeModal]
  )

 

    if(!mounted)return
    if(!isOpen)return null
    return createPortal(
      <div style={{
        backgroundColor : 'rgba(0, 0, 0, 0.5)',
      }} className="w-full h-screen z-50 fixed top-0 left-0 transition-all duration-500">
         <form onSubmit={() => sendPost()} ref={windowRef} className="fixed border border-black p-4 top-[50%] py-6 bg-[#fff] shadow-[0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)] rounded-[9px] left-[50%] -translate-x-[50%] -translate-y-[50%]">
         <div onClick={closeModal} className="w-[50px] fixed right-2 top-5 h-[50px] bg-gray-200 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-300 rounded-full flex items-center justify-center">
            <HiXMark className="text-[24px] text-black " />
         </div>
         <div className="flex p-4 space-x-2">
            <Image className="rounded-full cursor-pointer object-cover w-[44px] h-[44px]" src={session?.user?.image} alt="profile-image" width={40} height={40} placeholder="blur" blurDataURL="/facebook-user.png"/>

           <div className="flex flex-col justify-start items-start">
           
                <p className="font-semibold cursor-pointer hover:underline text-gray-900">{session?.user?.name}</p>
               <div className="bg-gray-300 px-2 py-1 rounded-md flex cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-400 items-center space-x-1">
               <BsGlobeEuropeAfrica className="text-[16px] text-gray-700" />
                <p className="font-semibold text-xs">Public</p>
                <GoChevronDown className="text-[16px] text-gray-700" />
               </div>
             
             </div>
        </div>
          <div className="w-[300px] h-[100px] relative border p-2 border-black rounded-md">
             <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={`Post your comment, ${session?.user?.name}?`} className="outline-none w-full h-full text-wrap bg-transparent border-none" />
             <button onClick={() => sendPost()} className="absolute right-2 z-20 bottom-2">
                 <FaComment className="text-gray-500 text-[24px] transition-colors duration-300 ease-in-out hover:text-blue-600 " />
             </button>
          </div>
      


         </form>
         </div>,
      document.body
    )
  

  
}

CommentModal.Open = Open;
CommentModal.Window = Window;


export default CommentModal

