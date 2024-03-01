'use client'

import { useRef } from "react";
import { storyList } from "../src/storylist";
import StoryCard from "./StoryCard";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";


export default function Stories() {
 
 
  const scrollStoriesRef = useRef()
 

 

  function handleScrollTo(type){

    if(type === 'forward'){
   
   scrollStoriesRef.current.scrollLeft += 300
  
    }else  if(type === 'backward'){
     
     
     scrollStoriesRef.current.scrollLeft -= 300

     
    }
  }
  return (
    <>
    <div className="h-[220px] w-full relative hidden lg:block">

    <div ref={scrollStoriesRef} className="relative scroll-smooth w-full h-full overflow-x-scroll scrollbar-hide">
     
     <div className={`hidden lg:flex justify-start lg:absolute transition-transform duration-300 ease-in-out lg:top-0 items-center scrollbar-hide overflow-x-scroll space-x-3 mx-auto`}>

{storyList.map(( story ) => <StoryCard key={story.name} src={story.src} profile={story.profile} name={story.name} />)}

</div>
</div>


<div onClick={() => handleScrollTo('backward')} className={`absolute hidden top-[50%] left-1 -translate-y-[50%] z-30 w-[40px] h-[40px] lg:flex items-center justify-center rounded-full hover:bg-white opacity-100 bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out group`}>
  <GoChevronLeft className="text-[28px] text-gray-700 group-hover:scale-110 transition-all duration-300 ease-in-out group-hover:text-black" />
</div>

<div onClick={() => handleScrollTo('forward')} className={`absolute hidden top-[50%] right-1 -translate-y-[50%] z-30 w-[40px] h-[40px] lg:flex items-center justify-center hover:bg-white opacity-100 bg-gray-200 cursor-pointer rounded-full transition-all duration-300 ease-in-out group`}>
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
