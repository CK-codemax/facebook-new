'use client'

import { db } from "@/firebase"
import { Timestamp, deleteDoc, doc } from "firebase/firestore"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { BsPatchCheckFill } from "react-icons/bs"
import { FaGlobeAfrica } from "react-icons/fa"
import { HiMiniXMark } from "react-icons/hi2"

export default function ShowComment({post, id}) {
    const {data : session} = useSession()
  
    function handleDeletePost(){
        const docRef = doc(db, 'posts', id, 'comments', post.id);

    deleteDoc(docRef)
    }

    const firestoreTimestamp = Timestamp.fromMillis(post?.timestamp); // Example timestamp

// Convert the Firestore Timestamp to a JavaScript Date object
const date = firestoreTimestamp?.toDate();

const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
  minute: "numeric",
  hour12: true,
  };
  return (
    <div onClick={() => setOpen((isOpen) => !isOpen)} className="flex flex-col p-2 pl-4 rounded-lg  cursor-pointer bg-white">
 
            {/*Header, profile info*/}
        <div className="flex justify-between items-center mb-3">
            <div className="flex space-x-2">
            <Image className="rounded-full object-cover cursor-pointer w-[50px] h-[50px]" src={post.image} alt="profile-image" layout="fixed" width={40} height={40} />
           <div className="flex flex-col justify-start items-start">
           <div className="flex items-center space-x-1">
                <p className="font-semibold max-w-[130px] cursor-pointer truncate sm:max-w-[300px] text-nowrap hover:underline text-gray-900">{post.name}</p>
                <BsPatchCheckFill className="text-[16px] text-blue-600" />
                <div className="bg-gray-700 w-1 h-1 rounded-full" />
                <p className="text-blue-600 cursor-pointer hover:underline font-semibold">Follow</p>
             </div>
             <div className="flex items-center space-x-1">
                {post.timestamp ? (<p className="text-[14px] text-gray-700 hover:underline truncate text-nowrap cursor-pointer">{new Intl.DateTimeFormat("en-US", options).format(date)}</p>
             ) : null}
                <div className="bg-gray-700 w-1 h-1 rounded-full" />
                <FaGlobeAfrica className="text-[16px] text-gray-700" />

             </div>
           </div>

            </div>

            <div className="flex items-center -translate-y-4 pt-2 space-x-2">

              
            {session?.user?.email === post?.email && (
                 <div className="py-2 px-2 rounded-full cursor-pointer hover:bg-gray-200">
                 <HiMiniXMark onClick={handleDeletePost} className="text-[24px]" />
                </div>
              )}
            </div>
        </div>

        {/*Footer*/}
        <div>
            <p>{post.message}</p>
        </div>
   </div>
  )
}

