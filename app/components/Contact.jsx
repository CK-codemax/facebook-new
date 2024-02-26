import Image from "next/image";

export default function Contact({src, name}){

    return(
    
    <div className='relative flex items-center space-x-3 mb-2 cursor-pointer hover:bg-gray-200 p-2 rounded-xl'>
    <Image src={src} alt='profile-image' className='rounded-full h-[50px] border-2 border-gray-600 w-[50px] object-cover' width={50} height={50}/>
    <p>{name}</p>
    <div className='absolute bottom-2 left-7 rounded-full bg-green-400 h-3 w-3' />
    </div>
    )
    
    }