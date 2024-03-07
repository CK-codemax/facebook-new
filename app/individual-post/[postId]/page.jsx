'use client'

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import IndividualPost from "@/app/components/IndividualPost";
import Loader from "@/app/components/Loader";

export default function Page({ params: { postId = null } }) {
 const [post, setPost] = useState(null);
 const [comments, setComments] = useState(null);
 const postRef = collection(db, 'posts', postId, 'comments')

 useEffect(() => {
    if (postId) {
      const docRef = doc(db, "posts", postId);

      const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = {
            ...docSnapshot.data(),
            id: docSnapshot.id,
            timestamp: docSnapshot.data().timestamp?.seconds * 1000,
          };
          setPost(data);
        } else {
          console.log("No such document!");
        }
      });

      // Clean up the subscription on component unmount
      return () => {
        unsubscribe();
      };
    }
 }, [postId]);

 useEffect(() => {
  
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
       setComments(newSnapshot)
    //   console.log(comments)
    
      })

  // Clean up the subscription on component unmount
  return () => {
    unsubscribe();
  };
}, [postRef]);


 if (!post) return <Loader />

 return <IndividualPost post={post} comments={comments}/>;
}
