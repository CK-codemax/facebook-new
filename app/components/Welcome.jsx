'use client'

import { useSession } from "next-auth/react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function Welcome() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
       setMounted(true)
 
       return () => setMounted(false)
    }, [])

   

    const {data : session} = useSession({
        required : true,
          onUnauthenticated(){
         redirect('/api/auth/signin/google')
          }
    })
    
    if(!mounted)return
    return (
      <div>
        <p>welcome to my facebook clone</p>
      
    
      </div>
    )
}
