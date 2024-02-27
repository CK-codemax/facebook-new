'use client'

import { db } from "@/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import CreatePost from "./CreatePost";

export default function ShowPosts() {
    const [posts, setPosts] = useState([])
  
   

      useEffect(() => {
        const postRef = collection(db, 'posts')

       const unsubscribe = onSnapshot(postRef, (snapshots) => {
            const newSnapshot = snapshots.docs.map((doc) => {
               const data = doc.data();
               data.id = doc.id
               
               return data;
              }).map((doc) => {
               const data = {
                 ...doc, timestamp : doc.timestamp?.seconds * 1000,
               }
               return data
             }).sort((prev, next) => next.timestamp - prev.timestamp)
           
             setPosts(newSnapshot)

          
            })
    
        // Clean up the subscription on component unmount
        return () => {
          unsubscribe();
        };
      }, []);
   

  return <div>
    {posts?.map((post) => <CreatePost key={post.timestamp} post={post} />)}
  </div>
}
