import Image from "next/image";

export default function SidebarRow({Icon, title, src}) {
  return (
    <div className="flex items-center space-x-2 p-1 sm:p-4 hover:bg-gray-200 cursor-pointer rounded-xl">
       {src && <Image className="rounded-full" src={src} alt="side-image" width={30} height={30} layout="fixed" />}
       {Icon && <Icon className="h-8 text-[32px] text-blue-500" />}
       <p className="capitalize font-medium">{title}</p>
    </div>
  )
}
