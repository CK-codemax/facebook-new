'use client'

import { useSession } from "next-auth/react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function Welcome() {
    const {data : session} = useSession()

    
    return (
      <div>
        <p>welcome to my facebook clone</p>
      
     {!session && <Link href={'/api/auth/signin/google'}>Click here to SIGNIN</Link>}
      
      </div>
    )
}
