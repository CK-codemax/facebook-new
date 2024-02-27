import Image from "next/image";


export default function StoryCard({ src, profile, name}) {
  return (
    <div className="relative h-32 min-w-20 sm:h-56 sm:min-w-32 cursor-pointer p-3">
       <Image className="absolute opacity-100 rounded-full z-10 top-1 left-1 sm:top-4 w-[50px] h-[50px] object-cover" src={profile} alt="profile-image" width={40} height={40} layout="fixed" objectFit="cover" />

       <Image src={src} alt="feed-image" layout="responsive" width={500} height={500} className="object-cover w-full h-full filter brightness-75 rounded-xl sm:rounded-3xl" />

       <p className="capitalize absolute bottom-5 text-xs text-gray-100">{name}</p>
    </div>
  )
}
