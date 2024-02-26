'use client'

import { useSession } from "next-auth/react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function Welcome() {
    const {data : session} = useSession()

    
    return (
      <div>
        <p>welcome to my facebook clone</p>
        <Link href={'/api/auth/signin/google'}>Click here to view more</Link>
       
      </div>
    )
}
