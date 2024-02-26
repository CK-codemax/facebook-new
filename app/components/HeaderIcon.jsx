export default function HeaderIcon({Icon, active}) {
    return (
      <div className="cursor-pointer sm:h-14 md:hover:bg-gray-100 flex items-center rounded-full group md:px-4 ">
          <Icon className={`h-5 text-[20px] ${active && 'text-blue-500'}  group-hover:text-blue-500 text-center mx-auto sm:h-7 sm:text-[28px]`} />
      </div>
    )
  }
  