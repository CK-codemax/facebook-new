'use client'
import { IoChatbubbleOutline } from "react-icons/io5"
import CommentModal from "./CommentModal"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { addDoc, collection, serverTimestamp} from "firebase/firestore"
import { db } from "@/firebase"

export default function CommentBox({post}) {
    const { data : session } = useSession()
    const [message, setMessage] = useState('')

    async function handleSetComments(){
        if(!message)return
        
        try{
            const docRef = await addDoc(collection(db, 'posts', post.id, 'comments'),
         {
            name : session?.user?.name,
            image : session?.user?.image,
            email : session?.user?.email,
            message,
            timestamp : serverTimestamp(),

    }
        )
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setMessage('')
    }
  
      
  return (
    <CommentModal>
        <CommentModal.Open>
        <div className="flex w-full group items-center justify-center py-2 rounded-md cursor-pointer space-x-1 hover:bg-gray-200">
                <IoChatbubbleOutline className="text-[24px]  text-gray-600" />
                <p className="font-semibold text-gray-600">Comment</p>

            </div>
        </CommentModal.Open>
        <CommentModal.Window message={message} setMessage={setMessage} handleSetComments={handleSetComments} />
    </CommentModal>
  )
}
