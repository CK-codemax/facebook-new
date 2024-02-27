'use client'
import { db, storage } from "@/firebase";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import Modal from "./Modal";
import { CiVideoOn } from "react-icons/ci";
import { GrGallery } from "react-icons/gr";
import { FaRegFaceSmile } from "react-icons/fa6";

// import firebase from 'firebase/compat/app';

export default function InputBox() {
  const { data : session } = useSession()
  const inputRef = useRef('')
  const filePickerRef = useRef(null)
  const [imageToPost, setImageToPost] = useState([])
  const [imagesToSend, setImagesToSend] = useState([])
  const [message, setMessage] = useState('')

    

    const removeImage = () => {
      setImageToPost([])
     setImagesToSend([])
    }
    
   
    function handleMessageChange(e){
    setMessage(e.target.value)
    
    }

    function emojiMessage(e){
      setMessage((initMessage) => `${initMessage}${e}`)
    }


    async function handleUploadImages(images){
      if(message === '' && !images.length)return
      
        async function getImageUrl(image){
          const storageRef = ref(storage, `images/${v4()}`)
        const uploadTask = await uploadBytes(storageRef, image)
        const snapshot = uploadTask
        const downloadUrl = await getDownloadURL(storageRef)
        const url = downloadUrl
  
        return url
  
        }
  
      if(images.length && message){

      const imageArr = images.map((image) => getImageUrl(image))
      const imagesToGo = await Promise.all(imageArr)
  
      try {
        const docRef = await addDoc(collection(db, "posts"), {
          message,
          name : session?.user.name,
          email : session?.user.email,
          image : session?.user.image,
          timestamp : serverTimestamp(),
          postImages : imagesToGo,
          likes : 0,
        
        })
  
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
  
     // inputRef?.current?.value = ''
    
      }else if(message && !images.length){
        
      try {
        const docRef = await addDoc(collection(db, "posts"), {
          message,
          name : session?.user.name,
          email : session?.user.email,
          image : session?.user.image,
          timestamp : serverTimestamp(),
          postImages : [],
          likes : 0,
         
        })
  
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      }else if(images.length && message === ''){
      
        const imageArr = images.map((image) => getImageUrl(image))
        const imagesToGo = await Promise.all(imageArr)
        console.log(imagesToGo)
    
        try {
          const docRef = await addDoc(collection(db, "posts"), {
            message,
            name : session?.user.name,
            email : session?.user.email,
            image : session?.user.image,
            timestamp : serverTimestamp(),
            postImages : imagesToGo,
            likes : 0,
          })
    
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        
    
      }

      setMessage('')
      setImagesToSend([])
      setImageToPost([])
      }
    
    async function addImageToPost(e){
      e.preventDefault()
      const reader = new FileReader()
  
      if(e.target.files[0]){
        
        reader.readAsDataURL(e.target.files[0])
        setImagesToSend((images) => [e.target.files[0], ...images])
        console.log(e.target.files[0], filePickerRef.current.files[0])
      }
  
      reader.onload = (readerEvent) => {
        setImageToPost((images) => [readerEvent.target.result, ...images])
      }
      }

      async function sendPostWithImage(e){
        e.preventDefault()

      
      
        // handleUploadImage(filePickerRef.current.files[0])
        handleUploadImages(imagesToSend)
      }

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
        {/*Top*/}
        <div className="flex space-x-1 sm:space-x-4 py-4 px-1 sm:p-4 items-center">
        <Image className="rounded-full cursor-pointer object-cover w-[44px] h-[44px]" src={session?.user?.image} alt="profile-image" width={40} height={40} placeholder="blur" blurDataURL="/facebook-user.png"/>

            <Modal>

            <Modal.Open>
              <div className="flex flex-1">
                <input onChange={() => console.log('fulfill react') } value={message} className="rounded-full h-12 truncate bg-gray-100 flex-grow px-5 outline-none text-xs sm:text-sm" type="text" placeholder={`What's on your mind, ${session?.user.name}?`} />
              </div>
            </Modal.Open>

            <Modal.Window emojiMessage={emojiMessage} message={message} handleMessageChange={handleMessageChange} imageToPost={imageToPost} sendPostWithImage={sendPostWithImage} filePickerRef={filePickerRef} removeImage={removeImage} inputRef={inputRef} addImageToPost={addImageToPost} />


           </Modal>

        

        
        </div>

        <div className="flex justify-evenly p-3 px-2 border-t">
           

           <Modal>

          <Modal.Open>
          <div className="inputIcon">
            <CiVideoOn className="text-red-500 text-[20px] sm:text-[28px]" />
            <p className="text-xs text-nowrap sm:text-sm xl:text-base">Live Video</p>
           </div>
           </Modal.Open>

           <Modal.Window message={message} emojiMessage={emojiMessage} handleMessageChange={handleMessageChange} imageToPost={imageToPost} sendPostWithImage={sendPostWithImage} filePickerRef={filePickerRef} removeImage={removeImage} inputRef={inputRef} addImageToPost={addImageToPost} />

          </Modal>

          


          <Modal>

          <Modal.Open>
          <div className="inputIcon">
            <GrGallery className="text-green-400 text-[20px] sm:text-[28px]" />
            <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          
           </div>
           </Modal.Open>

           <Modal.Window message={message} emojiMessage={emojiMessage} handleMessageChange={handleMessageChange} imageToPost={imageToPost} sendPostWithImage={sendPostWithImage} filePickerRef={filePickerRef} removeImage={removeImage} inputRef={inputRef} addImageToPost={addImageToPost} />

          </Modal>

           <Modal>

          <Modal.Open>
          <div className="inputIcon">
            <FaRegFaceSmile className="text-yellow-300 text-[20px] sm:text-[28px]" />
            <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
           </div>
           </Modal.Open>

           <Modal.Window message={message} emojiMessage={emojiMessage} handleMessageChange={handleMessageChange} imageToPost={imageToPost} sendPostWithImage={sendPostWithImage} filePickerRef={filePickerRef} removeImage={removeImage} inputRef={inputRef} addImageToPost={addImageToPost} />

          </Modal>

          
            
          


        </div>
    </div>
  )
}
