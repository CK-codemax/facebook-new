'use client'

import { cloneElement, createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Contact from "./Contact"


const contacts = [{src : 'https://dailypost.ng/wp-content/uploads/2021/02/davido-1200x899.jpg', name : 'David Adeleke',},
{src : 'https://dailypost.ng/wp-content/uploads/2020/06/Wizkid.jpg', name : 'Wizkid Balogun',},
{src : 'https://dailypost.ng/wp-content/uploads/2023/01/Collage-Maker-31-Jan-2023-04.01-PM.jpg', name : 'Ayra Star',},
{src : 'https://dailypost.ng/wp-content/uploads/2023/01/Tems-1424x802-1.jpg', name : 'Tems Opeyemi',},
{src : 'https://dailypost.ng/wp-content/uploads/2023/05/Rema.jpg', name : 'Rema',},
{src : 'https://dailypost.ng/wp-content/uploads/2023/04/Victony.jpg', name : 'Victony',},
{src : 'https://dailypost.ng/wp-content/uploads/2021/08/Osimhen-1.jpg', name : 'Victor Osimhen',},
{src : 'https://dailypost.ng/wp-content/uploads/2022/11/iwobi.jpg', name : 'Alex Iwobi',},
{src : 'https://dailypost.ng/wp-content/uploads/2023/07/Johnny-Drille.jpg', name : 'Johnny Drille',},
{src : 'https://dailypost.ng/wp-content/uploads/2015/10/Genevieve-Nnaji-1200x783.png', name : 'Genevieve Nnaji',},
{src : 'https://dailypost.ng/wp-content/uploads/2024/01/MixCollage-15-Jan-2024-08-59-AM-8391.jpg', name : 'Funke Akindele',},
{src : 'https://dailypost.ng/wp-content/uploads/2023/08/Deyemi-Okanlawon-Net-Worth-And-Biography.jpg', name : 'Deyemi Okanlawon',},
{src : 'https://dailypost.ng/wp-content/uploads/2023/05/Tinubu-4-1200x900-1-1.jpg', name : 'Bola Tinubu',},
{src : 'https://dailypost.ng/wp-content/uploads/2023/01/Peter-Obi.jpg', name : 'Peter Obi',},
{src : 'https://dailypost.ng/wp-content/uploads/2022/01/teni.jpg', name : 'Teniola',},
]

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
             
             <div ref={widgetsRef} className='border-black flex h-screen scrollbar-hide overflow-y-auto flex-col w-full bg-white mt-12 border-2 p-2 pt-4 sm:pt-10'>


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


