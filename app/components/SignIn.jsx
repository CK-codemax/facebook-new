'use client'

import { signIn } from "next-auth/react"


export default function SignIn() {
  return (
    <div className="w-full h-full flex items-center justify-center">

    <button className="px-4 py-2 rounded-md text-white bg-gray-700" onClick={() => signIn('google')}>Sign in with google</button>

    </div>
  )
}
