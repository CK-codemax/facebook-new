'use client'

import { cloneElement, createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Contact from "./Contact"
import { contacts } from "../src/contacts";


const WidgetsModalContext = createContext();

function WidgetsModal({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen((open) => !open);

  return (
    <WidgetsModalContext.Provider value={{closeModal, openModal, isOpen }}>
     {children}
    </WidgetsModalContext.Provider>
  );
  }

  function Open({children}) {
  const { openModal } = useContext(WidgetsModalContext);

  return cloneElement(children, {onClick : () => openModal()})
}


function Window(){
    const { closeModal, isOpen } = useContext(WidgetsModalContext);
    const widgetsRef = useRef()

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
       setMounted(true)
 
       return () => setMounted(false)
    }, [])

    
   useEffect(
     function(){
     function handleClick(e){
       if(widgetsRef.current && !widgetsRef.current.contains(e.target)){
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
           {isOpen && (<div className="w-full lg:hidden bg-[rgba(255, 255, 255, 0.1)] z-30 h-screen fixed top-0 left-0"/>
                )}  
           <div className={`w-[80%] sm:w-[40%] lg:hidden h-screen z-30 fixed top-0 right-0 ${isOpen ? 'translate-x-0' : 'translate-x-[100%]' }  transition-all duration-500 linear origin-right`}>
             
             <div ref={widgetsRef} className='flex h-screen scrollbar-hide overflow-y-auto flex-col w-full bg-gray-100 mt-12 p-2 pt-4 sm:pt-10'>


{contacts.map((contact) => <Contact key={contact.src} src={contact.src} name={contact.name} />)}
</div>
             
           </div>
         </>,
           document.body
         )
      
    
}

WidgetsModal.Open = Open;
WidgetsModal.Window = Window;


export default WidgetsModal


