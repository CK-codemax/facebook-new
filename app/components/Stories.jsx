'use client'

import { useState } from "react";
import { storyList } from "../src/storylist";
import StoryCard from "./StoryCard";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";


export default function Stories() {
  const [view, setView] = useState(0)

  function handleMove(type){

    if(type === 'forward' && view > -(storyList.length * 100) + 100 ){
      setView(prev => prev - 200)
    }else  if(type === 'backward' && view < 0){
      setView(prev => prev + 200)
    }

  }
  return (
    <>
    <div className="h-[220px] w-full relative hidden lg:block">

     
     <div style={{
      transform : `translateX(${view}px)`,
     }} className={`hidden lg:flex justify-start lg:absolute transition-transform duration-300 ease-in-out lg:top-0 items-center scrollbar-hide overflow-x-scroll space-x-3 mx-auto`}>

{storyList.map(( story ) => <StoryCard key={story.name} src={story.src} profile={story.profile} name={story.name} />)}

</div>

<div onClick={() => handleMove('backward')} className={`absolute hidden top-[50%] left-1 -translate-y-[50%] z-30 w-[40px] h-[40px] lg:flex items-center justify-center rounded-full ${!(view < 0) ? 'opacity-0' : 'hover:bg-white opacity-100 bg-gray-200 cursor-pointer'} transition-all duration-300 ease-in-out group`}>
  <GoChevronLeft className="text-[28px] text-gray-700 group-hover:scale-110 transition-all duration-300 ease-in-out group-hover:text-black" />
</div>

<div onClick={() => handleMove('forward')} className={`absolute hidden top-[50%] right-1 -translate-y-[50%] z-30 w-[40px] h-[40px] lg:flex items-center justify-center ${!(view > -(storyList.length * 100) + 100) ? 'opacity-0' : 'hover:bg-white opacity-100 bg-gray-200 cursor-pointer'} rounded-full transition-all duration-300 ease-in-out group`}>
  <GoChevronRight className="text-[28px] text-gray-700 group-hover:scale-110 transition-all duration-300 ease-in-out group-hover:text-black" />
</div>
   
  </div>

{/*Small screens*/}

    <div className="lg:hidden">
     
     <div className="flex justify-start items-center scrollbar-hide overflow-x-scroll space-x-3 mx-auto">

{storyList.map(( story ) => <StoryCard key={story.name} src={story.src} profile={story.profile} name={story.name} />)}
</div>
  </div>
    </>
  )
}
