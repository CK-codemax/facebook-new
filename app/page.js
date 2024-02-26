'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function page() {
  const {data : session} = useSession()

  if(!session)redirect('/api/auth/signin')
  return (
    <div>let us see new facebook</div>
  )
}
