'use client'
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";


export default function SignIn() {
  return (
    <div className="w-full h-screen flex items-center flex-col space-y-4 justify-center">

    
      <Link className="mb-3" href={'/'}>
         <Image className='w-[40px] sm:w-[70px] h-[40px] sm:h-[70px] rounded-full' src='https://links.papareact.com/5me' width={40} height={40} alt="facebook-logo" />
    </Link> 
   

    <form className="flex flex-col space-y-3 w-[85%] sm:w-[450px] items-center justify-center">
       <div className="flex flex-col w-full items-start justify-start space-y-1">
           <label className="font-semibold text-left" htmlFor="email">Your email</label>
           <input className="border border-gray-700 w-full p-2 px-4 rounded-md text-black placeholder:text-gray-500 outline-blue-500" id="email" placeholder="Enter your email" type="text" />
       </div>

       <div className="flex flex-col items-start justify-start  space-y-1 w-full">
           <label className="font-semibold text-left" htmlFor="email">Your password</label>
           <input className="border border-gray-700 w-full p-2 px-4 rounded-md text-black placeholder:text-gray-500 outline-blue-500" id="email" placeholder="Enter your password" type="text" />
       </div>

        <button className="w-full p-2 px-4 bg-blue-500 rounded-md text-gray-100 hover:font-semibold  hover:text-white xl:hover:scale-105 transition-all duration-300 ease-in-out">Login</button>
    </form>

    <button className="w-[85%] sm:w-[450px] p-2 px-4 rounded-md justify-center text-gray-800 flex space-x-2 border-gray-800 border hover:bg-gray-200 hover:border-black bg-transparent hover:text-black xl:hover:scale-105 transition-all duration-300 ease-in-out" onClick={() => signIn('google')}>
        <FcGoogle className="text-[24px]" />
        <p className="font-bold">Sign in with Google</p>
    </button>



    </div>
  )
}
