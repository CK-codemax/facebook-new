'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Welcome() {
    const {data : session} = useSession()

    if(!session)redirect('/api/auth/signin/google')
    return (
      <div>let us see new facebook</div>
    )
}
