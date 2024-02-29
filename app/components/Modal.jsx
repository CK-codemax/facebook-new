'use client'
import { useSession } from "next-auth/react";
import Image from "next/image";
import { cloneElement, createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BsGlobeEuropeAfrica } from "react-icons/bs";
import { CiFaceSmile, CiLocationOn, CiUser } from "react-icons/ci";
import { GoChevronDown, GoPlus } from "react-icons/go";
import { HiXMark } from "react-icons/hi2";
import { AiOutlinePicture } from "react-icons/ai";
import { FaEllipsis } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";

const ModalContext = createContext();

function Modal({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <ModalContext.Provider value={{closeModal, openModal, isOpen }}>
      {children}
    </ModalContext.Provider>
  );
  }

  function Open({children}) {
  const { openModal } = useContext(ModalContext);

  return cloneElement(children, {onClick : () => openModal()})
}

function Window({removeImage, sendPostWithImage, filePickerRef, emojiMessage, message, addImageToPost, imageToPost, inputRef, handleMessageChange}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
     setMounted(true)

     return () => setMounted(false)
  }, [])

  const [emojiIsOpen, setEmojiIsOpen] = useState(false)

  function handleOpenEmoji(){
    setEmojiIsOpen(true)
  }


  const { closeModal, isOpen } = useContext(ModalContext);
  const {data : session} = useSession()
  const windowRef = useRef()
  const emojiRef = useRef()
  const sendPost = (e) => {
    closeModal()
    sendPostWithImage(e)
  }

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

  useEffect(
    function(){
    function handleClick(e){
      if(emojiRef.current && !emojiRef.current.contains(e.target)){
        setEmojiIsOpen(false)
      }
    }

    document.addEventListener('click', handleClick, true)

   return () => document.removeEventListener('click', handleClick, true)
    },
    []
  )


    if(!mounted)return
    if(!isOpen)return null
    return createPortal(
      <div className="w-full bg-[rgba(255, 255, 255, 0.1)] h-screen z-50 fixed top-0 left-0 backdrop-blur-sm transition-all duration-500">
         <form onSubmit={(e) => sendPost(e)} ref={windowRef} className="fixed w-[90%] sm:w-[70%] lg:w-[500px] top-[50%] py-6 bg-[#fff] shadow-[0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)] rounded-[9px] left-[50%] -translate-x-[50%] -translate-y-[50%]">
             <div className=" w-full text-center px-2 border-b pb-2 border-black ">
             <p className="font-bold capitalize w-full mx-auto  py-2 sm:text-xl">create post</p>
           
            <div onClick={closeModal} className="w-[50px] fixed right-2 top-5 h-[50px] bg-gray-200 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-300 rounded-full flex items-center justify-center">
            <HiXMark className="text-[24px] text-black " />
            </div>
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

        <div className="flex items-center px-4 space-x-1">
              <input value={message} ref={inputRef} onChange={(e) => handleMessageChange(e)} placeholder={`What's on your mind, ${session?.user?.name}?`} className="outline-none flex-grow border-none" type="text" />
              <CiFaceSmile onClick={handleOpenEmoji} className="text-[28px] cursor-pointer text-gray-400" />
        </div>

        {
          emojiIsOpen &&  <div className="fixed hidden lg:block z-50 left-[50%] -translate-x-[50%] -translate-y-[40%]" ref={emojiRef}><EmojiPicker onEmojiClick={(e) => emojiMessage(e.emoji)} /></div>
        }

        <div onClick={() => filePickerRef.current.click()} className="border relative block bg-transparent cursor-pointer mt-3 p-2 w-[95%] mx-auto rounded-md">
            <div className="bg-gray-100 flex justify-center items-center flex-col rounded-md h-[140px]">
            <div className="w-[50px] h-[50px] bg-gray-300 rounded-full flex items-center justify-center">
            <GoPlus className="text-[24px] text-black " />
            </div>
              <p className="font-bold">Add Photos/Videos</p>
              <p className="text-xs text-gray-600">or drag and drop</p>
            </div>
            <input  disabled={imageToPost.length >= 4}  ref={filePickerRef} onChange={(e) => addImageToPost(e)}  hidden type="file"/>
           
        </div>

        <div className="flex items-center mt-3 px-4 py-2 justify-between shadow-md border w-[95%] mx-auto rounded-md">
         {!imageToPost?.length > 0 ? <p className="font-semibold text-nowrap">Add Your Post</p> : null}
        
          <div className="flex items-center flex-grow">
            {imageToPost?.map((image) => (<div key={image} className="flex filter flex-col hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer">
              <img src={image} alt="uploaded-image" className="object-contain w-auto h-10" />
            </div>))}
              {imageToPost?.length > 0 ? <p onClick={removeImage} className="text-xs cursor-pointer text-red-300 text-center">Remove</p> : null}
           </div>

       <div className="flex items-center space-x-0">

       <div className="w-[35px] h-[35px] bg-transparent hover:bg-gray-300 rounded-full cursor-pointer transition-colors duration-300 ease-in-out  flex items-center justify-center">
            <AiOutlinePicture className="text-[24px] text-black " />
            </div>

            <div className="w-[35px] h-[35px] bg-transparent hover:bg-gray-300 rounded-full cursor-pointer transition-colors duration-300 ease-in-out  flex items-center justify-center">
            <CiUser className="text-[24px] text-black " />
            </div>

            <div className="w-[35px] h-[35px] bg-transparent hover:bg-gray-300 rounded-full cursor-pointer transition-colors duration-300 ease-in-out  flex items-center justify-center">
            <CiFaceSmile className="text-[24px] text-black " />
            </div>

            <div className="w-[35px] h-[35px] bg-transparent hover:bg-gray-300 rounded-full cursor-pointer transition-colors duration-300 ease-in-out  flex items-center justify-center">
            <CiLocationOn className="text-[24px] text-black " />
            </div>

            <div className="w-[35px] h-[35px] bg-transparent hover:bg-gray-300 rounded-full cursor-pointer transition-colors duration-300 ease-in-out  flex items-center justify-center">
            <FaEllipsis className="text-[24px] text-black " />
            </div>
       </div>
        </div>

        <button onClick={(e) => sendPost(e)} className="w-[95%] block mt-3 py-2 rounded-md bg-blue-500 text-white mx-auto transition-colors duration-300 ease-in-out hover:bg-blue-600 ">
          Post
        </button>


         </form>
      </div>,
      document.body
    )
  

  
}

