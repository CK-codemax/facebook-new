'use client'
import { db } from "@/firebase";
import { Timestamp, deleteDoc, doc, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaGlobeAfrica} from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import { FaEllipsis } from "react-icons/fa6";
import { BsPatchCheckFill } from "react-icons/bs";
import { PiShareFatLight } from "react-icons/pi";
import CommentBox from "./CommentBox";

export default function IndividualPost({post, comments}) {

    //const post = posts.find((el) => el.id === id)
    
    const {data : session} = useSession()

    

    async function handleSetLikes(){
   
    const docRef = doc(db, 'posts', post.id);
   setDoc(
    docRef,
    {likes : !post.likes.find(el => el.email === session?.user.email ) ? [...post.likes, {
        name : session?.user.name,
        email : session?.user.email,
      }] : post.likes.filter((el) => el.email !== session?.user?.email),}, 
    { merge: true }
    )}

    function handleDeletePost(){
        const docRef = doc(db, 'posts', post.id);

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

  return (<div className="flex flex-col px-3 sm:px-0 flex-grow min-h-screen pb-44 pt-6 xl:mx-8 overflow-y-auto scrollbar-hide space-y-5">
   <div className="mt-8 flex-grow pt-2">
        <div className="flex flex-col px-2 py-2 pl-4 rounded-lg bg-white">
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

               <div className="py-2 hidden sm:inline-flex px-2 rounded-full cursor-pointer hover:bg-gray-200">
               <FaEllipsis className="text-[24px]" />
               </div>
              {session?.user?.email === post?.email && (
                 <div className="py-2 px-2 rounded-full cursor-pointer hover:bg-gray-200">
                 <HiMiniXMark onClick={handleDeletePost} className="text-[24px]" />
                </div>
              )}
            </div>
        </div>

        {/*Content*/}
        <div className="flex flex-col pb-2 mb-2 items-start justify-start ">

           {post?.message && (
             <p className="mb-1">
             {post.message}
             </p>
           )}
            {post.postImages?.length > 0 ? (
                <div className={`${post.postImages.length === 2 && 'grid grid-cols-2'}  ${post.postImages.length >= 3 && 'grid grid-cols-2 grid-rows-2'} justify-start items-start w-full`}>
               {post.postImages?.map((image) => <Image key={image} className="object-fit w-full h-auto" src={image} alt="post-image" width={500} height={500} />
           )}
            </div>
            ) : null}
        </div>

        {/*Footer*/}

        <div className="flex w-full items-center justify-between border-b border-gray-400">
          {post?.likes.length > 0 ? (
              <div className="flex w-full items-center  justify-start space-x-1">
              <p className="cursor-pointer text-black hover:underline">Liked by {post?.likes.map(el => el.name).slice(-1).join()} {post?.likes.length > 1 && `and ${post?.likes.length - 1} ${post?.likes.length > 2 ? 'others' : 'other'}`}</p>
          </div>
          ) : null}

        </div>


        <div className="flex w-full items-center pt-2 justify-between">
            <div onClick={handleSetLikes} className="flex w-full group items-center justify-center py-2 rounded-md cursor-pointer space-x-1 hover:bg-gray-200">
                {/* <HandThumbLight  className={`h-6 group-hover:animate-bounce ${!liked ? 'text-gray-600' : 'text-blue-600'}`}/>
                 */}
                {!post.likes.find(el => el.email === session?.user.email ) ? (<BsHandThumbsUp className="text-[24px] text-gray-600" />) : (<BsHandThumbsUpFill className="text-[24px] text-blue-600" />)}
                <p className="font-semibold text-gray-600">Like</p>

            </div>

            <CommentBox post={post} />   

            <div className="flex w-full group items-center justify-center py-2 rounded-md cursor-pointer space-x-1 hover:bg-gray-200">
                <PiShareFatLight className="text-[24px] text-gray-600" />
                <p className="font-semibold text-gray-600">Share</p>

            </div>


        </div>

    </div>
   </div>

   {comments?.map((comment, i) => <p key={comment.email + i}>{comment.message}</p>)}

   </div>
  )
}
