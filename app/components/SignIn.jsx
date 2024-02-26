'use client'
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react"
import { LiaFacebook } from "react-icons/lia";


export default function SignIn() {
  return (
    <div className="w-full h-screen flex items-center flex-col space-y-4 justify-center">

    <button className="w-[250px] py-2 rounded-md justify-center text-gray-800 flex space-x-2 border-gray-800 border hover:bg-gray-200 hover:border-black bg-transparent hover:text-black hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => signIn('google')}>
        <FcGoogle className="text-[24px]" />
        <p className="font-bold">Sign in with Google</p>
    </button>

    <button className="w-[250px] py-2 rounded-md justify-center items-center text-gray-800 flex space-x-2 border-gray-800 border hover:bg-gray-200 hover:border-black bg-transparent hover:text-black hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => signIn('facebook')}>
        <LiaFacebook className="text-[28px] text-blue-500" />
        <p className="font-bold">Sign in with Facebook</p>
    </button>


    </div>
  )
}