Modal.Open = Open;
Modal.Window = Window;


export default Modal


// import { cloneElement, createContext, useContext, useState } from "react";
// import { createPortal } from "react-dom";
// import { HiXMark } from "react-icons/hi2";
// import styled from "styled-components";
// import { useOutsideClick } from "../hooks/useOutsideClick";

// const StyledModal = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: var(--color-grey-0);
//   border-radius: var(--border-radius-lg);
//   box-shadow: var(--shadow-lg);
//   padding: 3.2rem 4rem;
//   transition: all 0.5s;
// `;

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100vh;
//   background-color: var(--backdrop-color);
//   backdrop-filter: blur(4px);
//   z-index: 1000;
//   transition: all 0.5s;
// `;

// const Button = styled.button`
//   background: none;
//   border: none;
//   padding: 0.4rem;
//   border-radius: var(--border-radius-sm);
//   transform: translateX(0.8rem);
//   transition: all 0.2s;
//   position: absolute;
//   top: 1.2rem;
//   right: 1.9rem;

//   &:hover {
//     background-color: var(--color-grey-100);
//   }

//   & svg {
//     width: 2.4rem;
//     height: 2.4rem;
//     /* Sometimes we need both */
//     /* fill: var(--color-grey-500);
//     stroke: var(--color-grey-500); */
//     color: var(--color-grey-500);
//   }
// `;

// const ModalContext = createContext();

// function Modal({ children }) {
//   const [openName, setOpenName] = useState("");

//   const close = () => setOpenName("");
//   const open = setOpenName;

//   return (
//     <ModalContext.Provider value={{ openName, close, open }}>
//       {children}
//     </ModalContext.Provider>
//   );
// }

// function Open({ children, opens: opensWindowName }) {
//   const { open } = useContext(ModalContext);

//   return cloneElement(children, { onClick: () => open(opensWindowName) });
// }

// function Window({ children, name }) {
//   const { openName, close } = useContext(ModalContext);
//   const ref = useOutsideClick(close);

//   if (name !== openName) return null;

//   return createPortal(
//     <Overlay>
//       <StyledModal ref={ref}>
//         <Button onClick={close}>
//           <HiXMark />
//         </Button>

//         <div>{cloneElement(children, { onCloseModal: close })}</div>
//       </StyledModal>
//     </Overlay>,
//     document.body
//   );
// }

// Modal.Open = Open;
// Modal.Window = Window;

// export default Modal;
